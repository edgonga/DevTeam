import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repository/UserRepository";

export class UserInMemoryRepository implements UserRepository {
	private readonly users: Array<User | null>;

	constructor() {
		this.users = [];
	}

	async save(user: User): Promise<void> {
		return new Promise((resolve) => {
			this.users.push(user);
			resolve();
		});
	}

	async getAll(): Promise<Array<User | null>> {
		return new Promise((resolve) => {
			resolve(this.users);
		});
	}
}
