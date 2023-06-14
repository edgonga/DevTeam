import { currentDate } from "../../../dependencies/DateGenerator";
import { IDGenerator } from "../../../dependencies/IDGenerator";
import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repository/TaskRepository";
import { STATUS, Status } from "../../domain/value-object/Status";

export class CreateTask {
	private readonly taskRepository: TaskRepository;
	private readonly idGenerator: IDGenerator;
	public startDate: Date;

	constructor(taskRepository: TaskRepository) {
		const idGenerator = new IDGenerator();
		const dateGenerator = new currentDate();
		this.startDate = dateGenerator.date;
		this.taskRepository = taskRepository;
	}

	execute(name: string, description: string, user: string): void | null {
		const status = new Status(STATUS.PENDING);
		const taskID = this.idGenerator.generate();

		const task = new Task(taskID, name, description, status, user, this.startDate);

		this.taskRepository.save(task);
	}
}
