import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { journalEntrySchema, type JournalEntryFormData } from '../journal.schema';
import { MOOD_LABELS, MOOD_VALUES, type MoodType } from '../../../types/journal.types';
import { Button } from '../../../components/ui/Button';
import { DateSelector } from '../../../components/ui/DateSelector';
import { format } from 'date-fns';

interface JournalFormProps {
  defaultValues?: Partial<JournalEntryFormData>;
  onSubmit: (data: JournalEntryFormData) => Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
}

export function JournalForm({ 
  defaultValues, 
  onSubmit, 
  onCancel,
  submitLabel = 'Save Entry' 
}: JournalFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<JournalEntryFormData>({
    resolver: zodResolver(journalEntrySchema),
    defaultValues: defaultValues ?? {
      date: format(new Date(), 'yyyy-MM-dd'),
      mood: 'neutral',
      content: '',
    },
  });

  const selectedDate = watch('date');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <DateSelector
          value={selectedDate}
          onChange={(date) => setValue('date', date)}
          label="📅 Date"
        />
        {errors.date && (
          <p className="slide-in-left flex items-center gap-1 mt-2 text-red-600 dark:text-red-400 text-sm">❌ {errors.date.message}</p>
        )}
      </div>

      <div className="space-y-3">
        <label className="block font-semibold text-gray-900 dark:text-white text-base">
          😊 How are you feeling?
        </label>
        <div className="gap-3 grid grid-cols-5">
          {MOOD_VALUES.map((mood) => (
            <label
              key={mood}
              className="group relative flex flex-col items-center gap-2 has-[:checked]:bg-gradient-to-br dark:has-[:checked]:from-primary-900/30 has-[:checked]:from-primary-50 dark:has-[:checked]:to-blue-900/20 has-[:checked]:to-blue-50 hover:shadow-lg has-[:checked]:shadow-xl p-4 border-2 border-gray-200 hover:border-primary-400 dark:border-gray-700 dark:has-[:checked]:border-primary-500 dark:hover:border-primary-500 has-[:checked]:border-primary-600 rounded-2xl has-[:checked]:scale-105 transition-all hover:-translate-y-1 duration-200 cursor-pointer"
            >
              <input
                type="radio"
                value={mood}
                {...register('mood')}
                className="sr-only"
              />
              <span className="text-4xl group-hover:scale-110 transition-transform duration-200">{MOOD_LABELS[mood].split(' ')[0]}</span>
              <span className="font-medium text-gray-600 dark:group-has-[:checked]:text-primary-300 dark:text-gray-400 group-has-[:checked]:text-primary-700 text-xs text-center transition-colors">
                {MOOD_LABELS[mood].split(' ').slice(1).join(' ')}
              </span>
              <div className="top-2 right-2 absolute bg-primary-600 opacity-0 group-has-[:checked]:opacity-100 rounded-full w-3 h-3 transition-opacity" />
            </label>
          ))}
        </div>
        {errors.mood && (
          <p className="slide-in-left flex items-center gap-1 mt-2 text-red-600 dark:text-red-400 text-sm">❌ {errors.mood.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="block font-semibold text-gray-900 dark:text-white text-base">
          ✍️ Journal Entry
        </label>
        <textarea
          id="content"
          {...register('content')}
          rows={12}
          placeholder="Write your thoughts here... What happened today? How did it make you feel?"
          className="bg-white dark:bg-gray-900 shadow-sm px-4 py-3 border-2 border-gray-300 hover:border-gray-400 focus:border-primary-500 dark:border-gray-600 dark:hover:border-gray-500 dark:focus:border-primary-500 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/30 w-full dark:text-white leading-relaxed transition-all duration-200 resize-none custom-scrollbar"
        />
        {errors.content && (
          <p className="slide-in-left flex items-center gap-1 mt-2 text-red-600 dark:text-red-400 text-sm">❌ {errors.content.message}</p>
        )}
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="primary"
          className="flex-1"
        >
          {isSubmitting ? 'Saving...' : submitLabel}
        </Button>
        {onCancel && (
          <Button
            type="button"
            onClick={onCancel}
            variant="secondary"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
