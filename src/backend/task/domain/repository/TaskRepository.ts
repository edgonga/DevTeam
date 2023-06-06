import { Task } from "../entities/Task";

export interface TaskRepository {
	save(task: Task): Promise<void>;
	getAll(): Promise<Array<Task | null>>;
	findOne(taskName: string): Promise<Task | null>;
}
