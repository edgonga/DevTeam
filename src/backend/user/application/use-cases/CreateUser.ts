import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repository/UserRepository";
import { Name } from "../../domain/value-objects/Name";
import { Password } from "../../domain/value-objects/Password";

export class CreateUser {
	private readonly userRespository: UserRepository;
	private repos = "";

	constructor(userRespository: UserRepository) {
		this.userRespository = userRespository;
	}

	execute(name: string, password: string, repo: string): void {
		try {
			const user = new User(new Name(name), new Password(password));
			this.userRespository.save(user);
			this.repos = repo;
		} catch (err) {
			console.log(err);

			throw new Error("Failed to create the User");
		}
	}
}

export default { CreateUser };
