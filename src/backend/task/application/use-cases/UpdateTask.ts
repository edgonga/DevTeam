import { TaskRepository } from "../../domain/repository/TaskRepository";
import { STATUS } from "../../domain/value-object/Status";

export class UpdateTask {
	private readonly taskRepository: TaskRepository;

	constructor(taskRepository: TaskRepository) {
		this.taskRepository = taskRepository;
	}

	async execute(name: string, newName: string, newDescr: string, newStatus: STATUS): Promise<void> {
		const task = await this.taskRepository.findOne(name);

		if (task) {
			task.taskName = newName;
			task.taskDescription = newDescr;
			task.status.setStatus(newStatus);
			await this.taskRepository.updateOne(name, task);
		} else {
			throw new Error(`Task with name ${name} not found`);
		}
	}
}
