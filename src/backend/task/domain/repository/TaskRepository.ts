import { Task } from "../entities/Task";

export interface TaskRepository {
	save(task: Task): Promise<void | null>;
	getAll(): Promise<Array<Task | null>>;
	findOne(taskName: string): Promise<Task | null>;
	eliminateOne(taskName: string): Promise<void | null>;
	updateOne(task: Task | null): Promise<void | null>;
}
