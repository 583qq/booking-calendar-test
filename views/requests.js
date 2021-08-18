const components_url = "../components/";


function getBookedRequest(year, month)
{
  const component = "getbooked.php"

  let reserved_json;

  $.ajax(
    { 
      method: 'POST',
      url: components_url + component,
      data: JSON.stringify({ Year: year, Month: month }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
    })
    .done(function (data) 
    {
      adoptReserved(data);
      renderBooking(month, year);
    });
}

function adoptReserved(arr)
{
  console.log("Got reserved arrays: " + arr);

  if(arr == null)
  {
    console.log("Theres no reservations.");
    return;
  }
    
  for(let i = 0; i < arr.length; i++)
    for(let j = 0; j < arr[i].length; j++)
      booking.reserved.push(arr[i][j]);
}

function sendBookedRequest(year, month, days)
{
  // If we have nothing selected
  if(days.length === 0)
    return false;

  const component = "book.php";

  console.log("SENDING: " + JSON.stringify({ Year: year, Month: month, Days: days }));

  $.ajax(
    { method: 'POST',
      url: components_url + component,
      data: JSON.stringify({ Year: year, Month: month, Days: days }),
      contentType: "application/json; charset=utf-8",
      dataType: "json"
  }).done(function (data) {
    announceResult(true);
  }).fail(function (data) {
    announceResult(false);
  });

}