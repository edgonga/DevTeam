import express, { Request, Response } from "express";

import { CreateTask } from "../../application/use-cases/CreateTask";
import { FindTask } from "../../application/use-cases/FindTask";
import { GetAllTask } from "../../application/use-cases/GetAllTask";
import { TaskRepository } from "../../domain/repository/TaskRepository";
import { CreateTaskController } from "../controllers/CreateTaskController";
import { FindTaskController } from "../controllers/FindTaskController";
import { GetAllTaskController } from "../controllers/GetAllTaskController";
import { TaskInMemoryRepository } from "../repository/TaskInMemoryRepository";
import { TaskMongoDBRepository } from "../repository/TaskMongoDBRepository";

const taskRouter = express.Router();
const db = process.argv[2];

let taskRepository: TaskRepository = new TaskInMemoryRepository();

if (db === "in-memory") {
	taskRepository = new TaskInMemoryRepository();
}

if (db === "mongo") {
	taskRepository = new TaskMongoDBRepository();
}

const createTask = new CreateTask(taskRepository);
const createTaskController = new CreateTaskController(createTask);
taskRouter.post("/task", (req: Request, res: Response) => createTaskController.run(req, res));

const getAllTask = new GetAllTask(taskRepository);
const getAllTaskController = new GetAllTaskController(getAllTask);
taskRouter.get("/getAllTask", (req: Request, res: Response) => getAllTaskController.run(req, res));

const findTask = new FindTask(taskRepository);
const findTaskController = new FindTaskController(findTask);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
taskRouter.get("/findTask", (req: Request, res: Response) => findTaskController.run(req, res));

export { taskRouter };
