import React from "react";
import { DailyRecordDetailModel } from './dailyRecordModel';

interface IRecordItem {
    recordItem: DailyRecordDetailModel,
    index: number,
    removeRecordDetail: (beDeletedIndex: number) => void,
    editRecordDetail: (beEditIndex: number) => void,
}

const DailyRecordDetail = (props: IRecordItem) => {
    const { recordItem } = props;
    const { index } = props;
    const { removeRecordDetail } = props;
    const { editRecordDetail } = props;
    return (
        <div>
            <button>Edit</button><button onClick={() => removeRecordDetail(index)}>Delete</button>
            <div>{recordItem.title}</div>
            <div>{recordItem.description}</div>
        </div>
    )
}

export default DailyRecordDetail;