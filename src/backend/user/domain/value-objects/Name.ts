export class Name {
	private readonly name: string;

	constructor(name: string) {

		if (name.length < 2) {
			throw new Error(`Invalid User name`);
		}

		this.name = name;
	}

	public getName(): string {
		return this.name;
	}
}
