/* eslint-disable */

import { Request, Response } from "express";

import { DateGenerator } from "../../../../src/backend/dependencies/DateGenerator";
import { IDGenerator } from "../../../../src/backend/dependencies/IDGenerator";
import { CreateTask } from "../../../../src/backend/task/application/use-cases/CreateTask";
import { TaskRepository } from "../../../../src/backend/task/domain/repository/TaskRepository";
import { CreateTaskController } from "../../../../src/backend/task/infrastructure/controllers/CreateTaskController";

test("run method of CreateTaskController returns a 200 status code when a valid request is made", () => {
	const mockTaskRepository: TaskRepository = {
		save: jest.fn(),
		findOne: jest.fn(),
		eliminateOne: jest.fn(),
		getAll: jest.fn(),
		updateOne: jest.fn(),
	};
    
    const mockRequest = {
		body: {
			name: "Task 1",
			description: "Description 1",
			user: "User 1",
		},
	} as unknown as Request;
	const mockResponse = {
		sendStatus: jest.fn(),
	} as unknown as Response;

	const createTask = new CreateTask(mockTaskRepository, new IDGenerator(), new DateGenerator());
	const createTaskController = new CreateTaskController(createTask);

	createTaskController.run(mockRequest, mockResponse);

	expect(mockResponse.sendStatus).toHaveBeenCalledWith(200);
});

test("Tests that execute method is called with correct arguments", () => {
	const mockTaskRepository: TaskRepository = {
		save: jest.fn(),
		findOne: jest.fn(),
		eliminateOne: jest.fn(),
		getAll: jest.fn(),
		updateOne: jest.fn(),
	};

	const idGenerator = new IDGenerator();
	const dateGenerator = new DateGenerator();
	const createTask = new CreateTask(mockTaskRepository, idGenerator, dateGenerator);
	const executeSpy = jest.spyOn(createTask, "execute");
	const createTaskController = new CreateTaskController(createTask);
	const req = {
		body: { name: "testName", description: "testDescr", user: "testUser" },
	} as unknown as Request;

	const res: Response = { sendStatus: jest.fn() } as unknown as Response;
	createTaskController.run(req, res);

	expect(executeSpy).toHaveBeenCalledWith("testName", "testDescr", "testUser");
});