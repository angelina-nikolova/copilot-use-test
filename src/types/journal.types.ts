export interface JournalEntry {
  id: string;
  date: string; // ISO date string (YYYY-MM-DD)
  mood: MoodType;
  content: string;
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
}

export type MoodType = 'very_happy' | 'happy' | 'neutral' | 'sad' | 'very_sad';

export interface JournalEntryInput {
  date: string;
  mood: MoodType;
  content: string;
}

export const MOOD_LABELS: Record<MoodType, string> = {
  very_happy: '😊 Very Happy',
  happy: '🙂 Happy',
  neutral: '😐 Neutral',
  sad: '😔 Sad',
  very_sad: '😢 Very Sad',
};

export const MOOD_VALUES: MoodType[] = ['very_sad', 'sad', 'neutral', 'happy', 'very_happy'];
