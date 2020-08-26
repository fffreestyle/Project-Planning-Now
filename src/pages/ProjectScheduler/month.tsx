import React from 'react'
import { range } from 'ramda';
import Week from './week';

interface Props {
    month: number,
    currentMonthStartOfWeek: number,
    nextMonthStartOfWeek: number
}

const Month = (props: Props) => {
    const { month, currentMonthStartOfWeek, nextMonthStartOfWeek } = props;
    return (
        <div className=''>
            <div className='text-center border-gray-800 border-solid border-l border-b'>{month}月</div>
            <div className='flex'>
                {range(currentMonthStartOfWeek, nextMonthStartOfWeek).map(week => <Week week={week}></Week>)}
            </div>
        </div>
    )
}

export default Month;