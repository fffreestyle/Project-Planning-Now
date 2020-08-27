import moment from "moment";
// import {
//     IDailyRecordState,
//     DailyRecordActionTypes,
//     SET_DAILY_RECORD,
//     ADD_DAILY_RECORD_DETAIL,
//     EDIT_DAILY_RECORD_DETAIL,
//     DELETE_DAILY_RECORD_DETAIL,
//     IDailyRecord
// } from "./types";
import { IDailyRecord, IDailyRecordState } from "./types";
import { range, clone } from "ramda";
import { v4 as uuidv4 } from "uuid";
import { createReducer } from "@reduxjs/toolkit";
import { addRecordDetail, editRecordDetail, deleteRecordDetail, getRecords } from "./actions";

const initialState: IDailyRecordState = {
    dailyRecords: []
}

export const dailyRecordReducer = createReducer(initialState, builder =>
    builder
        .addCase(getRecords, (state, action) => {
            const dayDurantion = moment(action.payload.endDate).diff(action.payload.startDate, 'd') + 1;
            const weekDay = range(0, dayDurantion).map((day) => moment(action.payload.startDate).day(day));
            state.dailyRecords = weekDay.map((day): IDailyRecord => {
                return {
                    recordUUID: uuidv4(),
                    date: day.toDate(),
                    recordItems: []
                }
            })
        })
        .addCase(addRecordDetail, (state, action) => {
            const beAddRecord = state
                .dailyRecords
                .find(dailyRecord => dailyRecord.recordUUID === action.payload.recordUUID);
            if (beAddRecord !== undefined) {
                const addingRecordItem = clone(action.payload);
                addingRecordItem.recordDetailUUID = uuidv4();
                beAddRecord.recordItems.push(addingRecordItem);
            }

            // const newDailyRecords = state.dailyRecords.map((dailyRecord) => {
            //     if (dailyRecord.recordUUID === action.payload.recordUUID) {
            //         return {
            //             ...dailyRecord,
            //             recordItems: dailyRecord.recordItems.concat(action.payload)
            //         }
            //     }
            //     return dailyRecord;
            // })
            // return {
            //     ...state,
            //     dailyRecords: newDailyRecords
            // }
        })
        .addCase(editRecordDetail, (state, action) => {
            let beEditRecord = state
                .dailyRecords
                .find(dailyRecord => dailyRecord.recordUUID === action.payload.recordUUID);
            if (beEditRecord !== undefined) {
                const beEditRecordDetailIndex = beEditRecord.recordItems.findIndex(x => x.recordDetailUUID === action.payload.recordDetailUUID)
                beEditRecord.recordItems.splice(beEditRecordDetailIndex, 1, action.payload);
            }
            // const newDailyRecords = state.dailyRecords.map((dailyRecord) => {
            //     if (dailyRecord.recordUUID === action.payload.recordUUID) {
            //         return {
            //             ...dailyRecord,
            //             recordItems: dailyRecord.recordItems
            //                 .filter((item) => item.recordDetailUUID !== action.payload.recordDetailUUID)
            //                 .concat(action.payload)
            //         }
            //     }
            //     return dailyRecord;
            // })
            // return {
            //     ...state,
            //     dailyRecords: newDailyRecords
            // }
        })
        .addCase(deleteRecordDetail, (state, action) => {

            const beEditRecord = state
                .dailyRecords
                .find(dailyRecord => dailyRecord.recordUUID === action.payload.recordUUID);
            if (beEditRecord !== undefined) {
                const beDeleteRecordDetailIndex = beEditRecord.recordItems.findIndex(x => x.recordDetailUUID === action.payload.recordDetailUUID)
                beEditRecord.recordItems.splice(beDeleteRecordDetailIndex, 1);
            }


            // const newDailyRecords = state.dailyRecords.map((dailyRecord) => {
            //     if (dailyRecord.recordUUID === action.payload.recordUUID) {
            //         return {
            //             ...dailyRecord,
            //             recordItems: dailyRecord.recordItems
            //                 .filter((item) => item.recordDetailUUID !== action.payload.recordDetailUUID)
            //         }
            //     }
            //     return dailyRecord;
            // })
            // return {
            //     ...state,
            //     dailyRecords: newDailyRecords
            // }
        })
)

// export function dailyRecordReducer(state = initialState, action: DailyRecordActionTypes) {
//     switch (action.type) {
//         case SET_DAILY_RECORD: {
//             return {
//                 dailyRecords: action.payload
//             };
//         }
//         case ADD_DAILY_RECORD_DETAIL: {
//             const newDailyRecords = state.dailyRecords.map((dailyRecord) => {
//                 if (dailyRecord.recordUUID === action.payload.recordUUID) {
//                     return {
//                         ...dailyRecord,
//                         recordItems: dailyRecord.recordItems.concat(action.payload)
//                     }
//                 }
//                 return dailyRecord;
//             })
//             return {
//                 ...state,
//                 dailyRecords: newDailyRecords
//             }
//         }
//         case EDIT_DAILY_RECORD_DETAIL: {
//             const newDailyRecords = state.dailyRecords.map((dailyRecord) => {
//                 if (dailyRecord.recordUUID === action.payload.recordUUID) {
//                     return {
//                         ...dailyRecord,
//                         recordItems: dailyRecord.recordItems
//                             .filter((item) => item.recordDetailUUID !== action.payload.recordDetailUUID)
//                             .concat(action.payload)
//                     }
//                 }
//                 return dailyRecord;
//             })
//             return {
//                 ...state,
//                 dailyRecords: newDailyRecords
//             }
//         }
//         case DELETE_DAILY_RECORD_DETAIL: {
//             const newDailyRecords = state.dailyRecords.map((dailyRecord) => {
//                 if (dailyRecord.recordUUID === action.payload.recordUUID) {
//                     return {
//                         ...dailyRecord,
//                         recordItems: dailyRecord.recordItems
//                             .filter((item) => item.recordDetailUUID !== action.payload.recordDetailUUID)
//                     }
//                 }
//                 return dailyRecord;
//             })
//             return {
//                 ...state,
//                 dailyRecords: newDailyRecords
//             }
//         }
//         default: {
//             return state;
//         }
//     }
// }