/* eslint-disable */
import { Config, JsonDB } from "node-json-db";

import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repository/TaskRepository";
import { STATUS, Status } from "../../domain/value-object/Status";

export class TaskJsonRepository implements TaskRepository {
	private db!: JsonDB;
	//private readonly outputFile: string;

	constructor() {
		this.initialize();
		//this.outputFile = outputFile;
	}

	private async initialize(): Promise<void> {
		try {
			// eslint-disable-next-line @typescript-eslint/await-thenable
			this.db = await new JsonDB(new Config("DB", false, true, "/"));
		} catch (error) {
			console.error("Failed to initialize JSON db:", error);
		}
	}

	async save(task: Task): Promise<void | null> {
        await this.db.push("/task[]", task, true);
	}

	async getAll(): Promise<Array<Task | null>> {
		const taskList: Array<Task | null> = [];

		const tasks = await this.db.getData(this.outputFile);

		tasks.forEach((task: { id: string; name: string; description: string; status: STATUS; userTaskCreator: string; startDate: Date; endDate: null | undefined; }) =>
			taskList.push(
				new Task(
					task.id,
					task.name,
					task.description,
					new Status(task.status),
					task.userTaskCreator,
					task.startDate,
					task.endDate
				)
			)
		);

		return tasks;
	}

	async findOne(taskName: string): Promise<Task | null> {
		

		const tasks = await this.db.getData(this.outputFile);

        const task = tasks.find((task: { name: string; }) => task.name === taskName)
        const taskObject = new Task(
            task.id,
            task.name,
            task.description,
            new Status(task.status),
            task.userTaskCreator,
            task.startDate,
            task.endDate
        )

        return taskObject;

	}

	async eliminateOne(taskName: string): Promise<void | null> {
		try {
            const taskIndexToDelete = await this.db.getIndex(this.outputFile, taskName);
            await this.db.delete(this.outputFile[taskIndexToDelete])
        } catch (error) {
            console.error('Error in deleting the element: ', error)
        }

        
	}

	async updateOne(taskID: string, task: Task | null): Promise<void | null> {
		const taskIndexToUpdate = await this.db.getIndex(this.outputFile, taskID);
        await this.db.push(this.outputFile[taskIndexToUpdate], task, true)
	}
}
