<?php

include_once("../booking.php");


$json = file_get_contents('php://input');

$client_ip = $_SERVER['REMOTE_ADDR'];

// TO-DO: Validation
// Error handle

if($json != null)
{
    $ok_code = json_encode("OK");
    echo $ok_code;
}

$data = json_decode($json, true);
$data["UserIP"] = $client_ip;

$result = $booking_service->writeRecord($data);
