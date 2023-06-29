import { GetAllTask } from "../../../src/backend/task/application/use-cases/GetAllTask";
import { Task } from "../../../src/backend/task/domain/entities/Task";
import { TaskRepository } from "../../../src/backend/task/domain/repository/TaskRepository";
import { STATUS, Status } from "../../../src/backend/task/domain/value-object/Status";

test("the method retrieves() returns all the tasks successfully", async () => {
	const mockTaskRepository: TaskRepository = {
		save: jest.fn(),
		findOne: jest.fn(),
		eliminateOne: jest.fn(),
		getAll: jest
			.fn()
			.mockResolvedValue([
				new Task(
					"1",
					"Sleep",
					"Lay down in the bed",
					new Status(STATUS.PENDING),
					"User X",
					new Date(),
					null
				),
				new Task(
					"2",
					"Clean",
					"Clean the entire house",
					new Status(STATUS.ON_GOING),
					"User Y",
					new Date(),
					null
				),
				new Task("3", "Study", "Study Jest", new Status(STATUS.DONE), "User W", new Date(), null),
			]),
		updateOne: jest.fn(),
	};
	const getAllTask = new GetAllTask(mockTaskRepository);
	const tasks = await getAllTask.retrieve();
	expect(tasks).toHaveLength(3);
	expect(tasks[0]?.taskName).toBe("Sleep");
	expect(tasks[1]?.taskName).toBe("Clean");
	expect(tasks[2]?.taskName).toBe("Study");
});

test("when non task has been created, it returns an empty array", async () => {
	const mockTaskRepository: TaskRepository = {
		save: jest.fn(),
		findOne: jest.fn(),
		eliminateOne: jest.fn(),
		getAll: jest.fn().mockResolvedValue([]),
		updateOne: jest.fn(),
	};
	const getAllTask = new GetAllTask(mockTaskRepository);
	const tasks = await getAllTask.retrieve();
	expect(tasks).toHaveLength(0);
});

test("when the taskRepository throws an error, the retrieve() method does the same", async () => {
	const mockTaskRepository: TaskRepository = {
		save: jest.fn(),
		findOne: jest.fn(),
		eliminateOne: jest.fn(),
		getAll: jest.fn().mockRejectedValue(new Error("Error in retrieving tasks")),
		updateOne: jest.fn(),
	};
	const getAllTask = new GetAllTask(mockTaskRepository);
	await expect(getAllTask.retrieve()).rejects.toThrowError("Error in retrieving tasks");
});
