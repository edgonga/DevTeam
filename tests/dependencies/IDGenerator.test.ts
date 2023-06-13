import { ID } from "../../src/backend/dependencies/IDGenerator";

test("ID returns an string of 36 characters long", () => {
	const id = new ID().IDgenerator();
	expect(id.length).toBe(36);
	expect(typeof id).toBe("string");
});
