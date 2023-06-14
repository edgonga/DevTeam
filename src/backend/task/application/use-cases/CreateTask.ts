import { CurrentDate } from "../../../dependencies/DateGenerator";
import { IDGenerator } from "../../../dependencies/IDGenerator";
import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repository/TaskRepository";
import { STATUS, Status } from "../../domain/value-object/Status";

export class CreateTask {
	private readonly taskRepository: TaskRepository;
	private readonly idGenerator: IDGenerator;

	constructor(taskRepository: TaskRepository, idGenerator: IDGenerator) {
		this.taskRepository = taskRepository;
		this.idGenerator = idGenerator;
	}

	execute(name: string, description: string, user: string): void {
		const taskID = this.idGenerator.generate();

		const dateGenerator = new CurrentDate();
		const startDate = dateGenerator.date;
		const status = new Status(STATUS.PENDING);

		const task = new Task(taskID, name, description, status, user, startDate);

		this.taskRepository.save(task);
	}
}
