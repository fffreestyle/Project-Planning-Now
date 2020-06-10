import React from "react";
import { IDailyRecordDetail } from "../../redux/store/dailyRecord/types";
import EditDailyRecordDetail from './editDailyRecordDetail'
import DeleteDailyRecordDetail from './deleteDailyRecordDetail'
import { Row, Col } from "antd";

interface IRecordItem {
    recordItem: IDailyRecordDetail,
}

const DailyRecordDetail = (props: IRecordItem) => {
    const { recordItem } = props;

    return (
        <div>
            <Row gutter={8}>
                <Col span={12}>
                    <EditDailyRecordDetail record={recordItem}></EditDailyRecordDetail>
                </Col>
                <Col span={12}>
                    <DeleteDailyRecordDetail record={recordItem}></DeleteDailyRecordDetail>
                </Col>
            </Row>
            <div>{recordItem.title}</div>
            <div>{recordItem.description}</div>
        </div>
    )
}

export default DailyRecordDetail;