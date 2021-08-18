<?php

include_once("../booking.php");


$json = file_get_contents('php://input');

//

if($json != null)
{
    // It's probably OK.
    $ok_code = json_encode("OK");
    echo $ok_code;
}

$result = $booking_service->writeRecord($json);
?>