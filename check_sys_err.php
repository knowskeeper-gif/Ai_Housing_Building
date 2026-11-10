<?php
$html = file_get_contents('out_sys.txt');
if (strpos($html, 'injected-error-badge') !== false) {
    preg_match_all('/<div class="injected-error-badge"[^>]*>(.*?)<\/div>/s', $html, $matches);
    echo "ERRORS FOUND: " . count($matches[1]) . PHP_EOL;
    foreach ($matches[1] as $err) {
        echo " - " . htmlspecialchars_decode($err) . PHP_EOL;
    }
} else {
    echo "NO JAVASCRIPT RUNTIME ERRORS FOUND! system.js parsed and ran cleanly on system.html!" . PHP_EOL;
}

