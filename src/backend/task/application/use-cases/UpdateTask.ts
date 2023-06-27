import { DateGenerator } from "../../../dependencies/DateGenerator";
import { TaskRepository } from "../../domain/repository/TaskRepository";
import { STATUS } from "../../domain/value-object/Status";

export class UpdateTask {
	private readonly taskRepository: TaskRepository;
	private readonly dateGenerator: DateGenerator;

	constructor(taskRepository: TaskRepository, dateGenerator: DateGenerator) {
		this.taskRepository = taskRepository;
		this.dateGenerator = dateGenerator;
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
			if (newStatus === 2) {
				task.endDate = this.dateGenerator.generate();
			}
			task.status.setStatus(newStatus);

			await this.taskRepository.updateOne(taskName, task);
		} else {
			throw new Error(`Task with name ${taskName} not found`);
		}
	}
}
