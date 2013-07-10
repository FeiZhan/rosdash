<?php
function saveFile ()
{
	// must test if the directory exists
	file_put_contents('file/'.$_POST['file_name'].'.json', json_encode($_POST['data']));
}
function getUserList ()
{
	echo "1 2 3 4";
}

// call corresponding method according to $method
function callMethod($func)
{
	if(is_null($func) || "" == $func || ! function_exists($func))
	{
		echo "invalid func: ".$func;
		return;
	}
	$func();
}
//call method specified by javascript
callMethod($_POST["func"]);
?>
