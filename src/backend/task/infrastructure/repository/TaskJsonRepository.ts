/* eslint-disable */
import { Config, JsonDB } from "node-json-db";

import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repository/TaskRepository";
import { STATUS, Status } from "../../domain/value-object/Status";

export class TaskJsonRepository implements TaskRepository {
	private db!: JsonDB;
	private readonly outputFile: string;

	constructor() {
		this.outputFile = "\DB";
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

	async save(task: Task): Promise < void | null > {

	try {
		const dbData = await this.db.getData(this.outputFile);
		const tasks = dbData.tasks || []
		tasks.push(task)
		this.db.push(this.outputFile, { tasks })

	} catch (error) {
		console.error("Failed to save task: ", error);
	}
	}

	async getAll(): Promise < Task[] > {
	try {
		const dbData = await this.db.getData(this.outputFile)
		const tasksData = dbData.tasks || [];
		const tasks: Task[] = []
		// console.log(dbData.tasks.lenght);
		// console.log(dbData.lenght);
		// console.log(tasksData.lenght);
		
		
		tasksData.forEach((task: { id: string; taskName: string; taskDescription: string; status: STATUS; userTaskCreator: string; startDate: Date; endDate: null | undefined; }) => 
			tasks.push(new Task(task.id, task.taskName, task.taskDescription, new Status(task.status), task.userTaskCreator, task.startDate, task.endDate)))
			this.db.push(this.outputFile, { tasks })
			return tasks;
	} catch(error) {
		console.error("Failed to retrieve tasks: ", error);
		return [];
	}
	}

	async findOne(taskName: string): Promise < Task | null > {

	const dbData = await this.db.getData(this.outputFile);
	const tasksData = dbData.tasks || []

	const task = tasksData.find((task: { taskName: string; }) => task.taskName === taskName)
	const foundTask = new Task(task.id, task.taskName, task.taskDescription, new Status(task.status), task.userTaskCreator, task.startDate, task.endDate)

	return foundTask;
	}

	async eliminateOne(taskName: string): Promise < void | null > {
	try {
		const dbData = await this.db.getData(this.outputFile);
		const tasks = dbData.tasks || []

		const taskIndexToDelete = tasks.findIndex((task: { taskName: string; }) => task.taskName === taskName);

		if(taskIndexToDelete !== -1) {
			tasks.splice(taskIndexToDelete, 1);
			this.db.push(this.outputFile, { tasks }, true);
		} else {
			console.error('Task not found:', taskName);
		}
	} catch (error) {
		console.error('Error in deleting the element: ', error);
	}
	}


	async updateOne(taskName: string, updateTask: Task): Promise < void | null > {
		try {

			const dbData = await this.db.getData(this.outputFile);
			const tasks = dbData.tasks || [] 
			// console.log(taskName, updateTask);
			
			const taskIndexToUpdate = tasks.findIndex((task: { taskName: string; }) => task.taskName === taskName);	

			if(taskIndexToUpdate !== -1) {
				tasks.splice(taskIndexToUpdate, 1, updateTask)
				this.db.push(this.outputFile, { tasks }, true);
			} else {
				console.error("Task not found: ", taskName);
			}
		} catch (error) {
			console.error("Error in updating: ", error);	
		}
	}
}
