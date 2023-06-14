import { Name } from "../value-objects/Name";
import { Password } from "../value-objects/Password";

export interface UserProps {
	readonly name: Name;
	password: Password;
}

export class User implements UserProps {
	name: Name;
	password: Password;

	constructor(name: Name, password: Password) {
		this.name = name;
		this.password = password;
	}

	sayHello(): string {
		return `Hello, I am ${this.name}`;
	}

	toPrimitive(): { name: string } {
		return { name: this.name.getName() };
	}
}
