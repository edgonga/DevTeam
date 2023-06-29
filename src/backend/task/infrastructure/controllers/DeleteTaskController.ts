import { Request, Response } from "express";

import { DeleteTask } from "../../application/use-cases/DeleteTask";

export class DeleteTaskController {
	private readonly deleteTask: DeleteTask;

	constructor(deletask: DeleteTask) {
		this.deleteTask = deletask;
	}

	run(req: Request, res: Response): Response {
		const taskName: string = req.body.name;

		this.deleteTask.eliminate(taskName);

		return res.sendStatus(200);
	}
}
