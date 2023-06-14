import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repository/UserRepository";
import { Name } from "../../domain/value-objects/Name";

export class CreateUser {
	private readonly userRespository: UserRepository;

	constructor(userRespository: UserRepository) {
		this.userRespository = userRespository;
	}

	execute(name: string, password: Buffer): void {
		const user = new User(new Name(name), password);
		this.userRespository.save(user);
	}
}
