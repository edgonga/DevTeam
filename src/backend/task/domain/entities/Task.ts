import { Status } from "../value-object/Status";

// properties: id, task_name, task_description, status (enum: pending, on-going, done), user_task_creation

export interface TaskProp {
	readonly id: number;
	taskName: string;
	taskDescription: string;
	status: Status;
	userTaskCreator: string;
}
export class Task implements TaskProp {
	readonly id: number;
	public taskName: string;
	public taskDescription: string;
	public status: Status;
	public userTaskCreator: string;

	constructor(
		id: number,
		taskName: string,
		taskDescription: string,
		status: Status,
		userTaskCreator: string
	) {
		this.id = id;
		this.taskName = taskName;
		this.taskDescription = taskDescription;
		this.status = status;
		this.userTaskCreator = userTaskCreator;
	}
}
