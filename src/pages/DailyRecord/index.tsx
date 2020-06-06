import React from 'react'
import { DailyRecordModel } from './dailyRecordModel'
import DailyRecords from './dailyRecords'
import moment from 'moment'
import { range } from 'ramda'

const mockRecords: DailyRecordModel[] = [{
    recordUUID: 'aaa',
    date: new Date(),
    recordItems: [{
        title: 'String',
        description: 'String',
        startTime: new Date(),
        endTime: new Date(),
        createTime: new Date(),
    }]
},
{
    recordUUID: 'vvv',
    date: moment().add(1,'day').toDate(),
    recordItems: [{
        title: 'String',
        description: 'String',
        startTime: new Date(),
        endTime: new Date(),
        createTime: new Date(),
    }]
}];

const DailyRecordPage = () => {
    const weekDay = range(0, 7).map((day) => moment().day(day));
    const records = weekDay.map((day): DailyRecordModel => {
        const currentDateRecord = mockRecords.find((mockRecord) => moment(mockRecord.date).isSame(day, 'day'));
        if(currentDateRecord === undefined){
            return {
                recordUUID: '',
                date: day.toDate(),
                recordItems: []
            }
        }
        return {
            recordUUID: currentDateRecord.recordUUID,
            date: day.toDate(),
            recordItems: currentDateRecord.recordItems
        }
    })
    return (
        <div>
            <DailyRecords workingRecords={records}></DailyRecords>
        </div>
    );
}

export default DailyRecordPage;