/* eslint-disable @typescript-eslint/member-ordering */
import { Collection, MongoClient } from "mongodb";

import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repository/UserRepository";

export class UserMongoDBRespository implements UserRepository {
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
		const uri = process.env.MONGO_URI ?? "mongodb://localhost:27017/";
		const dbName = "devTeam";
		const collectionName = "users";

		const client = await MongoClient.connect(uri);
		const db = client.db(dbName);
		const collection = db.collection(collectionName);

		return collection;
	}

	async save(user: User): Promise<void> {
		if (!this.collection) {
			throw new Error("MongoDB collection is not initialized");
		}
		const exists = await this.collection.findOne({ name: user.name });
		if (exists) {
			console.error("Task already exists");

			return;
		}
		const userDTO = user.name;
		console.log("TASK CREATED: ", userDTO);
		await this.collection.insertOne(userDTO);
	}
}
