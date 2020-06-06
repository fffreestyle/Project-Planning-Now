export type DailyRecordModel = {
    recordUUID: string,
    date: Date,
    recordItems: DailyRecordDetailModel[]
}
export type DailyRecordDetailModel = {
    title: string,
    description: string,
    projectUUID?: string,
    startTime: Date,
    endTime: Date,
    createTime: Date
}
export type ModifyDailyRecordDetailModel = DailyRecordDetailModel & { index?: number }