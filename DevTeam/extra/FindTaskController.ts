// /* eslint-disable */
// import { Request, Response } from "express";

// import { FindTask } from "../../../../src/backend/task/application/use-cases/FindTask";
// import { TaskRepository } from "../../../../src/backend/task/domain/repository/TaskRepository";
// import { FindTaskController } from "../../../../src/backend/task/infrastructure/controllers/FindTaskController";
// import { Task } from "../../../../src/backend/task/domain/entities/Task";
// import { STATUS, Status } from "../../../../src/backend/task/domain/value-object/Status";

// const mockTaskRepository: TaskRepository = {
//     save: jest.fn(),
//     findOne: jest.fn(),
//     eliminateOne: jest.fn(),
//     getAll: jest.fn(),
//     updateOne: jest.fn(),
// };

// test("test successful search", async () => {
// 	const findTask = new FindTask(mockTaskRepository);
// 	const findTaskController = new FindTaskController(findTask);
// 	const req = { body: { name: "task1" } } as Request;
// 	const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
// 	jest.spyOn(mockTaskRepository, "findOne").mockResolvedValueOnce(new Task("task1", "gym", "20 min", new Status(STATUS.PENDING), "Trainer", new Date(), null) );

// 	await findTaskController.run(req, res);

// 	expect(res.status).toHaveBeenCalledWith(200);
// 	expect(res.json).toHaveBeenCalledWith({ name: "task1" });
// });

// test('test_empty_response', async () => {
//     const findTask = new FindTask(mockTaskRepository);
//     const findTaskController = new FindTaskController(findTask);
//     const req = { body: { name: 'task1' } } as Request;
//     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
//     jest.spyOn(mockTaskRepository, 'findOne').mockResolvedValueOnce(null);

//     await findTaskController.run(req, res);

//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.json).toHaveBeenCalledWith({ error: 'Task not found' });
//   });
