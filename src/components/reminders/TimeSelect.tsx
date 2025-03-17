import React from 'react';

interface TimeSelectProps {
  value: string;
  onChange: (time: string) => void;
}

export function TimeSelect({ value, onChange }: TimeSelectProps) {
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        const time = `${formattedHour}:${formattedMinute}`;
        const label = new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        });
        options.push({ value: time, label });
      }
    }
    return options;
  };

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
    >
      {generateTimeOptions().map(({ value: timeValue, label }) => (
        <option key={timeValue} value={timeValue}>
          {label}
        </option>
      ))}
    </select>
  );
}