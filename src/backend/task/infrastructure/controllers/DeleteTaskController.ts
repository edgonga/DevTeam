import { Request, Response } from "express";

import { DeleteTask } from "../../application/use-cases/DeleteTask";

export class DeleteTaskController {
	private readonly deleteTask: DeleteTask;

	constructor(deletask: DeleteTask) {
		this.deleteTask = deletask;
	}

	async run(req: Request, res: Response): Promise<Response> {
		const id = req.params.id;
		const url = `http://localhost:8000/task?name=${id}`;

		try {
			const response = await fetch(url);
			const data = await response.json();
			const name: string = data.name;

			console.log(url, response, data, name);

			this.deleteTask.eliminate(name);

			return res.sendStatus(200);
		} catch (error) {
			// Handle error
			return res.status(500).send(`Error fetching data from the provided URL: ${error}`);
		}
	}
}
