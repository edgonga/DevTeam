import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repository/TaskRepository";
import { STATUS, Status } from "../../domain/value-object/Status";

export class CreateTask {
	private readonly taskRepository: TaskRepository;

	constructor(taskRepository: TaskRepository) {
		this.taskRepository = taskRepository;
	}

	execute(name: string, description: string, user: string): void {
		const status = new Status(STATUS.PENDING);

		const task = new Task(1, name, description, status, user);

		this.taskRepository.save(task);
	}
}
