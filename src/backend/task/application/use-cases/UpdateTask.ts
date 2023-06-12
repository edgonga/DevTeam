import { TaskRepository } from "../../domain/repository/TaskRepository";
import { Status } from "../../domain/value-object/Status";

export class UpdateTask {
	private readonly taskRepository: TaskRepository;

	constructor(taskRepository: TaskRepository) {
		this.taskRepository = taskRepository;
	}

	async execute(
		taskName: string,
		newTaskName: string,
		newTaskDescr: string,
		newTaskStatus: Status
	): Promise<void> {
		const task = await this.taskRepository.findOne(taskName);

		if (task) {
			task.taskName = newTaskName;
			task.taskDescription = newTaskDescr;
			task.status = newTaskStatus;

			await this.taskRepository.updateOne(task);
		} else {
			throw new Error(`Task with name ${taskName} not found`);
		}
	}
}
