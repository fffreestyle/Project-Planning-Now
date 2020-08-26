import React from 'react';
import { Modal, Input, TimePicker, Form } from 'antd'
import { IDailyRecordDetail } from '../../redux/store/dailyRecord/types';
export type IinitialValues = {
    recordDetailUUID: string,
    recordTitle: string,
    recordDescription: string,
    taikingTime: [Date, Date]
}
interface IRecordDetailModal {
    recordUUID: string,
    visible: boolean,
    initialValues?: IinitialValues,
    onOk: (record: IDailyRecordDetail) => void,
    handleCancel: () => void
}
const ModifyRecordDetailModal = ({ recordUUID, visible, initialValues, onOk, handleCancel }: IRecordDetailModal) => {
    const { TextArea } = Input;
    const { RangePicker } = TimePicker;
    const [form] = Form.useForm();
    const format = 'HH:mm';
    return (
        <Modal
            title="New Record"
            visible={visible}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        console.log(values);
                        const title = values.recordTitle;
                        const description = values.recordDescription;
                        const [startTime, endTime] = values.taikingTime;
                        const record: IDailyRecordDetail = {
                            recordUUID: recordUUID,
                            recordDetailUUID: initialValues !== undefined ? initialValues.recordDetailUUID : '',
                            projectUUID: null,
                            title: title,
                            description: description,
                            startTime: startTime,
                            endTime: endTime,
                            createTime: new Date(),
                        }
                        onOk(record);
                        form.resetFields();
                    })

            }}
            onCancel={handleCancel}
        >
            <Form form={form} layout='vertical' initialValues={initialValues}>
                <Form.Item name='recordTitle' label='Record Title' rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name='recordDescription' label='Record Description' rules={[{ required: true }]}>
                    <TextArea ></TextArea>
                </Form.Item>
                <Form.Item name='taikingTime' label='Taking Time' rules={[{ required: true }]}>
                    <RangePicker picker='time' format={format} />
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default ModifyRecordDetailModal;