/* eslint-disable */
import { Request, Response } from "express";

import { DeleteTask } from "../../application/use-cases/DeleteTask";

export class DeleteTaskController {
	private readonly deleteTask: DeleteTask;

	constructor(deletask: DeleteTask) {
		this.deleteTask = deletask;
	}

	run(req: Request, res: Response): Response {
		const name: string = req.body.name;

		this.deleteTask.eliminate(name);

		return res.sendStatus(200);
	}
}
