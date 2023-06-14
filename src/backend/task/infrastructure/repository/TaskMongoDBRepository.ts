/* eslint-disable*/
import { TaskRepository } from "../../domain/repository/TaskRepository";
import { Task } from "../../domain/entities/Task";
import { MongoClient, Collection } from "mongodb";
import { Console } from "console";
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
    const taskDTO = task.toDTO()
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

  async findOne(taskName: string): Promise<Task | null> {
    if (!this.collection){
      throw new Error("MongoDB collection is not initialazed");
    }

    const task = await this.collection.findOne({"taskName" : taskName});

    return task;
  }

  async eliminateOne(taskName: string): Promise<void> {
    if (!this.collection){
      throw new Error("MongoDB collection is not initialazed");
    }

    this.collection.deleteOne({"taskName" : taskName});
  }

  async updateOne(taskId: string, task: Task | null): Promise<void | null> {
    if (!this.collection) {
      throw new Error("MongoDB collection is not initialized");
    }
  
    if (task === null) {
      throw new Error("Task is null");
    }

    console.log("Task NO updated:", task);
  
    try {
      console.log('taskId ->>>>>>>>>' + taskId)
      const updatedTask = await this.collection.findOneAndUpdate(
        { "taskName": taskId },
        {
          $set: {
            taskName: task.taskName,
            taskDescription: 'hola MUNDO',
            status: task.status,
          },
        }
      );
  
      console.log("Task updated:", updatedTask);
    } catch (error) {
      throw new Error(`Failed to update task: ${error}`);
    }
  }
  
}
