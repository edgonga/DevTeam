export interface UserProps {
	readonly name: string;
	password: string;
}

export class User implements UserProps {
	readonly name: string;
	password: string;

	constructor(name: string, password: string) {
		this.name = this.nameUserValidate(name);
		this.password = this.passwordValidate(password);
	}

	sayHello(): string {
		return `Hello, I am ${this.name}`;
	}

	toPrimitive(): { name: string } {
		return { name: this.name };
	}

	private passwordValidate(password: string): string {
		if (password.length < 4) {
			throw new Error(`Invalid password`);
		} else {
			return password;
		}
	}

	private nameUserValidate(userName: string): string {
		if (!userName || userName.length < 2) {
			throw new Error(`Invalid User name`);
		} else {
			return userName;
		}
	}
}
