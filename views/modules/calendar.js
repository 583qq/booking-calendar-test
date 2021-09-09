
export default class Calendar 
{
    constructor(year, month)
    {
        this.year = year;
        this.month = month;

        this.days = this.getCalendarDays();
    }

    getCalendarDays()
    {
        let days = [];

        let first = new Date(this.year, this.month);

        this.firstDayOfMonth = first;
        this.lastDayOfMonth = new Date(this.year, this.month + 1, 0);

        let firstDay = first.getDay();

        // first day of the week is monday.
        let deltaFirstDay = firstDay == 0 ? 6 : firstDay - 1;
        
        // first day of the calendar
        let start = new Date(this.year, this.month, -deltaFirstDay + 1);

        for(let d = start, i = 0; i < 42; d.setDate(d.getDate() + 1), i++)
        {
            days.push(new Date(d.valueOf()));
        }

        console.log("Get calendar (" + this.year + " " + this.month + ") data.")
        console.log(days);

        return days;
    }

    static getCurrentMonth()
    {
        return new Date().getMonth();
    }

    static getCurrentYear()
    {
        return new Date().getFullYear();
    }
}