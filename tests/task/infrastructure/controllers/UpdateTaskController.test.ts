// /* eslint-disable */

// import { Request, Response } from "express";

// import { UpdateTask } from "../../../../src/backend/task/application/use-cases/UpdateTask";
// import { TaskRepository } from "../../../../src/backend/task/domain/repository/TaskRepository";
// import { UpdateTaskController } from "../../../../src/backend/task/infrastructure/controllers/UpdateTaskController";
// import { DateGenerator } from "../../../../src/backend/dependencies/DateGenerator";

// test("run method of UpdateTaskController returns a 200 status code when a valid request is made", () => {
// 	const mockTaskRepository: TaskRepository = {
// 		save: jest.fn(),
// 		findOne: jest.fn(),
// 		eliminateOne: jest.fn(),
// 		getAll: jest.fn(),
// 		updateOne: jest.fn(),
// 	};
    
//     const mockRequest = {
// 		body: {
//             newName: "Task 2.1",
//             newDescr: "Chain work",
//             newStatus: 1
// 		},
//         params: {
//             name: "Task 1"
//         }
// 	} as unknown as Request;
// 	const mockResponse = {
// 		sendStatus: jest.fn(),
// 	} as unknown as Response;

// 	const updateTask = new UpdateTask(mockTaskRepository, new DateGenerator());
// 	const updateTaskController = new UpdateTaskController(updateTask);

// 	updateTaskController.run(mockRequest, mockResponse);

// 	expect(mockResponse.sendStatus).toHaveBeenCalledWith(200);
// });