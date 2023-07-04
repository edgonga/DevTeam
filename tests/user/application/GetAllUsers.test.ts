import { GetAllUsers } from "../../../src/backend/user/application/use-cases/GetAllUsers";
import { User } from "../../../src/backend/user/domain/entities/User";
import { UserRepository } from "../../../src/backend/user/domain/repository/UserRepository";
import { Name } from "../../../src/backend/user/domain/value-objects/Name";
import { Password } from "../../../src/backend/user/domain/value-objects/Password";

test("the method retrieves() returns all the users successfully", async () => {
	const mockUserRepository: UserRepository = {
		save: jest.fn(),
		getAll: jest
			.fn()
			.mockResolvedValue([
				new User(new Name("Hool"), new Password("122223")),
				new User(new Name("Robin"), new Password("r0bn1994")),
				new User(new Name("Treco"), new Password("v7v7")),
			]),
	};
	const getAllUsers = new GetAllUsers(mockUserRepository)
	const users = await getAllUsers.retrieve()
	expect(users).toHaveLength(3);
	expect(users[0]?.name.getName()).toBe("Hool");
	expect(users[1]?.name.getName()).toBe("Robin");
	expect(users[2]?.name.getName()).toBe("Treco");
});

test("when non task has been created, it returns an empty array", async () => {
	const mockUserRepository: UserRepository = {
		save: jest.fn(),
		getAll: jest.fn().mockResolvedValue([]),
	};
	const getAllUsers = new GetAllUsers(mockUserRepository);
	const users = await getAllUsers.retrieve();
	expect(users).toHaveLength(0);
});

test("when the taskRepository throws an error, the retrieve() method does the same", async () => {
	const mockTaskRepository: UserRepository = {
		save: jest.fn(),
		getAll: jest.fn().mockRejectedValue(new Error("Error in retrieving users")),
	};
	const getAllUsers = new GetAllUsers(mockTaskRepository);
	await expect(getAllUsers.retrieve()).rejects.toThrowError("Error in retrieving users");
});
