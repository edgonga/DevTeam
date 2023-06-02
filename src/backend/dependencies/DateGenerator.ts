import { endOfMonth, endOfWeek, startOfWeek } from 'date-fns';

function lastSundayOfTheMonth(): Date {
    const date = new Date()
    const lastDay = endOfMonth(date)
    const firstDayLastWeek = startOfWeek(lastDay)
    const lastSunday = endOfWeek(firstDayLastWeek, { weekStartsOn: 6 })

    return lastSunday
}

export class currentDate {
    readonly date!: Date

    constructor() {
        const currentDate = new Date()
        const lastSunday = lastSundayOfTheMonth()
        if ((currentDate.getMonth() >= 3 && currentDate.getDate() > lastSunday.getDate() && currentDate.getHours() > 2)
            &&
            (currentDate.getMonth() <= 10 && currentDate.getDate() < lastSunday.getDate() && currentDate.getHours() < 2)) {
                currentDate.setUTCHours(currentDate.getUTCHours() + 2)
                this.date = currentDate
            }
        else {
            currentDate.setUTCHours(currentDate.getUTCHours() + 2)
            this.date = currentDate
        }

    }
}
