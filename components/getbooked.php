<?php

include_once("../booking.php");

$json = file_get_contents('php://input');
$data = json_decode($json, true);


$year = $data["Year"];
$month = $data["Month"];

$result = $booking_service->fetchRecordedDays($year, $month);

echo $result;
