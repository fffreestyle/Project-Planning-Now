import React from 'react';
import { Button } from 'antd';
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
        if (window.confirm('確認刪除嗎?')) {
            DeleteRecordDetail({
                recordUUID: props.record.recordUUID,
                recordDetailUUID: props.record.recordDetailUUID
            });
        }
    };
    return (
        <div>
            <a onClick={deleteRecord}><DeleteOutlined /></a>
        </div>
    )
}

export default connector(DeleteDailyRecordDetail);