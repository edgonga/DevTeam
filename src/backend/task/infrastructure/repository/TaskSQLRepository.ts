import { DataTypes, Model, Sequelize } from "sequelize";

import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repository/TaskRepository";
import { Status } from "../../domain/value-object/Status";

export class TaskMySQLRepository implements TaskRepository {
	private sequelize!: Sequelize;

	private TaskModel!: typeof Model;

	constructor() {
		this.initialize();
	}

	private initialize(): void {
		this.sequelize = new Sequelize("devTeam", "root", "root", {
			host: "localhost",
			dialect: "mysql",
		});

		this.TaskModel = this.sequelize.define("task", {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			status: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			userTaskCreator: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			startDate: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			endDate: {
				type: DataTypes.DATE,
				allowNull: false,
			},
		});

		this.connectToMySQL();
		console.log("✅ MySQL connected");
	}

	private async connectToMySQL(): Promise<void> {
		try {
			await this.sequelize.authenticate();
			await this.TaskModel.sync();
		} catch (error) {
			console.error("Failed to initialize MySQL connection:", error);
		}
	}

	async save(task: Task): Promise<void> {
		await this.TaskModel.create(task.toDTO());
	}

	async getAll(): Promise<Array<Task | null>> {
		const tasks = await this.TaskModel.findAll();

		return tasks.map((task) => this.createTaskFromModel(task));
	}

	async findOne(name: string): Promise<Task | null> {
		const task = await this.TaskModel.findOne({ where: { name } });

		if (task) {
			return this.createTaskFromModel(task);
		}

		return null;
	}

	async eliminateOne(name: string): Promise<void> {
		await this.TaskModel.destroy({ where: { name } });
	}

	async updateOne(taskId: string, updatedTask: Task | null): Promise<void | null> {
		if (!updatedTask) {
			throw new Error("Task is null");
		}

		await this.TaskModel.update(updatedTask.toDTO(), { where: { id: taskId } });
	}

	private createTaskFromModel(taskModel: any): Task {
		return new Task(
			taskModel.id,
			taskModel.name,
			taskModel.description,
			new Status(taskModel.status),
			taskModel.userTaskCreator,
			taskModel.startDate,
			taskModel.endDate
		);
	}
}
