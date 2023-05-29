import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repository/TaskRepository";

export class TaskInMemoryRepository implements TaskRepository {
	private readonly tasks: Array<Task | null>;

	constructor() {
		this.tasks = [];
	}

	async save(task: Task): Promise<void> {
		return new Promise((resolve) => {
			this.tasks.push(task);
			resolve();
		});
	}

	async getAll(): Promise<Array<Task | null>> {
		return new Promise((resolve) => {
			resolve(this.tasks);
		});
	}
}
