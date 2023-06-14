import express, { Request, Response } from "express";

import { CreateTask } from "../../application/use-cases/CreateTask";
import { DeleteTask } from "../../application/use-cases/DeleteTask";
import { FindTask } from "../../application/use-cases/FindTask";
import { GetAllTask } from "../../application/use-cases/GetAllTask";
import { UpdateTask } from "../../application/use-cases/UpdateTask";
import { TaskRepository } from "../../domain/repository/TaskRepository";
import { CreateTaskController } from "../controllers/CreateTaskController";
import { DeleteTaskController } from "../controllers/DeleteTaskController";
import { FindTaskController } from "../controllers/FindTaskController";
import { GetAllTaskController } from "../controllers/GetAllTaskController";
import { UpdateTaskController } from "../controllers/UpdateTaskController";
import { TaskInMemoryRepository } from "../repository/TaskInMemoryRepository";
import { TaskMongoDBRepository } from "../repository/TaskMongoDBRepository";
import { TaskMySQLRepository } from "../repository/TaskSQLRepository";

const taskRouter = express.Router();
const db = process.argv[2];

let taskRepository: TaskRepository = new TaskInMemoryRepository();

if (db === "in-memory") {
	taskRepository = new TaskInMemoryRepository();
}

if (db === "mongo") {
	taskRepository = new TaskMongoDBRepository();
}

if (db === "mysql") {
	taskRepository = new TaskMySQLRepository();
}

const createTask = new CreateTask(taskRepository);
const createTaskController = new CreateTaskController(createTask);
taskRouter.post("/task", (req: Request, res: Response) => createTaskController.run(req, res));

const getAllTask = new GetAllTask(taskRepository);
const getAllTaskController = new GetAllTaskController(getAllTask);
taskRouter.get("/getAllTask", (req: Request, res: Response) => getAllTaskController.run(req, res));

const findTask = new FindTask(taskRepository);
const findTaskController = new FindTaskController(findTask);
taskRouter.get("/findTask", (req: Request, res: Response) => findTaskController.run(req, res));

const deleteTask = new DeleteTask(taskRepository);
const deleteTaskController = new DeleteTaskController(deleteTask);
taskRouter.get("/deleteTask", (req: Request, res: Response) => deleteTaskController.run(req, res));

const updateTask = new UpdateTask(taskRepository);
const updateTaskController = new UpdateTaskController(updateTask);
taskRouter.put("/updateTask/:taskName", (req: Request, res: Response) =>
	updateTaskController.run(req, res)
);

export { taskRouter };
