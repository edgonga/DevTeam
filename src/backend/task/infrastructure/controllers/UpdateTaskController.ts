import { Request, Response } from "express";

import { UpdateTask } from "../../application/use-cases/UpdateTask";

export class UpdateTaskController {
	private readonly updateTask: UpdateTask;

	constructor(updateTask: UpdateTask) {
		this.updateTask = updateTask;
	}

	run(req: Request, res: Response): void {
		const taskName: string = req.params.taskName;

		this.updateTask
			.execute(taskName)
			.then(() => {
				res.status(200).json({ message: `The task with name: ${taskName} has been updated` });
				const newTaskName = req.body.name;
				const newTaskDescr = req.body.description;
				const newTaskStatus = req.body.status;
			})
			.catch((err) => {
				res.status(500).json({ error: "Internal Server Error" });
			});
	}
}
