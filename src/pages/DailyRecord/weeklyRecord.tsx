import React, { useState, useEffect } from 'react'
import DailyRecord from './dailyRecord';
import { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getRecords } from '../../redux/store/dailyRecord/actions'

const WeeklyRecord = () => {
    const records = useSelector((state: RootState) => state.dailyRecord.dailyRecords);
    const dispatch = useDispatch();
    const [dateRange, setDateRange] = useState({
        startDate: moment().startOf('week').toDate(),
        endDate: moment().endOf('week').toDate()
    })
    useEffect(() => {
        dispatch(getRecords(dateRange));
    }, [dateRange]);
    const goPrevWeek = () => {
        setDateRange({
            startDate: moment(dateRange.startDate).subtract(7, 'd').toDate(),
            endDate: moment(dateRange.endDate).subtract(7, 'd').toDate()
        });
    }
    const goNextWeek = () => {
        setDateRange({
            startDate: moment(dateRange.startDate).add(7, 'd').toDate(),
            endDate: moment(dateRange.endDate).add(7, 'd').toDate()
        });
    }
    return (
        <div>
            <div className='flex container mx-auto'>
                <div><a onClick={goPrevWeek}><LeftCircleOutlined className='text-4xl' /></a></div>
                <div className='flex-1 text-center text-4xl'>{moment(dateRange.startDate).format('MM/DD')} - {moment(dateRange.endDate).format('MM/DD')}</div>
                <div><a onClick={goNextWeek}><RightCircleOutlined className='text-4xl' /></a></div>
            </div>
            <div className='flex container mx-auto'>
                {
                    records.map((record, index) => {
                        return (
                            <DailyRecord key={record.recordUUID} workingRecord={record}></DailyRecord>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default WeeklyRecord;