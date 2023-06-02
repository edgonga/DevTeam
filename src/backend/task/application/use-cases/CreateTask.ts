import { ID } from "../../../dependencies/IDGenerator";
import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repository/TaskRepository";
import { STATUS, Status } from "../../domain/value-object/Status";

export class CreateTask {
	private readonly taskRepository: TaskRepository;
	private readonly taskID: string

	constructor(taskRepository: TaskRepository) {
		const idGenerator = new ID()
		this.taskID = idGenerator.IDgenerator()
		this.taskRepository = taskRepository;
	}

	execute(name: string, description: string, user: string): void {
		const status = new Status(STATUS.PENDING);

		const task = new Task(this.taskID, name, description, status, user);

		this.taskRepository.save(task);
	}
}
