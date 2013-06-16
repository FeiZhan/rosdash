ROSDASH.Constant = new Object();
ROSDASH.Constant.run = function (block, input)
{
	return {o0: block.value};
}

ROSDASH.Array = new Object();
ROSDASH.Array.run = function (block, input)
{
	var a = new Array();
	for (var i in input)
	{
		a.push(input[i]);
	}
	return {o0: a};
}

ROSDASH.Addition = new Object();
ROSDASH.Addition.run = function (block, input)
{
	var sum = input[0];
	for (var i = 1; i < input.length; ++ i)
	{
		sum += input[i];
	}
	return {o0: sum};
}

ROSDASH.Switch = new Object();
ROSDASH.Switch.run = function (block, input)
{
	//@todo design default value and compulsory inputs
	if (input.length < 2)
	{
		console.error("input not enough: " + block.id);
		return undefined;
	}
	var output = new Object();
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
	} else
	{
		if (input[0] == input[1])
		{
			output["o0"] = true;
		} else
		{
			output["o0"] = false;
		}
	}
	return output;
}

ROSDASH.rosMsg = new Object();
ROSDASH.Topic = new Object();
ROSDASH.Topic.runOnce = function (block)
{
	var rosname = block.rosname;
	var type = 'std_msgs/String';
	ROSDASH.rosMsg[rosname] = {error: "cannot connect to this topic"};
	var listener = new ROSLIB.Topic({
		ros : ROSDASH.ros,
		name : rosname,
		messageType : type
	});
	listener.subscribe(function(message)
	{
		ROSDASH.rosMsg[rosname] = message;
		//listener.unsubscribe();
	});
}
ROSDASH.Topic.run = function (block, input)
{
	var output = new Object();
	if (undefined !== block.rosname)
	{
		//ROSDASH.rosMsg[name] = "running";
		output.o0 = ROSDASH.rosMsg[block.rosname];
	}
	return output;
}

ROSDASH.msgToStr = new Object();
ROSDASH.msgToStr.run = function (block, input)
{
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
			str += ROSDASH.msgToStr.run(block, {0: msg[i]}).o0;
			str += " ) ";
		}
	} else
	{
		str += msg;
	}
	var output = {o0: str};
	return output;
}
ROSDASH.Text = new Object();
ROSDASH.Text.run = function (block, input)
{
	input[0] = (undefined === input[0]) ? block.name : input[0];
	input[1] = (undefined === input[1]) ? "(empty content)" : input[1];
	$("#myDashboard").sDashboard("setHeaderById", block.id, input[0]);
	$("#myDashboard").sDashboard("setContentById", block.id, input[1]);
}

ROSDASH.Speech = new Object();
ROSDASH.Speech.init = function (widget)
{
	widget.widgetTitle = widget.widgetId + ' <input type="button" id="speak" value="speak" /><span id="audio"></span>';
	widget.widgetContent = "";
	return widget;
}
ROSDASH.Speech.runOnce = function (block)
{
	var s = $("#speak");
	if (s.length > 0)
	{
		$("#speak").click(ROSDASH.Speech.speak);
	}
}
ROSDASH.Speech.content = "";
ROSDASH.Speech.run = function (block, input)
{
	input[0] = (undefined === input[0]) ? "(empty content)" : input[0];
	ROSDASH.Speech.content = input[0];
	$("#myDashboard").sDashboard("setContentById", block.id, input[0]);
}
ROSDASH.Speech.speak = function ()
{
	speak(ROSDASH.Speech.content);
}

ROSDASH.Table = new Object();
ROSDASH.Table.run = function (block, input)
{
	input[0] = (undefined === input[0]) ? block.name : input[0];
	var aoColumns = new Array();
	for (var i in input[1])
	{
		aoColumns.push({sTitle: input[1][i]});
	}
	$("#myDashboard").sDashboard("setHeaderById", block.id, input[0]);
	var tableDef = {
		"aaData" : input[2],
		"aoColumns" : aoColumns
	};
	var dataTable = $('<table cellpadding="0" cellspacing="0" border="0" class="display sDashboardTableView table table-bordered"></table>').dataTable(tableDef);
	$("#myDashboard").sDashboard("setContentById", block.id, dataTable);
}

ROSDASH.Gmap = new Object();
ROSDASH.Gmap.gmap = undefined;
ROSDASH.Gmap.init = function (widget)
{
	widget.widgetContent = '<div id="map-canvas" class="sDashboardWidgetContent" />';
	return widget;
}
ROSDASH.Gmap.initGmap = function ()
{
	var LAB = [49.276802, -122.914913];
	if ($("#map-canvas").length)
	{
		var mapOptions = {
		  center: new google.maps.LatLng(LAB[0], LAB[1]),
		  zoom: 14,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		ROSDASH.Gmap.gmap = new google.maps.Map(document.getElementById("map-canvas"),
			mapOptions);
	}
}
ROSDASH.Gmap.resizeGmap = function ()
{
	google.maps.event.trigger(ROSDASH.Gmap.gmap, "resize");
}

ROSDASH.Flot = new Object();
ROSDASH.Flot.plot;
ROSDASH.Flot.init = function (widget)
{
	widget.widgetContent = '<div id="placeholder" class="draculaWidgetContent" style="height:190px" />';
	return widget;
}
ROSDASH.Flot.getDefaultData = function ()
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
ROSDASH.Flot.option = {
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
	//@bug still some bugs
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
ROSDASH.Flot.runOnce = function (block)
{
	if ($("#placeholder").length > 0)
	{
		$(function() {
			ROSDASH.Flot.plot = $.plot("#placeholder", ROSDASH.Flot.getDefaultData(), ROSDASH.Flot.option);
		});
	}
}
ROSDASH.Flot.run = function (block, input)
{
	input[0] = (undefined === input[0]) ? block.name : input[0];
	$("#myDashboard").sDashboard("setHeaderById", block.id, input[0]);
	input[1] = (undefined === input[1]) ? ROSDASH.Flot.getDefaultData() : input[1];
	var data = new Array();
	for (var i in input[1])
	{
		var d = new Array();
		for (var j in input[1][i])
		{
			if (input[1][i][j].length < 2)
			{
				d.push([j, input[1][i][j]]);
			} else
			{
				d.push([input[1][i][j][0], input[1][i][j][1]]);
			}
		}
		data.push(d);
	}
	ROSDASH.Flot.plot.setData( data );
	ROSDASH.Flot.plot.draw();
}
