/* eslint-disable*/
import { DataTypes, Model, Sequelize } from "sequelize";

import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repository/TaskRepository";
import { STATUS, Status } from "../../domain/value-object/Status";
import { error } from "console";

class TaskModel extends Model {
	public id!: string;
	public taskName!: string;
	public taskDescription!: string;
	public status!: STATUS;
	public userTaskCreator!: string;
	public startDate!: Date;
	public endDate!: Date | null;
  }
  
  export class TaskMySQLRepository implements TaskRepository {
	private sequelize!: Sequelize;
	private TaskModel!: typeof TaskModel;
  
	constructor() {
	  this.initialize();
	}
  
	private initialize(): void {
	  this.sequelize = new Sequelize("devTeam", "root", "root", {
		host: "localhost",
		dialect: "mysql",
	  });
  
	  this.TaskModel = TaskModel.init(
		{
		  id: {
			type: DataTypes.STRING,
			primaryKey: true,
			autoIncrement: false,
			allowNull: false
		  },
		  taskName: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true
		  },
		  taskDescription: {
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
			allowNull: true,
		  }
		},
		{
		  sequelize: this.sequelize,
		  modelName: "Task",
		  tableName: "tasks",
		  timestamps: false
		}
	  );
  
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
		const exists = await this.TaskModel.findOne({ where: { taskName : task.taskName } });
		if (exists) {
			console.error("Task already exists");
			return
			
		}
		const taskDTO = task.toDTO();
		console.log("TASK CREATED: ", taskDTO);
		await this.TaskModel.create(taskDTO);

	}

	async getAll(): Promise<Array<Task | null>> {
		const tasks = await this.TaskModel.findAll();

		return tasks.map((task) => this.createTaskFromModel(task));
	}

	async findOne(name: string): Promise<Task | null> {
		const task = await this.TaskModel.findOne({ where: { taskName : name } });

		if (task) {
			return this.createTaskFromModel(task);
		}

		return null;
	}

	async eliminateOne(name: string): Promise<void> {
		await this.TaskModel.destroy({ where: { taskName : name } });
	}

	async updateOne(name: string, updatedTask: Task | null): Promise<void | null> {
		if (!updatedTask) {
		  throw new Error("Task is null");
		}
	  
		const existingTask = await this.TaskModel.findOne({ where: { taskName : name } });
	  
		if (!existingTask) {
		  throw new Error("Task not found");
		}
	  
		const taskDTO = updatedTask.toDTO();
	  
		await existingTask.update(taskDTO);
		console.log("TASK UPDATED: ", taskDTO);
	  }
	  
	  

	private createTaskFromModel(taskModel: TaskModel): Task {
		return new Task(
			taskModel.id,
			taskModel.taskName,
			taskModel.taskDescription,
			new Status(taskModel.status),
			taskModel.userTaskCreator,
			taskModel.startDate,
			null
		);
	}
}
