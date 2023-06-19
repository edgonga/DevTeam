import { TaskRepository } from "../../domain/repository/TaskRepository";
import { Status } from "../../domain/value-object/Status";

export class UpdateTask {
	private readonly taskRepository: TaskRepository;

	constructor(taskRepository: TaskRepository) {
		this.taskRepository = taskRepository;
	}

	async execute(
		taskName: string,
		newName: string,
		newDescr: string,
		newStatus: Status
	): Promise<void> {
		const task = await this.taskRepository.findOne(taskName);

		if (task) {
			task.taskName = newName;
			task.taskDescription = newDescr;
			task.status.setStatus(newStatus);
			await this.taskRepository.updateOne(taskName, task);
		} else {
			throw new Error(`Task with name ${taskName} not found`);
		}
	}
}
