import { TaskRepository } from "../../domain/repository/TaskRepository";

export class DeleteTask {
	private readonly taskRepository: TaskRepository;

	constructor(taskRepository: TaskRepository) {
		this.taskRepository = taskRepository;
	}

	async eliminate(taskName: string): Promise<void> {
		if (!taskName) {
			throw new Error("Invalid taskName");
		}
		try {
			await this.taskRepository.eliminateOne(taskName);
			// eslint-disable-next-line no-console
			console.log(`*---- Task deleted ----*
        	Task Name: ${taskName}`);
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error(`Error deleting task: ${err}`);
		}
	}
}
