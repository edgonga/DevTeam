import { DateTime } from "luxon";

import { Task } from "../task/domain/entities/Task";
import { STATUS, Status } from "../task/domain/value-object/Status";

export function getTimezone(date: Date): boolean {
	const luxonDate = DateTime.fromJSDate(date);
	const isDaylightSavingTime = luxonDate.isInDST;

	return isDaylightSavingTime;
}

export function statusDone(task: Task): Date | null {
	if (task.status === new Status(STATUS.DONE)) {
		return new Date();
	}

	return null;
}

export class DateGenerator {
	generate(): Date {
		const currentDate = new Date();
		const daylightSavingTime = getTimezone(currentDate);

		currentDate.setUTCHours(currentDate.getUTCHours() + (daylightSavingTime ? 2 : 1));

		return currentDate;
	}
}
