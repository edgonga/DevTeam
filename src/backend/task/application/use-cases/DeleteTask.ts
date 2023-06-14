import { TaskRepository } from "../../domain/repository/TaskRepository";

export class DeleteTask {
	private readonly taskRepository: TaskRepository;

	constructor(taskRepository: TaskRepository) {
		this.taskRepository = taskRepository;
	}

	async eliminate(name: string): Promise<void> {
		if (!name) {
			throw new Error("Invalid taskName");
		}
		try {
			await this.taskRepository.eliminateOne(name);
			// eslint-disable-next-line no-console
			console.log(`*---- Task deleted ----*
        	Task Name: ${name}`);
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error(`Error deleting task: ${err}`);
		}
	}
}
