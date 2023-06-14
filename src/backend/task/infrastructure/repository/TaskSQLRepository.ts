/* eslint-disable*/
import mysql, { Connection } from "mysql";

import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repository/TaskRepository";
import { Status } from "../../domain/value-object/Status";

export class TaskMySQLRepository implements TaskRepository {
	private connection: Connection | null = null;

	constructor() {
		this.initialize();
	}

	private initialize(): void {
		try {
			this.connection = this.connectToMySQL();
			console.log("✅ MySQL connected");
		} catch (error) {
			console.error("Failed to initialize MySQL connection:", error);
		}
	}

	private connectToMySQL(): Connection {
		const config = {
			host: "localhost",
			user: "root",
			password: "root",
			database: "devTeam",
		};

		const connection = mysql.createConnection(config);
		connection.connect();

		return connection;
	}

 	async save(task: Task): Promise<void> {
		if (!this.connection) {
			throw new Error("MySQL connection is not initialized");
		}

		const taskDTO = task.toDTO();
		const query = "INSERT INTO tasks SET ?";
		await this.query(query, taskDTO);
	}

	async getAll(): Promise<Array<Task | null>> {
		if (!this.connection) {
			throw new Error("MySQL connection is not initialized");
		}

		const query = "SELECT * FROM tasks";
		const result = await this.query(query);

		const taskList: Array<Task | null> = [];
		result.forEach((task: any) => {
			const newTask = new Task(
				task.id,
				task.taskName,
				task.taskDescription,
				new Status(task.status),
				task.userTaskCreator,
				task.startDate,
				task.endDate
			);
			taskList.push(newTask);
		});

		return taskList;
	}

	async findOne(taskName: string): Promise<Task | null> {
		if (!this.connection) {
			throw new Error("MySQL connection is not initialized");
		}

		const query = "SELECT * FROM tasks WHERE taskName = ?";
		const result = await this.query(query, [taskName]);

		if (result.length > 0) {
			const task = result[0];

			return new Task(
				task.id,
				task.taskName,
				task.taskDescription,
				new Status(task.status),
				task.userTaskCreator,
				task.startDate,
				task.endDate
			);
		}

		return null;
	}

	async eliminateOne(taskName: string): Promise<void> {
		if (!this.connection) {
			throw new Error("MySQL connection is not initialized");
		}

		const query = "DELETE FROM tasks WHERE taskName = ?";
		await this.query(query, [taskName]);
	}

	async updateOne(taskId: string, task: Task | null): Promise<void | null> {
		if (!this.connection) {
			throw new Error("MySQL connection is not initialized");
		}

		if (task === null) {
			throw new Error("Task is null");
		}

		console.log("Task NOT updated:", task);

		const query = "UPDATE tasks SET taskName = ?, taskDescription = ?, status = ? WHERE id = ?";
		await this.query(query, [task.taskName, task.taskDescription, task.status, taskId]);

		console.log("Task updated");
	}

	private async query(sql: string, values?: any): Promise<any> {
		return new Promise((resolve, reject) => {
			if (!this.connection) {
				reject(new Error("MySQL connection is not initialized"));

				return;
			}

			this.connection.query(sql, values, (error, results) => {
				if (error) {
					reject(error);
				} else {
					resolve(results);
				}
			});
		});
	}
}
