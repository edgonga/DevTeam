import { TaskRepository } from "../../domain/repository/TaskRepository";

export class TaskMongoDBRepository implements TaskRepository {
	async save(): Promise<void> {
		throw new Error("Method not implemented.");
	}

	async getAll(): Promise<Task[]> {
		throw new Error("Method not implemented.");
	}
}
