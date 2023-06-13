import { CurrentDate, getTimezone } from "../../src/backend/dependencies/DateGenerator";

test("date is set correctly based on the current time zone", () => {
	const currentDate = new Date();
	const dayLightSavingTime = getTimezone(currentDate);
	const currentDateObj = new CurrentDate();
	if (dayLightSavingTime) {
		currentDate.setUTCHours(currentDate.getUTCHours() + 2);
		expect(currentDateObj.date.getHours()).toEqual(currentDate.getHours());
	} else {
		currentDate.setUTCHours(currentDate.getUTCHours() + 1);
		expect(currentDateObj.date.getHours()).toBe(currentDate.getHours());
	}
});

test("tests that the method is called with the correct parameter when the current time zone is in daylight saving time without depending on timezone() function", () => {
	const currentDate = new Date();
	// const dayLightSavingTime = true;
	const setUTCHoursSpy = jest.spyOn(Date.prototype, "setUTCHours");
	expect(setUTCHoursSpy).toHaveBeenCalledWith(currentDate.getUTCHours() + 2);
	setUTCHoursSpy.mockRestore();
});
