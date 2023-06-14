import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repository/UserRepository";
import { Name } from "../../domain/value-objects/Name";
import { Password } from "../../domain/value-objects/Password";

export class CreateUser {
	private readonly userRespository: UserRepository;

	constructor(userRespository: UserRepository) {
		this.userRespository = userRespository;
	}

	async execute(name: string, password: string): Promise<void> {
		try {
			const user = new User(new Name(name), new Password(password));
			await this.userRespository.save(user);
		} catch (err) {
			throw new Error("Failed to create the User");
		}
	}
}
