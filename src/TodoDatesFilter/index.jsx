import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { DateRangePicker } from 'react-date-range';
import { TodoContext } from '../TodoContext';
import { format } from 'date-fns'
import React from 'react';
import './TodoDatesFilter.css';

function TodoDatesFilter() {
    const [openFilterDates, setOpenFilterDates] = React.useState(false);

  const {
    dateFilter,
    setDateFilter,
  } = React.useContext(TodoContext);

  const handleChange = (ranges) => {
    setDateFilter(ranges.selection)
  };

  const handleClick = () => {
    setOpenFilterDates((prev)=>!prev)
  };
  
  dateFilter.startDate.setMonth(0);

  return (
    <div
        className='ct-filter-dates'
    >
        <span
            className='calendar'
            onClick={handleClick}
        >
            Filter by Date
        </span>
        <span>
            {`Filtered by range of dates > FROM ${format(dateFilter.startDate, 'MMM-dd-yyyy')} TO ${format(dateFilter.endDate, 'MMM-dd-yyyy')}`}
        </span>
        { 
          openFilterDates && 
          <DateRangePicker 
              ranges={[dateFilter]}
              onChange={handleChange}
          />
        }
    </div>
  );
}

export { TodoDatesFilter };