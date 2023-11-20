import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const CustomCalendar = ({ value, onChange }) => {
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value || new Date());

  const handleDateChange = (date) => {
    console.log('Fecha Elegida: ', date)
    setSelectedDate(date);
    onChange(date);
    setCalendarOpen(false); // Close the calendar after selecting a date
  };

  return (
    <div className="custom-calendar-container">
      <button
        className="calendar-button"
        onClick={() => setCalendarOpen(!isCalendarOpen)}
      >
        Open Calendar
      </button>
      {isCalendarOpen && (
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          onClickDay={() => setCalendarOpen(false)}
        />
      )}
    </div>
  );
};

