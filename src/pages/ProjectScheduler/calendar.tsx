import React from 'react'
import moment from 'moment';
import { range } from 'ramda';
import Year, { YearProps } from './year';


const Calendar = () => {
    const range: YearProps[] = [{ year: 2019, startMonth: 9, endMonth: 12 }, { year: 2020, startMonth: 1, endMonth: 12 }]
    return (
        <div className='overflow-x-auto whitespace-no-wrap flex'>
            {range.map(year => <Year {...year}></Year>)}
        </div>
    )
};

export default Calendar;