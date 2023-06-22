/* eslint-disable */
import { Config, JsonDB } from "node-json-db";

import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repository/TaskRepository";
import { STATUS, Status } from "../../domain/value-object/Status";
import { statusDone } from "../../../dependencies/DateGenerator";

export class TaskJsonRepository implements TaskRepository {
	private db!: JsonDB;
	private readonly outputFile: string;

	constructor() {
		this.outputFile = "\jsonDB";
		this.initialize();
	}

	private async initialize(): Promise<void> {
		try {
			// eslint-disable-next-line @typescript-eslint/await-thenable
			this.db = await new JsonDB(new Config(this.outputFile, true, true, "/"));
		} catch (error) {
			console.error("Failed to initialize JSON db:", error);
		}
	}

	async save(task: Task): Promise<void | null> {
		

		try {
			const dbDataPromise: Promise<{ tasks: Task[] }> = this.db.getData(this.outputFile);
			const dbData = await dbDataPromise
			const tasks = dbData.tasks || []
			tasks.push(task)

			this.db.push(this.outputFile, tasks, false);
		} catch (error) {
			console.error("Failed to save task: ", error);
			
		}
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
		  const tasks: Promise<Task[]> = this.db.getData(this.outputFile);
	  
		  const taskIndexToDelete = (await tasks).findIndex(task => task.name === taskName);
	  
		  if (taskIndexToDelete !== -1) {
			(await tasks).splice(taskIndexToDelete, 1);
			this.db.push("/tasks", tasks, true);
		  } else {
			console.error('Task not found:', taskName);
		  }
		} catch (error) {
		  console.error('Error in deleting the element: ', error);
		}
	  }
	  

	async updateOne(taskName: string, updateTask: Task): Promise<void | null> {
		try {
			const tasksPromise: Promise<Task[]> = this.db.getData(this.outputFile);
			const tasks: Task[] = await tasksPromise
			const taskIndexToUpdate = tasks.findIndex(task => task?.name === taskName)

			if (taskIndexToUpdate !== -1) {
				tasks.splice(taskIndexToUpdate, 1, updateTask)
				updateTask.endDate = statusDone(updateTask)
				await this.db.push(this.outputFile, tasks, true);
			} else {
				console.error("Task not found: ", taskName);
				
			}
		} catch (error) {
			console.error("Error in updating: ", error);
			
		}
	}
}
