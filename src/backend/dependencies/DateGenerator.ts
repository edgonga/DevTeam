import { DateTime } from "luxon";

export function getTimezone(date: Date): boolean {
	const luxonDate = DateTime.fromJSDate(date);
	const isDaylightSavingTime = luxonDate.isInDST;

	return isDaylightSavingTime;
}

export class DateGenerator {
	generate(): Date {
		const currentDate = new Date();
		const daylightSavingTime = getTimezone(currentDate);

		currentDate.setUTCHours(currentDate.getUTCHours() + (daylightSavingTime ? 2 : 1));

		return currentDate;
	}
}
