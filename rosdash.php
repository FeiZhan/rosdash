<?php
function saveFile ()
{
	// must test if the directory exists
	file_put_contents('file/'.$_POST['file_name'].'.json', json_encode($_POST['data']));
}
function getUserList ()
{
	$dirs = glob('./file/*', GLOB_ONLYDIR);
	foreach ($dirs as $i)
	{
		if (strlen($i) > 7)
		{
			echo substr($i, 7)." ";
		}
	}
}
function getPanelList ()
{
	// Define the full path to your folder from root
	$path = './file/'.$_POST["user"];
	// Open the folder
	$dir_handle = @opendir($path) or die("Unable to open $path");
	// Loop through the files
	while ($file = readdir($dir_handle))
	{
		if($file == "." || $file == "..")
		{
			continue;
		}
		echo $file." ";
		/*$pos = strpos($file, "-");
		if ($pos && substr($file, $pos) == "-panel.json")
		{
			echo substr($file, 0, $pos)." ";
		}*/
	}
	// Close
	closedir($dir_handle);
}

// call corresponding method according to $method
function callMethod ($func)
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
