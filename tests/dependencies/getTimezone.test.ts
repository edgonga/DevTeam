import { getTimezone } from "../../src/backend/dependencies/DateGenerator";

test("it correctly returns false or true dates", () => {
	const date = new Date("2022-06-01T00:00:00Z");
	expect(getTimezone(date)).toBeTruthy();
	const date2 = new Date("2022-12-01T00:00:00Z");
	expect(getTimezone(date2)).toBeFalsy();
});
