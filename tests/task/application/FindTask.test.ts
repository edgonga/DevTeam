import { FindTask } from "../../../src/backend/task/application/use-cases/FindTask";
import { Task } from "../../../src/backend/task/domain/entities/Task";
import { TaskRepository } from "../../../src/backend/task/domain/repository/TaskRepository";
import { STATUS, Status } from "../../../src/backend/task/domain/value-object/Status";

test("it returns the correct task", async () => {
	const mockTaskRepository: TaskRepository = {
		save: jest.fn(),
		eliminateOne: jest.fn(),
		getAll: jest.fn(),
		findOne: jest
			.fn()
			.mockResolvedValue(
				new Task(
					"1",
					"Sleep",
					"Lay down in the bed",
					new Status(STATUS.PENDING),
					"User X",
					new Date(),
					null
				)
			),
		updateOne: jest.fn(),
	};
	const findTask = new FindTask(mockTaskRepository);
	const task = await findTask.search("Sleep");
	expect(task?.id).toEqual("1");
});

test("when searching for a non-existing task, it returns null", async () => {
	const mockTaskRepository: TaskRepository = {
		save: jest.fn(),
		eliminateOne: jest.fn(),
		getAll: jest.fn(),
		findOne: jest.fn().mockResolvedValue(null),
		updateOne: jest.fn(),
	};
	const findTask = new FindTask(mockTaskRepository);
	const task = await findTask.search("Unicorn");
	expect(task).toBeNull();
});

test("when searching for an invalid task, it returns null", async () => {
	const mockTaskRepository: TaskRepository = {
		save: jest.fn(),
		eliminateOne: jest.fn(),
		getAll: jest.fn(),
		findOne: jest.fn().mockRejectedValue(null),
		updateOne: jest.fn(),
	};
	const findTask = new FindTask(mockTaskRepository);
	await expect(findTask.search("")).rejects.toThrow("Failed to search for the task");
});
