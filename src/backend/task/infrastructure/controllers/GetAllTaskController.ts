import { Request, Response } from "express";

import { GetAllTask } from "../../application/use-cases/GetAllTask";

export class GetAllTaskController {
	private readonly getAllTask: GetAllTask;

	constructor(getAllTask: GetAllTask) {
		this.getAllTask = getAllTask;
	}

	async run(req: Request, res: Response): Promise<Response> {
		try {
			const retrieve = await this.getAllTask.retrieve();

			return res.status(200).json(retrieve);
		} catch (err) {
			return res.status(500).json({ error: "Internal Server Error" });
		}
	}
}
