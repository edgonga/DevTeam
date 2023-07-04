/* eslint-disable */

import { Request, Response } from "express";

import { DeleteTask } from "../../../../src/backend/task/application/use-cases/DeleteTask";
import { TaskRepository } from "../../../../src/backend/task/domain/repository/TaskRepository";
import { DeleteTaskController } from "../../../../src/backend/task/infrastructure/controllers/DeleteTaskController";

test("run method of DeleteTaskController returns a 200 status code when a valid request is made", () => {
	const mockTaskRepository: TaskRepository = {
		save: jest.fn(),
		findOne: jest.fn(),
		eliminateOne: jest.fn(),
		getAll: jest.fn(),
		updateOne: jest.fn(),
	};
    
    const mockRequest = {
		body: {
			name: "Task 1"
		},
	} as unknown as Request;
	const mockResponse = {
		sendStatus: jest.fn(),
	} as unknown as Response;

	const deleteTask = new DeleteTask(mockTaskRepository);
	const deleteTaskController = new DeleteTaskController(deleteTask);

	deleteTaskController.run(mockRequest, mockResponse);

	expect(mockResponse.sendStatus).toHaveBeenCalledWith(200);
});

// test('handles and logs errors thrown by DeleteTask', async () => {
//     const mockTaskRepository: TaskRepository = {
// 		save: jest.fn(),
// 		findOne: jest.fn(),
// 		eliminateOne: jest.fn(),
// 		getAll: jest.fn(),
// 		updateOne: jest.fn(),
// 	};
//     const deleteTask = new DeleteTask(mockTaskRepository);
//     const deleteTaskController = new DeleteTaskController(deleteTask);
//     const consoleSpy = jest.spyOn(console, 'error');
//     const error = new Error('Error deleting task');
//     jest.spyOn(deleteTask, 'eliminate').mockRejectedValueOnce(error);

//     const req = { body: {
//                 name: "Minder"
//             } } as Request; 
//     const res = { sendStatus: jest.fn() } as unknown as Response;

//     await deleteTaskController.run(req, res);

//     expect(consoleSpy).toHaveBeenCalledWith(`Error deleting task: ${error}`);
//   });

// test('should throw an error when task name is not provided', () => {
//     const mockTaskRepository: TaskRepository = {
// 		save: jest.fn(),
// 		findOne: jest.fn(),
// 		eliminateOne: jest.fn(),
// 		getAll: jest.fn(),
// 		updateOne: jest.fn(),
// 	};
//     const deleteTask = new DeleteTask(mockTaskRepository);
//     const deleteTaskController = new DeleteTaskController(deleteTask);
//     const req = { body: {
//         name: "Minder"
//     } } as Request;
//     const res = { sendStatus: jest.fn() } as unknown as Response;
    
//     deleteTask.eliminate = jest.fn().mockRejectedValue(new Error('Error during task elimination'))
//     deleteTaskController.run(req, res)
//     expect(deleteTask.eliminate).toHaveBeenCalledWith("Minder");
//     expect(res.sendStatus).toHaveBeenCalledWith(500)
// });

// test('test_no_task_name_provided', () => {
//     const mockTaskRepository: TaskRepository = {
// 		save: jest.fn(),
// 		findOne: jest.fn(),
// 		eliminateOne: jest.fn(),
// 		getAll: jest.fn(),
// 		updateOne: jest.fn(),
// 	};
//     const deleteTask = new DeleteTask(mockTaskRepository);
//     const deleteTaskController = new DeleteTaskController(deleteTask);
//     const req = { body: {} } as Request;
//     const res = { sendStatus: jest.fn() } as unknown as Response;

//     expect(() => deleteTaskController.run(req, res)).toThrow('Invalid taskName');
// });