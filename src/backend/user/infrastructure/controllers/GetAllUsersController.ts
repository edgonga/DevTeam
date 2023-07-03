import { Request, Response } from "express";

import { GetAllUsers } from "../../application/use-cases/GetAllUsers";

export class GetAllUsersController {
	private readonly getAllUsers: GetAllUsers;

	constructor(getAllUsers: GetAllUsers) {
		this.getAllUsers = getAllUsers;
	}

	run(req: Request, res: Response): void {
		this.getAllUsers
			.retrieve()
			.then((retrieve) => {
				res.status(200).json(retrieve);
			})
			.catch((err) => {
				res.status(500).json({ error: "Internal Server Error" });
				console.log(err);
			});
	}
}
