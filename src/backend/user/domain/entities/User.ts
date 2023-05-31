export interface UserProps {
	readonly name: string;
	password: Buffer;
}

export class User implements UserProps {
	name: string;
	password: Buffer;

	constructor(name: string, password: Buffer) {
		this.name = this.nameUserValidate(name);
		this.password = this.passwordValidate(password);
	}

	sayHello(): string {
		return `Hello, I am ${this.name}`;
	}

	toPrimitive(): { name: string } {
		return { name: this.name };
	}

	passwordValidate(password: Buffer): Buffer {
		const passwordString = password.toString("utf8");
		if (passwordString.length < 4) {
			throw new Error(`Invalid password`);
		} else {
			return password;
		}
	}

	nameUserValidate(userName: string): string {
		if (!userName && userName.length < 2) {
			throw new Error(`Invalid User name`);
		} else {
			return userName;
		}
	}
}
