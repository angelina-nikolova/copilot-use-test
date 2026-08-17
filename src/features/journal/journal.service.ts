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
      console.log('[JournalService] getAll() - raw data from localStorage:', data ? `${data.substring(0, 100)}...` : 'null/empty');
      
      if (!data) {
        console.log('[JournalService] No data in localStorage, returning empty array');
        return [];
      }
      
      const entries: JournalEntry[] = JSON.parse(data);
      
      // Validate that we got a proper array
      if (!Array.isArray(entries)) {
        console.error('[JournalService] localStorage data is not an array, found:', typeof entries, entries);
        localStorage.removeItem(STORAGE_KEY);
        return []; // Changed from throw to return
      }
      
      console.log(`[JournalService] Successfully loaded ${entries.length} entries`);
      return entries.sort((a, b) => b.date.localeCompare(a.date));
    } catch (error) {
      // If it's a JSON parse error, the data is corrupted
      if (error instanceof SyntaxError) {
        console.error('[JournalService] Corrupted JSON in localStorage, clearing:', error);
        localStorage.removeItem(STORAGE_KEY);
        return []; // Return empty array for corrupted data so user can start fresh
      }
      console.error('[JournalService] Failed to get journal entries:', error);
      throw error;
    }
  }

  /**
   * Get a single journal entry by ID
   */
  async getById(id: string): Promise<JournalEntry | null> {
    try {
      const entries = await this.getAll();
      return entries.find(entry => entry.id === id) ?? null;
    } catch (error) {
      console.error('Failed to get entry by ID:', error);
      throw error;
    }
  }

  /**
   * Get journal entry by date
   */
  async getByDate(date: string): Promise<JournalEntry | null> {
    try {
      const entries = await this.getAll();
      return entries.find(entry => entry.date === date) ?? null;
    } catch (error) {
      console.error('Failed to get entry by date:', error);
      throw error;
    }
  }

  /**
   * Create or update a journal entry.
   * If an entry exists for the given date, it will be updated.
   */
  async save(input: JournalEntryInput): Promise<JournalEntry> {
    try {
      console.log('[JournalService] save() called with input:', { date: input.date, mood: input.mood, contentLength: input.content.length });
      
      const entries = await this.getAll();
      console.log(`[JournalService] Current entries count: ${entries.length}`);
      
      const existingIndex = entries.findIndex(e => e.date === input.date);
      const now = new Date().toISOString();

      let updatedEntries: JournalEntry[];

      if (existingIndex >= 0) {
        // Update existing entry
        console.log(`[JournalService] Updating existing entry at index ${existingIndex} for date ${input.date}`);
        const existing = entries[existingIndex];
        if (!existing) {
          console.error('[JournalService] Entry at index exists but is falsy:', existingIndex, entries);
          throw new Error('Entry not found');
        }
        
        const updated: JournalEntry = {
          ...existing,
          mood: input.mood,
          content: input.content,
          updatedAt: now,
        };
        
        updatedEntries = [...entries];
        updatedEntries[existingIndex] = updated;
        
        console.log(`[JournalService] Saving ${updatedEntries.length} entries (update)`);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
        
        // Verify the save worked
        const verification = localStorage.getItem(STORAGE_KEY);
        if (!verification) {
          throw new Error('Failed to verify save - localStorage returned null');
        }
        
        return updated;
      } else {
        // Create new entry
        console.log(`[JournalService] Creating new entry for date ${input.date}`);
        const newEntry: JournalEntry = {
          id: crypto.randomUUID(),
          date: input.date,
          mood: input.mood,
          content: input.content,
          createdAt: now,
          updatedAt: now,
        };
        
        updatedEntries = [...entries, newEntry];
        
        // Comprehensive defensive check: ensure we're not losing data
        if (updatedEntries.length !== entries.length + 1) {
          console.error('[JournalService] Data loss detected! Original:', entries.length, 'Expected:', entries.length + 1, 'Got:', updatedEntries.length);
          throw new Error('Data integrity check failed - entry count mismatch');
        }
        
        // Double-check that all original entries are still present
        const originalIds = new Set(entries.map(e => e.id));
        const newIds = new Set(updatedEntries.filter(e => e.id !== newEntry.id).map(e => e.id));
        if (originalIds.size !== newIds.size) {
          console.error('[JournalService] Data loss detected! Original IDs:', originalIds.size, 'New IDs:', newIds.size);
          throw new Error('Data integrity check failed - original entries missing');
        }
        
        console.log(`[JournalService] Saving ${updatedEntries.length} entries (create new)`);
        const jsonData = JSON.stringify(updatedEntries);
        localStorage.setItem(STORAGE_KEY, jsonData);
        
        // Verify the save worked
        const verification = localStorage.getItem(STORAGE_KEY);
        if (!verification) {
          throw new Error('Failed to verify save - localStorage returned null');
        }
        const verifyParsed = JSON.parse(verification);
        if (!Array.isArray(verifyParsed) || verifyParsed.length !== updatedEntries.length) {
          console.error('[JournalService] Verification failed! Expected:', updatedEntries.length, 'Got:', Array.isArray(verifyParsed) ? verifyParsed.length : 'not an array');
          throw new Error('Failed to verify save - data mismatch');
        }
        
        console.log('[JournalService] Save verified successfully');
        return newEntry;
      }
    } catch (error) {
      console.error('[JournalService] Failed to save journal entry:', error);
      throw error;
    }
  }

  /**
   * Delete a journal entry by ID
   */
  async delete(id: string): Promise<void> {
    try {
      const entries = await this.getAll();
      const filtered = entries.filter(entry => entry.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Failed to delete journal entry:', error);
      throw error;
    }
  }

  /**
   * Get entries for the current month
   */
  async getForCurrentMonth(): Promise<JournalEntry[]> {
    try {
      const entries = await this.getAll();
      const currentMonth = format(new Date(), 'yyyy-MM');
      return entries.filter(entry => entry.date.startsWith(currentMonth));
    } catch (error) {
      console.error('Failed to get current month entries:', error);
      throw error;
    }
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
