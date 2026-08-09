import { z } from 'zod';

export const journalEntrySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  mood: z.enum(['very_happy', 'happy', 'neutral', 'sad', 'very_sad']),
  content: z.string()
    .trim()
    .min(1, 'Journal entry cannot be empty')
    .max(10000, 'Journal entry is too long (max 10000 characters)'),
});

export type JournalEntryFormData = z.infer<typeof journalEntrySchema>;
