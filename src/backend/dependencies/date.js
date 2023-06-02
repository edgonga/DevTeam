const { endOfMonth, endOfWeek, startOfWeek } = require("date-fns") 

function lastSundayOfTheMonth() {
    const date = new Date()
    const lastDay = endOfMonth(date)
    const firstDayLastWeek = startOfWeek(lastDay)
    const lastSunday = endOfWeek(firstDayLastWeek, { weekStartsOn: 6 })

    return lastSunday
}


        const currentDate = new Date()
        const lastSunday = lastSundayOfTheMonth()
        if (((currentDate.getMonth() >= 3) && (currentDate.getDate() > lastSunday.getDate()) && (currentDate.getHours() > 2))
            &&
            ((currentDate.getMonth() <= 10) && (currentDate.getDate() < lastSunday.getDate()) && (currentDate.getHours() < 2))) {
                currentDate.setUTCHours(currentDate.getUTCHours() + 2)
                
                console.log(`Option 1 ------ ${lastSunday} ##  ${currentDate.getDate()} ## ${lastSunday.getDate()} ##  ${currentDate.getHours()}`);
            }
        else {
            currentDate.setUTCHours(currentDate.getUTCHours() + 2)
            
            console.log(`Option 2 ------ ${lastSunday} ##  ${currentDate.getDate()} ## ${lastSunday.getDate()} ##  ${currentDate.getHours()}`)
        }