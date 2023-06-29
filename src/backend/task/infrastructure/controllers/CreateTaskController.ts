import { Request, Response } from "express";

import { CreateTask } from "../../application/use-cases/CreateTask";

export class CreateTaskController {
	private readonly createTask: CreateTask;

	constructor(createTask: CreateTask) {
		this.createTask = createTask;
	}

	run(req: Request, res: Response): Response {
		const name: string = req.body.name;
		const description: string = req.body.description;
		const user: string = req.body.user;

		this.createTask.execute(name, description, user);

		return res.sendStatus(200);
	}
}
