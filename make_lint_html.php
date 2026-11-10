<?php
$js = file_get_contents('system.js');
$html = '<!DOCTYPE html>
<html>
<head><title>Lint Test</title></head>
<body>
<div id="output"></div>
<script>
window.onerror = function(msg, url, line, col, error) {
    document.getElementById("output").innerHTML += "ERROR: " + msg + " at line " + line + ":" + col + "<br>";
};
</script>
<script>
' . $js . '
</script>
<div id="done">DONE</div>
</body>
</html>';
file_put_contents('test_lint_inline.html', $html);
echo "Wrote test_lint_inline.html, size: " . strlen($html) . PHP_EOL;

