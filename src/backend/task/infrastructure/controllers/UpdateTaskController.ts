import { Request, Response } from "express";

import { UpdateTask } from "../../application/use-cases/UpdateTask";
import { Status } from "../../domain/value-object/Status";

export class UpdateTaskController {
	private readonly updateTask: UpdateTask;

	constructor(updateTask: UpdateTask) {
		this.updateTask = updateTask;
	}

	async run(req: Request, res: Response): Promise<void> {
		const taskName: string = req.params.taskName;
		const newTaskName: string = req.body.name;
		const newTaskDescr: string = req.body.description;
		const newTaskStatus: Status = req.body.status;

		try {
			await this.updateTask.execute(taskName, newTaskName, newTaskDescr, newTaskStatus);
			res.status(200).json({ message: `The task with name: ${taskName} has been updated` });
		} catch (error) {
			res.status(500).json({ error: "Internal Server Error" });
		}
	}
}
