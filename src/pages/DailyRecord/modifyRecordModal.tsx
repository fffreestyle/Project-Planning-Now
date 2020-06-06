import React, { useState } from 'react';
import { Button, Modal, Input, TimePicker } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import { DailyRecordDetailModel, ModifyDailyRecordDetailModel } from './dailyRecordModel';

interface IAddingDailyRecordDetail {
    modifyRecordFunction: (newRecord: ModifyDailyRecordDetailModel) => void;
    modalVisiavle: boolean,
    title: string,
    description: string,
    startTime: Date | null,
    endTime: Date | null
}

const AddingDailyRecordDetail = (props: IAddingDailyRecordDetail) => {
    const { TextArea } = Input;
    const { RangePicker } = TimePicker;

    const { modifyRecordFunction } = props;

    const [visiable, setVisiable] = useState(props.modalVisiavle);
    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);
    const [startTime, setStartTime] = useState<Date | null>(props.startTime);
    const [endTime, setEndTime] = useState<Date | null>(props.endTime);

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
        modifyRecordFunction({
            title: title,
            description: description,
            startTime: startTime,
            endTime: endTime,
            createTime: new Date()
        });

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