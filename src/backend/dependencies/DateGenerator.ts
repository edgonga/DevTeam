import moment from "moment-timezone";

export function getTimezone(date: Date): boolean {
	const momentDate = moment(date);
	const isDayLightSavingTime = momentDate.isDST();

	return isDayLightSavingTime;
}
export class DateGenerator {
	generate(): Date {
		const currentDate = new Date();
		const dayLightSavingTime = getTimezone(currentDate);

		currentDate.setUTCHours(currentDate.getUTCHours() + (dayLightSavingTime ? 2 : 1));

		return currentDate;
	}
}
