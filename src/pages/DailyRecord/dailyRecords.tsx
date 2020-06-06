import React, { useState } from 'react'
import { DailyRecordModel, DailyRecordDetailModel } from "./dailyRecordModel";
import DailyRecordDetail from './dailyRecordDetail';
import moment from 'moment';
import { Row, Col } from 'antd';
import AddingDailyRecordDetail from './addingDailyRecordDetail'
interface IWorkingRecords {
    workingRecords: DailyRecordModel[]
}
interface IWorkingRecord {
    workingRecord: DailyRecordModel
}
const DailyRecord = (props: IWorkingRecord) => {
    const record = props.workingRecord;
    const [recordItem, setRecordItem] = useState(record.recordItems);
    const addRecordDetail = (newRecord: DailyRecordDetailModel) => {
        setRecordItem([...recordItem, newRecord]);
    }
    const removeRecordDetail = (beDeletedIndex: number) => {
        setRecordItem(recordItem.filter((value, index) => index !== beDeletedIndex));
    }
    const editRecordDetail = (beEditIndex: number) => {
        //setRecordItem(recordItem.filter((value, index) => index !== beDeletedIndex));
    }
    return (
        <Col span='3'>
            <div>{moment(record.date).format('MM/DD(ddd)')}</div>
            <AddingDailyRecordDetail addRecordDetail={addRecordDetail} ></AddingDailyRecordDetail>
            {recordItem.map((item, index) => <DailyRecordDetail key={index} index={index} recordItem={item} removeRecordDetail={removeRecordDetail} editRecordDetail={editRecordDetail}></DailyRecordDetail>)}
        </Col>
    );
}
const DailyRecords = (props: IWorkingRecords) => {
    const records = props.workingRecords;
    return (
        <Row>
            {
                records.map((record, index) => {
                    return (
                        <DailyRecord key={record.recordUUID} workingRecord={record}></DailyRecord>
                    );
                })
            }
        </Row>
    );
}

export default DailyRecords;