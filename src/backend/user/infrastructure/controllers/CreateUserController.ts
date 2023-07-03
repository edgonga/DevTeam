/* eslint-disable */ 

import { Request, Response } from "express";

import { CreateUser } from "../../application/use-cases/CreateUser";

export class CreateUserController {
	private readonly createUser: CreateUser;

	constructor(createUser: CreateUser) {
		this.createUser = createUser;
	}

	run(req: Request, res: Response): Response {
		const name: string = req.body.userName;
		const password: string = req.body.password;

		this.createUser.execute(name, password);

		return res.sendStatus(200);
	}
}
