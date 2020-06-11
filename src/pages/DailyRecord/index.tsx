import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import moment from 'moment'
import { range } from 'ramda'
import WeeklyRecord from './weeklyRecord'
import { IDailyRecord, IDailyRecordState } from '../../redux/store/dailyRecord/types'
import { RootState } from '../../redux/store/index'
import { v4 as uuidv4 } from 'uuid';

const mapState = (state: RootState): IDailyRecordState => (state.dailyRecord);

const connector = connect(mapState);



type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux;

const DailyRecordPage = (props: Props) => {
    return (
        <div>
            <WeeklyRecord></WeeklyRecord>
        </div>
    );
}

export default connector(DailyRecordPage);