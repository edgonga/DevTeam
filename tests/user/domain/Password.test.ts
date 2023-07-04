import { Password } from "../../../src/backend/user/domain/value-objects/Password";

test("a correct password is created", () => {
	const password = new Password("freewifi");
	expect(password.getPass()).toBe("freewifi");
});

test("when a password shorter than 4 characters, an error is thrown", () => {
	expect(() => new Password("321")).toThrowError("Invalid password");
});
