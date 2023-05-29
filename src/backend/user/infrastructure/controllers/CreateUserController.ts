import { Request, Response } from "express";

import { CreateUser } from "../../application/use-cases/CreateUser";

export class CreateUserController {
	private readonly createUser: CreateUser;

	constructor(createUser: CreateUser) {
		this.createUser = createUser;
	}

	run(req: Request, res: Response): Response {
		const name: string = req.body.name;
		const password: Buffer = Buffer.from(req.body.password);
		this.createUser.execute(name, password);

		return res.sendStatus(200);
	}
}
