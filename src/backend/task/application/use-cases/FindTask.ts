import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repository/TaskRepository";

export class FindTask {
	private readonly taskRepository: TaskRepository;

	constructor(taskRepository: TaskRepository) {
		this.taskRepository = taskRepository;
	}

	async search(taskName: string): Promise<Task | null> {
		const task = await this.taskRepository.findOne(taskName);

		return task;
	}
}
