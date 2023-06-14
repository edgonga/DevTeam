import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repository/TaskRepository";
import { STATUS } from "../../domain/value-object/Status";

export class TaskInMemoryRepository implements TaskRepository {
	private tasks: Array<Task | null>;

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

	async findOne(taskName: string): Promise<Task | null> {
		return new Promise((resolve) => {
			const task = this.tasks.find((task) => task?.taskName === taskName);

			if (task === undefined) {
				resolve(null);
			} else {
				resolve(task);
			}
		});
	}

	async eliminateOne(taskName: string): Promise<void | null> {
		return new Promise((resolve) => {
			this.tasks = this.tasks.filter((task) => task?.taskName !== taskName);
			resolve();
		});
	}

	updateOne(task: Task): void | null {
		task.taskName = newTaskName;
		task.taskDescription = newTaskDescr;

		if (newTaskStatus === 0) {
			task.status.setStatus(STATUS.PENDING);
		}
		if (newTaskStatus === 1) {
			task.status.setStatus(STATUS.ON_GOING);
		}
		if (newTaskStatus === 2) {
			task.status.setStatus(STATUS.DONE);
		}
	}
}
