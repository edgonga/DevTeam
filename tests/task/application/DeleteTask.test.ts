import { DeleteTask } from "../../../src/backend/task/application/use-cases/DeleteTask";
import { TaskRepository } from "../../../src/backend/task/domain/repository/TaskRepository";

test("eliminateOne() method is called with the expected parameter", async () => {
	const mockTaskRepository: TaskRepository = {
		save: jest.fn(),
		getAll: jest.fn(),
		findOne: jest.fn(),
		eliminateOne: jest.fn().mockResolvedValue(undefined),
	};
	const deleteTask = new DeleteTask(mockTaskRepository);
	await deleteTask.eliminate("existingTask");
	// eslint-disable-next-line @typescript-eslint/unbound-method
	expect(mockTaskRepository.eliminateOne).toHaveBeenCalledWith("existingTask");
});

test("when an empty taskName is received as parameter, an error is thrown", async () => {
	const mockTaskRepository: TaskRepository = {
		save: jest.fn(),
		getAll: jest.fn(),
		findOne: jest.fn(),
		eliminateOne: jest.fn().mockResolvedValue(undefined),
	};
	const deleteTask = new DeleteTask(mockTaskRepository);
	// eslint-disable-next-line @typescript-eslint/unbound-method
	await expect(deleteTask.eliminate("")).rejects.toThrowError("Invalid taskName");
});
