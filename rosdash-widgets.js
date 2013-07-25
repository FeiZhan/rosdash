//@bug input.length does not work

// constant value
ROSDASH.Constant = function (block)
{
	this.block = block;
}
//@input	none
//@output	the value of the constant
ROSDASH.Constant.prototype.run = function (input)
{
	if ("Float32" == this.block.constname)
	{
		return {o0: parseFloat(this.block.value)};
	} else
	{
		return {o0: this.block.value};
	}
}

// multiArray
ROSDASH.multiArray = function (block)
{
	this.block = block;
}
//@input	each value
//@output	an array of all the values
ROSDASH.multiArray.prototype.run = function (input)
{
	var a = new Array();
	for (var i in input)
	{
		a.push(input[i]);
	}
	return {o0: a};
}

// memorable array - can memorize historic data with max length
ROSDASH.memArray = function (block)
{
	this.block = block;
	this.data = new Array();
	this.max_length = 100;
}
//@input	one new data
//@output	an array of historic data with length of this.max_length
ROSDASH.memArray.prototype.run = function (input)
{
	this.data.push(input[0]);
	// if exceeds
	if (this.max_length < this.data.length)
	{
		// cut the beginning ones
		this.data.splice(0, this.data.length - this.max_length);
	}
	return {o0: this.data};
}

// add inputs up
ROSDASH.Addition = function (block)
{
	this.block = block;
}
//@input	all elements to be added
//@output	sum
ROSDASH.Addition.prototype.run = function (input)
{
	var sum = input[0];
	for (var i = 1; i < input.length; ++ i)
	{
		sum += input[i];
	}
	return {o0: sum};
}

// not tested
ROSDASH.Division = function (block)
{
	this.block = block;
}
ROSDASH.Division.prototype.run = function (input)
{
	var output;
	if (typeof input[0] == "object")
	{
		output = new Object();
		for (var i in input[0])
		{
			output[i] = input[0][i] / input[1];
		}
	} else if (typeof input[0] == "array")
	{
		output = new Array();
		for (var i in input[0])
		{
			output[i] = input[0][i] / input[1];
		}
	} else
	{
		output = input[0] / input[1];
	}
	return {o0: output};
}

// just for array
ROSDASH.Insert = function (block)
{
	this.block = block;
}
ROSDASH.Insert.prototype.run = function (input)
{
	if (undefined === input[2] || (typeof input[0] != "array" && typeof input[0] != "object"))
	{
		return undefined;
	}
	var output = new Array();
	for (var i in input[0])
	{
		var num = parseInt(i, 10);
		if (!isNaN(i) && i >= 0)
		{
			output[i] = input[0][i];
		}
	}
	output.splice(input[2], 0, input[1]);
	return {o0: output};
}

ROSDASH.Reshape = function (block)
{
	this.block = block;
	this.len = 0;
}
ROSDASH.Reshape.prototype.vectorize = function (data)
{
	if (typeof data == "object" || typeof data == "array")
	{
		var v = new Array();
		for (var i in data)
		{
			v = v.concat(this.vectorize(data[i]));
		}
		return v;
	} else
	{
		++ this.len;
		return [ data ];
	}
}
ROSDASH.Reshape.prototype.run = function (input)
{
	// if not an array
	if (typeof input[0] != "object" && typeof input[0] != "array")
	{
		return input[0];
	}
	this.len = 0;
	// vectorize
	var vector = this.vectorize(input[0]);
	var is_int1 = false, is_int2 = false;
	// if input[1] is int
	if (typeof input[1] === 'number' && parseFloat(input[1]) == parseInt(input[1], 10) && !isNaN(input[1]) && input[1] > 0)
	{
		is_int1 = true;
	}
	// if input[2] is int
	if (typeof input[2] === 'number' && parseFloat(input[2]) == parseInt(input[2], 10) && !isNaN(input[2]) && input[2] > 0)
	{
		is_int2 = true;
	}
	var row, column;
	if (! is_int1 && ! is_int2)
	{
		return input[0];
	} else if (! is_int2)
	{
		row = input[1];
		column = Math.ceil(this.len / row);
		if (column <= 0)
		{
			column = 1;
		}
	} else if (! is_int1)
	{
		column = input[2];
		row = Math.ceil(this.len / column);
		if (row <= 0)
		{
			row = 1;
		}
	} else
	{
		row = input[1];
		column = input[2];
	}
	var output = new Array();
	for (var i = 0; i < column; ++ i)
	{
		var o = new Array();
		for (var j = 0; j < row; ++ j)
		{
			if (i * row + j < vector.length)
			{
				o.push(vector[i * row + j]);
			} else
			{
				switch (typeof vector[0])
				{
				case "number":
					o.push(0);
					break;
				case "string":
					o.push(" ");
					break;
				default:
					o.push(" ");
					//o.push(undefined);
				}
			}
		}
		output.push(o);
	}
	if (1 == input[1])
	{
		return {o0: o};
	} else
	{
		return {o0: output};
	}
}

ROSDASH.AssocArray = function (block)
{
	this.block = block;
}
ROSDASH.AssocArray.prototype.run = function (input)
{
	var assoc = new Object();
	if (undefined !== input[0])
	{
		assoc[input[0]] = input[1];
	}
	return {o0: assoc};
}

ROSDASH.addToAssocArray = function (block)
{
	this.block = block;
}
ROSDASH.addToAssocArray.prototype.run = function (input)
{
	var assoc;
	if (typeof input[0] != "object")
	{
		return {o0: new Object()};
	} else if (undefined === input[1])
	{
		return {o0: input[0]};
	}
	assoc = input[0];
	assoc[input[1]] = input[2];
	return {o0: assoc};
}

// switch case function
ROSDASH.Switch = function (block)
{
	this.block = block;
}
//@input	the input value and all cases
//@output	true if the case matches the input value, false if not
ROSDASH.Switch.prototype.run = function (input)
{
	//@todo design default value and compulsory inputs
	if (input.length < 2)
	{
		console.error("input not enough: " + this.block.id);
		return undefined;
	}
	var output = new Object();
	// if input[1] is an array of cases
	if (typeof input[1] == "array")
	{
		for (var i in input[1])
		{
			if (input[0] == input[1][i])
			{
				output["o" + i] = true;
			} else
			{
				output["o" + i] = false;
			}
		}
	} else // if not, means all the following inputs are cases
	{
		// avoid input[0]
		for (var i = 0; i < input.length - 1; ++ i)
		{
			if (input[0] == input[i + 1])
			{
				output["o" + i] = true;
			} else
			{
				output["o" + i] = false;
			}
		}
	}
	return output;
}

ROSDASH.RosList = function (block)
{
	this.block = block;
}
ROSDASH.RosList.prototype.run = function (input)
{
	var output = new Array();
	var tmp = new Array();
	var max = Math.max( Math.max(ROSDASH.ros_msg.topic["_"].length, ROSDASH.ros_msg.service["_"].length), ROSDASH.ros_msg.param["_"].length);
	for (var i = 0; i < max; ++ i)
	{
		tmp = new Array();
		if (ROSDASH.ros_msg.topic["_"].length > i)
		{
			tmp[0] = ROSDASH.ros_msg.topic["_"][i];
		} else
		{
			tmp[0] = " ";
		}
		if (ROSDASH.ros_msg.service["_"].length > i)
		{
			tmp[1] = ROSDASH.ros_msg.service["_"][i];
		} else
		{
			tmp[1] = " ";
		}
		if (ROSDASH.ros_msg.param["_"].length > i)
		{
			tmp[2] = ROSDASH.ros_msg.param["_"][i];
		} else
		{
			tmp[2] = " ";
		}
		output.push(tmp);
	}
	return {o0: output};
}

ROSDASH.TopicList = function (block)
{
	this.block = block;
}
ROSDASH.TopicList.prototype.run = function (input)
{
	return {o0: ROSDASH.ros_msg.topic["_"]};
}

// ROS topic
ROSDASH.Topic = function (block)
{
	this.block = block;
	this.ros_msg = {error: "cannot connect to this topic"};
	this.topic;
	this.init_success = false;
}
// subscribe a ROS topic for once
ROSDASH.Topic.prototype.init = function ()
{
	if (! ROSDASH.ros_connected)
	{
		return;
	}
	this.block.rostype = (undefined !== this.block.rostype) ? this.block.rostype : 'std_msgs/String';
	this.ros_msg = {error: "cannot connect to this topic"};
	this.topic = new ROSLIB.Topic({
		ros : ROSDASH.ros,
		name : this.block.rosname,
		messageType : this.block.rostype
	});
	var self = this;
	// subscribe a ROS topic
	this.topic.subscribe(function(message)
	{
		self.ros_msg = message;
		//listener.unsubscribe();
	});
	this.init_success = true;
}
//@input	none
//@output	ROS topic message
ROSDASH.Topic.prototype.run = function (input)
{
	if (! ROSDASH.ros_connected)
	{
		return undefined;
	}
	if (ROSDASH.ros_connected && ! this.init_success)
	{
		this.init();
	}
	var output;
	if (undefined !== this.block.rosname)
	{
		//this.ros_msg = "running";
		output = this.ros_msg;
	}
	if (undefined !== input[0])
	{
		var msg;
		if (typeof input[0] == "string" && this.block.rostype == 'std_msgs/String')
		{
			msg = new ROSLIB.Message({data: input[0]});
		} else
		{
			msg = new ROSLIB.Message(input[0]);
		}
		this.topic.publish(msg);
	}
	return {o0: output};
}

ROSDASH.Service = function (block)
{
	this.block = block;
	this.init_success = false;
	this.service;
}
ROSDASH.Service.prototype.init = function ()
{
	if (! ROSDASH.ros_connected)
	{
		return;
	}
	// First, we create a Service client with details of the service's name and service type.
	this.service = new ROSLIB.Service({
		ros : ROSDASH.ros,
		name : this.block.rosname,
		messageType : this.block.rostype
	});
	this.init_success = true;
}
ROSDASH.Service.prototype.run = function (input)
{
	if (! ROSDASH.ros_connected/* || undefined === input[0]*/)
	{
		return undefined;
	}
	if (ROSDASH.ros_connected && ! this.init_success)
	{
		this.init();
	}
	var msg = (undefined !== input[0]) ? input[0] : {A : 1, B : 2};
	var request = new ROSLIB.ServiceRequest(msg);
	var output = new Object();
	this.service.callService(request, function(result) {
		for (var i in result)
		{
			output[i] = result[i];
		}
	});
	return {o0: output};
}

ROSDASH.Param = function (block)
{
	this.block = block;
	this.init_success = false;
	this.param;
	this.output;
}
ROSDASH.Param.prototype.init = function ()
{
	if (! ROSDASH.ros_connected)
	{
		return;
	}
	// First, we create a Service client with details of the service's name and service type.
	this.param = new ROSLIB.Param({
		ros : ROSDASH.ros,
		name : this.block.rosname
	});
	this.init_success = true;
}
ROSDASH.Param.prototype.run = function (input)
{
	if (! ROSDASH.ros_connected)
	{
		return undefined;
	}
	if (ROSDASH.ros_connected && ! this.init_success)
	{
		this.init();
	}
	var that = this;
	this.param.get(function(value) {
		that.output = value;
	});
	if (undefined !== input[0])
	{
		this.param.set(input[0]);
	}
	return {o0: that.output + ""};
}

// toggle button (don't use the name of switch since it is used)
ROSDASH.ToggleButton = function (block)
{
	this.block = block;
	this.canvas_id = "togglebutton_" + this.block.id;
	this.button_id = "togglebutton2_" + this.block.id;
}
ROSDASH.ToggleButton.prototype.addWidget = function (widget)
{
	widget.widgetContent = '<input id="' + this.canvas_id + '" type="checkbox" checked />';
	return widget;
}
ROSDASH.ToggleButton.prototype.init = function ()
{
	$('#' + this.canvas_id).wrap('<div id="' + this.button_id + '" class="switch" data-on-label="ROCK!" data-off-label="NO" />').parent().bootstrapSwitch();
	$('#' + this.button_id).on('switch-change', function (e, data) {
		var $el = $(data.el)
		  , value = data.value;
		console.log("toggled button");
	});
	//$('#toggle-state-switch').bootstrapSwitch('toggleState');
	//$('#toggle-state-switch').bootstrapSwitch('setState', false); // true || false

}

// transform array (object, associative array, or topic message) into string
ROSDASH.arrayToStr = function (block)
{
	this.block = block;
}
//@input	the array (object, associative array, or topic message)
//@output	the corresponding string
ROSDASH.arrayToStr.prototype.run = function (input)
{
	// if empty
	if (undefined === input || undefined === input[0])
	{
		return {o0: ""};
	}
	var msg = input[0];
	var str = "";
	if (typeof msg == "object" || typeof msg == "array")
	{
		for (var i in msg)
		{
			str += " ( " + i + ": ";
			// recursive call for sub-array
			str += this.run({0: msg[i]}).o0;
			str += " ) ";
		}
	} else
	{
		str += msg;
	}
	return {o0: str};
}

// text widget
ROSDASH.Text = function (block)
{
	this.block = block;
}
//@input	header and content strings
//@output	none
ROSDASH.Text.prototype.run = function (input)
{
	// default value for inputs
	input[0] = (undefined === input[0]) ? this.block.name : input[0];
	input[1] = (undefined === input[1]) ? "(empty content)" : input[1];
	$("#myDashboard").sDashboard("setHeaderById", this.block.id, input[0]);
	$("#myDashboard").sDashboard("setContentById", this.block.id, input[1]);
}

// text widget with speaking widget
ROSDASH.speak_content = "";
ROSDASH.Speech = function (block)
{
	this.block = block;
	this.content = "";
}
ROSDASH.Speech.prototype.addWidget = function (widget)
{
	//@todo change id
	widget.widgetTitle = widget.widgetId + ' <input type="button" id="speak" value="speak" /><span id="audio"></span>';
	widget.widgetContent = "";
	return widget;
}
// speak by speak.js
ROSDASH.Speech.prototype.speak = function ()
{
	speak(ROSDASH.speak_content);
}
// add callback function to speak button
ROSDASH.Speech.prototype.init = function ()
{
	if ($("#speak").length > 0)
	{
		$("#speak").click(this.speak);
	}
}
//@input	the content to speak
//@output	none
ROSDASH.Speech.prototype.run = function (input)
{
	input[0] = (undefined === input[0]) ? "(empty content)" : input[0];
	if (this.content != input[0])
	{
		// if new message comes, speak
		//this.speak();
		this.content = input[0];
		ROSDASH.speak_content = input[0];
	}
	$("#myDashboard").sDashboard("setContentById", this.block.id, input[0]);
}

// table
ROSDASH.Table = function (block)
{
	this.block = block;
}
//@input	header, titles, and contents for table
//@output	none
ROSDASH.Table.prototype.run = function (input)
{
	// default value for header
	input[0] = (undefined === input[0]) ? this.block.name : input[0];
	$("#myDashboard").sDashboard("setHeaderById", this.block.id, input[0]);
	if (typeof input[2] != "array" && typeof input[2] != "object")
	{
		return;
	}
	// for titles
	var aoColumns = new Array();
	for (var i in input[1])
	{
		if (typeof input[1][i] == "number")
		{
			aoColumns.push({sTitle: "" + input[1][i]});
		} else if (undefined === input[1][i])
		{
			aoColumns.push({sTitle: " "});
		} else
		{
			aoColumns.push({sTitle: input[1][i]});
		}
	}
	var aaData = new Array();
	for (var i in input[2])
	{
		var tmp = new Array();
		for (var j in input[2][i])
		{
			if (typeof input[2][i][j] == "number")
			{
				tmp.push("" + input[2][i][j]);
			} else if (undefined === input[2][i][j])
			{
				tmp.push(" ");
			} else
			{
				tmp.push(input[2][i][j]);
			}
		}
		aaData.push(tmp);
	}
	if (aaData.length == 0)
	{
		var tmp = new Array();
		for (var j = 0; j < input[1].length; ++ j)
		{
			tmp.push(" ");
		}
		aaData.push(tmp);
	}
	if (aaData[0].length == 0)
	{
		for (var j = 0; j < input[1].length; ++ j)
		{
			aaData[0].push(" ");
		}
	}
	if (input[1].length < aaData[0].length)
	{
		for (var i = input[1].length; i < aaData[0].length; ++ i)
		{
			aoColumns.push({sTitle: " "});
		}
	}
	// for contents
	var tableDef = {
		"aaData" : aaData,
		"aoColumns" : aoColumns,
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": true,
        "bSort": false,
        "bInfo": false,
        "bAutoWidth": false
	};
	var dataTable = $('<table cellpadding="0" cellspacing="0" border="0" class="display sDashboardTableView table table-bordered"></table>').dataTable(tableDef);
	$("#myDashboard").sDashboard("setContentById", this.block.id, dataTable);
}

// Turtlesim from ROS desktop widget
ROSDASH.Turtlesim = function (block)
{
	this.block = block;
	this.canvas_id = "turtlesim_" + this.block.id;
}
ROSDASH.Turtlesim.prototype.addWidget = function (widget)
{
	widget.widgetContent = '<canvas id="' + this.canvas_id + '" width="' + ROSDASH.user_conf.widget_width + 'px" height="' + ROSDASH.user_conf.content_height + 'px" style="border: 1px solid black"></canvas>';
	return widget;
}
ROSDASH.Turtlesim.prototype.init = function ()
{
	//@note a traditional ROS connection
	var ros = new ROS('ws://192.168.1.125:9090');
	var self = this;
	ros.on('connection', function()
	{
		console.log("traditional ROS connected");
		var context = document.getElementById(self.canvas_id).getContext('2d');
		var turtleSim = new TurtleSim({
			  ros     : ros
			, context : context
		});
		turtleSim.spawnTurtle('turtle1');
		turtleSim.draw();
	});
}

// ros2djs
ROSDASH.Ros2d = function (block)
{
	this.block = block;
	this.canvas_id = "ros2d_" + this.block.id;
	this.init_success = false;
}
ROSDASH.Ros2d.prototype.addWidget = function (widget)
{
	widget.widgetContent = '<div id="' + this.canvas_id + '"></div>';
	return widget;
}
ROSDASH.Ros2d.prototype.init = function ()
{
	if (ROSDASH.ros_connected && $("#" + this.canvas_id).length > 0)
	{
		// Create the main viewer.
		var viewer = new ROS2D.Viewer({
		  divID : this.canvas_id,
		  width : ROSDASH.user_conf.widget_width,
		  height : ROSDASH.user_conf.content_height
		});
		// Setup the map client.
		var gridClient = new ROS2D.OccupancyGridClient({
		  ros : ROSDASH.ros,
		  rootObject : viewer.scene
		});
		// Scale the canvas to fit to the map
		gridClient.on('change', function() {
		  viewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
		  viewer.shift(gridClient.currentGrid.pose.position.x, gridClient.currentGrid.pose.position.y);
		});
		this.init_success = true;
	}
}
ROSDASH.Ros2d.prototype.run = function ()
{
	if (! this.init_success)
	{
		this.init();
	}
}

// ros3djs
// enable 3d for Chrome: (Unfortunately it is not compatible with Diagram)
// type "about:flags" on address bar of google chrome 
// then under "Override software rendering list" click "enable" 
ROSDASH.Ros3d = function (block)
{
	this.block = block;
	this.canvas_id = "ros3d_" + this.block.id;
	this.init_success = false;
}
ROSDASH.Ros3d.prototype.addWidget = function (widget)
{
	widget.widgetContent = '<div id="' + this.canvas_id + '"></div>';
	return widget;
}
ROSDASH.Ros3d.prototype.init = function ()
{
	if (ROSDASH.ros_connected && $("#" + this.canvas_id).length > 0)
	{
		// Create the main viewer.
		var viewer = new ROS3D.Viewer({
		  divID : this.canvas_id,
		  width : ROSDASH.user_conf.widget_width,
		  height : ROSDASH.user_conf.content_height,
		  antialias : true
		});
		// Setup the marker client.
		var gridClient = new ROS3D.OccupancyGridClient({
		  ros : ROSDASH.ros,
		  rootObject : viewer.scene
		});
		this.init_success = true;
	}
}
ROSDASH.Ros3d.prototype.run = function ()
{
	if (! this.init_success)
	{
		this.init();
	}
}

ROSDASH.PR2URDF = function (block)
{
	this.block = block;
	this.canvas_id = "pr2urdf_" + this.block.id;
	this.init_success = false;
	this.marker;
}
ROSDASH.PR2URDF.prototype.addWidget = function (widget)
{
	widget.widgetContent = '<div id="' + this.canvas_id + '"></div>';
	return widget;
}
ROSDASH.PR2URDF.prototype.init = function ()
{
	if (ROSDASH.ros_connected && $("#" + this.canvas_id).length > 0)
	{
		var viewer = new ROS3D.Viewer({
			divID : this.canvas_id,
			width : ROSDASH.user_conf.widget_width,
			height : ROSDASH.user_conf.content_height,
			antialias : true
		});
		viewer.addObject(new ROS3D.Grid());
		new ROS3D.UrdfClient({
			ros : ROSDASH.ros,
			tfClient : new ROSLIB.TFClient({
				ros : ROSDASH.ros,
				angularThres : 0.01,
				transThres : 0.01,
				rate : 10.0
			}),
			path : 'http://resources.robotwebtools.org/',
			rootObject : viewer.scene
		});
		var markerClient = new ROS3D.MarkerClient({
			ros : ROSDASH.ros,
			tfClient : new ROSLIB.TFClient({
			ros : ROSDASH.ros,
				angularThres : 0.01,
				transThres : 0.01,
				rate : 10.0,
				fixedFrame : '/my_frame'
			}),
			topic : '/visualization_marker',
			rootObject : viewer.scene
		});
		this.marker = markerClient;
		this.init_success = true;
	}
}
ROSDASH.PR2URDF.prototype.run = function (input)
{
	if (! this.init_success)
	{
		this.init();
		return;
	}
	/*if (null != this.marker.currentMarker && undefined != this.marker.currentMarker.pose.position.x)
	{
		console.log(this.marker.currentMarker.pose.position.x);
	}*/
}

ROSDASH.marker_3dpos = {
	x: 0,
	y: 0,
	z: 0
};
ROSDASH.Marker3DPos = function (block)
{
	this.block = block;
}
ROSDASH.Marker3DPos.prototype.run = function (input)
{
	if (undefined == input[0] || undefined == input[0].dx || undefined == input[0].dy)
	{
		return;
	}
	ROSDASH.marker_3dpos.x -= input[0].dx / 100.0;
	ROSDASH.marker_3dpos.y += input[0].dy / 100.0;
}

// google maps
ROSDASH.Gmap = function (block)
{
	this.block = block;
	this.canvas_id = "gmap_" + this.block.id;
	this.gmap = undefined;
}
ROSDASH.Gmap.prototype.addWidget = function (widget)
{
	widget.widgetContent = '<div id="' + this.canvas_id + '" style="height:100%; width:100%;" />';
	return widget;
}
ROSDASH.Gmap.prototype.init = function ()
{
	var LAB = [49.276802, -122.914913];
	// if canvas exists
	if ($("#" + this.canvas_id).length > 0)
	{
		var mapOptions = {
		  center: new google.maps.LatLng(LAB[0], LAB[1]),
		  zoom: 14,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		this.gmap = new google.maps.Map(document.getElementById(this.canvas_id),
			mapOptions);
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(LAB[0], LAB[1]),
			map: this.gmap,
			title: 'Autonomy Lab at Simon Fraser University'
		});
	}
}
//@input	none
//@output	gmap object
ROSDASH.Gmap.prototype.run = function (input)
{
	return {o0: this.gmap};
}
ROSDASH.Gmap.prototype.resizeGmap = function ()
{
	google.maps.event.trigger(this.gmap, "resize");
}

// google maps robot trajectory overlay (temporarily it is just position)
ROSDASH.GmapTraj = function (block)
{
	this.block = block;
	this.robot = new Object();
}
//@input	google maps object, array of robot positions
//@output	google maps object
ROSDASH.GmapTraj.prototype.run = function (input)
{
	if (input.length < 2 || undefined === input[0])
	{
		return;
	}
	for (var i in input[1])
	{
		// for a new robot
		if (! (i in this.robot))
		{
			this.robot[i] = new Object();
			this.robot[i].path = new Array();
			this.robot[i].last_loc = new Array();
		} else if (this.robot[i].robot.position.jb == input[1][i].x && this.robot[i].robot.position.kb == input[1][i].y)
		{
			continue;
		}
		// clear the old position
		if (undefined !== this.robot[i].robot)
		{
			this.robot[i].robot.setMap(null);
		}
		this.robot[i].robot = new google.maps.Marker({
			position: new google.maps.LatLng(input[1][i].x, input[1][i].y),
			map: input[0],	// google maps object
			title: "robot " + i,
			icon: "resource/cabs.png",
			//shadow: {url: 'resource/cabs.shadow.png',}
		});
		// keep the length of path no longer than a threshold
		while (this.robot[i].path.length >= 20)
		{
			this.robot[i].path[0].setMap(null);
			this.robot[i].path.splice(0, 1);
		}
		var color = "black";
		var weight = 1;
		var icon = new Array();
		if (undefined === this.robot[i].last_loc[0])
		{
			this.robot[i].last_loc[0] = input[1][i].x;
			this.robot[i].last_loc[1] = input[1][i].y;
		}
		this.robot[i].path.push(new google.maps.Polyline({
			map: input[0],
			path: [new google.maps.LatLng(this.robot[i].last_loc[0], this.robot[i].last_loc[1]), new google.maps.LatLng(input[1][i].x, input[1][i].y)],
			strokeColor: color,
			strokeOpacity: 1,
			strokeWeight: weight,
			icons: icon
		}));
		this.robot[i].last_loc[0] = input[1][i].x;
		this.robot[i].last_loc[1] = input[1][i].y;
	}
	return {o0: input[0]};
}

// safe range for text or plot widget
ROSDASH.SafeRange = function (block)
{
	this.block = block;
	this.min = 0;
	this.max = 100;
}
//@input	the value to be tested
//@output	if it is in safe range
ROSDASH.SafeRange.prototype.run = function (input)
{
	if (input[0] < this.min || input[0] > this.max)
	{
		return {o0: false};
	} else
	{
		return {o0: true};
	}
}

// a plot widget
ROSDASH.Flot = function (block)
{
	this.block = block;
	this.plot;
	this.option = {
		// drawing is faster without shadows
		series: {
			shadowSize: 0,
			lines: {show: true},
			points: {show: true}
		},
		crosshair: {mode: "x"},
		zoom: {interactive: true},
		pan: {interactive: true},
		// it can adjust automatically
		//@note still some bugs
		//yaxis: { min: 0, max: 100 },
		yaxis: {
			tickFormatter: function (v, axis)
			{
				return v.toFixed(2);
			}
		},
		grid: {show: true},
		legend: { position: "nw" },
		grid: {
			show: true,
			hoverable: true,
			autoHighlight: false
		}
	};
}
ROSDASH.Flot.prototype.addWidget = function (widget)
{
	var id = "flot_" + widget.widgetId;
	widget.widgetContent = '<div id="' + id + '" style="height:100%;width:100%;" />';
	return widget;
}
ROSDASH.Flot.prototype.getDefaultData = function ()
{
	var d1 = [];
	for (var i = 0; i < 14; i += 0.5) {
		d1.push([i, Math.sin(i)]);
	}
	var d2 = [[0, 3], [4, 8], [8, 5], [9, 13]];
	// A null signifies separate line segments
	var d3 = [[0, 12], [7, 12], null, [7, 2.5], [12, 2.5]];
	return [ d1, d2, d3 ];
}
ROSDASH.Flot.prototype.init = function ()
{
	var id = "flot_" + this.block.id;
	// if the canvas exists
	if ($("#" + id).length > 0)
	{
		// create the canvas with default data
			this.plot = $.plot("#" + id, this.getDefaultData(), this.option);
	}
}
//@input	title, data, option, saferange
//@output	none
ROSDASH.Flot.prototype.run = function (input)
{
	//i0 title
	input[0] = (undefined === input[0]) ? this.block.name : input[0];
	$("#myDashboard").sDashboard("setHeaderById", this.block.id, input[0]);
	if (undefined === this.plot)
	{
		this.init();
		return;
	}
	//i1 data
	if (undefined !== input[1])
	{
		// change data format into [[x, data], ...]
		var data = new Array();
		for (var i in input[1])
		{
			var original;
			if (typeof input[1][i] == "object" && undefined !== input[1][i].data)
			{
				original = input[1][i].data;
			} else
			{
				original = input[1][i];
			}
			var d = new Array();
			for (var j in original)
			{
				if (typeof original[j] != "array")
				{
					d.push([j, original[j]]);
				} else if (original[j].length < 2)
				{
					d.push([j, original[j][0]]);
				} else
				{
					d.push([original[j][0], original[j][1]]);
				}
			}
			if (typeof input[1][i] == "object" && undefined !== input[1][i].data)
			{
				original = input[1][i];
				original.data = d;
			} else
			{
				original = d;
			}
			data.push(original);
		}
		this.plot.setData( data );
		this.plot.draw();
	}
}

// V U meter
ROSDASH.Vumeter = function (block)
{
	this.block = block;
	this.canvas_id = "vumeter_" + this.block.id;
}
ROSDASH.Vumeter.prototype.addWidget = function (widget)
{
	widget.widgetContent = '<div id="' + this.canvas_id + '" style="width:100%; height:100%; margin: 0 auto;"></div>';
	return widget;
}
ROSDASH.Vumeter.prototype.init = function ()
{
	$('#' + this.canvas_id).highcharts({
	    chart: {
	        type: 'gauge',
	        plotBorderWidth: 1,
	        plotBackgroundColor: {
	        	linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
	        	stops: [
	        		[0, '#FFF4C6'],
	        		[0.3, '#FFFFFF'],
	        		[1, '#FFF4C6']
	        	]
	        },
	        plotBackgroundImage: null,
	        height: 200
	    },
	    title: {
	        text: 'VU meter'
	    },
	    pane: [{
	        startAngle: -45,
	        endAngle: 45,
	        background: null,
	        center: ['25%', '145%'],
	        size: 300
	    }, {
	    	startAngle: -45,
	    	endAngle: 45,
	    	background: null,
	        center: ['75%', '145%'],
	        size: 300
	    }],
	    yAxis: [{
	        min: -20,
	        max: 6,
	        minorTickPosition: 'outside',
	        tickPosition: 'outside',
	        labels: {
	        	rotation: 'auto',
	        	distance: 20
	        },
	        plotBands: [{
	        	from: 0,
	        	to: 6,
	        	color: '#C02316',
	        	innerRadius: '100%',
	        	outerRadius: '105%'
	        }],
	        pane: 0,
	        title: {
	        	text: 'VU<br/><span style="font-size:8px">Channel A</span>',
	        	y: -40
	        }
	    }, {
	        min: -20,
	        max: 6,
	        minorTickPosition: 'outside',
	        tickPosition: 'outside',
	        labels: {
	        	rotation: 'auto',
	        	distance: 20
	        },
	        plotBands: [{
	        	from: 0,
	        	to: 6,
	        	color: '#C02316',
	        	innerRadius: '100%',
	        	outerRadius: '105%'
	        }],
	        pane: 1,
	        title: {
	        	text: 'VU<br/><span style="font-size:8px">Channel B</span>',
	        	y: -40
	        }
	    }],
	    plotOptions: {
	    	gauge: {
	    		dataLabels: {
	    			enabled: false
	    		},
	    		dial: {
	    			radius: '100%'
	    		}
	    	}
	    },
	    series: [{
	        data: [-20],
	        yAxis: 0
	    }, {
	        data: [-20],
	        yAxis: 1
	    }]
	
	},
	// Let the music play
	function(chart) {
	    setInterval(function() {
	        var left = chart.series[0].points[0],
	            right = chart.series[1].points[0],
	            leftVal, 
	            inc = (Math.random() - 0.5) * 3;
	
	        leftVal =  left.y + inc;
	        rightVal = leftVal + inc / 3;
	        if (leftVal < -20 || leftVal > 6) {
	            leftVal = left.y - inc;
	        }
	        if (rightVal < -20 || rightVal > 6) {
	            rightVal = leftVal;
	        }
	
	        left.update(leftVal, false);
	        right.update(rightVal, false);
	        chart.redraw();
	    }, 500);
	});
}

ROSDASH.Pos2d = function (block)
{
	this.block = block;
}
ROSDASH.Pos2d.prototype.run = function (input)
{
	input[0] = (undefined !== input[0]) ? input[0] : 0;
	input[1] = (undefined !== input[1]) ? input[1] : 0;
	input[2] = (undefined !== input[2]) ? input[2] : 0;
	var output = {
		x : input[0],
		y : input[1],
		yaw : input[2]
	};
	return {o0: output};
}

// a simulated mobile robot
ROSDASH.SimRobot = function (block)
{
	var LAB = [49.276802, -122.914913];
	this.block = block;
	this.boundary = [-100, 100];
	this.last_loc = LAB; //[0, 0];
	this.loc_step = 0.001; //5;
}
//@input	none
//@output	location x, location y, speed, voltage, current
ROSDASH.SimRobot.prototype.run = function (input)
{
	var loc = new Array();
	for (var i = 0; i < 2; ++ i)
	{
		loc[i] = this.last_loc[i] + (Math.random() - 0.5) * this.loc_step;
		/*if (loc[i] < this.boundary[0])
		{
			loc[i] = this.boundary[0];
		} else if (loc[i] > this.boundary[1])
		{
			loc[i] = this.boundary[1];
		}*/
	}
	var output = {
		o0: loc[0], // location x
		o1: loc[1], // location y
		o2: Math.random() * 10, // speed
		o3: Math.random() * 100, // voltage
		o4: Math.random() * 100 // current
	};
	return output;
}

ROSDASH.GmapSimRobotByJoystick = function (block)
{
	var LAB = [49.276802, -122.914913];
	this.block = block;
	this.last_loc = LAB;
	this.loc_step = 0.001;
}
ROSDASH.GmapSimRobotByJoystick.prototype.run = function (input)
{
	var loc = new Array();
	loc[0] = this.last_loc[0] - input[0].dy / 200.0 * this.loc_step;
	loc[1] = this.last_loc[1] + input[0].dx / 200.0 * this.loc_step;
	var output = {
		x: loc[0],
		y: loc[1],
		yaw: 0,
	};
	this.last_loc[0] = loc[0];
	this.last_loc[1] = loc[1];
	return {o0: output};
}

// user list
ROSDASH.userList = function (block)
{
	this.block = block;
	this.list = new Array();
}
ROSDASH.userList.prototype.init = function ()
{
	var self = this;
	$.ajax({
		type: "POST",
		url: "rosdash.php",
		data: {
			func: "getUserList"
		},
		success: function( data, textStatus, jqXHR )
		{
			console.log("userList success: ", data, textStatus, jqXHR);
			var d = data.split(" ");
			for (var i in d)
			{
				if ("" != d[i] && " " != d[i])
				{
					self.list.push('<a href="panel.html?user=' + d[i] + '" target="_blank">' + d[i] + '</a>');
				}
			}
		},
		error: function(jqXHR, textStatus, errorThrown)
		{
			console.log("userList error: ", jqXHR, textStatus, errorThrown);
		}
	});
}
ROSDASH.userList.prototype.run = function (input)
{
	return {o0: this.list};
}

// user welcome
ROSDASH.userWelcome = function (block)
{
	this.block = block;
}
ROSDASH.userWelcome.prototype.run = function (input)
{
	var output = '<h1 style="color:blue;">Welcome to ROSDASH, ' + ROSDASH.user_conf.name + ' !</h1><p>';
	if (undefined !== ROSDASH.user_conf.discrip && "" != ROSDASH.user_conf.discrip)
	{
		output += ROSDASH.user_conf.discrip + '</p><p>';
	}
	output += 'Please select your panel or diagram from the list on the right.</p>';
		//+ '<p>or add new panel or diagram.</p>';
	return {o0: output};
}

// panel list
ROSDASH.panelList = function (block)
{
	this.block = block;
	this.list = new Array();
}
ROSDASH.panelList.prototype.init = function ()
{
	var self = this;
	$.ajax({
		type: "POST",
		url: "rosdash.php",
		data: {
			func: "getPanelList",
			user: ROSDASH.user_conf.name
		},
		success: function( data, textStatus, jqXHR )
		{
			console.log("panelList success: ", data, textStatus, jqXHR);
			var d = data.split(" ");
			for (var i in d)
			{
				if ("" != d[i] && " " != d[i])
				{
					var pos = d[i].indexOf("-");
					var file_name = d[i].substring(0, pos);
					if (pos < 0)
					{
						continue;
					} else if (d[i].substring(pos) == "-panel.json")
					{
						self.list.push(file_name);
						self.list.push('<a href="panel.html?user=' + ROSDASH.user_conf.name + '&panel=' + file_name + '&host=192.168.1.125" target="_blank">Panel</a>');
						if (d.indexOf(file_name + "-diagram.json") != -1)
						{
							self.list.push('<a href="diagram.html?user=' + ROSDASH.user_conf.name + '&panel=' + file_name + '&host=192.168.1.125" target="_blank">Diagram</a>');
							d.splice(d.indexOf(file_name + "-diagram.json"), 1);
						} else
						{
							self.list.push(" ");
						}
					} else if (d[i].substring(pos) == "-diagram.json")
					{
						self.list.push(file_name);
						if (d.indexOf(file_name + "-panel.json") != -1)
						{
							self.list.push('<a href="panel.html?user=' + ROSDASH.user_conf.name + '&panel=' + file_name + '&host=192.168.1.125" target="_blank">Panel</a>');
							d.splice(d.indexOf(file_name + "-panel.json"), 1);
						} else
						{
							self.list.push(" ");
						}
						self.list.push('<a href="diagram.html?user=' + ROSDASH.user_conf.name + '&panel=' + file_name + '&host=192.168.1.125" target="_blank">Diagram</a>');
					}
				}
			}
		},
		error: function(jqXHR, textStatus, errorThrown)
		{
			console.log("userList error: ", jqXHR, textStatus, errorThrown);
		}
	}).done(function() { console.log("success"); })
    .fail(function() { console.log("error"); })
    .always(function() { console.log("complete"); });;
}
ROSDASH.panelList.prototype.run = function (input)
{
	return {o0: this.list};
}

ROSDASH.VirtualJoystick = function (block)
{
	this.block = block;
	this.canvas_id = "VirtualJoystick_" + this.block.id;
	this.joystick;
}
ROSDASH.VirtualJoystick.prototype.addWidget = function (widget)
{
	widget.widgetContent = '<div id="' + this.canvas_id + '" style="width:100%; height:100%; -webkit-user-select: none; -moz-user-select: none;"></div>';
	return widget;
}
ROSDASH.VirtualJoystick.prototype.init = function ()
{
	console.log("touchscreen for VirtualJoystick is", VirtualJoystick.touchScreenAvailable() ? "available" : "not available");
	this.joystick = new VirtualJoystick({
		container	: document.getElementById(this.canvas_id),
		mouseSupport	: true
	});
}
ROSDASH.VirtualJoystick.prototype.run = function (input)
{
	if (undefined === this.joystick)
	{
		this.init();
	}
	return {o0: {
		dx: this.joystick.deltaX(),
		dy: this.joystick.deltaY(),
		right: this.joystick.right(),
		up: this.joystick.up(),
		left: this.joystick.left(),
		down: this.joystick.down()
		}};
}
