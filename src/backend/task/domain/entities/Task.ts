/* eslint-disable */

import User from "../../../user/domain/entities/User"
import { TaskService } from "./TaskService"
import { Status } from "../value-object/Status"
import { IDService } from "../../../dependencies/IDService"

// properties: id, task_name, task_description, status (enum: pending, on-going, done), user_task_creation

export class Task implements TaskService {
    readonly id: IDService
    public taskName: string
    public taskDescription: string
    public status: Status
    public userTaskCreator: string
    

    constructor(id: IDService, taskName: string, taskDescription: string, status: Status, userTaskCreator: string) {
        this.id = id
        this.taskName = taskName
        this.taskDescription = taskDescription
        this.status = status
        this.userTaskCreator = userTaskCreator
    }
}