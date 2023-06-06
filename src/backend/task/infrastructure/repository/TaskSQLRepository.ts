import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repository/TaskRepository";

export class TaskSQLRepository implements TaskRepository {
	private readonly tasks: Array<Task | null>;

	constructor() {
		this.tasks = [];
	}

	async findOne(taskName: string): Promise<Task | null> {
		throw new Error("Method not implemented.");
	}

	async save(task: Task): Promise<void> {
		throw new Error("Method not implemented.");
	}

	async getAll(): Promise<Task[]> {
		throw new Error("Method not implemented.");
	}
}
