import { IDGenerator } from "../../src/backend/dependencies/IDGenerator";

test("ID returns an string of 36 characters long", () => {
	const idGenerator = new IDGenerator();
	const id = idGenerator.generate()
    expect(id.length).toBe(36);
	expect(typeof id).toBe("string");
});
