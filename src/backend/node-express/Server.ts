/* eslint-disable*/

import { json, urlencoded } from "body-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { taskRouter } from "../task/infrastructure/routers/TaskRouter";
import { userRouter } from "../user/infrastructure/routers/UserRouter";

const corsOptions = {
	origin: 'http://localhost:8000', // Origen permitido (URL de tu aplicación cliente)
	methods: ['GET', 'POST'], // Métodos permitidos
	allowedHeaders: ['Content-Type'], // Encabezados permitidos
  };
export class Server {
	private readonly express: express.Express;
	private readonly port: string;

	constructor(port: string) {
		this.port = port;
		this.express = express();
		this.express.use(helmet())
		this.express.use(cors(corsOptions));
		this.express.use(json());
		this.express.use(urlencoded({ extended: true }));
		this.express.use(taskRouter)
		this.express.use(userRouter)
	}

	async listen(): Promise<void> {
		await new Promise<void>((resolve) => {
			this.express.listen(this.port, () => {
				// eslint-disable-next-line no-console
				console.log(
					`✅ Backend App is running at http://localhost:${this.port} in ${this.express.get(
						"env"
					)} mode`
				);
				// eslint-disable-next-line no-console
				console.log("✋ Press CTRL-C to stop\n");

				resolve()
			})
		})
	}
}
