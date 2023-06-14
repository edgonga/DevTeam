import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repository/TaskRepository";

export class FindTask {
	private readonly taskRepository: TaskRepository;

	constructor(taskRepository: TaskRepository) {
		this.taskRepository = taskRepository;
	}

	async search(name: string): Promise<Task | null> {
		try {
			const task = await this.taskRepository.findOne(name);

			return task;
		} catch (error) {
			throw new Error(`Failed to search for the task`);
		}
	}
}
