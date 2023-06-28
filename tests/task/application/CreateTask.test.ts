import { DateGenerator } from "../../../src/backend/dependencies/DateGenerator";
import { IDGenerator } from "../../../src/backend/dependencies/IDGenerator";
import { CreateTask } from "../../../src/backend/task/application/use-cases/CreateTask";

test("a task is created properly mocking the taskRepository to reduce its dependency", () => {
	const mockTaskRepository = {
		save: jest.fn(),
		getAll: jest.fn(),
		findOne: jest.fn(),
		eliminateOne: jest.fn(),
        updateOne: jest.fn()
	};
	const createTask = new CreateTask(mockTaskRepository, new IDGenerator, new DateGenerator);
	createTask.execute("Task 1", "Start the project", "Mad Max");
	expect(mockTaskRepository.save).toHaveBeenCalled();
});

test("when taskName is empty string, an error is thrown", () => {
	const mockTaskRepository = {
		save: jest.fn(),
		getAll: jest.fn(),
		findOne: jest.fn(),
		eliminateOne: jest.fn(),
        updateOne: jest.fn()
	};
	const createTask = new CreateTask(mockTaskRepository, new IDGenerator, new DateGenerator);
	expect(() => createTask.execute("", "Start the project", "Mad Max")).toThrowError(
		"Invalid task properties"
	);
});
