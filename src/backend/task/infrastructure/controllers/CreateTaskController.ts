import { Request, Response } from "express";

import { CreateTask } from "../../application/use-cases/CreateTask";

export class CreateTaskController {
	private readonly createTask: CreateTask;

	constructor(createTask: CreateTask) {
		this.createTask = createTask;
	}

	run(req: Request, res: Response): Response {
		const name = req.body.name as string;
		const description = req.body.description as string;
		const user = req.body.user as string;

		this.createTask.execute(name, description, user);

		return res.sendStatus(200);
	}
}
