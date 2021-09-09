import Booking from './modules/booking.js';
import { GetBookedRequest } from './modules/requests.js';
import css from './styles.css';

var booking;

function OnPageLoad()
{
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();

    booking = new Booking(year, month);

    GetBookedRequest(booking, year, month);

    console.log("POST request to get reserved days sent.");

   // booking.Render();
}


OnPageLoad();

window.booking = booking;

