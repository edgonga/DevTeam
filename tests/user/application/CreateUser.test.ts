import { CreateUser } from "../../../src/backend/user/application/use-cases/CreateUser";
import { UserRepository } from "../../../src/backend/user/domain/repository/UserRepository";

test("When creating a new User, the userRepository is activated", () => {
	const mockUserRepository: UserRepository = {
		getAll: jest.fn(),
		save: jest.fn(),
	};
	const createUser = new CreateUser(mockUserRepository);
	createUser.execute("Oliver", "Baske11t");
	// eslint-disable-next-line @typescript-eslint/unbound-method
	expect(mockUserRepository.save).toHaveBeenCalled();
});

test("When creating a new User, the userRepository is activated", () => {
	const mockUserRepository: UserRepository = {
		getAll: jest.fn(),
		save: jest.fn(),
	};
	const createUser = new CreateUser(mockUserRepository);
	const emptyName = "";
	const password = "d4d5d56aa>";
	expect(() => createUser.execute(emptyName, password)).toThrowError();
});
