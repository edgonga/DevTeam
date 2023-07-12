/* eslint-disable */

import { Request, Response } from "express";

import { CreateUser } from "../../application/use-cases/CreateUser";

export class CreateUserController {
  private readonly createUser: CreateUser;

  constructor(createUser: CreateUser) {
    this.createUser = createUser;
  }

  run(req: Request, res: Response): Response {
    let name: string = req.body.userName;
    const password: string = req.body.password;
    const repo = req.body.selectedRepository;

    this.createUser.execute(name, password, repo);

    return res.sendStatus(200);
  }
}
