import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repository/TaskRepository";

export class GetAllTask {
	private readonly taskRepository: TaskRepository;

	constructor(taskRepository: TaskRepository) {
		this.taskRepository = taskRepository;
	}

	async retrieve(): Promise<(Task | null)[]> {
		const tasks = await this.taskRepository.getAll();
		// eslint-disable-next-line no-console
		console.log(tasks);

		return tasks;
	}
}
