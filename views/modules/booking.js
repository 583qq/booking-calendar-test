import Calendar from './calendar.js';
import { SendBookedRequest } from './requests.js';

export default class Booking
{
    constructor(year, month)
    {    
        this.weekdayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        this.monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май',
        'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

        this.labels = {
            "booked": "Забронировано",
            "free": "Свободно"
        }

        this.colors = {
            "booked": "red",
            "free": "green"
        }

        this.titleId = "booking-title";
        this.headerId = "booking-table-headers";
        this.bodyId = "booking-table-body";

        this.reserved = [];
        this.selected = [];

        this.SetTitle(year, month);
        this.RenderTitle();

        this.calendar = new Calendar(year, month);

        this.year = year;
        this.month = month;
    }

    SetTitle(year, month)
    {
        this.title = this.monthNames[month] + " " + year;
    }

    Render()
    {
        const tableBody = document.getElementById(this.bodyId);
        tableBody.innerHTML = "";
        const headerRow = document.getElementById(this.headerId);
        headerRow.innerHTML = "";

        this.RenderHeaders();
        this.RenderTable();
    }

    RenderTitle()
    {
        const titleElement = document.getElementById(this.titleId);
        titleElement.innerText = this.title;
    }

    RenderHeaders()
    {
        const headerRow = document.getElementById(this.headerId);

        for(let i = 0; i < this.weekdayNames.length; i++)
        {
            let header = document.createElement('th');
            header.scope = "col";
            header.innerText = this.weekdayNames[i];
            header.style.textAlign = "center";
            headerRow.appendChild(header);
        }
    }

    RenderTable()
    {
        const tableBody = document.getElementById(this.bodyId);
        const weeks = 6;
        const days = 7;

        for(let i = 0; i < weeks; i++)
        {
            let rowElement = document.createElement("tr");

            for(let j = i * days; j < (i + 1) * days; j++)
            {
                let cellElement = document.createElement("td");
                let cellLink = document.createElement("a");

                let day = this.calendar.days[j];

                cellLink.style.textAlign = "center";

                if(this.IsDayActive(day))
                {
                    cellLink.href = "";
                    cellLink.className = "link-dark";
                    cellLink.style.textDecoration = "none";
                }
                else
                {
                    cellElement.style.color = "gray";
                }

                cellLink.title = this.labels["free"];

                if(this.IsDayReserved(day))
                {
                    cellLink.style.color = "white";
                    cellLink.title = this.labels["booked"];
                    cellElement.style.backgroundColor = this.colors["booked"];
                }
                
                if(this.IsDaySelected(day))
                {
                    cellLink.style.color = "white";
                    cellElement.style.backgroundColor = this.colors["free"];
                }

                let dayText = day.getDate();

                cellLink.innerText = dayText;

                cellLink.addEventListener('click', function (e)
                {
                    e.preventDefault();
                    this.SelectDay(day);
                }.bind(this));

                cellElement.appendChild(cellLink);
                rowElement.appendChild(cellElement);
            }

            tableBody.appendChild(rowElement);
        }

    }

    IsDaySelected(day)
    {
        return this.selected.includes(day);
    }

    IsDayReserved(day)
    {
        let isReserved = this.reserved.filter(el => el.getTime() == day.getTime()).length > 0;
        console.log(day + " => " + isReserved);
        return isReserved;
    }

    IsDayActive(day)
    {
        let month = day.getMonth();
        let year = day.getFullYear();

        if(this.year != year || this.month != month)
            return false;

        return true;
    }

    RemoveFromSelected(day)
    {
        if(this.IsDaySelected(day))
        {
            let dayIndex = this.selected.findIndex(el => el == day);
            this.selected.splice(dayIndex, 1);
            return true;
        }

        return false;
    }

    SelectDay(selectedDay)
    {
        if(this.IsDayReserved(selectedDay))
            return;

        if(!this.IsDayActive(selectedDay))
            return;

        // If can't remove (can't find) => add.
        if(!this.RemoveFromSelected(selectedDay))
        {
            this.selected.push(selectedDay);
        }

        // Re-render full table, it's not so expensive (only 42 days)

        const tableBody = document.getElementById("booking-table-body");
        tableBody.innerHTML = ""; 

        this.RenderTable();
    }

    Book()
    {
        SendBookedRequest(this);

        console.log("It was sended (MAYBE).");

        return false;
    }

    ChangeResultField(state)
    {
        const button = document.getElementById("table-button-group");
        button.innerHTML = "";

        let resultText = document.createElement("p");

        if(state)
        {
            resultText.style.color = "green";
            resultText.innerText = "Бронирование успешно завершено.";
        }
        else 
        {
            resultText.style.color = "red";
            resultText.innerText = "Ошибка при бронировании.";
        }

        button.appendChild(resultText);

        return false;
    }
}
