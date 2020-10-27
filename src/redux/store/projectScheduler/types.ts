export interface IProjectInfo  {
    projectUUID: string | null,
    name: string,
    description: string,
    members: Member[],
    startDate: Date,
    closeDate: Date,
    task: Task[],
}
export interface Task {
    title: string,
    description: string,
    members: Member[],
    startDate: Date,
    closeDate: Date,
    subTask: SubTask[]
}
export interface SubTask {
    title: String,
    members: Member[],
    startDate: Date,
    closeDate: Date,
}
export interface Member {
    id: string,
    email: string,
    nickName: string
}
export interface IDeleteIProjectInfo {
    projectUUID: string
}
export interface IDeleteIProjectInfo {
    projectUUID: string
}
