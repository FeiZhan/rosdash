var ROSDASH = new Object();
ROSDASH.version = "1.0";
ROSDASH.user = "test4";
ROSDASH.view_type;
ROSDASH.default_style = cytoscape.stylesheet()
	.selector('node')
	.css({
		'shape': 'data(faveShape)',
		'width': 'mapData(weight, 10, 30, 20, 60)',
		'height': 'mapData(height, 0, 100, 10, 45)',
		'content': 'data(name)',
		'font-size': 25,
		'text-valign': 'center',
		'text-outline-width': 2,
		'text-outline-color': 'data(faveColor)',
		'background-color': 'data(faveColor)',
		'color': '#fff'
	})
	.selector(':selected')
	.css({
		'border-width': 3,
		'border-color': '#333'
	})
	.selector('edge')
	.css({
		'width': 'mapData(strength, 70, 100, 2, 6)',
		'line-color': 'data(faveColor)',
		'source-arrow-color': 'data(faveColor)',
		'target-arrow-color': 'data(faveColor)'
	});
ROSDASH.default_element = {
	nodes: [
		{ data: { id: 'j', name: 'Jerry', weight: 65, faveColor: '#6FB1FC', faveShape: 'triangle' } },
		{ data: { id: 'e', name: 'Elaine', weight: 45, faveColor: '#EDA1ED', faveShape: 'ellipse' } },
		{ data: { id: 'k', name: 'Kramer', weight: 75, faveColor: '#86B342', faveShape: 'octagon' } },
		{ data: { id: 'g', name: 'George', weight: 70, faveColor: '#F5A45D', faveShape: 'rectangle' } }
	],
	edges: [
		{ data: { source: 'j', target: 'e', faveColor: '#6FB1FC', strength: 90 } },
		{ data: { source: 'j', target: 'k', faveColor: '#6FB1FC', strength: 70 } },
		{ data: { source: 'j', target: 'g', faveColor: '#6FB1FC', strength: 80 } },
		{ data: { source: 'e', target: 'j', faveColor: '#EDA1ED', strength: 95 } },
		{ data: { source: 'e', target: 'k', faveColor: '#EDA1ED', strength: 60 }, classes: 'questionable' },
		{ data: { source: 'k', target: 'j', faveColor: '#86B342', strength: 100 } },
		{ data: { source: 'k', target: 'e', faveColor: '#86B342', strength: 100 } },
		{ data: { source: 'k', target: 'g', faveColor: '#86B342', strength: 100 } },
		{ data: { source: 'g', target: 'j', faveColor: '#F5A45D', strength: 90 } }
	]
};
ROSDASH.default_element1 = [
    { // node n1
      group: 'nodes', // 'nodes' for a node, 'edges' for an edge

      data: { // element data (put dev data here)
          id: 'n1', // mandatory for each element, assigned automatically on undefined
          parent: 'nparent', // indicates the compound node parent id; not defined => no parent
      },

      position: { // the model position of the node (optional on init, mandatory after)
          x: 100,
          y: 100
      },

      selected: false, // whether the element is selected (default false)

      selectable: true, // whether the selection state is mutable (default true)

      locked: false, // when locked a node's position is immutable (default false)

      grabbable: true, // whether the node can be grabbed and moved by the user

      classes: 'foo bar' // a space separated list of class names that the element has
    },
    { // node n2
      group: 'nodes',
      data: { id: 'n2' },
      renderedPosition: { x: 200, y: 200 } // can alternatively specify position in rendered on-screen pixels
    },
    { // node n3
      group: 'nodes',
      data: { id: 'n3', parent: 'nparent' },
      position: { x: 123, y: 234 }
    },
    { // node nparent
      group: 'nodes',
      data: { id: 'nparent' }
    },
    { // edge e1
      group: 'edges',
      data: {
          id: 'e1',
          source: 'n1', // the source node id (edge comes from this node)
          target: 'n2'  // the target node id (edge goes to this node)
      }
    }
  ];
ROSDASH.default_element2 = {
	"nodes": [
		{
			"data": {
				"id": "alltopics",
				"name": "all topics",
				"weight": 70,
				"faveColor": "green",
				"faveShape": "rectangle"
			},
			"classes": "body alltopics alltopics0",
			"position": {
				"x": 0,
				"y": 0
			},
			"locked": "true"
		}, {
			"data": {
				"id": "alltopics_o00",
				"name": "",
				"weight": 5,
				"faveColor": "grey",
				"faveShape": "ellipse"
			},
			"classes": "output alltopics alltopics0",
			"position": {
				"x": 80,
				"y": 0
			},
			"locked": "true",
			"grabbable": "true"
		}, {
			"data": {
				"id": "text00",
				"name": "text00",
				"weight": 70,
				"faveColor": "blue",
				"faveShape": "rectangle"
			},
			"classes": "body text text0",
			"position": {
				"x": 1000,
				"y": 0
			},
			"locked": "true"
		}, {
			"data": {
				"id": "text00_i00",
				"name": "",
				"weight": 5,
				"faveColor": "grey",
				"faveShape": "ellipse"
			},
			"classes": "input text text0",
			"position": {
				"x": 920,
				"y": 0
			},
			"locked": "true"
		}, {
			"data": {
				"id": "text00_o00",
				"name": "",
				"weight": 5,
				"faveColor": "grey",
				"faveShape": "ellipse"
			},
			"classes": "output text text0",
			"position": {
				"x": 1080,
				"y": 0
			},
			"locked": "true"
		}, {
			"data": {
				"id": "text01",
				"name": "text01",
				"weight": 70,
				"faveColor": "blue",
				"faveShape": "rectangle"
			},
			"classes": "body text text1",
			"position": {
				"x": 1000,
				"y": 200
			},
			"locked": "true"
		}, {
			"data": {
				"id": "text01_i00",
				"name": "",
				"weight": 5,
				"faveColor": "grey",
				"faveShape": "ellipse"
			},
			"classes": "input text text1",
			"position": {
				"x": 920,
				"y": 200
			},
			"locked": "true"
		}, {
			"data": {
				"id": "text01_o00",
				"name": "",
				"weight": 5,
				"faveColor": "grey",
				"faveShape": "ellipse"
			},
			"classes": "output text text1",
			"position": {
				"x": 1080,
				"y": 200
			},
			"locked": "true"
		}, {
			"data": {
				"id": "/status",
				"name": "/status",
				"weight": 70,
				"faveColor": "green",
				"faveShape": "rectangle"
			},
			"classes": "body topic topic0",
			"position": {
				"x": 0,
				"y": 200
			},
			"locked": "true"
		}, {
			"data": {
				"id": "/status_o00",
				"name": "",
				"weight": 5,
				"faveColor": "grey",
				"faveShape": "ellipse"
			},
			"classes": "output topic topic0",
			"position": {
				"x": 80,
				"y": 200
			},
			"locked": "true"
		}, {
			"data": {
				"id": "/speech",
				"name": "/speech",
				"weight": 70,
				"faveColor": "green",
				"faveShape": "rectangle"
			},
			"classes": "body topic topic1",
			"position": {
				"x": 0,
				"y": 100
			},
			"locked": "true"
		}, {
			"data": {
				"id": "/speech_o00",
				"name": "",
				"weight": 5,
				"faveColor": "grey",
				"faveShape": "ellipse"
			},
			"classes": "output topic topic1",
			"position": {
				"x": 80,
				"y": 100
			},
			"locked": "true"
		}, {
			"data": {
				"id": "table00",
				"name": "table00",
				"weight": 70,
				"faveColor": "blue",
				"faveShape": "rectangle"
			},
			"classes": "body table table0",
			"position": {
				"x": 1000,
				"y": 400
			},
			"locked": "true"
		}, {
			"data": {
				"id": "table00_i00",
				"name": "",
				"weight": 5,
				"faveColor": "grey",
				"faveShape": "ellipse"
			},
			"classes": "input table table0",
			"position": {
				"x": 920,
				"y": 360
			},
			"locked": "true"
		}, {
			"data": {
				"id": "table00_i01",
				"name": "",
				"weight": 5,
				"faveColor": "grey",
				"faveShape": "ellipse"
			},
			"classes": "input table table0",
			"position": {
				"x": 920,
				"y": 400
			},
			"locked": "true"
		}, {
			"data": {
				"id": "table00_i02",
				"name": "",
				"weight": 5,
				"faveColor": "grey",
				"faveShape": "ellipse"
			},
			"classes": "input table table0",
			"position": {
				"x": 920,
				"y": 440
			},
			"locked": "true"
		}, {
			"data": {
				"id": "table00_o00",
				"name": "",
				"weight": 5,
				"faveColor": "grey",
				"faveShape": "ellipse"
			},
			"classes": "output table table0",
			"position": {
				"x": 1080,
				"y": 400
			},
			"locked": "true"
		}
	],
	"edges": [
		{
			"data": {
				"source": "/speech_o00",
				"target": "text00_i00",
				"faveColor": "grey",
				"strength": 10
			}
		}, {
			"data": {
				"source": "/status_o00",
				"target": "text01_i00",
				"faveColor": "grey",
				"strength": 10
			}
		}
	]
};

//------------------- basics
// dialog form for diagram
$(function() {
	if ($("#cy").length > 0)
	{
		$( "#dialog-form" ).dialog({
			autoOpen: false,
			draggable: false,
			resizable: false,
			position: {my: "0 0", at: "0 800", of: null},
			height: 700,
			width: 300,
			modal: true,
			buttons: {
				"OK": function() {
					$( this ).dialog( "close" );
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			},
			close: function() {
				if ($("#cy").length > 0)
				{
					$( "#cy" ).offset({left:0});
				}
				$( [] ).val( "" ).removeClass( "ui-state-error" );
			}
		});
	} else
	{
		$( "#dialog-form" ).dialog({
			autoOpen: false,
			draggable: true,
			resizable: true,
			height: 300,
			width: 300,
			modal: true,
			buttons: {
				"OK": function() {
					$( this ).dialog( "close" );
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			},
			close: function() {
				$( [] ).val( "" ).removeClass( "ui-state-error" );
			}
		});
	}
});
ROSDASH.showProperty = function ()
{
	if ($("#cy").length > 0)
	{
		$("#cy").offset({left: 310});
	}
	$( "#dialog-form" ).dialog( "open" );
}
ROSDASH.setUser = function (user)
{
	if (undefined === user || "" == user)
	{
		console.error("invalid user: " + user);
		ROSDASH.user = "test";
	} else
	{
		ROSDASH.user = user;
	}
	console.log("user name: " + ROSDASH.user);
}

//------------------- ROS
ROSDASH.ros;
ROSDASH.connectROS = function (host, port)
{
	host = (typeof host !== 'undefined') ? host : "localhost";
	port = (typeof port !== 'undefined') ? port : "9090";
	ROSDASH.ros = new ROSLIB.Ros();
	ROSDASH.ros.on('error', function(error) {
		console.error(error);
	});
	ROSDASH.ros.on('connection', function() {
		console.log('ROS connection made: ' + host + ":" + port);
	});
	ROSDASH.ros.connect('ws://' + host + ':' + port);
}
ROSDASH.topics = new Array();
ROSDASH.services = new Array();
ROSDASH.params = new Array();
ROSDASH.getROSNames = function (ros)
{
	ROSDASH.topics = new Array();
	ROSDASH.services = new Array();
	ROSDASH.params = new Array();
	ros.getTopics(function (topics)
	{
		ROSDASH.topics = topics;
		console.log('ros topics: ');
		console.log(topics);
	});
	ros.getServices(function (services)
	{
		ROSDASH.services = services;
		console.log('ros services: ');
		console.log(services);
	});
	ros.getParams(function (params)
	{
		ROSDASH.params = params;
		console.log('ros params: ');
		console.log(params);
	});
}
ROSDASH.checkROSValid = function (name, type)
{
	type = (typeof type !== 'undefined') ? type : "topic";
	var array;
	switch (type)
	{
	case "topic":
		array = ROSDASH.topics;
		break;
	case "service":
		array = ROSDASH.services;
		break;
	case "param":
		array = ROSDASH.params;
		break;
	}
	return (jQuery.inArray(name, array) != -1);
}
ROSDASH.ros_blocks = {
	topic: new Array(),
	service: new Array(),
	param: new Array()
};
ROSDASH.checkROSConflict = function (name, type)
{
	return (-1 != jQuery.inArray(name, ROSDASH.ros_blocks[type]));
}

//------------------- widget def
ROSDASH.msg_json = {
	"std_msgs": new Object()
};
ROSDASH.widget_json = {
	"widgets": new Object()
};
ROSDASH.widget_def = new Object();
ROSDASH.initJson = function ()
{
	for (var i in ROSDASH.msg_json)
	{
		$.getJSON("param/" + i + ".json", function(data, status, xhr)
		{
			for (var j in data)
			{
				ROSDASH.msg_json[j] = data;
				-- ROSDASH.panel_init_count;
				console.log("load msgs " + i + ": " + j);
			}
		});
	}
	for (var i in ROSDASH.widget_json)
	{
		$.getJSON("param/" + i + ".json", function(data, status, xhr)
		{
			for (var j in data)
			{
				ROSDASH.widget_json[j] = data;
				for (var k in data[j])
				{
					if (undefined != data[j][k].type)
					{
						ROSDASH.widget_def[data[j][k].type] = data[j][k];
					}
				}
				-- ROSDASH.panel_init_count;
				console.log("load widgets " + i + ": " + j);
			}
		});
	}
}
ROSDASH.getWidgetDef = function (name)
{
	for (var i in ROSDASH.widget_json)
	{
		var json = ROSDASH.widget_json[i];
		for (var j in json)
		{
			var json2 = json[j];
			if (undefined === json2.type)
			{
				for (var k in json2)
				{
					if (json2[k].type == name)
					{
						return json2[k];
					}
				}
			} else
			{
				if (json2.type == name)
				{
					return json2;
				}
			}
		}
	}
	console.error("wrong widget name: " + name);
	return undefined;
}
ROSDASH.checkWidgetTypeValid = function (name)
{
	return (undefined !== ROSDASH.getWidgetDef(name));
}

//------------------- blocks
ROSDASH.NEW_POS = [400, 0];
//@todo
ROSDASH.getNextNewBlockPos = function ()
{
	return ROSDASH.NEW_POS;
}
ROSDASH.addTopicByName = function (name)
{
	if ("" == name /* ! ROSDASH.checkROSValid(name, "topic")*/ || ROSDASH.checkROSConflict(name, "topic"))
	{
		console.error("topic name not valid: " + name);
		return;
	}
	var next_pos = ROSDASH.getNextNewBlockPos();
	var x = next_pos[0];
	var y = next_pos[1];
	var count = ROSDASH.ros_blocks.topic.length;
	var id = "topic-" + count;
	window.cy.add({
		group: "nodes",
		data: {
			id: id,
			name: name,
			weight: 65,
			faveColor: "green",
			faveShape: "rectangle"
		},
		position: { x: x, y: y },
		classes: "body"
	});
	window.cy.add({
		group: "nodes",
		data: {
			id: id + "-o0",
			weight: 5,
			height: 5,
			faveColor: "grey",
			faveShape: "rectangle"
		},
		position: { x: x + 70, y: y },
		classes: "output",
		locked: true
	});
	var block = {
		id: id,
		type: "topic",
		rosname: name,
		number: ROSDASH.ros_blocks.topic.length
	};
	ROSDASH.blocks[id] = block;
	ROSDASH.ros_blocks.topic.push(name);
}
ROSDASH.addTopicByDef = function (def)
{
	if ("" == def.rosname /* ! ROSDASH.checkROSValid(name, "topic")*/ || ROSDASH.checkROSConflict(def.rosname, "topic"))
	{
		console.error("topic name not valid: " + def.rosname);
		return;
	}
	var next_pos = ROSDASH.getNextNewBlockPos();
	var x = (typeof def.x !== 'undefined') ? parseFloat(def.x) : next_pos[0];
	var y = (typeof def.y !== 'undefined') ? parseFloat(def.y) : next_pos[1];
	var count = ROSDASH.ros_blocks.topic.length;
	var id = "topic-" + count;
	window.cy.add({
		group: "nodes",
		data: {
			id: id,
			name: def.rosname,
			weight: 65,
			faveColor: "green",
			faveShape: "rectangle"
		},
		position: { x: x, y: y },
		classes: "body"
	});
	window.cy.add({
		group: "nodes",
		data: {
			id: id + "-o0",
			weight: 5,
			height: 5,
			faveColor: "grey",
			faveShape: "rectangle"
		},
		position: { x: x + 70, y: y },
		classes: "output",
		locked: true
	});
	var block = {
		id: id,
		type: "topic",
		rosname: def.rosname,
		number: ROSDASH.ros_blocks.topic.length
	};
	ROSDASH.blocks[id] = block;
	ROSDASH.ros_blocks.topic.push(name);
}
//@todo
ROSDASH.block_type = new Object();
ROSDASH.blocks = new Object();
ROSDASH.addBlockByType = function (name)
{
	if (! ROSDASH.checkWidgetTypeValid(name))
	{
		return;
	}
	var next_pos = ROSDASH.getNextNewBlockPos();
	var x = next_pos[0];
	var y = next_pos[1];
	if (ROSDASH.block_type[name] === undefined)
	{
		ROSDASH.block_type[name] = new Object();
		ROSDASH.block_type[name].count = 0;
	} else
	{
		++ ROSDASH.block_type[name].count;
	}
	var block = {
		type: name,
		number: ROSDASH.block_type[name].count,
		id: name + "-" +  ROSDASH.block_type[name].count,
		name: name + " " +  ROSDASH.block_type[name].count,
	};
	window.cy.add({
		group: "nodes",
		data: {
			id: block.id,
			name: block.name,
			weight: 70,
			faveColor: "blue",
			faveShape: "rectangle"
		},
		position: { x: x, y: y },
		classes: "body"
	});
	var input_num = ROSDASH.widget_def[name].input.length;
	for (var i = 0; i < input_num; ++ i)
	{
		window.cy.add({
			group: "nodes",
			data: {
				id: block.id + "-i" + i,
				weight: 5,
				height: 5,
				faveColor: "grey",
				faveShape: "rectangle"
			},
			position: { x: x - 70, y: y },
			classes: "input",
			locked: true
		});
	}
	var output_num = ROSDASH.widget_def[name].output.length;
	for (var i = 0; i < output_num; ++ i)
	{
		window.cy.add({
			group: "nodes",
			data: {
				id: block.id + "-o" + i,
				weight: 5,
				height: 5,
				faveColor: "grey",
				faveShape: "rectangle"
			},
			position: { x: x + 70, y: y },
			classes: "output",
			locked: true
		});
	}
	ROSDASH.blocks[block.id] = block;
}
ROSDASH.addBlockByDef = function (def)
{
	if (! ROSDASH.checkWidgetTypeValid(def.type))
	{
		return;
	}
	var next_pos = ROSDASH.getNextNewBlockPos();
	x = (typeof def.x != 'undefined') ? parseFloat(def.x) : next_pos[0];
	y = (typeof def.y != 'undefined') ? parseFloat(def.y) : next_pos[1];
	if (ROSDASH.block_type[def.type] === undefined)
	{
		ROSDASH.block_type[def.type] = new Object();
		ROSDASH.block_type[def.type].count = def.number;
	} else if (def.number > ROSDASH.block_type[def.type].count)
	{
		ROSDASH.block_type[def.type].count = def.number;
	} else
	{
		for (var i in ROSDASH.blocks)
		{
			if (def.type == ROSDASH.blocks[i].type && def.number == ROSDASH.blocks[i].number)
			{
				console.error("block number conflicts: " + def.id);
				return;
			}
		}
	}
	var block = {
		type: def.type,
		number: def.number,
		id: def.id,
		name: def.name,
	};
	window.cy.add({
		group: "nodes",
		data: {
			id: block.id,
			name: block.name,
			weight: 70,
			faveColor: "blue",
			faveShape: "rectangle"
		},
		position: { x: x, y: y },
		classes: "body"
	});
	var input_num = ROSDASH.widget_def[def.type].input.length;
	for (var i = 0; i < input_num; ++ i)
	{
		window.cy.add({
			group: "nodes",
			data: {
				id: block.id + "-i" + i,
				weight: 5,
				height: 5,
				faveColor: "grey",
				faveShape: "rectangle"
			},
			position: { x: x - 70, y: y },
			classes: "input",
			locked: true
		});
	}
	var output_num = ROSDASH.widget_def[def.type].output.length;
	for (var i = 0; i < output_num; ++ i)
	{
		window.cy.add({
			group: "nodes",
			data: {
				id: block.id + "-o" + i,
				weight: 5,
				height: 5,
				faveColor: "grey",
				faveShape: "rectangle"
			},
			position: { x: x + 70, y: y },
			classes: "output",
			locked: true
		});
	}
	ROSDASH.blocks[block.id] = block;
}
// update the property dialog box
ROSDASH.selectBlockCallback = function ()
{
	window.cy.on('select', function(evt)
	{
		if (evt.cyTarget.isNode())
		{
			var id = evt.cyTarget.id();
			if (undefined === evt.cyTarget.hasClass("body") || false == evt.cyTarget.hasClass("body"))
			{
				var hyphen = evt.cyTarget.id().lastIndexOf("-");
				var id = evt.cyTarget.id().substring(0, hyphen);
			}
			var block = ROSDASH.blocks[id];
			var widget = ROSDASH.widget_def[block.type];
			var div = $("#dialog-form");
			var html = "";
			if (undefined !== block.type)
			{
				html += "<p>type: " + block.type + "</p>";
			}
			if (undefined !== block.id)
			{
				html += "<p>id: " + block.id + "</p>";
			}
			if (undefined !== widget.input)
			{
				html += "<p>input: " + widget.input.length + "</p>";
				if (widget.input.length > 0)
				{
					html += "<ul>";
					for (var i in widget.input)
					{
						html += "<li>" + widget.input[i].name + " (" + widget.input[i].datatype + ")</li>";
					}
					html += "</ul>";
				}
			}
			if (undefined !== widget.output)
			{
				html += "<p>output: " + widget.output.length + "</p>";
				if (widget.output.length > 0)
				{
					html += "<ul>";
					for (var i in widget.output)
					{
						html += "<li>" + widget.output[i].name + " (" + widget.output[i].datatype + ")</li>";
					}
					html += "</ul>";
				}
			}
			if ("topic" == block.type)
			{
				html += "<p>topic: " + block.rosname + "</p>";
			}
			div.find("#property").html(html);
		} else
		{
			var div = $("#dialog-form");
			var html = "<p>type: edge</p><p>source: " + evt.cyTarget.source().id() + "</p><p>target: " + evt.cyTarget.target().id() + "</p>";
			div.find("#property").html(html);
		}
	});
}
ROSDASH.removeBlock = function (name)
{
	var ele = window.cy.$(':selected');
	// priority on selected elements
	if (ele.size() > 0)
	{
		delete ROSDASH.blocks[name];
		ele.remove();
	} else if (undefined != name && "" != name)
	{
		ele = cy.nodes('[id = "' + name + '"]');
		if (0 == ele.size())
		{
			ele = cy.nodes('[name = "' + name + '"]');
		}
		if (0 < ele.size())
		{
			delete ROSDASH.blocks[name];
			ele.remove();
		}
	}
	if (ele in ROSDASH.blocks)
	{
		delete ROSDASH.blocks[ele];
	}
}
ROSDASH.followBlock = function (target)
{
	var id = target.id();
	if (undefined === ROSDASH.blocks[id])
	{
		return;
	}
	var type = ROSDASH.blocks[id].type;
	if (undefined != ROSDASH.blocks[id])
	{
		var pin_num = ROSDASH.widget_def[type].input.length;
		for (var i = 0; i < pin_num; ++ i)
		{
			window.cy.nodes('[id = "' + id + "-i" + i + '"]').positions(function (i, ele)
			{
				ele.position({
					x: target.position('x') - 70,
					y: target.position('y')
				});
			});
		}
		pin_num = ROSDASH.widget_def[type].output.length;
		for (var i = 0; i < pin_num; ++ i)
		{
			window.cy.nodes('[id = "' + id + "-o" + i + '"]').positions(function (i, ele)
			{
				ele.position({
					x: target.position('x') + 70,
					y: target.position('y')
				});
			});
		}
	}
}
ROSDASH.blockMoveCallback = function ()
{
	window.cy.on('position', function(evt)
	{
		ROSDASH.followBlock(evt.cyTarget);
	});
	window.cy.on('free', function(evt)
	{
		//ROSDASH.saveDiagram();
	});
}
ROSDASH.connect_former = new Object();
ROSDASH.connectBlocks = function (source, target)
{
	// if source and target exist
	var body = source.substring(0, source.lastIndexOf("-"));
	if (! (body in ROSDASH.blocks))
	{
		console.error("cannot connect: " + source);
		return;
	}
	body = target.substring(0, target.lastIndexOf("-"));
	if (! (body in ROSDASH.blocks))
	{
		console.error("cannot connect: " + target);
		return;
	}
	window.cy.add({
		group: "edges",
		"data": {
		"source": source,
		"target": target,
		"faveColor": "grey",
		"strength": 10
		}
	});
}
ROSDASH.connectBlocksCallback = function ()
{
	window.cy.on('select', function(evt)
	{
		var connect_type = 0;
		if (evt.cyTarget.hasClass("output"))
		{
			connect_type = 1;
		} else if (evt.cyTarget.hasClass("input"))
		{
			connect_type = 2;
		} else
		{
			return;
		}
		// if no former or unselected the former
		if (undefined === ROSDASH.connect_former.block || new Date().getTime() - ROSDASH.connect_former.unselect > 300)
		{
			ROSDASH.connect_former.block = evt.cyTarget;
			ROSDASH.connect_former.type = connect_type;
		} else if (undefined != ROSDASH.connect_former.block && connect_type != ROSDASH.connect_former.type)
		{
			ROSDASH.connectBlocks(ROSDASH.connect_former.block.id(), evt.cyTarget.id());
			ROSDASH.connect_former.block = undefined;
		} else
		{
			ROSDASH.connect_former.block = undefined;
		}
	});
	window.cy.on('unselect', function(evt)
	{
		ROSDASH.connect_former.unselect = new Date().getTime();
	});
}

//------------------- diagram
ROSDASH.saveJson = function (data, filename)
{
	console.log("saveJson: " + filename);
	$.ajax({
		type: "POST",
		url: "rosdash.php",
		dataType: 'json',
		data: {
				file_name: filename,
				data: data
		},
		success: function( data, textStatus, jqXHR )
		{
			console.log("saveJson success: " + textStatus);
		},
		error: function(jqXHR, textStatus, errorThrown)
		{
			console.log("saveJson error: " + textStatus);
		}
	});
}
ROSDASH.saveDiagram = function ()
{
	var json = {
		user: ROSDASH.user,
		version: ROSDASH.version,
		type: "diagram",
		block: new Object(),
		edge: new Array()
	};
	for (var i in ROSDASH.blocks)
	{
		var node = window.cy.$("#" + ROSDASH.blocks[i].id);
		if (node)
		{
			json.block[i] = ROSDASH.blocks[i];
			json.block[i].x = node.position('x');
			json.block[i].y = node.position('y');
		}
	}
	window.cy.edges().each(function (i, ele)
	{
		var e = {
			source: ele.source().id(),
			target: ele.target().id()
		};
		json.edge.push(e);
	});
	ROSDASH.saveJson(json, json.user + "-diagram");
}
ROSDASH.loadDiagram = function (json)
{
	for (var i in json.block)
	{
		switch (json.block[i].type)
		{
		case "topic":
			ROSDASH.addTopicByDef(json.block[i]);
			break;
		default:
			ROSDASH.addBlockByDef(json.block[i]);
			break;
		}
	}
	for (var i in json.edge)
	{
		ROSDASH.connectBlocks(json.edge[i].source, json.edge[i].target);
	}
	window.cy.fit();
}
ROSDASH.runDiagram = function (user)
{
	ROSDASH.setUser(user);
	ROSDASH.initJson();
	var style = ROSDASH.default_style;
	var element = ROSDASH.default_element;
	var empty_ele = {nodes: new Array(), edges: new Array()};
	ROSDASH.getROSNames(ROSDASH.ros);
	$('#cy').cytoscape({
		layout: {
			name: 'circle'
		},
		style: style,
		elements: empty_ele,
		ready: function()
		{
			window.cy = this;
			$.getJSON('file/' + ROSDASH.user + '-diagram.json', function(data)
			{
				console.log("load diagram: " + ROSDASH.user + "-diagram.json");
				ROSDASH.loadDiagram(data);
			});
			window.cy.elements().unlock();
			window.cy.elements().unselect();
			ROSDASH.blockMoveCallback();
			ROSDASH.connectBlocksCallback();
			ROSDASH.selectBlockCallback();
		}
	});
}
ROSDASH.transformToElements = function (json)
{
	var ele = {
		nodes: new Array(),
		edges: new Array()
	};
	for (var i in json)
	{
		if ("nodes" == json[i].group)
		{
			if (undefined != json[i].data.height)
			{
				json[i].data.height = parseFloat(json[i].data.height);
			}
			if (undefined != json[i].data.weight)
			{
				json[i].data.weight = parseFloat(json[i].data.weight);
			}
			if (undefined != json[i].position)
			{
				json[i].position.x = parseFloat(json[i].position.x);
				json[i].position.y = parseFloat(json[i].position.y);
			}
			ele.nodes.push(json[i]);
		} else if ("edges" == json[i].group)
		{
			if (undefined != json[i].data.strength)
			{
				json[i].data.strength = parseFloat(json[i].data.strength);
			}
			ele.edges.push(json[i]);
		}
	}
	return ele;
}

//------------------- widgets
ROSDASH.parseWidgetContent = function (widget)
{
	switch (widget.widgetType)
	{
	case "text":
		widget.widgetContent = "I am a text widget ^_^";
		break;
	case "table":
		widget.widgetContent = myExampleData.tableWidgetData;
		break;
	case "bubbleChart":
	case "bubble chart":
		widget.widgetType = "chart";
		widget.widgetContent = new Object();
		widget.widgetContent.data = myExampleData.bubbleChartData;
		widget.widgetContent.options = myExampleData.bubbleChartOptions;
		break;
	case "pieChart":
	case "pie chart":
		widget.widgetType = "chart";
		widget.widgetContent = new Object();
		widget.widgetContent.data = myExampleData.pieChartData;
		widget.widgetContent.options = myExampleData.pieChartOptions;
		break;
	case "barChart":
	case "bar chart":
		widget.widgetType = "chart";
		widget.widgetContent = new Object();
		widget.widgetContent.data = myExampleData.barChartData;
		widget.widgetContent.options = myExampleData.barChartOptions;
		break;
	case "chart":
	case "lineChart":
	case "line chart":
		widget.widgetType = "chart";
		widget.widgetContent = new Object();
		widget.widgetContent.data = myExampleData.lineChartData;
		widget.widgetContent.options = myExampleData.lineChartOptions;
		break;
	case "gmap":
		//widget.widgetContent = '<div id="map-canvas" class="sDashboardWidgetContent" />';
		break;
	case "arbor":
		widget.widgetContent = '<canvas id="viewport" class="ArborWidgetContent"></canvas>';
		break;
	case "network":
		widget.widgetContent = '<div id="dracula_canvas" class="draculaWidgetContent"></div>';
		break;
	case "doodle god":
		widget.widgetContent = '<object width="180" height="135"><param name="movie" value="http://www.fupa.com/swf/doodle-god/doodlegod.swf"></param><embed src="http://www.fupa.com/swf/doodle-god/doodlegod.swf" type="application/x-shockwave-flash" width="180" height="135"></embed></object>';
		break;
	case "youtube":
		widget.widgetContent = '<iframe height="180" src="http://www.youtube.com/embed/SxeVZdJFB4s" frameborder="0" allowfullscreen></iframe>';
		break;
	default:
		widget.widgetContent = '';
		break;
	}
	var wdef = ROSDASH.widget_def[widget.widgetType];
	if (undefined !== wdef.runNamespace && undefined !== wdef.init)
	{
		var fn = window["ROSDASH"][wdef.runNamespace][wdef.init];
		if (typeof fn == "function")
		{
			widget = fn(widget);
		}
	}
	return widget;
}
ROSDASH.parseExampleData = function (widget)
{
	if (widget.widgetContent == "myExampleData.textData")
	{
		widget.widgetContent = "Lorem ipsum dolor sit amet,consectetur adipiscing elit. Aenean lacinia mollis condimentum. Proin vitae ligula quis ipsum elementum tristique. Vestibulum ut sem erat.";
	} else if (widget.widgetContent == "myExampleData.tableData")
	{
		widget.widgetContent = myExampleData.tableWidgetData;
	}
	if (typeof widget.widgetContent == "undefined" || typeof widget.widgetContent.data == "undefined")
	{
		return widget;
	}
	switch (widget.widgetContent.data)
	{
	case "myExampleData.bubbleChartData":
		widget.widgetContent.data = myExampleData.bubbleChartData;
		break;
	case "myExampleData.pieChartData":
		widget.widgetContent.data = myExampleData.pieChartData;
		break;
	case "myExampleData.barChartData":
		widget.widgetContent.data = myExampleData.barChartData;
		break;
	case "myExampleData.chartData":
	case "myExampleData.lineChartData":
		widget.widgetContent.data = myExampleData.lineChartData;
		break;
	}
	switch (widget.widgetContent.options)
	{
	case "myExampleData.bubbleChartOptions":
		widget.widgetContent.options = myExampleData.bubbleChartOptions;
		break;
	case "myExampleData.pieChartOptions":
		widget.widgetContent.options = myExampleData.pieChartOptions;
		break;
	case "myExampleData.barChartOptions":
		widget.widgetContent.options = myExampleData.barChartOptions;
		break;
	case "myExampleData.chartOptions":
	case "myExampleData.lineChartOptions":
		widget.widgetContent.options = myExampleData.lineChartOptions;
		break;
	}
	return widget;
}
ROSDASH.widgets = new Object();
ROSDASH.addWidgetByType = function (name)
{
	if (ROSDASH.checkWidgetTypeValid(name))
	{
		if (undefined === ROSDASH.widget_def[name])
		{
			ROSDASH.widget_def[name] = new Object();
			ROSDASH.widget_def[name].count = 0;
		} else if (undefined === ROSDASH.widget_def[name].count)
		{
			ROSDASH.widget_def[name].count = 0;
		} else
		{
			++ ROSDASH.widget_def[name].count;
		}
		var id = name + "-" + ROSDASH.widget_def[name].count;
		var widget = {
			widgetTitle : name + " " + ROSDASH.widget_def[name].count,
			widgetId : id,
			widgetType : name,
			widgetContent : undefined,
			pos : 0
		};
		for (var i in ROSDASH.widgets)
		{
			++ ROSDASH.widgets[i].pos;
		}
		ROSDASH.widgets[id] = widget;
		widget = ROSDASH.parseWidgetContent(widget);
		$("#myDashboard").sDashboard("addWidget", widget);
	}
}
ROSDASH.addWidgetByDef = function (def)
{
	if (def.widgetId in ROSDASH.widgets)
	{
		console.error("widget id duplicate: " + def.widgetId);
		// show the effect
		$("#myDashboard").sDashboard("addWidget", def);
		return;
	}
	if (! ROSDASH.checkWidgetTypeValid(def.widgetType))
	{
		return;
	}
	if (undefined === ROSDASH.widget_def[def.widgetType])
	{
		ROSDASH.widget_def[def.widgetType] = new Object();
		ROSDASH.widget_def[def.widgetType].count = 0;
	} else
	{
		++ ROSDASH.widget_def[def.widgetType].count;
	}
	ROSDASH.widgets[def.widgetId] = def;
	var widget = ROSDASH.parseExampleData(def);
	widget = ROSDASH.parseWidgetContent(widget);
	$("#myDashboard").sDashboard("addWidget", widget);
}
ROSDASH.removeWidget = function (id)
{
	var pos = ROSDASH.widgets[id].pos;
	for (var i in ROSDASH.widgets)
	{
		if (ROSDASH.widgets[i].pos > pos)
		{
			-- ROSDASH.widgets[i].pos;
		}
	}
	delete ROSDASH.widgets[id];
}
ROSDASH.moveWidget = function (sorted)
{
	for (var i in sorted)
	{
		if (sorted[i].widgetId in ROSDASH.widgets)
		{
			ROSDASH.widgets[sorted[i].widgetId].pos = i;
		}
	}
}
ROSDASH.selectedWidget;
ROSDASH.selectWidgetCallback = function (e, data)
{
	ROSDASH.selectedWidget = data.selectedWidgetId;
	var w = ROSDASH.widgets[ROSDASH.selectedWidget];
	if (undefined === w)
	{
		div.find("#property").html("");
		return;
	}
	var div = $("#dialog-form");
	var html = "";
	html += "<p>type: " + w.widgetType + "</p>";
	html += "<p>id: " + w.widgetId + "</p>";
	div.find("#property").html(html);
}

//------------------- panel
ROSDASH.panel_init_count = 4;
ROSDASH.loadPanel = function (json)
{
	var count = 0;
	for (var i in json)
	{
		++ count;
	}
	while (count)
	{
		var max = -1;
		var max_num;
		for (var i in json)
		{
			if (json[i].pos > max)
			{
				max = json[i].pos;
				max_num = i;
			}
		}
		ROSDASH.addWidgetByDef(json[max_num]);
		delete json[max_num];
		-- count;
	}
	// add all widgets into diagram_connection, since when adding diagram_connection, the panel is not loaded
	/*for (var i in ROSDASH.widgets)
	{
		if (undefined === ROSDASH.diagram_connection[i])
		{
			ROSDASH.diagram_connection[i] = new Object();
			ROSDASH.diagram_connection[i].parent = new Object();
			ROSDASH.diagram_connection[i].child = new Object();
			ROSDASH.diagram_connection[i].exist = true;
			ROSDASH.diagram_connection[i].done = false;
		} else
		{
			ROSDASH.diagram_connection[i].exist = true;
		}
	}*/
}
ROSDASH.savePanel = function ()
{
	ROSDASH.saveJson(ROSDASH.widgets, ROSDASH.user + "-panel");
}
ROSDASH.runPanel = function (user)
{
	ROSDASH.setUser(user);
	$("#myDashboard").sDashboard({
		dashboardData : [],
		disableSelection : true
	});
	$("#myDashboard").bind("sdashboardorderchanged", function(e, data)
	{
		ROSDASH.moveWidget(data.sortedDefinitions);
		ROSDASH.savePanel();
	});
	$("#myDashboard").bind("sdashboardheaderclicked", function(e, data)
	{
		ROSDASH.selectWidgetCallback(e, data);
	});
	$("#myDashboard").bind("sdashboardwidgetmaximized", function(e, data)
	{
		ROSDASH.widgetMaxCallback(e, data);
	});
	$("#myDashboard").bind("sdashboardwidgetminimized", function(e, data)
	{
		ROSDASH.widgetMaxCallback(e, data);
	});
	$("#myDashboard").bind("sdashboardwidgetadded", function(e, data)
	{
		ROSDASH.widgetAddCallback(e, data);
	});
	$("#myDashboard").bind("sdashboardwidgetremoved", function(e, data)
	{
		ROSDASH.removeWidget(data.widgetDefinition.widgetId);
	});
	$("#myDashboard").bind("sdashboardwidgetset", function(e, data)
	{
		ROSDASH.widgetSetCallback(e, data);
	});
	$("#myDashboard").bind("sdashboardheaderset", function(e, data)
	{
		ROSDASH.headerSetCallback(e, data);
	});
	
	ROSDASH.connectROS("localhost", "9090");
	ROSDASH.initJson();
	ROSDASH.readDiagram();
	$.getJSON('file/' + ROSDASH.user + '-panel.json', function(data)
	{
		-- ROSDASH.panel_init_count;
		console.log("panel load: " + ROSDASH.user + "-panel.json");
		function start()
		{
			if (0 >= ROSDASH.panel_init_count)
			{
				ROSDASH.loadPanel(data);
				ROSDASH.updateOnceWidgets();
				ROSDASH.updateWidgets();
			} else
			{
				setTimeout(start, 300);
			}
		}
		start();
	}).error(function(d) {
		console.error("panel error: " + ROSDASH.user + "-panel.json");
	});
}

//------------------- diagram execution
ROSDASH.diagram;
// read diagram json for panel analysis
ROSDASH.readDiagram = function ()
{
	$.getJSON('file/' + ROSDASH.user + '-diagram.json', function(data)
	{
		-- ROSDASH.panel_init_count;
		console.log("read diagram: " + ROSDASH.user + '-diagram.json');
		ROSDASH.diagram = data;
		ROSDASH.traverseDiagram();
	}).error(function(d) {
		console.error("read error: " + ROSDASH.user + '-diagram.json');
	});
}
ROSDASH.diagram_connection = new Object();
ROSDASH.traverseDiagram = function ()
{
	for (var i in ROSDASH.diagram.edge)
	{
		var edge = ROSDASH.diagram.edge[i];
		var index = edge.source.lastIndexOf("-");
		var block1 = edge.source.substring(0, index);
		if (undefined === ROSDASH.diagram_connection[block1])
		{
			ROSDASH.diagram_connection[block1] = new Object();
			ROSDASH.diagram_connection[block1].parent = new Object();
			ROSDASH.diagram_connection[block1].child = new Object();
			ROSDASH.diagram_connection[block1].exist = false;
			ROSDASH.diagram_connection[block1].done = false;
		}
		var type1 = edge.source.substring(index + 1);
		index = edge.target.lastIndexOf("-");
		var block2 = edge.target.substring(0, index);
		if (undefined === ROSDASH.diagram_connection[block2])
		{
			ROSDASH.diagram_connection[block2] = new Object();
			ROSDASH.diagram_connection[block2].parent = new Object();
			ROSDASH.diagram_connection[block2].child = new Object();
			ROSDASH.diagram_connection[block2].exist = false;
			ROSDASH.diagram_connection[block2].done = false;
		}
		var type2 = edge.target.substring(index + 1);
		if (type1.substring(0, 1) == "i" && type2.substring(0, 1) == "o")
		{
			ROSDASH.diagram_connection[block1].parent[block2] = type2;
			ROSDASH.diagram_connection[block2].child[block1] = type1;
		} else if (type1.substring(0, 1) == "o" && type2.substring(0, 1) == "i")
		{
			ROSDASH.diagram_connection[block2].parent[block1] = type1;
			ROSDASH.diagram_connection[block1].child[block2] = type2;
		}
	}
	for (var i in ROSDASH.diagram.block)
	{
		if (undefined === ROSDASH.diagram_connection[i])
		{
			ROSDASH.diagram_connection[i] = new Object();
			ROSDASH.diagram_connection[i].parent = new Object();
			ROSDASH.diagram_connection[i].child = new Object();
			ROSDASH.diagram_connection[i].exist = true;
			ROSDASH.diagram_connection[i].done = false;
		} else
		{
			ROSDASH.diagram_connection[i].exist = true;
		}
	}
}
ROSDASH.diagram_output = new Object();
ROSDASH.updateOnceWidgets = function ()
{
	for (var i in ROSDASH.diagram_connection)
	{
		if (! ROSDASH.diagram_connection[i].exist)
		{
			console.error("widget does not exist: "+ i);
			continue;
		}
		var widget = ROSDASH.widget_def[ROSDASH.diagram.block[i].type];
		if (undefined !== widget.runNamespace && undefined !== widget.runOnce)
		{
			var fn = window["ROSDASH"][widget.runNamespace][widget.runOnce];
			if (typeof fn == "function")
			{
				fn(ROSDASH.diagram.block[i]);
			} else
			{
				console.error("widget's run function does not exist: " + i);
				continue;
			}
		} else
		{
			continue;
		}
	}
}
ROSDASH.done_count = 0;
ROSDASH.updateWidgets = function ()
{
	ROSDASH.done_count = 0;
	var last_count = -1;
	for (var i in ROSDASH.diagram_connection)
	{
		ROSDASH.diagram_connection[i].done = false;
	}
	while (last_count < ROSDASH.done_count)
	{
		last_count = ROSDASH.done_count;
		for (var i in ROSDASH.diagram_connection)
		{
			if (! ROSDASH.diagram_connection[i].exist)
			{
				continue;
			}
			if (ROSDASH.diagram_connection[i].done)
			{
				continue;
			}
			var ready_flag = true;
			var input = new Object();
			var count = 0;
			for (var j in ROSDASH.diagram_connection[i].parent)
			{
				if (! (j in ROSDASH.diagram_output) || undefined === ROSDASH.diagram_output[j])
				{
					ready_flag = false;
					break;
				}
				input[count] = ROSDASH.diagram_output[j];
				++ count;
			}
			if (ready_flag)
			{
				var widget = ROSDASH.widget_def[ROSDASH.diagram.block[i].type];
				if (undefined === widget.runNamespace || undefined === widget.run)
				{
					continue;
				}
				var fn = window["ROSDASH"][widget.runNamespace][widget.run];
				if (typeof fn != "function")
				{
					continue;
				}
				fn(ROSDASH.diagram.block[i], input);
				ROSDASH.diagram_connection[i].done = true;
				++ ROSDASH.done_count;
			}
		}
	}
	setTimeout(ROSDASH.updateWidgets, 200);
}

//------------------- panel callback
ROSDASH.widgetMaxCallback = function (e, data)
{
	switch (data.widgetDefinition.widgetType)
	{
	case "gmap":
		ROSDASH.Gmap.resizeGmap();
		break;
	case "arbor":
		//arborInit();
		break;
	case "network":
		draculaInit("dracula_canvas");
		break;
	}
}
ROSDASH.widgetAddCallback = function (e, data)
{
	switch (data.widgetDefinition.widgetType)
	{
	case "gmap":
		ROSDASH.Gmap.initGmap();
		break;
	case "arbor":
		arborInit();
		break;
	case "network":
		draculaInit("dracula_canvas");
		break;
	}
}
ROSDASH.widgetSetCallback = function (e, data)
{
	for (var i in data)
	{
		//console.log(data[i]);
	}
}
ROSDASH.headerSetCallback = function (e, data)
{
	for (var i in data)
	{
		//console.log(data[i]);
	}
}

//------------------- widget execution
ROSDASH.rosMsg = new Object();

ROSDASH.Topic = new Object();
ROSDASH.Topic.runOnce = function (block)
{
	var hyphen = block.id.lastIndexOf("_");
	var name = block.id.substring(hyphen + 1);
	var type = 'std_msgs/String';
	ROSDASH.rosMsg[name] = "cannot connect to ROS";
	var listener = new ROSLIB.Topic({
		ros : ROSDASH.ros,
		name : name,
		messageType : type
	});
	listener.subscribe(function(message)
	{
		ROSDASH.rosMsg[name] = message;
		//listener.unsubscribe();
	});
}
ROSDASH.Topic.run = function (block, input)
{
	var hyphen = block.id.lastIndexOf("_");
	var name = block.id.substring(hyphen + 1);
	//ROSDASH.rosMsg[name] = "running";
	ROSDASH.diagram_output[block.id] = ROSDASH.rosMsg[name];
}

ROSDASH.msgToStr = function (msg)
{
	var str = "";
	if (typeof msg == "object" || typeof msg == "array")
	{
		for (var i in msg)
		{
			str += " ( " + i + ": ";
			str += ROSDASH.msgToStr(msg[i]).o0;
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
	if (undefined === input[0])
	{
		return;
	}
	$("#myDashboard").sDashboard("setContentById", block.id, input[0]);
	$("#myDashboard").sDashboard("setHeaderById", block.id, "topic listener");
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
ROSDASH.Flot.init = function (widget)
{
	console.debug("flot init");
	//widget.widgetContent = '<div id="placeholder" style="width:300px;height:300px;background:#fff;"></div>';
	widget.widgetContent = '<div id="placeholder" class="draculaWidgetContent" style="height:190px" />';
	return widget;
}
ROSDASH.Flot.runOnce = function ()
{
	if ($("#placeholder").length > 0)
	{
		$(function() {
			var d1 = [];
			for (var i = 0; i < 14; i += 0.5) {
				d1.push([i, Math.sin(i)]);
			}
			var d2 = [[0, 3], [4, 8], [8, 5], [9, 13]];
			// A null signifies separate line segments
			var d3 = [[0, 12], [7, 12], null, [7, 2.5], [12, 2.5]];
			$.plot("#placeholder", [ d1, d2, d3 ]);
		});
	}
}

//@todo
ROSDASH.addToDiagram = function ()
{
	if (undefined === ROSDASH.selectedWidget)
	{
		console.error("cannot add to diagram");
		return;
	}
	var find = ROSDASH.selectedWidget.lastIndexOf("-");
	var widget_type = ROSDASH.selectedWidget.substring(0, find);
	var widget_num = parseFloat(ROSDASH.selectedWidget.substring(find));
	ROSDASH.diagram.block[ROSDASH.selectedWidget] = {
		id: ROSDASH.selectedWidget,
		type: widget_type,
		number: widget_num,
		x: 400,
		y: 0
	};
	ROSDASH.saveJson(ROSDASH.diagram, "test4-diagram");
}
