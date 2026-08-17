import { format, subDays } from 'date-fns';
import { Calendar } from 'lucide-react';

interface DateSelectorProps {
  value: string;
  onChange: (date: string) => void;
  label?: string;
}

export function DateSelector({ value, onChange, label = 'Date' }: DateSelectorProps) {
  const today = new Date();
  
  const quickDates = [
    { label: 'Today', date: today, offset: 0 },
    { label: 'Yesterday', date: subDays(today, 1), offset: 1 },
    { label: '2 days ago', date: subDays(today, 2), offset: 2 },
    { label: '3 days ago', date: subDays(today, 3), offset: 3 },
    { label: '4 days ago', date: subDays(today, 4), offset: 4 },
    { label: '5 days ago', date: subDays(today, 5), offset: 5 },
    { label: '6 days ago', date: subDays(today, 6), offset: 6 },
  ];

  const handleQuickSelect = (date: Date) => {
    onChange(format(date, 'yyyy-MM-dd'));
  };

  return (
    <div className="space-y-3">
      <label className="block font-semibold text-gray-900 dark:text-white text-sm">
        <Calendar className="inline mr-1 w-4 h-4" />
        {label}
      </label>
      
      <div className="space-y-3">
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
          {quickDates.map(({ label, date, offset }) => {
            const dateString = format(date, 'yyyy-MM-dd');
            const isSelected = value === dateString;
            
            return (
              <button
                key={offset}
                type="button"
                aria-pressed={isSelected}
                onClick={() => handleQuickSelect(date)}
                className={`
                  px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${isSelected
                    ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-md scale-105'
                    : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 hover:scale-105'
                  }
                `}
              >
                <div className="font-semibold">{label}</div>
                <div className={`text-xs ${isSelected ? 'text-primary-100' : 'text-gray-500 dark:text-gray-400'}`}>
                  {format(date, 'MMM d')}
                </div>
              </button>
            );
          })}
          
          <button
            type="button"
            aria-label="Open custom date picker"
            onClick={() => {
              const input = document.getElementById('date-picker-input') as HTMLInputElement;
              if (input?.showPicker) {
                input.showPicker();
              } else {
                input?.focus();
              }
            }}
            className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 px-3 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-300 text-sm hover:scale-105 transition-all duration-200"
          >
            <div className="font-semibold">Other date</div>
            <div className="text-gray-500 dark:text-gray-400 text-xs">Pick custom</div>
          </button>
        </div>

        <input
          id="date-picker-input"
          type="date"
          aria-label="Select a custom date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-white dark:bg-gray-900 shadow-sm px-4 py-3 border-2 border-gray-300 hover:border-gray-400 focus:border-primary-500 dark:border-gray-600 dark:hover:border-gray-500 dark:focus:border-primary-500 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/30 w-full dark:text-white transition-all duration-200"
        />
      </div>
    </div>
  );
}
