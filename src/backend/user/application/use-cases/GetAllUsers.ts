import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repository/UserRepository";

export class GetAllUsers {
	private readonly userRepository: UserRepository;

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	public async retrieve(): Promise<(User | null)[]> {
		const users = await this.userRepository.getAll();

		return users;
	}
}
