import React from 'react';
import { Button, Popconfirm } from 'antd';
import { deleteRecordDetail } from '../../redux/store/dailyRecord/actions'
import { connect, ConnectedProps } from 'react-redux';
import { IDailyRecordDetail } from '../../redux/store/dailyRecord/types';
import { DeleteOutlined } from '@ant-design/icons';
const mapDispatch = {
    DeleteRecordDetail: deleteRecordDetail
}
const connector = connect(null, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>
type PropsFromParent = {
    record: IDailyRecordDetail
};
type Props = PropsFromRedux & PropsFromParent

const DeleteDailyRecordDetail = (props: Props) => {

    const { DeleteRecordDetail } = props;

    const deleteRecord = () => {
        DeleteRecordDetail({
            recordUUID: props.record.recordUUID,
            recordDetailUUID: props.record.recordDetailUUID
        });
    };
    return (
        <div>
            <Popconfirm placement='right' title='確認刪除嗎?' onConfirm={deleteRecord} okText="Yes" cancelText="No">
                <a><DeleteOutlined /></a>
            </Popconfirm>

        </div>
    )
}

export default connector(DeleteDailyRecordDetail);