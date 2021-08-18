<?php


class Booking
{
    // { IP?, Year, Month, Days : [] }

    private $path = __DIR__ . "\booked.json";
    private $data;

    function fetchRecordedDays($y, $m)
    {
        $content = file_get_contents($this->path);
        $this->data = json_decode($content, true);

        $result = [];

        foreach($this->data as $record)
        {
            if($record['Year'] == $y && $record['Month'] == $m)
                array_push($result, $record['Days']);
        }

        return $result = json_encode($result);
    }

    function writeRecord($json)
    {
        $content = file_get_contents($this->path);
        
        if($content == NULL)
            $content = [];
        else
            $content = json_decode($content);

        $decoded = json_decode($json);

        array_push($content, $decoded);

        $json_data = json_encode($content);

        file_put_contents($this->path, $json_data);
    }
}

$booking_service = new Booking();

?>