import { TaskRepository } from "../../domain/repository/TaskRepository";
import { Status } from "../../domain/value-object/Status";

export class UpdateTask {
	private readonly taskRepository: TaskRepository;

	constructor(taskRepository: TaskRepository) {
		this.taskRepository = taskRepository;
	}

	async execute(name: string, newName: string, newDescr: string, newStatus: Status): Promise<void> {
		const task = await this.taskRepository.findOne(name);

		if (task) {
			task.name = newName;
			task.description = newDescr;
			task.status = newStatus;
			await this.taskRepository.updateOne(name, task);
		} else {
			throw new Error(`Task with name ${name} not found`);
		}
	}
}
