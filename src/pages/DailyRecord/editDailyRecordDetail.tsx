import React, { useState } from 'react';
import { Button } from 'antd';
import { editRecordDetail as editDetail } from '../../redux/store/dailyRecord/actions'
import { connect, ConnectedProps } from 'react-redux';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import ModifyRecordDetailModal, { IinitialValues } from './modifyRecordDetailModal';
import { IDailyRecordDetail } from '../../redux/store/dailyRecord/types';
const mapDispatch = {
    editDetail
}
const connector = connect(null, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>
type PropsFromParent = {
    record: IDailyRecordDetail
};
type Props = PropsFromRedux & PropsFromParent

const EditDailyRecordDetail = (props: Props) => {
    const [visible, setVisible] = useState(false);

    const { editDetail } = props;

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
                recordUUID={props.record.recordUUID}
                initialValues={initialValues}
                visible={visible}
                onOk={(values) => {
                    editDetail(values);
                    setVisible(false);
                }}
                handleCancel={() => setVisible(false)} />
        </div>
    )
}

export default connector(EditDailyRecordDetail);