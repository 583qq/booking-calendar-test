<?php

class Application
{
    public ?string $title;
    public ?string $author;

    function __construct($title, $author)
    {
        $this->title = $title;
        $this->author = $author;
    }

    function render_page($path)
    {
        echo file_get_contents($path);
    }
}

$app = new Application("Booking App", "Виталий Моисеенко");

echo '<title>' . $app->title . '</title>';

$app->render_page(__DIR__ . '/views/booking.html');

echo "<center>Creator: " . $app->author;

?>