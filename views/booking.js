//
//  Booking
//

var booking = {
    "weekdays": ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    "monthnames": ['Январь', 'Февраль', 'Март', 'Апрель', 'Май',
    'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    "selected": [],
    "reserved": []
}

const booked_label = "Забронировано";
const free_label = "Свободно";


function getCurrentMonth()
{
    let current_datetime = new Date();
    return current_datetime.getMonth();
}

function getCurrentYear()
{
    let current_datetime = new Date();
    return current_datetime.getFullYear();
}

function getBookingTitle()
{
    let year = getCurrentYear();
    let month = getCurrentMonth();
    month = booking.monthnames[month];
    return month + " " + year;
}

function createCalendarDays(month, year)
{
    var result = [];

    var days = new Date(year, month + 1, 0).getDate(),
    start_day = new Date(year, month, 0).getDay(),
    end_day = new Date(year, month, days).getDay();

    const calendar_days = 42;

    // Filling empty cells
    if(start_day != 0)
    {   
        let lastMonthEndDate = new Date(year, month, 0).getDate();
        let prevDate = new Date();
        prevDate.setDate(lastMonthEndDate - start_day + 1);
        prevDate = prevDate.getDate();

        for(let i = prevDate; i <= lastMonthEndDate; i++)
        {
            result.push(
            {
            "value": i,
            "currentMonth": false,
            });
        }
    }

    // Filling current month cells
    for(let i = 1; i <= days; i++)
    {
        result.push(
            {
                "value": i,
                "currentMonth": true,
                "reserved": booking.reserved.includes(i),
                "selected": booking.selected.includes(i)
            }
        );
    }

    // Filling empty cells
    if(end_day != 6)
    {
        for(let i = 1; result.length < calendar_days; i++)
        {
            result.push(
                {
                    "value": i,
                    "currentMonth": false,
                }
            );
        }
    }

    return result;
}

function renderBooking(month, year)
{
    let booking_result = createCalendarDays(month, year);
    renderBookingTable(month, year, booking_result);
}

function renderHeaders()
{
    const headers_row = document.getElementById("booking-table-headers");
    
    for(let i = 0; i < booking.weekdays.length; i++)
    {
        let header = document.createElement('th');
        header.scope = "col";
        header.innerText = booking.weekdays[i];
        header.style.textAlign = "center";
        headers_row.appendChild(header);
    }
}

function renderBookingTable(month, year, table_data)
{
    const table_body = document.getElementById("booking-table-body");
    const weeks = 6;
    const days = 7;

    for(let i = 0; i < weeks; i++)
    {
        let row_element = document.createElement('tr');

        // Week days
        for(let j = i * days; j < (i + 1) * days; j++)
        {
            let cell_element = document.createElement('td');
            let day = table_data[j];

            // Hardcoded styles...
            if(!day.currentMonth)
                cell_element.style = 'color:gray;';
            if(day.reserved)
                cell_element.style = 'background-color:red;';
            if(day.selected)
                cell_element.style = 'background-color:green;';
            
            cell_element.style.textAlign = "center";

            let selectable_text = document.createElement('a');

            // Render Active Month Days
            if(day.currentMonth)
            {   
                selectable_text.className="link-dark";


                selectable_text.text = day.value;
                selectable_text.style = "text-decoration: none;";
                
                if(day.reserved || day.selected)
                    selectable_text.style.color = "white";

                // Clickable if not reserved.
                if(!day.reserved)
                {
                    selectable_text.href = "";
                    selectable_text.title = free_label;
                }
                else
                {
                    // Refactor
                    selectable_text.title = booked_label;
                }

                selectable_text.addEventListener('click', function (e)
                {
                    e.preventDefault();
                    selectDay(year, month, day.value);
                });
                
                cell_element.appendChild(selectable_text);
            }
            else
            {
                selectable_text.text = day.value;
                cell_element.appendChild(selectable_text);
            }

            row_element.appendChild(cell_element);
        }

        table_body.appendChild(row_element);
    }
}

function selectDay(year, month, day)
{
    if(booking.reserved.includes(day))
        return;

    if(!booking.selected.includes(day))
    {
        console.log("Selected day => " + day);
        booking.selected.push(day);
    }
    else
    {
        // Deselection
        console.log("Deselected day => " + day);
        let day_index = booking.selected.findIndex(el => el == day);
        booking.selected.splice(day_index, 1);
    }

    const table_body = document.getElementById("booking-table-body");
    table_body.innerHTML = '';  // Clear our table

    renderBooking(month, year); // Re-render
}

function book()
{
    let year = getCurrentYear();
    let month = getCurrentMonth();

    sendBookedRequest(year, month, booking.selected);

    console.log("Sended?");

    return false;
}

function announceResult(result)
{
    const table_button_group = document.getElementById("table-button-group");
    table_button_group.innerHTML = ''; // Clear

    let announce_text = document.createElement('p');

    if(result == true)
    {
        announce_text.style.color = "green";
        announce_text.innerText = "Бронирование успешно завершено.";
    }
    else
    {
        announce_text.style.color = "red";
        announce_text.innerText = "Ошибка при бронировании."
    }

    table_button_group.appendChild(announce_text);

    return false;
}
