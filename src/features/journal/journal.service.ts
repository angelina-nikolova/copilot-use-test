import type { JournalEntry, JournalEntryInput } from '../../types/journal.types';
import { format } from 'date-fns';

const STORAGE_KEY = 'daily-journal-entries';

/**
 * Local storage service for journal entries.
 * This provides a clean interface that can be swapped with a Supabase service later.
 */
class JournalService {
  /**
   * Get all journal entries, sorted by date descending
   */
  async getAll(): Promise<JournalEntry[]> {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      
      const entries: JournalEntry[] = JSON.parse(data);
      return entries.sort((a, b) => b.date.localeCompare(a.date));
    } catch (error) {
      console.error('Failed to get journal entries:', error);
      return [];
    }
  }

  /**
   * Get a single journal entry by ID
   */
  async getById(id: string): Promise<JournalEntry | null> {
    const entries = await this.getAll();
    return entries.find(entry => entry.id === id) ?? null;
  }

  /**
   * Get journal entry by date
   */
  async getByDate(date: string): Promise<JournalEntry | null> {
    const entries = await this.getAll();
    return entries.find(entry => entry.date === date) ?? null;
  }

  /**
   * Create or update a journal entry.
   * If an entry exists for the given date, it will be updated.
   */
  async save(input: JournalEntryInput): Promise<JournalEntry> {
    const entries = await this.getAll();
    const existingIndex = entries.findIndex(e => e.date === input.date);
    const now = new Date().toISOString();

    if (existingIndex >= 0) {
      // Update existing entry
      const existing = entries[existingIndex];
      if (!existing) throw new Error('Entry not found');
      
      const updated: JournalEntry = {
        ...existing,
        mood: input.mood,
        content: input.content,
        updatedAt: now,
      };
      entries[existingIndex] = updated;
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
      return updated;
    } else {
      // Create new entry
      const newEntry: JournalEntry = {
        id: crypto.randomUUID(),
        date: input.date,
        mood: input.mood,
        content: input.content,
        createdAt: now,
        updatedAt: now,
      };
      entries.push(newEntry);
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
      return newEntry;
    }
  }

  /**
   * Delete a journal entry by ID
   */
  async delete(id: string): Promise<void> {
    const entries = await this.getAll();
    const filtered = entries.filter(entry => entry.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }

  /**
   * Get entries for the current month
   */
  async getForCurrentMonth(): Promise<JournalEntry[]> {
    const entries = await this.getAll();
    const currentMonth = format(new Date(), 'yyyy-MM');
    return entries.filter(entry => entry.date.startsWith(currentMonth));
  }

  /**
   * Get total count of entries
   */
  async getCount(): Promise<number> {
    const entries = await this.getAll();
    return entries.length;
  }
}

export const journalService = new JournalService();
