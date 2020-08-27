import React, { useState, useEffect } from 'react'
import { Row } from 'antd';
import DailyRecord from './dailyRecord';
import { IDailyRecord } from '../../redux/store/dailyRecord/types';
import { RootState } from '../../redux/store';
import { connect, ConnectedProps } from 'react-redux';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getRecords } from '../../redux/store/dailyRecord/actions'

const mapState = (state: RootState) => {
    return {
        weeklyRecords: state.dailyRecord.dailyRecords
    }
}
const mapDispatch = {
    getRecords
}
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux

const WeeklyRecord = (props: Props) => {
    const records = props.weeklyRecords;
    const [dateRange, setDateRange] = useState({
        startDate: moment().startOf('week').toDate(),
        endDate: moment().endOf('week').toDate()
    })
    const { getRecords } = props;
    useEffect(() => {
        getRecords(dateRange);
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

export default connector(WeeklyRecord);