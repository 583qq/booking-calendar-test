<?php


class Booking
{
    // { IP?, Year, Month, Days : [] }

    private $path = __DIR__ . "\booked.json";
    private $data;

    function fetchRecordedDays($y, $m)
    {
        // If theres no 'database', create empty one.
        if(!is_file($this->path))
        {
            file_put_contents($this->path, "[]");
        }

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

    function writeRecord($obj)
    {
        $content = file_get_contents($this->path);
        
        if($content == NULL)
            $content = [];
        else
            $content = json_decode($content);

        array_push($content, $obj);

        $json = json_encode($content);

        file_put_contents($this->path, $json);
    }
}

$booking_service = new Booking();

?>