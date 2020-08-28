import React, { useState } from 'react';
import { editRecordDetail as editDetail } from '../../redux/store/dailyRecord/actions'
import { useDispatch } from 'react-redux';
import { EditOutlined } from '@ant-design/icons';
import ModifyRecordDetailModal, { IinitialValues } from './modifyRecordDetailModal';
import { IDailyRecordDetail } from '../../redux/store/dailyRecord/types';

type PropsFromParent = {
    record: IDailyRecordDetail
};
type Props = PropsFromParent

const EditDailyRecordDetail = (props: Props) => {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();

    const openModal = () => setVisible(true);
    const initialValues: IinitialValues = {
        recordDetailUUID: props.record.recordDetailUUID,
        recordTitle: props.record.title,
        recordDescription: props.record.description,
        taikingTime: [props.record.startTime, props.record.endTime]
    }
    return (
        <div className='mr-1'>
            <a onClick={openModal}><EditOutlined /></a>
            <ModifyRecordDetailModal
                modalTitle='Edit Record'
                recordUUID={props.record.recordUUID}
                initialValues={initialValues}
                visible={visible}
                onOk={(values) => {
                    dispatch(editDetail(values));
                    setVisible(false);
                }}
                handleCancel={() => setVisible(false)} />
        </div>
    )
}

export default EditDailyRecordDetail;