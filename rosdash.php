<?php
// must test if the directory exists
file_put_contents('file/'.$_POST['file_name'].'.json', json_encode($_POST['data']));
?>
