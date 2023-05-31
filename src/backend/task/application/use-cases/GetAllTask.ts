import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repository/TaskRepository";

export class GetAllTask {
	private readonly taskRepository: TaskRepository;

	constructor(taskRepository: TaskRepository) {
		this.taskRepository = taskRepository;
	}

	async retrieve(): Promise<Array<Task | null>> {
		return await this.taskRepository.getAll();
	}
}
