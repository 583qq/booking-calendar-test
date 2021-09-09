const components_url = "../components/";


export function GetBookedRequest(booking)
{
  const component = "getbooked.php"

  let reserved_json;

  let year = booking.year;
  let month = booking.month;

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
      AdoptBooked(booking, data);
      booking.Render();
    });
}

function AdoptBooked(booking, arr)
{
  console.log("Got booked arrays: " + arr);

  if(arr == null)
  {
    console.log("Theres no booked days.");
    return;
  }
    
  for(let i = 0; i < arr.length; i++)
    for(let j = 0; j < arr[i].length; j++)
    {
      booking.reserved.push(new Date(arr[i][j]));
    }
}

export function SendBookedRequest(booking)
{
  // If we have nothing selected
  if(booking.selected.length === 0)
    return false;

  const component = "book.php";

  let year = booking.year;
  let month = booking.month;
  let days = booking.selected;

  console.log("SENDING: " + JSON.stringify({ Year: year, Month: month, Days: days }));

  $.ajax(
    { method: 'POST',
      url: components_url + component,
      data: JSON.stringify({ Year: year, Month: month, Days: days }),
      contentType: "application/json; charset=utf-8",
      dataType: "json"
  }).done(function (data) {
    booking.ChangeResultField(true);
  }).fail(function (data) {
    booking.ChangeResultField(false);
  });

}