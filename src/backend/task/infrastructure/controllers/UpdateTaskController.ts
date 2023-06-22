import { Request, Response } from "express";

import { UpdateTask } from "../../application/use-cases/UpdateTask";
import { STATUS } from "../../domain/value-object/Status";

export class UpdateTaskController {
	private readonly updateTask: UpdateTask;

	constructor(updateTask: UpdateTask) {
		this.updateTask = updateTask;
	}

	async run(req: Request, res: Response): Promise<void> {
		const name: string = req.params.taskName;
		const newName: string = req.body.name;
		const newDescr: string = req.body.description;
		const newStatus: STATUS = req.body.status;

		try {
			await this.updateTask.execute(name, newName, newDescr, newStatus);
			res.status(200).json({ message: `The task with name: ${name} has been updated` });
		} catch (error) {
			res.status(500).json({ error: "Internal Server Error" });
			console.error(error);
		}
	}
}
