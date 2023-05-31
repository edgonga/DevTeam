import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repository/UserRepository";

export class UserSQLRepository implements UserRepository {
	private readonly users: Array<User | null>;

	constructor() {
		this.users = [];
	}

	async save(user: User): Promise<void> {
		throw new Error("Method not implemented.");
	}

	async getAll(): Promise<User[]> {
		throw new Error("Method not implemented.");
	}
}
