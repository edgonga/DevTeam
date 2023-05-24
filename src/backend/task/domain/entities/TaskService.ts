/* eslint-disable */

import { IDService } from "../../../dependencies/IDService"
import { Status } from "../value-object/Status"

export interface TaskService {
    readonly idService: IDService
    taskName: string
    taskDescription: string
    status: Status
    userTaskCreator: string
}