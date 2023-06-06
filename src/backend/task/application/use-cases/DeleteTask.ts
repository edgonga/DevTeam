import { TaskRepository } from "../../domain/repository/TaskRepository";

export class DeleteTask {
	private readonly taskRepository: TaskRepository;

	constructor(taskRepository: TaskRepository) {
		this.taskRepository = taskRepository;
	}

	eliminate(taskName: string): void {
		this.taskRepository.eliminateOne(taskName);
		// eslint-disable-next-line no-console
		console.log(`*---- Task deleted ----*
        Task Name: ${taskName}`);
	}
}
