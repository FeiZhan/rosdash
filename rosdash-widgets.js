// constant value
ROSDASH.Constant = function (block)
{
	this.block = block;
}
//@input	none
//@output	the value of the constant
ROSDASH.Constant.prototype.run = function (input)
{
	return {o0: this.block.value};
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

//@deprecated
ROSDASH.rosMsg = new Object();
// ROS topic
ROSDASH.Topic = function (block)
{
	this.block = block;
	this.ros_msg = {error: "cannot connect to this topic"};
}
// subscribe a ROS topic for once
ROSDASH.Topic.prototype.init = function ()
{
	var rosname = this.block.rosname;
	//@todo how can we choose the type?
	var type = 'std_msgs/String';
	ROSDASH.rosMsg[rosname] = {error: "cannot connect to this topic"};
	var listener = new ROSLIB.Topic({
		ros : ROSDASH.ros,
		name : rosname,
		messageType : type
	});
	var self = this;
	// subscribe a ROS topic
	listener.subscribe(function(message)
	{
		self.ros_msg = message;
		ROSDASH.rosMsg[rosname] = message;
		//listener.unsubscribe();
	});
}
//@input	none
//@output	ROS topic message
ROSDASH.Topic.prototype.run = function (input)
{
	var output = new Object();
	if (undefined !== this.block.rosname)
	{
		//ROSDASH.rosMsg[name] = "running";
		output.o0 = ROSDASH.rosMsg[this.block.rosname];
	}
	return output;
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
	if ($('#' + this.canvas_id).length > 0)
	{
		$('#' + this.canvas_id).wrap('<div id="' + this.button_id + '" class="switch" data-on-label="ROCK!" data-off-label="NO" />').parent().bootstrapSwitch();
		$('#' + this.button_id).on('switch-change', function (e, data) {
			var $el = $(data.el)
			  , value = data.value;
			console.log("toggled button");
		});
		//$('#toggle-state-switch').bootstrapSwitch('toggleState');
		//$('#toggle-state-switch').bootstrapSwitch('setState', false); // true || false
	} else
	{
		setTimeout(ROSDASH.ToggleButton.init, 500);
	}
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
ROSDASH.Speech = function (block)
{
	this.block = block;
	this.content = "";
}
ROSDASH.Speech.prototype.addWidget = function (widget)
{
	//@change id
	widget.widgetTitle = widget.widgetId + ' <input type="button" id="speak" value="speak" /><span id="audio"></span>';
	widget.widgetContent = "";
	return widget;
}
// speak by speak.js
ROSDASH.Speech.prototype.speak = function ()
{
	speak(this.content);
}
// add callback function to speak button
ROSDASH.Speech.prototype.init = function ()
{
	var s = $("#speak");
	if (s.length > 0)
	{
		$("#speak").click(ROSDASH.Speech.speak);
	}
}
//@input	the content to speak
//@output	none
ROSDASH.Speech.prototype.run = function (input)
{
	input[0] = (undefined === input[0]) ? "(empty content)" : input[0];
	// if new message comes, speak
	if (ROSDASH.Speech.content != input[0])
	{
		//ROSDASH.Speech.speak();
		ROSDASH.Speech.content = input[0];
	}
	$("#myDashboard").sDashboard("setContentById", this.block.id, input[0]);
}

// table
ROSDASH.Table = function (block)
{
	this.block = block;
}
//@input	header, titles, contents, and layout for table
//@output	none
ROSDASH.Table.prototype.run = function (input)
{
	// default value for header
	input[0] = (undefined === input[0]) ? this.block.name : input[0];
	$("#myDashboard").sDashboard("setHeaderById", this.block.id, input[0]);
	// for titles
	var aoColumns = new Array();
	for (var i in input[1])
	{
		aoColumns.push({sTitle: input[1][i]});
	}
	// for contents
	var tableDef = {
		"aaData" : input[2],
		"aoColumns" : aoColumns
	};
	//@todo considering the layout
	var dataTable = $('<table cellpadding="0" cellspacing="0" border="0" class="display sDashboardTableView table table-bordered"></table>').dataTable(tableDef);
	$("#myDashboard").sDashboard("setContentById", block.id, dataTable);
}

// Turtlesim from ROS desktop widget
ROSDASH.Turtlesim = function (block)
{
	this.block = block;
	this.canvas_id = "turtlesim_" + this.block.id;
}
ROSDASH.Turtlesim.prototype.addWidget = function (widget)
{
	widget.widgetContent = '<canvas id="' + this.canvas_id + '" width="100%" height="100%" style="border: 2px solid black"></canvas>';
	return widget;
}
ROSDASH.Turtlesim.prototype.init = function ()
{
	//@note a traditional ROS connection
	var ros = new ROS('ws://192.168.1.123:9090');
	ros.on('connection', function()
	{
		console.log("traditional ROS connected");
		var context = document.getElementById(this.canvas_id).getContext('2d');
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
}
ROSDASH.Ros2d.prototype.addWidget = function (widget)
{
	widget.widgetContent = '<div id="' + this.canvas_id + '"></div>';
	return widget;
}
ROSDASH.Ros2d.prototype.init = function ()
{
	if (ROSDASH.ros_connected)
	{
		//@note width and height
		// Create the main viewer.
		var viewer = new ROS2D.Viewer({
		  divID : this.canvas_id,
		  width : 308,
		  height : 250
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
	} else
	{
		// wait for ROS to start
		setTimeout(ROSDASH.Ros2d.init, 500);
	}
}

// ros3djs
ROSDASH.Ros3d = function (block)
{
	this.block = block;
	this.canvas_id = "ros3d_" + this.block.id;
}
ROSDASH.Ros3d.prototype.addWidget = function (widget)
{
	widget.widgetContent = '<div id="' + this.canvas_id + '"></div>';
	return widget;
}
ROSDASH.Ros3d.prototype.init = function ()
{
	if (ROSDASH.ros_connected)
	{
		//@note height and width
		// Create the main viewer.
		var viewer = new ROS3D.Viewer({
		  divID : this.canvas_id,
		  width : 80,
		  height : 60,
		  antialias : true
		});
		// Setup the marker client.
		var gridClient = new ROS3D.OccupancyGridClient({
		  ros : ROSDASH.ros,
		  rootObject : viewer.scene
		});
	} else
	{
		// wait for ROS to start
		setTimeout(ROSDASH.Ros3d.init, 500);
	}
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
	} else
	{
		setTimeout(ROSDASH.Gmap.init, 500);
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
		console.error("not enough arguments: " + this.block.id);
		return;
	}
	// for a new robot
	if (! (this.block.id in ROSDASH.GmapTraj.robot))
	{
		this.robot[block.id] = new Object();
	}
	for (var i in input[1])
	{
		// clear the old position
		if (undefined !== this.robot[block.id].robot)
		{
			this.robot[block.id].robot.setMap(null);
		}
		this.robot[block.id].robot = new google.maps.Marker({
			position: new google.maps.LatLng(input[1][i].x, input[1][i].y),
			map: input[0],	// google maps object
			title: "robot " + i,
			icon: "resource/cabs.png",
			//shadow: {url: 'resource/cabs.shadow.png',}
		});
	}
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
	} else
	{
		setTimeout(this.init, 500);
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
		return;
	}
	//i1 data
	if (undefined !== input[1])
	{
		// change data format into [[x, data], ...]
		var data = new Array();
		for (var i in input[1])
		{
			var d = new Array();
			for (var j in input[1][i])
			{
				if (typeof input[1][i][j] != "array")
				{
					d.push([j, input[1][i][j]]);
				} else if (input[1][i][j].length < 2)
				{
					d.push([j, input[1][i][j][0]]);
				} else
				{
					d.push([input[1][i][j][0], input[1][i][j][1]]);
				}
			}
			data.push(d);
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

// a simulated mobile robot
ROSDASH.SimRobot = function (block)
{
	this.block = block;
	this.boundary = [-100, 100];
	this.last_loc = [0, 0];
	this.loc_step = 5;
}
//@input	none
//@output	location x, location y, speed, voltage, current
ROSDASH.SimRobot.prototype.run = function (input)
{
	var loc = new Array();
	for (var i = 0; i < 2; ++ i)
	{
		loc[i] = this.last_loc[0] + (Math.random() - 0.5) * this.loc_step;
		if (loc[i] < this.boundary[0])
		{
			loc[i] = this.boundary[0];
		} else if (loc[i] > this.boundary[1])
		{
			loc[i] = this.boundary[1];
		}
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
