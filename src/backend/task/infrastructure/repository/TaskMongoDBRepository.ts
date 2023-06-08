/* eslint-disable*/
import { TaskRepository } from "../../domain/repository/TaskRepository";
import { Task } from "../../domain/entities/Task";
import { MongoClient, Collection } from "mongodb";

export class TaskMongoDBRepository implements TaskRepository {
	
  private collection: Collection | null = null;

  constructor() {
    this.initialize();
  }


  private async initialize(): Promise<void> {

    try {
      this.collection = await this.connectToMongo();
      console.log("mongo db connected");

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

    await this.collection.insertOne(task);
  }  

  async getAll(): Promise<Array<Task | null>> {
    if (!this.collection) {
      throw new Error("MongoDB collection is not initialized");
    }

    const tasks = await this.collection.find().toArray();
    
    return tasks;
  }

  async findOne(taskName: string): Promise<Task | null> {
    
  }

  async eliminateOne(taskName: string): Promise<void> {
    
  }
}
