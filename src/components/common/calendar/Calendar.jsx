import { useState } from 'react';
import Calendar from 'react-calendar';
import { Button } from '../button/Button'
import 'react-calendar/dist/Calendar.css';
import { colors } from '../../../utils/constants';

import './calendar.css';

export const CustomCalendar = ({ value, onChange, label, rentedDates }) => {
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value || new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onChange(date);
    setCalendarOpen(false);
  };

  const openCalendar = () => {
    setCalendarOpen(true);
  };

  const closeCalendar = () => {
    setCalendarOpen(false);
  };

  const containerStyle = {
    position: 'relative',
    height: '5vh',
    width: '40vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:'1.5rem'
  };

  const modalStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    background: 'rgba(0, 0, 0, 0.5)', 
    zIndex: '1000', 
    display: isCalendarOpen ? 'flex' : 'none',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const calendarStyle = {
    width: '80%',
  };

  const tileClassName = ({ date }) => {
    const isRented = rentedDates.some(
      (rental) =>
        new Date(rental.startDate) <= date && date <= new Date(rental.endDate)
    );
  
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
  
    if (isRented || rentedDates.some((rental) => rental.endDate === date.toISOString().split('T')[0])) {
      return 'rented-date';
    } else if (isWeekend) {
      return 'weekend-date';
    } else {
      return 'available-date';
    }
  };

  return (
    <div className="custom-calendar-container" style={containerStyle}>
      <Button label={label} color={colors.blackColor} backgroundColor={colors.secondaryColor} className="calendar-button" onClick={openCalendar} />
      <div className="selected-date">
        {selectedDate.toLocaleDateString()}
      </div>

      {/* Modal */}
      <div style={modalStyle} onClick={closeCalendar}>
        <Calendar
          className={'Calendar'}
          onChange={handleDateChange}
          value={selectedDate}
          tileClassName={tileClassName}
          style={calendarStyle}
        />
      </div>
    </div>
  );
};
