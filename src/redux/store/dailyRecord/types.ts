export interface IDailyRecord {
    recordUUID: string,
    date: Date,
    recordItems: IDailyRecordDetail[]
}
export interface IDailyRecordDetail {
    recordUUID: string,
    recordDetailUUID: string,
    title: string,
    description: string,
    projectUUID: string | null,
    startTime: Date,
    endTime: Date,
    createTime: Date
}
export interface IDeleteRecordPayload {
    recordUUID: string,
    recordDetailUUID: string
}
export interface IDailyRecordState {
    dailyRecords: IDailyRecord[]
}
export interface IGetRecords {
    startDate: Date,
    endDate: Date
}

// export const ADD_DAILY_RECORD_DETAIL = 'ADD_DAILY_RECORD_DETAIL';
// export const EDIT_DAILY_RECORD_DETAIL = 'EDIT_DAILY_RECORD_DETAIL';
// export const DELETE_DAILY_RECORD_DETAIL = 'DELETE_DAILY_RECORD_DETAIL';
// export const SET_DAILY_RECORD = 'SET_DAILY_RECORD';

// interface SetDailyRecord {
//     type: typeof SET_DAILY_RECORD,
//     payload: IDailyRecord[]
// }

// interface AddDailyRecordDetailAction {
//     type: typeof ADD_DAILY_RECORD_DETAIL,
//     payload: IDailyRecordDetail
// }
// interface EditDailyRecordDetailAction {
//     type: typeof EDIT_DAILY_RECORD_DETAIL,
//     payload: IDailyRecordDetail
// }
// interface DeleteDailyRecordDetailAction {
//     type: typeof DELETE_DAILY_RECORD_DETAIL,
//     payload: {
//         recordUUID: string,
//         recordDetailUUID: string
//     }
// }
// export type DailyRecordActionTypes = SetDailyRecord | AddDailyRecordDetailAction | EditDailyRecordDetailAction | DeleteDailyRecordDetailAction