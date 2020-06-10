import { combineReducers } from 'redux'
import { dailyRecordReducer } from './dailyRecord/reducers'

 const rootReducer = combineReducers({
    dailyRecord: dailyRecordReducer
})

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;