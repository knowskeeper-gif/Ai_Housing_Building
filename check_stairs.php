<?php
$content = file_get_contents('system.js');
if (strpos($content, 'function fStairs') !== false) {
    echo "fStairs FOUND" . PHP_EOL;
} else {
    echo "fStairs NOT FOUND - MUST BE ADDED!" . PHP_EOL;
}

