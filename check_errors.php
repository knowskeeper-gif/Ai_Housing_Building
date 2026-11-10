<?php
$lines = file("system.js");
echo "Total lines: " . count($lines) . PHP_EOL;
for ($i = 0; $i < count($lines); $i++) {
    if (strpos($lines[$i], "createCustomPhotoHouse") !== false) {
        echo "Line " . ($i + 1) . ": " . trim($lines[$i]) . PHP_EOL;
    }
}

