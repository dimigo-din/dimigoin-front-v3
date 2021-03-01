import React from 'react';
import Calandar, { CalendarProps } from 'react-calendar';
import './style.css';

export const MonthCalendar: React.FC<CalendarProps> = ({ ...props }) => {
  return <Calandar prevLabel="<" nextLabel=">" {...props} />;
};
