import React, { useState } from 'react';
import { Button, Modal, Input, TimePicker } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import { DailyRecordDetailModel } from './dailyRecordModel';

interface IAddingDailyRecordDetail {
    addRecordDetail: (newRecord: DailyRecordDetailModel) => void;
}

const AddingDailyRecordDetail = (props: IAddingDailyRecordDetail) => {
    const { TextArea } = Input;
    const { RangePicker } = TimePicker;

    const [visiable, setVisiable] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);

    const { addRecordDetail } = props;

    const openModal = () => setVisiable(true);
    const creatNewRecord = () => {
        console.log(`${title} ${description} ${startTime} ${endTime}`);
        if (startTime === null) {
            alert('請填入開始時間')
            return;
        }
        if (endTime === null) {
            alert('請填入結束時間')
            return;
        }
        addRecordDetail({
            title: title,
            description: description,
            startTime: startTime,
            endTime: endTime,
            createTime: new Date()
        });
        setTitle('');
        setDescription('');
        setStartTime(null);
        setEndTime(null);
        setVisiable(false);
    };
    const handleCancel = () => setVisiable(false);

    const titleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const descriptionTextAreaOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };
    const timeRangeOnChange = (values: any, dateStrings: [string, string]) => {
        setStartTime(values[0].toDate());
        setEndTime(values[1].toDate());
        // console.log(values);
        // console.log(dateStrings);
    };



    const format = 'HH:mm';
    return (
        <div>
            <Button type='primary' onClick={openModal}><PlusOutlined /></Button>
            <Modal
                title="Basic Modal"
                visible={visiable}
                onOk={creatNewRecord}
                onCancel={handleCancel}
            >
                <Input value={title} placeholder="Record Title" onChange={titleInputOnChange} />
                <TextArea value={description} placeholder="Record Description" onChange={descriptionTextAreaOnChange}></TextArea>
                <RangePicker picker='time' format={format} onChange={timeRangeOnChange} />
            </Modal>
        </div>
    )
}

export default AddingDailyRecordDetail;