import React, { useState } from 'react'
import { Row } from 'antd';
import DailyRecord from './dailyRecord';
import { IDailyRecord } from '../../redux/store/dailyRecord/types';
import { RootState } from '../../redux/store';
import { connect, ConnectedProps } from 'react-redux';

const mapState = (state: RootState) => {
    return {
        weeklyRecords: state.dailyRecord.dailyRecords
    }
}

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux

const WeeklyRecord = (props: Props) => {
    const records = props.weeklyRecords;
    return (
        <div className='flex container mx-auto'>
            {
                records.map((record, index) => {
                    return (
                        <DailyRecord key={record.recordUUID} workingRecord={record}></DailyRecord>
                    );
                })
            }
        </div>
    );
}

export default connector(WeeklyRecord);