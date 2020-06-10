import React from 'react';
import { Button } from 'antd';
import { DeleteRecordDetail } from '../../redux/store/dailyRecord/actions'
import { connect, ConnectedProps } from 'react-redux';
import { IDailyRecordDetail } from '../../redux/store/dailyRecord/types';
const mapDispatch = {
    DeleteRecordDetail
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
        DeleteRecordDetail(props.record.recordUUID, props.record.recordDetailUUID);
    };
    return (
        <div>
            <Button type='primary' onClick={deleteRecord}>Delete</Button>
        </div>
    )
}

export default connector(DeleteDailyRecordDetail);