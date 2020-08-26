import { combineReducers } from 'redux'
import { dailyRecordReducer } from './dailyRecord/reducers'
import { projectSchedulerReducer } from './projectScheduler/reducers';

const rootReducer = combineReducers({
    dailyRecord: dailyRecordReducer,
    projectScheduler: projectSchedulerReducer
})

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;