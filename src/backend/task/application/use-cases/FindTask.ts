import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repository/TaskRepository";

export class FindTask {
	private readonly taskRepository: TaskRepository;

	constructor(taskRepository: TaskRepository) {
		this.taskRepository = taskRepository;
	}

	async search(id: string): Promise<Task | null> {
		try {
			const task = await this.taskRepository.findOne(id);

			return task;
		} catch (error) {
			throw new Error(`Failed to search for the task`);
		}
	}
}
