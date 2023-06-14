import { STATUS, Status } from "../value-object/Status";

// properties: id, task_name, task_description, status (enum: pending, on-going, done), user_task_creation

export interface TaskProp {
	readonly id: string;
	name: string;
	description: string;
	status: Status;
	userTaskCreator: string;
	startDate: Date;
	endDate: null | Date;
}
export class Task implements TaskProp {
	readonly id: string;
	public name: string;
	public description: string;
	public status: Status;
	public userTaskCreator: string;
	readonly startDate: Date;
	public endDate: Date | null;

	constructor(
		id: string,
		name: string,
		description: string,
		status: Status,
		userTaskCreator: string,
		startDate: Date,
		endDate = null
	) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.status = status;
		this.userTaskCreator = userTaskCreator;
		this.startDate = startDate;
		this.endDate = endDate;
		this.validate();
	}

	private validate(): void | Error {
		if (!this.id || !this.name || !this.userTaskCreator) {
			throw new Error("Invalid task properties");
		}
	}

	// eslint-disable-next-line @typescript-eslint/member-ordering
	public toDTO(): {
		id: string;
		name: string;
		description: string;
		status: STATUS;
		userTaskCreator: string;
		startDate: Date;
		endDate: null | Date;
	} {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			status: this.status.getStatus(),
			userTaskCreator: this.userTaskCreator,
			startDate: this.startDate,
			endDate: this.endDate,
		};
	}
}
