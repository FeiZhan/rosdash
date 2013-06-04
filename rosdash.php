<?php
$json = $_POST['json']['response'];
file_put_contents('file/test3-panel.json', json_encode($_POST['json']));
?>
