import { Name } from "../value-objects/Name";

export interface UserProps {
	readonly name: Name;
	password: Buffer;
}

export class User implements UserProps {
	name: Name;
	password: Buffer;

	constructor(name: Name, password: Buffer) {
		this.name = name;
		this.password = this.passwordValidate(password);
	}

	sayHello(): string {
		return `Hello, I am ${this.name}`;
	}

	toPrimitive(): { name: string } {
		return { name: this.name.getName() };
	}

	passwordValidate(password: Buffer): Buffer {
		const passwordString = password.toString("utf8");
		if (passwordString.length < 4) {
			throw new Error(`Invalid password`);
		} else {
			return password;
		}
	}
}
