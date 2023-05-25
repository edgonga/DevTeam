/* eslint-disable */

import { IDService } from "../../../dependencies/IDGenerator"
import { Status } from "../value-object/Status"
import { Task } from "../entities/Task"

export interface TaskService {
    create(): Promise<Task>
    update(dataTask: Task): Promise<void>
}