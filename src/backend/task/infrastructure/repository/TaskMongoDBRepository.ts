/* eslint-disable */
import { TaskRepository } from "../../domain/repository/TaskRepository";
import { Task } from "../../domain/entities/Task";

export class TaskMongoDBRepository implements TaskRepository {
	private readonly tasks: Array<Task | null>;
	
	constructor() {
		this.tasks = []
	}
	findOne(taskName: string): Promise<Task | null> {
		throw new Error("Method not implemented.");
	}

	async save(): Promise<void> {
		throw new Error("Method not implemented.");
	}

	async getAll(): Promise<Task[]> {
		throw new Error("Method not implemented.");
	}
}
