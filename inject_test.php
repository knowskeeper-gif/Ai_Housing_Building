<?php
$html = file_get_contents('system.html');
$injected = '
<script>
window.__logged_errors = [];
window.onerror = function(msg, url, line, col, error) {
    window.__logged_errors.push({msg: msg, line: line, col: col});
    var d = document.createElement("div");
    d.className = "injected-error-badge";
    d.style.cssText = "position:fixed;top:10px;left:10px;background:red;color:white;z-index:99999;padding:10px;font-size:16px;";
    d.innerText = "JS ERROR: " + msg + " at " + line + ":" + col;
    document.body.appendChild(d);
};
</script>
';
$html = str_replace('<head>', '<head>' . $injected, $html);
file_put_contents('test_system_page.html', $html);
echo "Created test_system_page.html" . PHP_EOL;

