import { TaskRepository } from "../../domain/repository/TaskRepository";
import { Status } from "../../domain/value-object/Status";

export class UpdateTask {
	private readonly taskRepository: TaskRepository;

	constructor(taskRepository: TaskRepository) {
		this.taskRepository = taskRepository;
	}

	async execute(
		name: string,
		newTaskName: string,
		newTaskDescr: string,
		newTaskStatus: Status
	): Promise<void> {
		const task = await this.taskRepository.findOne(name);

		if (task) {
			task.taskName = newTaskName;
			task.taskDescription = newTaskDescr;
			task.status = newTaskStatus;
			console.log(task.taskName, "   ", task.taskDescription);
			await this.taskRepository.updateOne(name, task);
		} else {
			throw new Error(`Task with name ${name} not found`);
		}
	}
}
