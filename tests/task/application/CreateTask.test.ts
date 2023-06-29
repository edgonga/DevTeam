import { DateGenerator } from "../../../src/backend/dependencies/DateGenerator";
import { IDGenerator } from "../../../src/backend/dependencies/IDGenerator";
import { CreateTask } from "../../../src/backend/task/application/use-cases/CreateTask";
import { Status } from "../../../src/backend/task/domain/value-object/Status";

test("a task is created properly mocking the taskRepository to reduce its dependency", () => {
	const mockTaskRepository = {
		save: jest.fn(),
		getAll: jest.fn(),
		findOne: jest.fn(),
		eliminateOne: jest.fn(),
		updateOne: jest.fn(),
	};
	const mockIDGenerator = {
		generate: jest.fn(() => "mockID"),
	};
	const mockDateGenerator = {
		generate: jest.fn(() => new Date()),
	};
	const createTask = new CreateTask(mockTaskRepository, mockIDGenerator, mockDateGenerator);
	createTask.execute("taskName", "taskDescription", "userTaskCreator");
	expect(mockTaskRepository.save).toHaveBeenCalledWith(
		expect.objectContaining({
			id: "mockID",
			taskName: "taskName",
			taskDescription: "taskDescription",
			status: expect.any(Status),
			userTaskCreator: "userTaskCreator",
			startDate: expect.any(Date),
			endDate: null,
		})
	);
});

test("when taskName is empty string, an error is thrown", () => {
	const mockTaskRepository = {
		save: jest.fn(),
		getAll: jest.fn(),
		findOne: jest.fn(),
		eliminateOne: jest.fn(),
		updateOne: jest.fn(),
	};
	const createTask = new CreateTask(mockTaskRepository, new IDGenerator(), new DateGenerator());
	expect(() => createTask.execute("", "Start the project", "Mad Max")).toThrowError(
		"Invalid task properties"
	);
});
