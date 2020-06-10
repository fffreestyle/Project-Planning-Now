import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import ModifyRecordDetailModal from './modifyRecordDetailModal';
import { connect, ConnectedProps } from 'react-redux'
import { AddRecordDetail as addDetail } from '../../redux/store/dailyRecord/actions'


const mapDispatch = {
    addDetail
}
const connector = connect(null, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>
type PropsFromParent = {
    recordUUID: string
};
type Props = PropsFromRedux & PropsFromParent

const AddDailyRecordDetail = (props: Props) => {
    const [visible, setVisible] = useState(false);

    const { addDetail } = props;

    const openModal = () => setVisible(true);

    return (
        <div>
            <Button type='primary' onClick={openModal}><PlusOutlined /></Button>
            <ModifyRecordDetailModal
                recordUUID={props.recordUUID}
                visible={visible}
                onOk={(values) => {
                    addDetail(values);
                    setVisible(false);
                }}
                handleCancel={() => setVisible(false)} />
        </div>
    )
}

export default connector(AddDailyRecordDetail);