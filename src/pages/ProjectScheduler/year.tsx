import React from 'react';
import moment from 'moment';
import { range } from 'ramda';
import Month from './month';

export interface YearProps {
    year: number,
    startMonth: number,
    endMonth: number
}

const Year = (prop: YearProps) => {
    const { year, startMonth, endMonth } = prop;
    const yearMoment = moment().year(year);
    const weeksInYear = yearMoment.weeksInYear();
    const weeksInMonths = range(startMonth - 1, endMonth)
        .map(month => ({
            month: month,
            startOfWeek: yearMoment.month(month).date(1).week()
        }));
    return (
        <div className=''>
            <div className='text-center border-gray-800 border-solid border w-full'>{year}</div>
            <div className='flex'>
            {
                weeksInMonths
                    .map((month, index, arr) => {
                        if (month.month + 1 === 12) {
                            return (
                                <Month {...{ month: month.month + 1, currentMonthStartOfWeek: month.startOfWeek, nextMonthStartOfWeek: weeksInYear + 1 }}></Month>
                            )
                        }
                        return (
                            <Month {...{ month: month.month + 1, currentMonthStartOfWeek: month.startOfWeek, nextMonthStartOfWeek: arr[index + 1].startOfWeek }}></Month>
                        )
                    })
            }
            </div>
        </div>
    )
};

export default Year;