import { TaskRepository } from "../../domain/repository/TaskRepository";

export class UpdateTask {
	private readonly taskRepository: TaskRepository;

	constructor(taskRepository: TaskRepository) {
		this.taskRepository = taskRepository;
	}

	async execute(taskName: string): Promise<void | null> {
		const task = await this.taskRepository.findOne(taskName);
		await this.taskRepository.updateOne(task);
	}
}
