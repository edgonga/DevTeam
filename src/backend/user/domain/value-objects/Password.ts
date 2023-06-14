export class Password {
	private readonly password: string;

	constructor(password: string) {
		if (password.length < 4) {
			throw new Error(`Invalid password`);
		}

		this.password = password;
	}
}
