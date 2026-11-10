<?php
$lines = file("system.js");
echo "Total lines: " . count($lines) . PHP_EOL;

// Check line 2140 to end
for ($i = 2140; $i < count($lines); $i++) {
    if (strpos($lines[$i], "function ") !== false || strpos($lines[$i], "fStairs") !== false || strpos($lines[$i], "bedrooms") !== false) {
        echo "Line " . ($i + 1) . ": " . trim($lines[$i]) . PHP_EOL;
    }
}

