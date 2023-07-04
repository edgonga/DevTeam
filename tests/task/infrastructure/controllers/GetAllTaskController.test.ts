// /* eslint-disable */

// import { Request, Response } from "express";

// import { GetAllTask } from "../../../../src/backend/task/application/use-cases/GetAllTask";
// import { TaskRepository } from "../../../../src/backend/task/domain/repository/TaskRepository";
// import { GetAllTaskController } from "../../../../src/backend/task/infrastructure/controllers/GetAllTaskController";

// test("run method of GetAllTaskController returns a 200 status code when a valid request is made", () => {
// 	const mockTaskRepository: TaskRepository = {
// 		save: jest.fn(),
// 		findOne: jest.fn(),
// 		eliminateOne: jest.fn(),
// 		getAll: jest.fn(),
// 		updateOne: jest.fn(),
// 	};
    
//     const mockRequest = {
// 		body: {
// 			name: "Task 1"
// 		},
// 	} as unknown as Request;
// 	const mockResponse = {
// 		sendStatus: jest.fn(),
// 	} as unknown as Response;

// 	const getAllTask = new GetAllTask(mockTaskRepository);
// 	const getAllTaskController = new GetAllTaskController(getAllTask);

// 	getAllTaskController.run(mockRequest, mockResponse);

// 	expect(mockResponse.sendStatus).toHaveBeenCalledWith(200);
// });