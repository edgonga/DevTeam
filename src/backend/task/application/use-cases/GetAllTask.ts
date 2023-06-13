import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repository/TaskRepository";

export class GetAllTask {
	private readonly taskRepository: TaskRepository;

	constructor(taskRepository: TaskRepository) {
		this.taskRepository = taskRepository;
	}

	public async retrieve(): Promise<(Task | null)[]> {
		const tasks = await this.taskRepository.getAll();

		return tasks;
	}
}
