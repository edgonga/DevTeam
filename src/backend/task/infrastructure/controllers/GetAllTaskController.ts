import { Request, Response } from "express";

import { GetAllTask } from "../../application/use-cases/GetAllTask";

export class GetAllTaskController {
	private readonly getAllTask: GetAllTask;

	constructor(getAllTask: GetAllTask) {
		this.getAllTask = getAllTask;
	}

	run(req: Request, res: Response): void {
		this.getAllTask
			.retrieve()
			.then((retrieve) => {
				res.status(200).json(retrieve);
			})
			.catch((err) => {
				res.status(500).json({ error: "Internal Server Error" });
			});
	}
}
