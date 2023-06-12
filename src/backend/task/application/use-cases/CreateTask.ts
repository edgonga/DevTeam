import { currentDate } from "../../../dependencies/DateGenerator";
import { ID } from "../../../dependencies/IDGenerator";
import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repository/TaskRepository";
import { STATUS, Status } from "../../domain/value-object/Status";

export class CreateTask {
	private readonly taskRepository: TaskRepository;

	constructor(taskRepository: TaskRepository) {
		this.taskRepository = taskRepository;
	}

	execute(name: string, description: string, user: string): Promise<void> {
		const idGenerator = new ID();
		const taskID = idGenerator.IDgenerator();
		const dateGenerator = new currentDate();
		const startDate = dateGenerator.date;
		const status = new Status(STATUS.PENDING);

		const task = new Task(taskID, name, description, status, user, startDate);

		return this.taskRepository.save(task);
	}
}
