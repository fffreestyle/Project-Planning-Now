import React from "react";
import { IDailyRecordDetail } from "../../redux/store/dailyRecord/types";
import EditDailyRecordDetail from './editDailyRecordDetail'
import DeleteDailyRecordDetail from './deleteDailyRecordDetail'
import { Row, Col, Card } from "antd";
import moment from "moment";

interface IRecordItem {
    recordItem: IDailyRecordDetail,
}

const DailyRecordDetail = (props: IRecordItem) => {
    const { recordItem } = props;
    const format = 'HH:mm';
    return (
        <div>
            <Card
                size="small"
                title={recordItem.title}
                extra={
                    <div className='flex'>
                        <EditDailyRecordDetail record={recordItem}></EditDailyRecordDetail>
                        <DeleteDailyRecordDetail record={recordItem}></DeleteDailyRecordDetail>
                    </div>
                }
                actions={[<div>{moment(recordItem.startTime).format(format)} - {moment(recordItem.endTime).format(format)}</div>]}
            >
                {recordItem.description}
            </Card>
        </div>
    )
}

export default DailyRecordDetail;