import { Request, Response } from "express";

import { FindTask } from "../../application/use-cases/FindTask";

export class FindTaskController {
	private readonly findTask: FindTask;

	constructor(findTask: FindTask) {
		this.findTask = findTask;
	}

	run(req: Request, res: Response): void {
		const taskName: string = req.body.name;

		this.findTask
			.search(taskName)
			.then((retrieve) => {
				res.status(200).json(retrieve);
			})
			.catch((err) => {
				res.status(500).json({ error: "Internal Server Error" });
			});
	}
}