import express, { Request, Response } from "express";

import { CreateUser } from "../../application/use-cases/CreateUser";
import { UserRepository } from "../../domain/repository/UserRepository";
import { CreateUserController } from "../controllers/CreateUserController";
import { UserInMemoryRepository } from "../repository/UserInMemoryRepository";
import { UserMongoDBRespository } from "../repository/UserMongoDBRespository";
import { UserSQLRepository } from "../repository/UserSQLRespository";

const userRouter = express.Router();
const db = process.argv[2];

let userRepository: UserRepository = new UserInMemoryRepository();

if (db === "in-memory") {
	userRepository = new UserInMemoryRepository();
}

if (db === "mongo") {
	userRepository = new UserMongoDBRespository();
}

if (db === "sql") {
	userRepository = new UserSQLRepository();
}

const createUser = new CreateUser(userRepository);
const createUserController = new CreateUserController(createUser);

userRouter.post("/user", (req: Request, res: Response) => createUserController.run(req, res));

export { userRouter };
