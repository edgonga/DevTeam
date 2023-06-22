import { TaskRepository } from "../../domain/repository/TaskRepository";
import { STATUS } from "../../domain/value-object/Status";

export class UpdateTask {
	private readonly taskRepository: TaskRepository;

	constructor(taskRepository: TaskRepository) {
		this.taskRepository = taskRepository;
	}

	async execute(
		taskName: string,
		newName: string,
		newDescr: string,
		newStatus: STATUS
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
