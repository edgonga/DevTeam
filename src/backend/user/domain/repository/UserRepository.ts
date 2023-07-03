import { User } from "../entities/User";

export interface UserRepository {
	save(user: User): Promise<void>;
	getAll(): Promise<Array<User | null>>;
}
