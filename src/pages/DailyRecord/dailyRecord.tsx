import React, { useState } from 'react'
import DailyRecordDetail from './dailyRecordDetail';
import moment from 'moment';
import { Col } from 'antd';
import AddDailyRecordDetail from './addDailyRecordDetail'
import { IDailyRecord, IDailyRecordDetail } from '../../redux/store/dailyRecord/types';

interface IWorkingRecord {
    workingRecord: IDailyRecord
}
const DailyRecord = (props: IWorkingRecord) => {
    const record = props.workingRecord;
    const { recordItems } = props.workingRecord;

    return (
        <Col span='3'>
            <div>{moment(record.date).format('MM/DD(ddd)')}</div>
            <AddDailyRecordDetail recordUUID={props.workingRecord.recordUUID} ></AddDailyRecordDetail>
            {recordItems.map((item) => <DailyRecordDetail key={item.recordDetailUUID} recordItem={item} ></DailyRecordDetail>)}
        </Col>
    );
}

export default DailyRecord;