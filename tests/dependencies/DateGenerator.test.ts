import { DateGenerator, getTimezone } from "../../src/backend/dependencies/DateGenerator";

test("date is set correctly based on the current time zone", () => {
	const currentDate = new Date();
	const dayLightSavingTime = getTimezone(currentDate);
	const currentDateObj = new DateGenerator();
	if (dayLightSavingTime) {
		currentDate.setUTCHours(currentDate.getUTCHours() + 2);
		expect(currentDateObj.generate().getHours()).toEqual(currentDate.getHours());
	} else {
		currentDate.setUTCHours(currentDate.getUTCHours() + 1);
		expect(currentDateObj.generate().getHours()).toBe(currentDate.getHours());
	}
});
