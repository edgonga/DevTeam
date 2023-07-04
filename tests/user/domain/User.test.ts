import { User } from "../../../src/backend/user/domain/entities/User";
import { Name } from "../../../src/backend/user/domain/value-objects/Name";
import { Password } from "../../../src/backend/user/domain/value-objects/Password";

test("a User is created correctly", () => {
	const user = new User(new Name("Left Cap"), new Password("bob007"));
	expect(user.name.getName()).toBe("Left Cap");
	expect(user.password.getPass()).toBe("bob007");
});

test("if parameters are missing or lenght is not the minimum, an error is returned", () => {
	expect(() => new User(new Name(""), new Password(""))).toThrowError("Invalid User name");
	expect(() => new User(new Name("Hugh"), new Password(""))).toThrowError("Invalid password");
	expect(() => new User(new Name("Left Cap"), new Password("11"))).toThrowError("Invalid password");
	expect(() => new User(new Name("w"), new Password("poppppp"))).toThrowError("Invalid User name");
});
