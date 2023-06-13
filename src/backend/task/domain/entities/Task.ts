import { Status } from "../value-object/Status";

export interface TaskProp {
	readonly id: string;
	taskName: string;
	taskDescription: string;
	status: Status;
	userTaskCreator: string;
	startDate: Date;
	endDate: null | Date;
}
export class Task implements TaskProp {
	readonly id: string;
	public taskName: string;
	public taskDescription: string;
	public status: Status;
	public userTaskCreator: string;
	readonly startDate: Date;
	public endDate: Date | null;

	constructor(
		id: string,
		taskName: string,
		taskDescription: string,
		status: Status,
		userTaskCreator: string,
		startDate: Date,
		endDate = null
	) {
		this.id = id;
		this.taskName = taskName;
		this.taskDescription = taskDescription;
		this.status = status;
		this.userTaskCreator = userTaskCreator;
		this.startDate = startDate;
		this.endDate = endDate;
		this.validate();
	}

	private validate(): void | Error {
		if (!this.id || !this.taskName || !this.userTaskCreator) {
			throw new Error("Invalid task properties");
		}
	}
}
