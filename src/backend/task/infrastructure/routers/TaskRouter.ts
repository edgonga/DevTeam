import express, { Request, Response } from "express";

import { DateGenerator } from "../../../dependencies/DateGenerator";
import { IDGenerator } from "../../../dependencies/IDGenerator";
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
import { TaskJsonRepository } from "../repository/TaskJsonRepository";
import { TaskMongoDBRepository } from "../repository/TaskMongoDBRepository";
import { TaskMySQLRepository } from "../repository/TaskSQLRepository";

const taskRouter = express.Router();

let taskRepository: TaskRepository;
let repository = " ";

function setTaskRepository(repo: string) {
	if (repo === "json") {
		taskRepository = new TaskJsonRepository();
	}

	if (repo === "mongo") {
		taskRepository = new TaskMongoDBRepository();
	}

	if (repo === "mysql") {
		taskRepository = new TaskMySQLRepository();
	}

	console.log(`${repo} repository created correctly`);
}

function getTaskRepository(): TaskRepository {
	return taskRepository;
}

taskRouter.post("/repository", (req: Request, res: Response) => {
	repository = req.body.selectedRepository;
	setTaskRepository(repository);

	res.status(200);
});

const createTask = new CreateTask(getTaskRepository(), new IDGenerator(), new DateGenerator());
const createTaskController = new CreateTaskController(createTask);
taskRouter.post("/task", (req: Request, res: Response) => createTaskController.run(req, res));

const getAllTask = new GetAllTask(getTaskRepository());
const getAllTaskController = new GetAllTaskController(getAllTask);
taskRouter.get("/getAllTask", (req: Request, res: Response) => getAllTaskController.run(req, res));

const findTask = new FindTask(getTaskRepository());
const findTaskController = new FindTaskController(findTask);
taskRouter.post("/findTask", (req: Request, res: Response) => findTaskController.run(req, res));

const deleteTask = new DeleteTask(getTaskRepository());
const deleteTaskController = new DeleteTaskController(deleteTask);
taskRouter.get("/deleteTask", (req: Request, res: Response) => deleteTaskController.run(req, res));

const updateTask = new UpdateTask(getTaskRepository(), new DateGenerator());
const updateTaskController = new UpdateTaskController(updateTask);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
taskRouter.put("/updateTask/:taskName", (req: Request, res: Response) =>
	updateTaskController.run(req, res)
);

export { repository, taskRouter };
