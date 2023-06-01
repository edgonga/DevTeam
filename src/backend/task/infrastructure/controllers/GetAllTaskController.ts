import { Request, Response } from "express";

import { GetAllTask } from "../../application/use-cases/GetAllTask";

export class GetAllTaskController {
	private readonly getAllTask: GetAllTask;

	constructor(getAllTask: GetAllTask) {
		this.getAllTask = getAllTask;
	}

	run(req: Request, res: Response): Response {
		// const id: number = req.body.id;
		// const taskName: string = req.body.taskName
		// const taskDescription: string = req.body.taskDescription
		// const status: Status = req.body.status
		// const userTaskCreator: string = req.body.userTaskCreator

		const retrieve = this.getAllTask.retrieve();

		return res.sendStatus(200);
	}
}
