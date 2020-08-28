import React from 'react';
import { Button, Popconfirm } from 'antd';
import { deleteRecordDetail } from '../../redux/store/dailyRecord/actions'
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { IDailyRecordDetail } from '../../redux/store/dailyRecord/types';
import { DeleteOutlined } from '@ant-design/icons';

type PropsFromParent = {
    record: IDailyRecordDetail
}
type Props = PropsFromParent

const DeleteDailyRecordDetail = (props: Props) => {
    const dispatch = useDispatch();

    const deleteRecord = () => {
        dispatch(
            deleteRecordDetail({
                recordUUID: props.record.recordUUID,
                recordDetailUUID: props.record.recordDetailUUID
            })
        );
    };
    return (
        <div>
            <Popconfirm placement='right' title='確認刪除嗎?' onConfirm={deleteRecord} okText="Yes" cancelText="No">
                <a><DeleteOutlined /></a>
            </Popconfirm>

        </div>
    )
}

export default DeleteDailyRecordDetail;