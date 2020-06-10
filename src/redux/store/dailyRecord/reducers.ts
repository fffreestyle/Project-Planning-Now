import moment from "moment";
import {
    IDailyRecordState,
    DailyRecordActionTypes,
    SET_DAILY_RECORD,
    ADD_DAILY_RECORD_DETAIL,
    EDIT_DAILY_RECORD_DETAIL,
    DELETE_DAILY_RECORD_DETAIL,
    IDailyRecord
} from "./types";
import { range, props } from "ramda";
import { v4 as uuidv4 } from "uuid";
const weekDay = range(0, 7).map((day) => moment().day(day));
const records = weekDay.map((day): IDailyRecord => {
    return {
        recordUUID: uuidv4(),
        date: day.toDate(),
        recordItems: []
    }
})
const initialState: IDailyRecordState = {
    dailyRecords: records
}


export function dailyRecordReducer(state = initialState, action: DailyRecordActionTypes) {
    switch (action.type) {
        case SET_DAILY_RECORD: {
            return {
                dailyRecords: action.payload
            };
        }
        case ADD_DAILY_RECORD_DETAIL: {
            const newDailyRecords = state.dailyRecords.map((dailyRecord) => {
                if (dailyRecord.recordUUID === action.payload.recordUUID) {
                    return {
                        ...dailyRecord,
                        recordItems: dailyRecord.recordItems.concat(action.payload)
                    }
                }
                return dailyRecord;
            })
            return {
                ...state,
                dailyRecords: newDailyRecords
            }
        }
        case EDIT_DAILY_RECORD_DETAIL: {
            const newDailyRecords = state.dailyRecords.map((dailyRecord) => {
                if (dailyRecord.recordUUID === action.payload.recordUUID) {
                    return {
                        ...dailyRecord,
                        recordItems: dailyRecord.recordItems
                            .filter((item) => item.recordDetailUUID !== action.payload.recordDetailUUID)
                            .concat(action.payload)
                    }
                }
                return dailyRecord;
            })
            return {
                ...state,
                dailyRecords: newDailyRecords
            }
        }
        case DELETE_DAILY_RECORD_DETAIL: {
            const newDailyRecords = state.dailyRecords.map((dailyRecord) => {
                if (dailyRecord.recordUUID === action.payload.recordUUID) {
                    return {
                        ...dailyRecord,
                        recordItems: dailyRecord.recordItems
                            .filter((item) => item.recordDetailUUID !== action.payload.recordDetailUUID)
                    }
                }
                return dailyRecord;
            })
            return {
                ...state,
                dailyRecords: newDailyRecords
            }
        }
        default: {
            return state;
        }
    }
}