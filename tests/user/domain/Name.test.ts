import { Name } from "../../../src/backend/user/domain/value-objects/Name";

test("a new instance of Name is created properly", () => {
	const testName = new Name("Logan");
	expect(testName.getName()).toBe("Logan");
});

test("an invalid string is introduced, hence, a error is launched", () => {
	expect(() => new Name("")).toThrowError("Invalid User name");
});
