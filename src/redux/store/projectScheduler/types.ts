export interface IProjectInfo  {
    projectUUID: string,
    name: string,
    description: string,
    members: Member[],
    task: Task[],
}
export interface Task {
    title: string,
    description: string,
    members: Member[],
    startWeek: Number,
    closeWeek: Number,
    subTask: SubTask[]
}
export interface SubTask {
    title: String,
    members: Member[],
    startWeek: Number,
    closeWeek: Number
}
export interface Member {
    id: string,
    email: string,
    nickName: string
}
export interface IDeleteIProjectInfo {
    projectUUID: string
}