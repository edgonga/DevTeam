import { Task } from "../../../src/backend/task/domain/entities/Task";
import { STATUS, Status } from "../../../src/backend/task/domain/value-object/Status";

test("a Task is created with all the required parameters", () => {
	const id = "123";
	const taskName = "Cardio gym";
	const taskDescription = "20 minutes running";
	const status = new Status(STATUS.PENDING);
	const userTaskCreator = "Legolas";
	const startDate = new Date();

	const task = new Task(id, taskName, taskDescription, status, userTaskCreator, startDate);

	expect(task.id).toBe(id);
	expect(task.taskName).toBe(taskName);
	expect(task.taskDescription).toBe(taskDescription);
	expect(task.status).toBe(status);
	expect(task.userTaskCreator).toBe(userTaskCreator);
	expect(task.startDate).toBe(startDate);
});

test("if not all the required properties are introduced, an error is thrown", () => {
	const id = "";
	const taskName = "Cardio gym";
	const taskDescription = "20 minutes running";
	const status = new Status(STATUS.PENDING);
	const userTaskCreator = "Legolas";
	const startDate = new Date();

	expect(() => {
		new Task(id, taskName, taskDescription, status, userTaskCreator, startDate);
	}).toThrowError("Invalid task properties");
});

test("end date is set to null correctly", () => {
	const id = "333p";
	const taskName = "Task 1";
	const taskDescription = "Description for Task 1";
	const status = new Status(STATUS.PENDING);
	const userTaskCreator = "User 1";
	const startDate = new Date();

	const task = new Task(id, taskName, taskDescription, status, userTaskCreator, startDate);

	expect(task.endDate).toBe(null);
});
