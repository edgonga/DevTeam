/* eslint-disable*/
import { TaskRepository } from "../../domain/repository/TaskRepository";
import { Task } from "../../domain/entities/Task";
import { MongoClient, Collection } from "mongodb";
import { Status } from "../../domain/value-object/Status";

export class TaskMongoDBRepository implements TaskRepository {

  private collection: Collection | null = null;

  constructor() {
    this.initialize();
  }


  private async initialize(): Promise<void> {

    try {
      this.collection = await this.connectToMongo();
      console.log("✅ mongo db connected");

    } catch (error) {
      console.error("Failed to initialize MongoDB collection:", error);
    }
  }

  private async connectToMongo(): Promise<Collection> {
    const uri = process?.env.MONGO_URI ?? "mongodb://localhost:27017/";
    const dbName = "devTeam";
    const collectionName = "tasks";

    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    return collection;
  }

  async save(task: Task): Promise<void> {
    if (!this.collection) {
      throw new Error("MongoDB collection is not initialized");
    }
    const taskDTO = task.toDTO();
    console.log("TASK CREATED: ", taskDTO);
    await this.collection.insertOne(taskDTO);
  }

  async getAll(): Promise<Array<Task | null>> {
    if (!this.collection) {
      throw new Error("MongoDB collection is not initialized");
    }
    const taskList: Array<Task | null> = []

    const tasks = await this.collection.find().toArray();

    tasks.forEach(task => taskList.push(new Task(task.id, task.taskName, task.taskDescription, new Status(task.status), task.userTaskCreator, task.startDate, task.endDate)))
    return taskList;
  }

  async findOne(name: string): Promise<Task | null> {
    if (!this.collection) {
      throw new Error("MongoDB collection is not initialazed");
    }

    const task = await this.collection.findOne({ "taskName": name });

    if (task) {
      const foundTask = new Task(task.id, task.taskName, task.taskDescription, new Status(task.status), task.userTaskCreator, task.startDate, task.endDate)
      return foundTask;
    } else {
      console.log("Task not found in the database");
      return null;
    }
  }

  async eliminateOne(name: string): Promise<void> {
    if (!this.collection) {
      throw new Error("MongoDB collection is not initialazed");
    }
    
    const task = await this.collection.findOne({ "taskName": name });

    if(task) {
      this.collection.deleteOne({ "taskName": name });
    } else {
      throw new Error("There is not any Task with this name: " + name)
    }

    
  }

  async updateOne(taskId: string, task: Task | null): Promise<void | null> {
    if (!this.collection) {
      throw new Error("MongoDB collection is not initialized");
    }

    if (!task) {
      throw new Error("Task is null");
    }

    try {
      const updatedTask = await this.collection.findOneAndUpdate(
        { "taskName": taskId },
        {
          $set: {
            taskName: task.taskName,
            taskDescription: task.taskDescription,
            status: task.status.getStatus(),
          },
        }
      );

      console.log("TASK UPDATED:", updatedTask);
    } catch (error) {
      throw new Error(`Failed to update task: ${error}`);
    }
  }
}
