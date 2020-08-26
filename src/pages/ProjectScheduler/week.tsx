import React from 'react'
import { range } from 'ramda';

interface Props {
    week: number
}

const Week = (props: Props) => {
    const { week } = props;
    const testData = {
        task: [{
            shouldDo: week % 2 === 0,
            isOnTime: true,
            isDelay: false,
        }, {
            shouldDo: week % 2 === 0,
            isOnTime: true,
            isDelay: false,
        }, {
            shouldDo: week % 2 === 0,
            isOnTime: true,
            isDelay: false,
        }]
    }
    return (
        <div>
            <div className='text-center border-gray-800 border-solid border-b border-l px-1'>W{week.toString().padStart(2, '0')}</div>
            {testData.task.map(task => {
                return (
                    <div>
                        <div className={`h-4 border-gray-800 border-solid border-b border-l ${task.shouldDo ? 'bg-green-600' : ''}`}></div>
                        <div className='h-4 border-gray-800 border-solid border-b border-l hover:bg-teal-300'></div>
                    </div>
                )
            })}
        </div>
    )
}

export default Week;