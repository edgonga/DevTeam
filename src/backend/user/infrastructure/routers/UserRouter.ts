import express, { Request, Response } from "express";

import { CreateUser } from "../../application/use-cases/CreateUser";
import { CreateUserController } from "../controllers/CreateUserController";
import { UserMongoDBRespository } from "../repository/UserMongoDBRespository";

const userRouter = express.Router();
const db = new UserMongoDBRespository();

const createUser = new CreateUser(db);
const createUserController = new CreateUserController(createUser);

userRouter.post("/user", (req: Request, res: Response) => createUserController.run(req, res));

export { userRouter };
