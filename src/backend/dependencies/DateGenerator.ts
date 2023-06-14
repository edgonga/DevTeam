import moment from "moment-timezone";

export function getTimezone(date: Date): boolean {
	const momentDate = moment(date);
	const isDayLightSavingTime = momentDate.isDST();

	return isDayLightSavingTime;
}
export class DateGenerator {
	readonly date!: Date;

	constructor() {
		const currentDate = new Date();
		const dayLightSavingTime = getTimezone(currentDate);
		if (dayLightSavingTime) {
			currentDate.setUTCHours(currentDate.getUTCHours() + 2);
			this.date = currentDate;
		} else {
			currentDate.setUTCHours(currentDate.getUTCHours() + 1);
			this.date = currentDate;
		}
	}
}
