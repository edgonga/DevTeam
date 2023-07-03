import express, { Request, Response } from "express";

import { CreateUser } from "../../application/use-cases/CreateUser";
import { GetAllUsers } from "../../application/use-cases/GetAllUsers";
import { CreateUserController } from "../controllers/CreateUserController";
import { GetAllUsersController } from "../controllers/GetAllUsersController";
import { UserMongoDBRespository } from "../repository/UserMongoDBRespository";

const userRouter = express.Router();
const db = new UserMongoDBRespository();

const createUser = new CreateUser(db);
const createUserController = new CreateUserController(createUser);
userRouter.post("/user", (req: Request, res: Response) => createUserController.run(req, res));

const getAllUsers = new GetAllUsers(db);
const getAllUsersController = new GetAllUsersController(getAllUsers);
userRouter.get("/getAllUsers", (req: Request, res: Response) =>
	getAllUsersController.run(req, res)
);

export { userRouter };
