/* eslint-disable @typescript-eslint/member-ordering */
import { DateGenerator } from "../../../dependencies/DateGenerator";
import { IDGenerator } from "../../../dependencies/IDGenerator";
import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repository/TaskRepository";
import { STATUS, Status } from "../../domain/value-object/Status";

export class CreateTask {
	private readonly taskRepository: TaskRepository;
	private readonly idGenerator: IDGenerator;
	private readonly dateGenerator: DateGenerator;

	constructor(
		taskRepository: TaskRepository,
		idGenerator: IDGenerator,
		dateGenerator: DateGenerator
	) {
		this.idGenerator = idGenerator;
		this.taskRepository = taskRepository;
		this.dateGenerator = dateGenerator;
	}

	private async exists(name: string): Promise<boolean> {
		const task = await this.taskRepository.findOne(name);
		if (task) {
			return true;
		}

		return false;
	}

	async execute(name: string, description: string, user: string): Promise<void> {
		const isAnExistingTask = await this.exists(name);

		if (isAnExistingTask) {
			throw new Error(`The task ${name} is already existing`);
		}

		const taskID = this.idGenerator.generate();
		const startDate: Date = this.dateGenerator.generate();
		const status = new Status(STATUS.PENDING);

		const task = new Task(taskID, name, description, status, user, startDate);

		this.taskRepository.save(task);
	}
}
