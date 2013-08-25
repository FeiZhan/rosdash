//@bug input.length does not work

//////////////////////////////////// datatype

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

// multi array
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

//////////////////////////////////// functional flow

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

//////////////////////////////////// ROS

ROSDASH.RosList = function (block)
{
	this.block = block;
}
ROSDASH.RosList.prototype.run = function (input)
{
	var output = new Array();
	var tmp = new Array();
	var max = Math.max( Math.max(ROSDASH.rosNames.topic["_"].length, ROSDASH.rosNames.service["_"].length), ROSDASH.rosNames.param["_"].length);
	for (var i = 0; i < max; ++ i)
	{
		tmp = new Array();
		if (ROSDASH.rosNames.topic["_"].length > i)
		{
			tmp[0] = ROSDASH.rosNames.topic["_"][i];
		} else
		{
			tmp[0] = " ";
		}
		if (ROSDASH.rosNames.service["_"].length > i)
		{
			tmp[1] = ROSDASH.rosNames.service["_"][i];
		} else
		{
			tmp[1] = " ";
		}
		if (ROSDASH.rosNames.param["_"].length > i)
		{
			tmp[2] = ROSDASH.rosNames.param["_"][i];
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
	return {o0: ROSDASH.rosNames.topic["_"]};
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

//////////////////////////////////// input

// toggle button (don't use the name of switch since it is used)
ROSDASH.ToggleButton = function (block)
{
	this.block = block;
	this.canvas_id = "togglebutton_" + this.block.id;
	this.button_id = "togglebutton2_" + this.block.id;
	this.value = true;
}
ROSDASH.ToggleButton.prototype.addWidget = function (widget)
{
	widget.widgetContent = '<input id="' + this.canvas_id + '" type="checkbox" checked />';
	return widget;
}
ROSDASH.ToggleButton.prototype.init = function ()
{
	$('#' + this.canvas_id).wrap('<div id="' + this.button_id + '" class="switch" data-on-label="ROCK!" data-off-label="NO" />').parent().bootstrapSwitch();
	var that = this;
	$('#' + this.button_id).on('switch-change', function (e, data) {
		that.value = data.value;
	});
	//$('#toggle-state-switch').bootstrapSwitch('toggleState');
	//$('#toggle-state-switch').bootstrapSwitch('setState', false); // true || false

}
ROSDASH.ToggleButton.prototype.run = function (input)
{
	return {o0: this.value};
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
	//console.log("touchscreen for VirtualJoystick is", VirtualJoystick.touchScreenAvailable() ? "available" : "not available");
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

//////////////////////////////////// basic output

// text widget
ROSDASH.Text = function (block)
{
	this.block = block;
	this.title;
	this.content;
}
//@input	header and content strings
//@output	none
ROSDASH.Text.prototype.run = function (input)
{
	// default value for inputs
	input[0] = (undefined === input[0]) ? this.block.name : input[0];
	input[1] = (undefined === input[1]) ? "(empty content)" : input[1];
	if (this.title != input[0])
	{
		this.title = input[0];
		$("#myDashboard").sDashboard("setHeaderById", this.block.id, input[0]);
	}
	if (this.content != input[1])
	{
		this.content = input[1];
		$("#myDashboard").sDashboard("setContentById", this.block.id, input[1]);
	}
}

// text widget with speaking widget
ROSDASH.speak_content = "";
ROSDASH.Speech = function (block)
{
	this.block = block;
	this.content = "";
	this.canvas_id = "Speech" + this.block.id;
}
ROSDASH.Speech.prototype.addWidget = function (widget)
{
	//@todo change id
	widget.widgetTitle = this.canvas_id + ' <input type="button" id="speak" value="speak" /><span id="audio"></span>';
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
	// for content
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

//////////////////////////////////// network

ROSDASH.cyNetwork = function (block)
{
	this.block = block;
	this.canvas = "cyNetwork_" + this.block.id;
	this.cy;
	this.init_success = false;
}
ROSDASH.cyNetwork.prototype.addWidget = function (widget)
{
	widget.widgetContent = '<div id="' + this.canvas + '" style="width:100%; height:100%;"></div>';
	return widget;
}
ROSDASH.cyNetwork.prototype.init = function ()
{
	if ($("#" + this.canvas).length <= 0 || this.init_success)
	{
		return;
	}
	var that = this;
  var options = {
    showOverlay: false,
    minZoom: 0.5,
    maxZoom: 2,
    style: cytoscape.stylesheet()
      .selector('node')
        .css({
          'content': 'data(name)',
          'font-family': 'helvetica',
          'font-size': 14,
          'text-outline-width': 3,
          'text-outline-color': '#888',
          'text-valign': 'center',
          'color': '#fff',
          'width': 'mapData(weight, 30, 80, 20, 50)',
          'height': 'mapData(height, 0, 200, 10, 45)',
          'border-color': '#fff'
        })
      .selector(':selected')
        .css({
          'background-color': '#000',
          'line-color': '#000',
          'target-arrow-color': '#000',
          'text-outline-color': '#000'
        })
      .selector('edge')
        .css({
          'width': 2,
          'target-arrow-shape': 'triangle'
        })
    ,
    elements: {
      nodes: [
        {
          data: { id: 'j', name: 'Jerry', weight: 65, height: 174 }
        },
        {
          data: { id: 'e', name: 'Elaine', weight: 48, height: 160 }
        },
        {
          data: { id: 'k', name: 'Kramer', weight: 75, height: 185 }
        },
        {
          data: { id: 'g', name: 'George', weight: 70, height: 150 }
        }
      ],
      edges: [
        { data: { source: 'j', target: 'e' } },
        { data: { source: 'j', target: 'k' } },
        { data: { source: 'j', target: 'g' } },

        { data: { source: 'e', target: 'j' } },
        { data: { source: 'e', target: 'k' } },

        { data: { source: 'k', target: 'j' } },
        { data: { source: 'k', target: 'e' } },
        { data: { source: 'k', target: 'g' } },

        { data: { source: 'g', target: 'j' } }
      ],
    },
    ready: function(){
      that.cy = this;
    }
  };
  $('#' + this.canvas).cytoscape(options);
	this.init_success = true;
}
ROSDASH.cyNetwork.prototype.run = function (input)
{
	if (! this.init_success && $("#" + this.canvas).length > 0)
	{
		this.init();
	}
	return {o0: this.cy};
}

ROSDASH.cyNetworkLoadOnce = function (block)
{
	this.block = block;
	this.success = false;
}
ROSDASH.cyNetworkLoadOnce.prototype.run = function (input)
{
	if (! this.success && undefined !== input[0] && undefined !== input[1])
	{
		input[0].load(input[1]);
		this.success = true;
	}
	return {o0: input[0]};
}

ROSDASH.cyDiagram = function (block)
{
	this.block = block;
	this.canvas = "cy";
	this.duplicate = false;
	this.cy;
	this.init_success = false;
}
ROSDASH.cyDiagram.prototype.addWidget = function (widget)
{
	if ($("#" + this.canvas).length <= 0)
	{
		widget.widgetContent = '<div id="' + this.canvas + '" style="width:100%; height:100%;"></div>';
	} else
	{
		this.duplicate = true;
	}
	return widget;
}
ROSDASH.cyDiagram.prototype.init = function ()
{
	if (this.duplicate || $("#" + this.canvas).length <= 0 || this.init_success)
	{
		return;
	}
	ROSDASH.runDiagram(ROSDASH.userConf.name, ROSDASH.userConf.panel_name, undefined);
	this.init_success = true;
}

ROSDASH.arborNetwork = function (block)
{
	this.block = block;
	this.canvas = "arborNetwork_" + this.block.id;
	this.init_success = false;
}
ROSDASH.arborNetwork.prototype.addWidget = function (widget)
{
	widget.widgetContent = '<canvas id="' + this.canvas + '" style="width:100%; height:100%;"></canvas>';
	return widget;
}
ROSDASH.arborNetwork.prototype.init = function ()
{
	if ($("#" + this.canvas).length <= 0 || this.init_success)
	{
		return;
	}
	arborInit(this.canvas);
	this.init_success = true;
}
ROSDASH.arborNetwork.prototype.run = function (input)
{
	if (! this.init_success && $("#" + this.canvas).length > 0)
	{
		this.init();
	}
}

ROSDASH.draculaNetwork = function (block)
{
	this.block = block;
	this.canvas = "draculaNetwork_" + this.block.id;
	this.init_success = false;
}
ROSDASH.draculaNetwork.prototype.addWidget = function (widget)
{
	widget.widgetContent = '<div id="' + this.canvas + '" style="width:100%; height:100%;"></div>';
	return widget;
}
ROSDASH.draculaNetwork.prototype.init = function ()
{
	if ($("#" + this.canvas).length <= 0 || this.init_success)
	{
		return;
	}
	draculaInit(this.canvas);
	this.init_success = true;
}
ROSDASH.draculaNetwork.prototype.run = function (input)
{
	if (! this.init_success && $("#" + this.canvas).length > 0)
	{
		this.init();
	}
}

//////////////////////////////////// database

	/*var cities = TAFFY([{name:"New York",state:"WA"},{name:"Las Vegas",state:"NV"},{name:"Boston",state:"MA"}]);
	cities.insert({name:"Portland",state:"OR"});
	console.debug("db: " + cities({name:"Boston"}).count());*/
ROSDASH.JsDatabase = function (block)
{
	this.block = block;
	this.database;
}
ROSDASH.JsDatabase.prototype.init = function ()
{
	this.database = TAFFY([{name:"New York",state:"WA"},{name:"Las Vegas",state:"NV"},{name:"Boston",state:"MA"}]);
}
ROSDASH.JsDatabase.prototype.run = function (input)
{
	return {o0 : this.database};
}

ROSDASH.JsDbInsert = function (block)
{
	this.block = block;
}
ROSDASH.JsDbInsert.prototype.run = function (input)
{
	if (undefined !== input[0])
	{
		input[0].insert({key: input[1], value: input[2]});
	}
	return {o0 : input[0]};
}

ROSDASH.JsDbQuery = function (block)
{
	this.block = block;
}
ROSDASH.JsDbQuery.prototype.run = function (input)
{
	var output;
	if (undefined !== input[0])
	{
		output = input[0]({key: input[1]}).value;
	}
	return {o0 : input[0], o1 : output};
}


//////////////////////////////////// multimedia

ROSDASH.UserCamera = function (block)
{
	this.block = block;
	this.canvas_id = "UserCamera_" + this.block.id;
	this.init_success = false;
	this.video;
	this.canvas;
	this.context;
	this.imageData;
	this.detector;
    this.lastTime = 0;
	this.vendors = ['ms', 'moz', 'webkit', 'o'];
}
ROSDASH.UserCamera.prototype.addWidget = function (widget)
{
	widget.widgetContent = '<video id="video' + this.canvas_id + '" autoplay="true" style="display:none;"></video>' + 
		'<canvas id="canvas' + this.canvas_id + '" style="width:640px; height:480px;"></canvas>';
	return widget;
}
ROSDASH.UserCamera.prototype.init = function ()
{
	if ($("#video" + this.canvas_id).length > 0)
	{
		this.onLoad();
		this.init_success = true;
	}
}
ROSDASH.UserCamera.prototype.onLoad = function ()
{
	this.video = document.getElementById("video" + this.canvas_id);
	this.canvas = document.getElementById("canvas" + this.canvas_id);
	this.context = this.canvas.getContext("2d");
	this.canvas.width = parseInt(this.canvas.style.width);
	this.canvas.height = parseInt(this.canvas.style.height);
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
	var that = this;
	if (navigator.getUserMedia) {
		function successCallback(stream){
		  if (window.webkitURL) {
			that.video.src = window.webkitURL.createObjectURL(stream);
		  } else if (video.mozSrcObject !== undefined) {
			that.video.mozSrcObject = stream;
		  } else {
			that.video.src = stream;
		  }
		}
		function errorCallback(error) {}
		navigator.getUserMedia({video: true}, successCallback, errorCallback);
		that.detector = new AR.Detector();
		this.requestAnimationFrame();
	}
}
ROSDASH.UserCamera.prototype.tick = function ()
{
	var that = this;
	this.requestAnimationFrame();
	if (this.video.readyState === this.video.HAVE_ENOUGH_DATA){
		this.snapshot();
		var markers = this.detector.detect(this.imageData);
		this.drawCorners(markers);
		this.drawId(markers);
	}
}
ROSDASH.UserCamera.prototype.requestAnimationFrame = function(element)
{
	var currTime = new Date().getTime();
	var timeToCall = Math.max(0, 16 - (currTime - this.lastTime));
	var that = this;
	var id = window.setTimeout(function() { that.tick(currTime + timeToCall); }, 
	  timeToCall);
	this.lastTime = currTime + timeToCall;
	return id;
}
ROSDASH.UserCamera.prototype.snapshot = function ()
{
	this.context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
	this.imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
}
ROSDASH.UserCamera.prototype.drawCorners = function (markers)
{
	var corners, corner, i, j;
	this.context.lineWidth = 3;
	for (i = 0; i !== markers.length; ++ i)
	{
		corners = markers[i].corners;
		this.context.strokeStyle = "red";
		this.context.beginPath();
		for (j = 0; j !== corners.length; ++ j)
		{
			corner = corners[j];
			this.context.moveTo(corner.x, corner.y);
			corner = corners[(j + 1) % corners.length];
			this.context.lineTo(corner.x, corner.y);
		}
		this.context.stroke();
		this.context.closePath();
		this.context.strokeStyle = "green";
		this.context.strokeRect(corners[0].x - 2, corners[0].y - 2, 4, 4);
	}
}
ROSDASH.UserCamera.prototype.drawId = function (markers)
{
	var corners, corner, x, y, i, j;
	this.context.strokeStyle = "blue";
	this.context.lineWidth = 1;
	for (i = 0; i !== markers.length; ++ i)
	{
		corners = markers[i].corners;
		x = Infinity;
		y = Infinity;
		for (j = 0; j !== corners.length; ++ j)
		{
			corner = corners[j];
			x = Math.min(x, corner.x);
			y = Math.min(y, corner.y);
		}
		this.context.strokeText(markers[i].id, x, y)
	}
}
ROSDASH.UserCamera.prototype.run = function (input)
{
	if (! this.init_success)
	{
		this.init();
	}
	return {o0 : this.video};
}

ROSDASH.HeadTracker = function (block)
{
	this.block = block;
	this.canvas = "HeadTracker" + this.block.id;
	var LAB = [49.276802, -122.914913];
	this.pos = new Object();
	this.last = LAB;
}
ROSDASH.HeadTracker.prototype.addWidget = function (widget)
{
	widget.widgetTitle += "";
	widget.widgetContent = '<canvas id="compare' + this.canvas + '" width="320" height="240" style="display:none"></canvas>' +
		'<video id="vid' + this.canvas + '" autoplay loop width="320" height="240"></video>' +
		'<canvas id="overlay' + this.canvas + '" width="320" height="240"></canvas>' +
		'<canvas id="debug' + this.canvas + '" width="320" height="240"></canvas>' +
		'<p id="gUMMessage"></p>' +
		'<p>Status : <span id="headtrackerMessage"></span></p>' +
		'<p><input type="button" onclick="htracker.stop();htracker.start();" value="reinitiate facedetection"></input>' +
		'<br/><br/>' +
		'<input type="checkbox" onclick="showProbabilityCanvas()" value="asdfasd"></input>Show probability-map</p>';
	return widget;
}
ROSDASH.HeadTracker.prototype.init = function ()
{
	if ($("#vid" + this.canvas).length <= 0)
	{
		return;
	}
	// set up video and canvas elements needed
	var videoInput = document.getElementById('vid' + this.canvas);
	var canvasInput = document.getElementById('compare' + this.canvas);
	var canvasOverlay = document.getElementById('overlay' + this.canvas)
	var debugOverlay = document.getElementById('debug' + this.canvas);
	var overlayContext = canvasOverlay.getContext('2d');
	canvasOverlay.style.position = "absolute";
	canvasOverlay.style.top = "auto"; //'0px';
	canvasOverlay.style.zIndex = '100001';
	canvasOverlay.style.display = 'block';
	debugOverlay.style.position = "absolute";
	debugOverlay.style.top = "auto"; //'0px';
	debugOverlay.style.zIndex = '100002';
	debugOverlay.style.display = 'none';
	// add some custom messaging
	statusMessages = {
		"whitebalance" : "checking for stability of camera whitebalance",
		"detecting" : "Detecting face",
		"hints" : "Hmm. Detecting the face is taking a long time",
		"redetecting" : "Lost track of face, redetecting",
		"lost" : "Lost track of face",
		"found" : "Tracking face"
	};
	supportMessages = {
		"no getUserMedia" : "Unfortunately, <a href='http://dev.w3.org/2011/webrtc/editor/getusermedia.html'>getUserMedia</a> is not supported in your browser. Try <a href='http://www.opera.com/browser/'>downloading Opera 12</a> or <a href='http://caniuse.com/stream'>another browser that supports getUserMedia</a>. Now using fallback video for facedetection.",
		"no camera" : "No camera found. Using fallback video for facedetection."
	};
	document.addEventListener("headtrackrStatus", function(event) {
		if (event.status in supportMessages) {
			var messagep = document.getElementById('gUMMessage');
			messagep.innerHTML = supportMessages[event.status];
		} else if (event.status in statusMessages) {
			var messagep = document.getElementById('headtrackerMessage');
			messagep.innerHTML = statusMessages[event.status];
		}
	}, true);
	// the face tracking setup
	var htracker = new headtrackr.Tracker({altVideo : {ogv : "./media/capture5.ogv", mp4 : "./media/capture5.mp4"}, calcAngles : true, ui : false, headPosition : false, debug : debugOverlay});
	htracker.init(videoInput, canvasInput);
	htracker.start();
	var that = this;
	// for each facetracking event received draw rectangle around tracked face on canvas
	document.addEventListener("facetrackingEvent", function( event ) {
		// clear canvas
		overlayContext.clearRect(0,0,320,240);
		// once we have stable tracking, draw rectangle
		if (event.detection == "CS") {
			for (var i in event)
			{
				that.pos[i] = event[i];
			}
			overlayContext.translate(event.x, event.y)
			overlayContext.rotate(event.angle-(Math.PI/2));
			overlayContext.strokeStyle = "#00CC00";
			overlayContext.strokeRect((-(event.width/2)) >> 0, (-(event.height/2)) >> 0, event.width, event.height);
			overlayContext.rotate((Math.PI/2)-event.angle);
			overlayContext.translate(-event.x, -event.y);
		}
	});
	// turn off or on the canvas showing probability
	function showProbabilityCanvas() {
		var debugCanvas = document.getElementById('debug');
		if (debugCanvas.style.display == 'none') {
			debugCanvas.style.display = 'block';
		} else {
			debugCanvas.style.display = 'none';
		}
	}
}
ROSDASH.HeadTracker.prototype.run = function (input)
{
	var output = {x : this.last[0], y : this.last[1]};
	if (undefined !== this.pos)
	{
		this.pos.dx = (undefined !== this.pos.lastX) ? this.pos.x - this.pos.lastX : 0;
		this.pos.dy = (undefined !== this.pos.lastY) ? this.pos.y - this.pos.lastY : 0;
		this.pos.lastX = this.pos.x;
		this.pos.lastY = this.pos.y;
		output.x = this.last[0] - this.pos.dy * 0.0001;
		output.y = this.last[1] + this.pos.dx * 0.0001;
		this.last[0] = output.x;
		this.last[1] = output.y;
	}
	return {o0 : output};
}

ROSDASH.HandTracker = function (block)
{
	this.block = block;
	this.canvas = "HandTracker_" + this.block.id;
}
ROSDASH.HandTracker.prototype.addWidget = function (widget)
{
	widget.widgetContent =	'<video id="video" autoplay="true" style="display:none;"></video>' +
		'<canvas id="canvas" style="width:640px; height:480px;border:1px solid black;"></canvas>' +
		'<div style="margin: 15px;">' +
		  '<input id="cbxHull" type="checkbox" checked="checked">Convex Hull</input>' +
		  '<input id="cbxDefects" type="checkbox">Convexity Defects</input>' +
		  '<input id="cbxSkin" type="checkbox" checked="checked">Skin Detection</input>' +
		'</div>';
	return widget;
}
ROSDASH.HandTracker.prototype.init = function ()
{
	var that = this;
	this.tracker = new HT.Tracker( {fast: true} );
	this.cbxHull = document.getElementById("cbxHull");
	this.cbxDefects = document.getElementById("cbxDefects");
	this.cbxSkin = document.getElementById("cbxSkin");
	this.video = document.getElementById("video");
	this.canvas = document.getElementById("canvas");
	this.context = this.canvas.getContext("2d");
	this.canvas.width = parseInt(this.canvas.style.width) / 2;
	this.canvas.height = parseInt(this.canvas.style.height) / 2;
	this.image = this.context.createImageData(
	this.canvas.width * 0.2, this.canvas.height * 0.2);
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
	if (navigator.getUserMedia){
	navigator.getUserMedia({video:true},
	  function(stream){ return that.videoReady(stream); },
	  function(error){ return that.videoError(error); } );
	}
};
ROSDASH.HandTracker.prototype.videoReady = function (stream)
{
	if (window.webkitURL) {
		this.video.src = window.webkitURL.createObjectURL(stream);
	} else if (video.mozSrcObject !== undefined) {
		this.video.mozSrcObject = stream;
	} else {
		this.video.src = stream;
	}
	this.tick();
};
ROSDASH.HandTracker.prototype.videoError = function (error)
{};
ROSDASH.HandTracker.prototype.tick = function ()
{
	var that = this, image, candidate;
	requestAnimationFrame( function() { return that.tick(); } );
	if (this.video.readyState === this.video.HAVE_ENOUGH_DATA){
		image = this.snapshot();
		candidate = this.tracker.detect(image);
		this.draw(candidate);
	}
};
ROSDASH.HandTracker.prototype.snapshot = function ()
{
	this.context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
	return this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
};
ROSDASH.HandTracker.prototype.draw = function (candidate)
{
	if (candidate){
		if (this.cbxHull.checked){
		  this.drawHull(candidate.hull, "red");
		}
		if (this.cbxDefects.checked){
		  this.drawDefects(candidate.defects, "blue");
		}
	}
	if (this.cbxSkin.checked){
		this.context.putImageData(
		  this.createImage(this.tracker.mask, this.image), 
		  this.canvas.width - this.image.width,
		  this.canvas.height - this.image.height);
	}
};
ROSDASH.HandTracker.prototype.drawHull = function (hull, color)
{
	var len = hull.length, i = 1;
	if (len > 0){
		this.context.beginPath();
		this.context.strokeStyle = color;
		this.context.moveTo(hull[0].x, hull[0].y);
		for (; i < len; ++ i){
		  this.context.lineTo(hull[i].x, hull[i].y);
		}
		this.context.stroke();
		this.context.closePath();
	}
};
ROSDASH.HandTracker.prototype.drawDefects = function (defects, color)
{
	var len = defects.length, i = 0, point;
	if (len > 0){
		this.context.beginPath();
		this.context.strokeStyle = color;
		for (; i < len; ++ i){
		  point = defects[i].depthPoint;
		  this.context.strokeRect(point.x - 2, point.y - 2, 4, 4);
		}
		this.context.stroke();
		this.context.closePath();
	}
};
ROSDASH.HandTracker.prototype.createImage = function (imagesrc, imagedst)
{
	var src = imagesrc.data, dst = imagedst.data,
	  width = imagesrc.width, span = 4 * width,
	  len = src.length, i = 0, j = 0, k = 0;
	for(i = 0; i < len; i += span){
		for(j = 0; j < width; j += 5){
		  dst[k] = dst[k + 1] = dst[k + 2] = src[i];
		  dst[k + 3] = 255;
		  k += 4;
		  i += 5;
		}
	}
	return imagedst;
};

//////////////////////////////////// ROSJS

// Turtlesim from ROS desktop widget
ROSDASH.Turtlesim = function (block)
{
	this.block = block;
	this.canvas_id = "turtlesim_" + this.block.id;
}
ROSDASH.Turtlesim.prototype.addWidget = function (widget)
{
	widget.widgetContent = '<canvas id="' + this.canvas_id + '" width="' + ROSDASH.userConf.widget_width + 'px" height="' + ROSDASH.userConf.content_height + 'px" style="border: 1px solid black"></canvas>';
	return widget;
}
ROSDASH.Turtlesim.prototype.init = function ()
{
	//@note a traditional ROS connection
	var ros = new ROS('ws://localhost:9090');
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
		  width : ROSDASH.userConf.widget_width,
		  height : ROSDASH.userConf.content_height
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
	this.viewer;
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
		this.viewer = new ROS3D.Viewer({
		  divID : this.canvas_id,
		  width : 600, //ROSDASH.userConf.widget_width,
		  height : 600, //ROSDASH.userConf.content_height,
		  antialias : true
		});
		this.viewer.addObject(new ROS3D.Grid());
		// load the map
		/*var gridClient = new ROS3D.OccupancyGridClient({
		  ros : ROSDASH.ros,
		  rootObject : viewer.scene
		});*/
		this.init_success = true;
	}
}
ROSDASH.Ros3d.prototype.run = function (input)
{
	if (! this.init_success)
	{
		this.init();
	}
	return {o0: this.viewer};
}

ROSDASH.Ros3dUrdf = function (block)
{
	this.block = block;
	this.success = false;
}
ROSDASH.Ros3dUrdf.prototype.run = function (input)
{
	if (! this.success && undefined != input[0])
	{
		new ROS3D.UrdfClient({
			ros : ROSDASH.ros,
			tfClient : new ROSLIB.TFClient({
				ros : ROSDASH.ros,
				angularThres : 0.01,
				transThres : 0.01,
				rate : 10.0
			}),
			path : 'http://resources.robotwebtools.org/',
			rootObject : input[0].scene
		});
		this.success = true;
	}
	return {o0: input[0]};
}

ROSDASH.Ros3dMarker = function (block)
{
	this.block = block;
	this.success = false;
}
ROSDASH.Ros3dMarker.prototype.run = function (input)
{
	if (! this.success && undefined != input[0] && typeof input[1] == "string")
	{
		var markerClient = new ROS3D.MarkerClient({
			ros : ROSDASH.ros,
			tfClient : new ROSLIB.TFClient({
				ros : ROSDASH.ros,
				angularThres : 0.01,
				transThres : 0.01,
				rate : 10.0,
				fixedFrame : '/my_frame'
			}),
			topic : input[1],
			rootObject : input[0].scene
		});
		this.success = true;
	}
	//console.log(this.marker.currentMarker.pose.position.x);
	return {o0: input[0]};
}

ROSDASH.Ros3dInteractiveMarker = function (block)
{
	this.block = block;
	this.success = false;
}
ROSDASH.Ros3dInteractiveMarker.prototype.run = function (input)
{
	if (! this.success && undefined != input[0] && typeof input[1] == "string")
	{
		var markerClient = new ROS3D.InteractiveMarkerClient({
			ros : ROSDASH.ros,
			tfClient : new ROSLIB.TFClient({
				ros : ROSDASH.ros,
				angularThres : 0.01,
				transThres : 0.01,
				rate : 10.0,
				fixedFrame : '/base_link'
			}),
			topic : input[1],
			camera : input[0].camera,
			rootObject : input[0].selectableObjects
		});
		this.success = true;
	}
	return {o0: input[0]};
}

ROSDASH.JoystickToRos3dMarker = function (block)
{
	this.block = block;
	this.default_marker = {
		mesh_use_embedded_materials:false,
		scale:{y:1, x:1, z:1}, 
		frame_locked:false, 
		color:{a:1, r:0, b:0, g:1}, 
		text:"", 
		pose:{
			position:{y:0, x:0, z:0}, 
			orientation:{y:0, x:0, z:0, w:1}}, 
		mesh_resource:"", 
		header:{stamp:{secs:1374700821, nsecs:725229501}, frame_id:"/my_frame", seq:545585}, 
		colors:[], 
		points:[], 
		action:0, 
		lifetime:{secs:0, nsecs:0}, 
		ns:"basic_shapes", 
		type:2, 
		id:0
	};
	this.default_joystick = {
		dx: 0,
		dy: 0,
		right: 0,
		up: 0,
		left: 0,
		down: 0
	};
}
ROSDASH.JoystickToRos3dMarker.prototype.run = function (input)
{
	var marker = (undefined !== input[0] && undefined !== input[0].pose) ? input[0] : this.default_marker;
	var joystick = (undefined !== input[1]) ? input[1] : this.default_joystick;
	marker.pose.position.x -= input[1].dx / 100.0;
	marker.pose.position.y += input[1].dy / 100.0;
	return {o0: marker};
}

//@bug
ROSDASH.RosInteractiveMarker = function (block)
{
	this.block = block;
	this.default_marker = {
		/*mesh_use_embedded_materials:false,
		scale:{y:1, x:1, z:1}, 
		frame_locked:false, 
		color:{a:1, r:0, b:0, g:1}, 
		text:"", 
		pose:{
			position:{y:0, x:0, z:0}, 
			orientation:{y:0, x:0, z:0, w:1}}, 
		mesh_resource:"", 
		header:{stamp:{secs:1374700821, nsecs:725229501}, frame_id:"/my_frame", seq:545585}, 
		colors:[], 
		points:[], 
		action:0, 
		lifetime:{secs:0, nsecs:0}, 
		ns:"basic_shapes", 
		type:2, 
		id:0*/
	};
	this.default_joystick = {
		dx: 0,
		dy: 0,
		right: 0,
		up: 0,
		left: 0,
		down: 0
	};
}
ROSDASH.RosInteractiveMarker.prototype.run = function (input)
{
	var marker = (undefined !== input[0] && undefined !== input[0].pose) ? input[0] : this.default_marker;
	var joystick = (undefined !== input[1]) ? input[1] : this.default_joystick;
	/*marker.pose.position.x -= input[1].dx / 100.0;
	marker.pose.position.y += input[1].dy / 100.0;*/
	return {o0: marker};
}

ROSDASH.RosMjpeg = function (block)
{
	this.block = block;
	this.canvas = this.block.id + "_RosMjpeg";
	this.viewer;
	this.init_success = false;
}
ROSDASH.RosMjpeg.prototype.addWidget = function (widget)
{
	widget.widgetContent = '<div id="' + this.canvas + '" style="height:100%; width:100%;" />';
	return widget;
}
ROSDASH.RosMjpeg.prototype.init = function ()
{
	if ($("#" + this.canvas).length <= 0 || ! ROSDASH.ros_connected)
	{
		return;
	}
	this.viewer = new MJPEGCANVAS.Viewer({
		divID : this.canvas,
		host : ROSDASH.userConf.ros_host,
		width : 640, //ROSDASH.userConf.widget_width,
		height : 480, //ROSDASH.userConf.content_height,
		// get from block config
		topic : '/ardrone/image_raw'
	});
/*
    var viewer = new MJPEGCANVAS.MultiStreamViewer({
      divID : 'mjpeg',
      host : 'localhost',
      width : 640,
      height : 480,
      topics : [ '/wide_stereo/left/image_color', '/l_forearm_cam/image_color',
          '/r_forearm_cam/image_color' ],
      labels : [ 'Robot View', 'Left Arm View', 'Right Arm View' ]
    });
*/
	this.init_success = true;
}
ROSDASH.RosMjpeg.prototype.run = function (input)
{
	if (! this.init_success)
	{
		this.init();
	}
	return {o0: this.viewer};
}

//////////////////////////////////// map

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

//////////////////////////////////// plot

// safe range for text or plot widget
ROSDASH.FlotSafeRange = function (block)
{
	this.block = block;
	this.min = 3;
	this.max = 8;
}
//@input	the value to be tested
//@output	if it is in safe range
ROSDASH.FlotSafeRange.prototype.run = function (input)
{
	return {
		o0: "threshold",
		o1: {above : this.max, below : this.min}
	};
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
	if (undefined !== this.block.config)
	{
		this.option = this.block.config;
	}
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

//////////////////////////////////// other outputs

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

//////////////////////////////////// robot simulation

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

//////////////////////////////////// user interfaces

ROSDASH.userConfig = function (block)
{
	this.block = block;
}
ROSDASH.userConfig.prototype.run = function (input)
{
	return {o0: ROSDASH.userConf};
}

// user list
ROSDASH.userList = function (block)
{
	this.block = block;
	this.list = new Array();
	this.ajax_return = false;
}
ROSDASH.userList.prototype.init = function ()
{
	if (this.ajax_return)
	{
		return;
	}
	var self = this;
	$.ajax({
		type: "POST",
		url: "rosdash.php",
		data: {
			func: "getUserList"
		},
		success: function( data, textStatus, jqXHR )
		{
			console.log("userList success: ", data);
			self.list = new Array();
			var d = data.split(" ");
			for (var i in d)
			{
				if ("" != d[i] && " " != d[i])
				{
					self.list.push('<a href="panel.html?user=' + d[i] + '">' + d[i] + '</a>');
				}
			}
		},
		error: function(jqXHR, textStatus, errorThrown)
		{
			console.log("userList error: ", jqXHR, textStatus, errorThrown);
		}
	}).always(function() {
		self.ajax_return = true;
	});
}
ROSDASH.userList.prototype.run = function (input)
{
	if (! this.ajax_return)
	{
		this.init();
	}
	return {o0: this.list};
}

// user welcome
ROSDASH.userWelcome = function (block)
{
	this.block = block;
	this.success = false;
}
ROSDASH.userWelcome.prototype.signup = function (name)
{
	var self = this;
	$.ajax({
		type: "POST",
		url: "rosdash.php",
		data: {
			func: "newUser",
			username: name
		},
		success: function( data, textStatus, jqXHR )
		{
			console.log("newUser success", data);
			location.replace("panel.html?user=" + name);
		},
		error: function(jqXHR, textStatus, errorThrown)
		{
			console.log("newUser error", jqXHR, textStatus, errorThrown);
		}
	}).always(function( data, textStatus, jqXHR ) {
	});
}
ROSDASH.userWelcome.prototype.newPanel = function (name)
{
	var self = this;
	$.ajax({
		type: "POST",
		url: "rosdash.php",
		data: {
			func: "newPanel",
			username: ROSDASH.userConf.name,
			panel: name,
		},
		success: function( data, textStatus, jqXHR )
		{
			console.log("newUser success: ", data);
			location.replace("panel.html?user=" + ROSDASH.userConf.name + "&panel=" + name);
		},
		error: function(jqXHR, textStatus, errorThrown)
		{
			console.log("newUser error: ", jqXHR, textStatus, errorThrown);
		}
	}).always(function( data, textStatus, jqXHR ) {
	});
}
ROSDASH.userWelcome.prototype.run = function (input)
{
	var output = "";
	var that = this;
	if ("index" == ROSDASH.userConf.name)
	{
		output += '<h1 style="color:blue;">Welcome to ROSDASH !</h1>'
			+ '<p style="color:Navy;">A web-based platform of dashboards for roboticists and ROS users.</p>'
			+ '<p>Please select your user name from the list on the right, or</p>'
			+ '<p>Sign up '
				+ '<input type="text" name="name" id="newname_' + this.block.id + '">'
				+ '<input type="button" value="Submit" id="submit_' + this.block.id + '">'
			+ '</p>';
		if (! this.success && $("#submit_" + that.block.id).length > 0)
		{
			$("#submit_" + that.block.id).click(function ()
			{
				that.signup($("#newname_" + that.block.id).val());
			});
			this.success = true;
		}
	} else
	{
		output += '<h1 style="color:blue;">Welcome to ROSDASH, ' + ROSDASH.userConf.name + ' !</h1>';
		if (undefined !== ROSDASH.userConf.discrip && "" != ROSDASH.userConf.discrip)
		{
			output += '<p style="color:Navy;">' + ROSDASH.userConf.discrip + '</p>';
		}
		output += '<p>Please select your panel or diagram from the list to the right, or</p>'
			+ '<p>Add a new one '
				+ '<input type="text" name="name" id="newname_' + this.block.id + '">'
				+ '<input type="button" value="Submit" id="submit_' + this.block.id + '">'
			+ '</p>';
		if (! this.success && $("#submit_" + that.block.id).length > 0)
		{
			$("#submit_" + that.block.id).click(function ()
			{
				that.newPanel($("#newname_" + that.block.id).val());
			});
			this.success = true;
		}
	}
	return {o0: output};
}

// panel list
ROSDASH.panelList = function (block)
{
	this.block = block;
	this.list = new Array();
	this.ajax_return = false;
}
ROSDASH.panelList.prototype.init = function ()
{
	if (this.ajax_return)
	{
		return;
	}
	var self = this;
	$.ajax({
		type: "POST",
		url: "rosdash.php",
		data: {
			func: "getPanelList",
			user: ROSDASH.userConf.name
		},
		success: function( data, textStatus, jqXHR )
		{
			console.log("panelList success: ", data);
			self.list = new Array();
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
						self.list.push('<a href="panel.html?user=' + ROSDASH.userConf.name + '&panel=' + file_name + '&host=192.168.1.125" target="_blank">Panel</a>');
						if (d.indexOf(file_name + "-diagram.json") != -1)
						{
							self.list.push('<a href="diagram.html?user=' + ROSDASH.userConf.name + '&panel=' + file_name + '&host=192.168.1.125" target="_blank">Diagram</a>');
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
							self.list.push('<a href="panel.html?user=' + ROSDASH.userConf.name + '&panel=' + file_name + '&host=192.168.1.125" target="_blank">Panel</a>');
							d.splice(d.indexOf(file_name + "-panel.json"), 1);
						} else
						{
							self.list.push(" ");
						}
						self.list.push('<a href="diagram.html?user=' + ROSDASH.userConf.name + '&panel=' + file_name + '&host=192.168.1.125" target="_blank">Diagram</a>');
					}
				}
			}
		},
		error: function(jqXHR, textStatus, errorThrown)
		{
			console.log("userList error: ", jqXHR, textStatus, errorThrown);
		}
	}).always(function() {
		self.ajax_return = true;
	});
}
ROSDASH.panelList.prototype.run = function (input)
{
	if (! this.ajax_return)
	{
		this.init();
	}
	return {o0: this.list};
}

ROSDASH.jsonEditor = function (block)
{
	this.block = block;
	this.canvas = "jsonEditor_" + this.block.id;
	this.success = false;
	this.json = {
		"string": "example",
		"number": 5,
		"array": [1, 2, 3],
		"object": {
			"property": "value",
			"subobj": {
				"arr": ["foo", "ha"],
				"numero": 1
			}
		}
	};
}
ROSDASH.jsonEditor.prototype.isDiff = function (json)
{
	
}
ROSDASH.jsonEditor.prototype.updateJson = function (data)
{
	this.json = data;
	console.debug(this.json, ROSDASH.userConf)
}
ROSDASH.jsonEditor.prototype.addWidget = function (widget)
{
	widget.widgetContent = 
		'<div id="' + this.canvas + 'legend">' +
			'<span id="' + this.canvas + 'expander" style="cursor: pointer; background-color: black; padding: 2px 4px; -webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px; color: white; font-weight: bold; text-shadow: 1px 1px 1px black;">Expand all</span>' +
			'<span class="array" style="background-color: #2D5B89; padding: 2px 4px; -webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px; color: white; font-weight: bold; text-shadow: 1px 1px 1px black;">array</span>' +
			'<span class="object" style="background-color: #E17000; padding: 2px 4px; -webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px; color: white; font-weight: bold; text-shadow: 1px 1px 1px black;">object</span>' +
			'<span class="string" style="background-color: #009408; padding: 2px 4px; -webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px; color: white; font-weight: bold; text-shadow: 1px 1px 1px black;">string</span>' +
			'<span class="number" style="background-color: #497B8D; padding: 2px 4px; -webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px; color: white; font-weight: bold; text-shadow: 1px 1px 1px black;">number</span>' +
			'<span class="boolean" style="background-color: #B1C639; padding: 2px 4px; -webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px; color: white; font-weight: bold; text-shadow: 1px 1px 1px black;">boolean</span>' +
			'<span class="null" style="background-color: #B1C639; padding: 2px 4px; -webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px; color: white; font-weight: bold; text-shadow: 1px 1px 1px black;">null</span>' +
		'</div>' +
		'<div id="' + this.canvas + '" class="json-editor"></div>';
	return widget;
}
ROSDASH.jsonEditor.prototype.init = function ()
{
	var that = this;
    $('#' + this.canvas + 'expander').click(function() {
        var editor = $('#' + that.canvas);
        editor.toggleClass('expanded');
        $(this).text(editor.hasClass('expanded') ? 'Collapse' : 'Expand all');
    });
    $('#' + that.canvas).jsonEditor(this.json);
}
ROSDASH.jsonEditor.prototype.run = function (input)
{
	var that = this;
	if (! this.success && (typeof input[0] == "object" || typeof input[0] == "array"))
	{
		that.json = input[0];
		$('#' + that.canvas).jsonEditor(that.json, { change: that.updateJson, propertyclick: null });
		this.success = true;
	}
}

ROSDASH.jsonVis = function (block)
{
	this.block = block;
	this.canvas = "jsonVis" + this.block.id;
	this.json = {
        "string": "foo",
        "number": 5,
        "array": [1, 2, 3],
        "object": {
            "property": "value",
            "subobj": {
                "arr": ["foo", "ha"],
                "numero": 1
            }
        }
    };
}
ROSDASH.jsonVis.prototype.treeify = function (json, name, head)
{
    head['name']  = name;
    if (_.isObject(json) || _.isArray(json)) {
        head['children'] = [];
        for (var key in json) {
            if (!json.hasOwnProperty(key)) continue;
            var child = {};
            head['children'].push(child);
            this.treeify(json[key], key, child);
        }
    }
}
ROSDASH.jsonVis.prototype.vizcluster = function (json)
{
    var tree = {};
    this.treeify(json, 'JSON', tree);
    $('#' + this.canvas).empty();
    var w = 900;
    var h = 900;
    var rx = w / 2;
    var ry = h / 2;
    var cluster = d3.layout.cluster()
        .size([360, ry - 120])
        .sort(null);
    var diagonal = d3.svg.diagonal.radial()
        .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });
    var svg = d3.select('#' + this.canvas).append('div')
        .style('width', w + 'px')
        .style('height', w + 'px');
    var vis = svg.append("svg:svg")
        .attr("width", w)
        .attr("height", w)
        .append("svg:g")
        .attr("transform", "translate(" + rx + "," + ry + ")");
    vis.append("svg:path")
        .attr("class", "arc")
        .attr("d", d3.svg.arc().innerRadius(ry - 120).outerRadius(ry).startAngle(0).endAngle(2 * Math.PI));
    var nodes = cluster.nodes(tree);
    var link = vis.selectAll("path.link")
        .data(cluster.links(nodes))
        .enter().append("svg:path")
        .attr("class", "link")
        .attr("d", diagonal);
    var node = vis.selectAll("g.node")
        .data(nodes)
        .enter().append("svg:g")
        .attr("class", "node")
        .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
    node.append("svg:circle")
        .attr("r", 3);
    node.append("svg:text")
        .attr("dx", function(d) { return d.x < 180 ? 8 : -8; })
        .attr("dy", ".31em")
        .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
        .attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
        .text(function(d) { return d.name; });
}
ROSDASH.jsonVis.prototype.addWidget = function (widget)
{
	widget.widgetContent = '<div id="' + this.canvas + '"></div>';
	return widget;
}
ROSDASH.jsonVis.prototype.init = function ()
{
	this.vizcluster(this.json);
}
ROSDASH.jsonVis.prototype.run = function (input)
{
	if (undefined === input[0] || "" == input[0])
	{
		return;
	}
	this.vizcluster(input[0]);
}

//////////////////////////////////// others

ROSDASH.slide = function (block)
{
	this.block = block;
}
ROSDASH.slide.prototype.addWidget = function (widget)
{
	widget.widgetContent = '<iframe src="http://www.slideshare.net/slideshow/embed_code/16073451" width="427" height="356" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" allowfullscreen webkitallowfullscreen mozallowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="https://www.slideshare.net/narrendar/ros-an-opensource-robotic-framework" title="ROS - An Opensource Robotic Framework" target="_blank">ROS - An Opensource Robotic Framework</a> </strong> from <strong><a href="http://www.slideshare.net/narrendar" target="_blank">Narrendar Narren</a></strong> </div>';
	return widget;
}

ROSDASH.youtube = function (block)
{
	this.block = block;
}
ROSDASH.youtube.prototype.addWidget = function (widget)
{
	widget.widgetContent = '<iframe width="640" height="360" src="//www.youtube.com/embed/SxeVZdJFB4s" frameborder="0" allowfullscreen></iframe>';
	return widget;
}
ROSDASH.youtube.prototype.init = function ()
{}
ROSDASH.youtube.prototype.run = function (input)
{}

//////////////////////////////////// for fun

ROSDASH.DoodleGod = function (block)
{
	this.block = block;
}
ROSDASH.DoodleGod.prototype.addWidget = function (widget)
{
	widget.widgetContent = '<object width="180" height="135"><param name="movie" value="http://www.fupa.com/swf/doodle-god/doodlegod.swf"></param><embed src="http://www.fupa.com/swf/doodle-god/doodlegod.swf" type="application/x-shockwave-flash" width="300px" height="200px"></embed></object>';
	return widget;
}

