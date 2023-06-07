/* eslint-disable */
import { TaskRepository } from "../../domain/repository/TaskRepository";
import { Task } from "../../domain/entities/Task";
import { MongoClient, Collection } from "mongodb";

export class TaskMongoDBRepository implements TaskRepository {
<<<<<<< Updated upstream
	private readonly tasks: Array<Task | null>;
	
	constructor() {
		this.tasks = []
	}

	async save(): Promise<void> {
		throw new Error("Method not implemented.");
	}
=======
  private collection: Collection | null = null;
>>>>>>> Stashed changes

  constructor() {
    this.connectToMongo().then((collection) => {
      this.collection = collection;
    });
  }

  private async connectToMongo(): Promise<Collection> {
    const uri = "mongodb://localhost:27001/";
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
}
