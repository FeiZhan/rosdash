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
					ROSDASH.saveProperty(this);
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
					$("#cy").width($("#cy").width() + 310);
				}
				$( [] ).val( "" ).removeClass( "ui-state-error" );
				ROSDASH.property_open = false;
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
					ROSDASH.saveProperty(this);
					$( this ).dialog( "close" );
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			},
			close: function() {
				$( [] ).val( "" ).removeClass( "ui-state-error" );
				ROSDASH.property_open = false;
			}
		});
	}
});
ROSDASH.property_open = false;
ROSDASH.showProperty = function ()
{
	if ($("#cy").length > 0)
	{
		$("#cy").offset({left: 310});
		$("#cy").width($("#cy").width() - 310);
	}
	if (! ROSDASH.property_open)
	{
		$( "#dialog-form" ).dialog( "open" );
		ROSDASH.property_open = true;
	} else
	{
		$( "#dialog-form" ).dialog( "close" );
		ROSDASH.property_open = false;
	}
}
ROSDASH.saveProperty = function (dialog)
{
	$(dialog).find("input").each(function (i, ele)
	{
		ROSDASH.blocks[ROSDASH.selected_block][$(ele).attr("name")] = $(ele).val();
	});
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
ROSDASH.msg_def = new Object();
ROSDASH.getMsgDef = function (name)
{
	for (var i in ROSDASH.msg_json)
	{
		var json = ROSDASH.msg_json[i];
		for (var j in json)
		{
			var json2 = json[j];
			if (undefined === json2.name)
			{
				for (var k in json2)
				{
					if (json2[k].name == name)
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
	console.error("wrong msg type: " + name);
	return undefined;
}
ROSDASH.checkMsgTypeValid = function (name)
{
	return (undefined !== ROSDASH.getMsgDef(name));
}
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
//@todo change to widget_def
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
ROSDASH.BLOCK_SIZE = [200, 70];
ROSDASH.PIN_SIZE = [5, 5];
ROSDASH.BLOCK_SHAPE = "rectangle";
ROSDASH.BLOCK_COLOR = "blue";
ROSDASH.PIN_COLOR = "grey";
ROSDASH.NEW_POS = [400, 0];
ROSDASH.INPUT_POS = {
	"1": [[-70, 0]],
	"2": [[-70, -20], [-70, 20]],
	"3": [[-70, -20], [-70, 0], [-70, 20]],
	"4": [[-70, -30], [-70, -10], [-70, 10], [-70, 30]],
};
ROSDASH.OUTPUT_POS = {
	"1": [[70, 0]],
	"2": [[70, -20], [70, 20]],
	"3": [[70, -20], [70, 0], [70, 20]],
};
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
			height: ROSDASH.BLOCK_SIZE[0],
			weight: ROSDASH.BLOCK_SIZE[1],
			faveColor: "green",
			faveShape: ROSDASH.BLOCK_SHAPE
		},
		position: { x: x, y: y },
		classes: "body"
	});
	window.cy.add({
		group: "nodes",
		data: {
			id: id + "-o0",
			height: ROSDASH.PIN_SIZE[0],
			weight: ROSDASH.PIN_SIZE[1],
			faveColor: ROSDASH.PIN_COLOR,
			faveShape: ROSDASH.BLOCK_SHAPE
		},
		position: { x: x + ROSDASH.OUTPUT_POS[1][0][0], y: y + ROSDASH.OUTPUT_POS[1][0][1] },
		classes: "output",
		locked: true
	});
	var block = {
		id: id,
		type: "topic",
		rosname: name,
		number: ROSDASH.ros_blocks.topic.length,
		x: x,
		y: y
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
			height: ROSDASH.BLOCK_SIZE[0],
			weight: ROSDASH.BLOCK_SIZE[1],
			faveColor: "green",
			faveShape: ROSDASH.BLOCK_SHAPE
		},
		position: { x: x, y: y },
		classes: "body"
	});
	window.cy.add({
		group: "nodes",
		data: {
			id: id + "-o0",
			height: ROSDASH.PIN_SIZE[0],
			weight: ROSDASH.PIN_SIZE[1],
			faveColor: ROSDASH.PIN_COLOR,
			faveShape: ROSDASH.BLOCK_SHAPE
		},
		position: { x: x + ROSDASH.OUTPUT_POS[1][0][0], y: y + ROSDASH.OUTPUT_POS[1][0][1] },
		classes: "output",
		locked: true
	});
	var block = {
		id: id,
		type: "topic",
		rosname: def.rosname,
		number: ROSDASH.ros_blocks.topic.length,
		x: x,
		y: y
	};
	ROSDASH.blocks[id] = block;
	ROSDASH.ros_blocks.topic.push(name);
}
//@todo
ROSDASH.block_type = new Object();
ROSDASH.blocks = new Object();
ROSDASH.addBlockByType = function (type)
{
	var block = new Object();
	var input_num;
	var output_num;
	if (ROSDASH.checkWidgetTypeValid(type))
	{
		block = {
			type: type,
		};
		input_num = ROSDASH.widget_def[type].input.length;
		output_num = ROSDASH.widget_def[type].output.length;
	} else if (ROSDASH.checkMsgTypeValid(type))
	{
		block = {
			type: "constant",
			constant: true,
			constname: type,
			value: ""
		};
		input_num = 0;
		output_num = 1;
	} else
	{
		return;
	}
	var next_pos = ROSDASH.getNextNewBlockPos();
	block.x = next_pos[0];
	block.y = next_pos[1];
	if (ROSDASH.block_type[type] === undefined)
	{
		ROSDASH.block_type[type] = new Object();
		ROSDASH.block_type[type].count = 0;
	} else
	{
		++ ROSDASH.block_type[type].count;
	}
	block.number = ROSDASH.block_type[type].count;
	block.id = type + "-" +  ROSDASH.block_type[type].count;
	block.name = type + " " +  ROSDASH.block_type[type].count;
	window.cy.add({
		group: "nodes",
		data: {
			id: block.id,
			name: block.name,
			height: ROSDASH.BLOCK_SIZE[0],
			weight: ROSDASH.BLOCK_SIZE[1],
			faveColor: ROSDASH.BLOCK_COLOR,
			faveShape: ROSDASH.BLOCK_SHAPE
		},
		position: { x: block.x, y: block.y },
		classes: "body"
	});
	for (var i = 0; i < input_num; ++ i)
	{
		window.cy.add({
			group: "nodes",
			data: {
				id: block.id + "-i" + i,
				height: ROSDASH.PIN_SIZE[0],
				weight: ROSDASH.PIN_SIZE[1],
				faveColor: ROSDASH.PIN_COLOR,
				faveShape: ROSDASH.BLOCK_SHAPE
			},
			position: { x: block.x + ROSDASH.INPUT_POS[input_num][i][0], y: block.y + ROSDASH.INPUT_POS[input_num][i][1] },
			classes: "input",
			locked: true
		});
	}
	for (var i = 0; i < output_num; ++ i)
	{
		window.cy.add({
			group: "nodes",
			data: {
				id: block.id + "-o" + i,
				height: ROSDASH.PIN_SIZE[0],
				weight: ROSDASH.PIN_SIZE[1],
				faveColor: ROSDASH.PIN_COLOR,
				faveShape: ROSDASH.BLOCK_SHAPE
			},
			position: { x: block.x + ROSDASH.OUTPUT_POS[output_num][i][0], y: block.y + ROSDASH.OUTPUT_POS[output_num][i][1] },
			classes: "output",
			locked: true
		});
	}
	ROSDASH.blocks[block.id] = block;
}
ROSDASH.addBlockByDef = function (def)
{
	var block = new Object();
	var input_num;
	var output_num;
	var name;
	if ("constant" == def.type || ROSDASH.checkMsgTypeValid(def.type))
	{
		block = def;
		block.type = "constant";
		block.constant = true;
		input_num = 0;
		output_num = 1;
		name = block.constname;
	} else if (ROSDASH.checkWidgetTypeValid(def.type))
	{
		block = def;
		input_num = ROSDASH.widget_def[def.type].input.length;
		output_num = ROSDASH.widget_def[def.type].output.length;
		name = def.type;
	} else
	{
		return;
	}
	var next_pos = ROSDASH.getNextNewBlockPos();
	block.x = (typeof def.x != 'undefined') ? parseFloat(def.x) : next_pos[0];
	block.y = (typeof def.y != 'undefined') ? parseFloat(def.y) : next_pos[1];
	if (ROSDASH.block_type[name] === undefined)
	{
		ROSDASH.block_type[name] = new Object();
		ROSDASH.block_type[name].count = def.number;
	} else if (def.number > ROSDASH.block_type[name].count)
	{
		ROSDASH.block_type[name].count = def.number;
	} else
	{
		for (var i in ROSDASH.blocks)
		{
			if (name == ROSDASH.blocks[i].type && def.number == ROSDASH.blocks[i].number)
			{
				console.error("block number conflicts: " + def.id);
				return;
			}
		}
	}
	window.cy.add({
		group: "nodes",
		data: {
			id: block.id,
			name: block.name,
			height: ROSDASH.BLOCK_SIZE[0],
			weight: ROSDASH.BLOCK_SIZE[1],
			faveColor: ROSDASH.BLOCK_COLOR,
			faveShape: ROSDASH.BLOCK_SHAPE
		},
		position: { x: block.x, y: block.y },
		classes: "body"
	});
	for (var i = 0; i < input_num; ++ i)
	{
		window.cy.add({
			group: "nodes",
			data: {
				id: block.id + "-i" + i,
				height: ROSDASH.PIN_SIZE[0],
				weight: ROSDASH.PIN_SIZE[1],
				faveColor: ROSDASH.PIN_COLOR,
				faveShape: ROSDASH.BLOCK_SHAPE
			},
			position: { x: block.x + ROSDASH.INPUT_POS[input_num][i][0], y: block.y + ROSDASH.INPUT_POS[input_num][i][1] },
			classes: "input",
			locked: true
		});
	}
	for (var i = 0; i < output_num; ++ i)
	{
		window.cy.add({
			group: "nodes",
			data: {
				id: block.id + "-o" + i,
				height: ROSDASH.PIN_SIZE[0],
				weight: ROSDASH.PIN_SIZE[1],
				faveColor: ROSDASH.PIN_COLOR,
				faveShape: ROSDASH.BLOCK_SHAPE
			},
			position: { x: block.x + ROSDASH.OUTPUT_POS[output_num][i][0], y: block.y + ROSDASH.OUTPUT_POS[output_num][i][1] },
			classes: "output",
			locked: true
		});
	}
	ROSDASH.blocks[block.id] = block;
}

//------------------- block actions
ROSDASH.selected_block;
// update the property dialog box
ROSDASH.selectBlockCallback = function ()
{
	window.cy.on('select', function(evt)
	{
		if (evt.cyTarget.isNode())
		{
			var id = evt.cyTarget.id();
			var div = $("#dialog-form");
			var html = "";
			// pin
			if (undefined === evt.cyTarget.hasClass("body") || false == evt.cyTarget.hasClass("body"))
			{
				var hyphen = id.lastIndexOf("-");
				var id2 = id.substring(0, hyphen);
				var block = ROSDASH.blocks[id2];
				var widget = ROSDASH.widget_def[block.type];
				if (undefined !== block.type)
				{
					html += "<p>type: " + block.type + "</p>";
				}
				if (undefined !== block.id)
				{
					ROSDASH.selected_block = block.id;
					html += '<p>id: ' + block.id + "</p>";
				}
				var pin_num = parseFloat(id.substring(hyphen + 2));
				if (evt.cyTarget.hasClass("input"))
				{
					html += "<p>input: " + widget.input[pin_num].name + " (" + widget.input[pin_num].datatype + ")</p>";
				} else if (evt.cyTarget.hasClass("output"))
				{
					html += "<p>output: " + widget.output[pin_num].name + " (" + widget.output[pin_num].datatype + ")</p>";
				}
			} else // body
			{
				var block = ROSDASH.blocks[id];
				var widget = ROSDASH.widget_def[block.type];
				if (undefined !== block.type)
				{
					html += "<p>type: " + block.type + "</p>";
				}
				if (undefined !== block.id)
				{
					ROSDASH.selected_block = block.id;
					html += '<p>id: ' + block.id + "</p>";
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
				if (block.constant)
				{
					html += 'value: <input type="text" name="value" value="' + block.value + '" class="text ui-widget-content ui-corner-all" />';
				}
			}
			div.find("#property").html(html);
		} else
		{
			ROSDASH.selected_block = undefined;
			var div = $("#dialog-form");
			var html = "<p>type: edge</p><p>source: " + evt.cyTarget.source().id() + "</p><p>target: " + evt.cyTarget.target().id() + "</p>";
			div.find("#property").html(html);
		}
	});
}
ROSDASH.removeBlock = function (name)
{
	var ele = window.cy.$(':selected');
	var id;
	var type;
	// priority on selected elements
	if (ele.size() > 0 )
	{
		id = ele.id();
		if (ele.id() in ROSDASH.blocks)
		{
			type = ROSDASH.blocks[ele.id()].type;
			delete ROSDASH.blocks[ele.id()];
		}
		ele.remove();
	} else if (undefined != name && "" != name)
	{
		id = name;
		ele = cy.nodes('[id = "' + name + '"]');
		if (0 == ele.size())
		{
			ele = cy.nodes('[name = "' + name + '"]');
			id = ele.id();
		}
		if (0 < ele.size())
		{
			if (id in ROSDASH.blocks)
			{
				type = ROSDASH.blocks[id].type;
				delete ROSDASH.blocks[id];
			}
			ele.remove();
		}
	}
	if (undefined === ROSDASH.widget_def[type])
	{
		return;
	}
	for (var i = 0; i < ROSDASH.widget_def[type].input.length; ++ i)
	{
		ROSDASH.removeBlock(id + "-i" + i);
	}
	for (var i = 0; i < ROSDASH.widget_def[type].output.length; ++ i)
	{
		ROSDASH.removeBlock(id + "-o" + i);
	}
}
ROSDASH.followBlock = function (target)
{
	var id = target.id();
	if (undefined === ROSDASH.blocks[id])
	{
		return;
	}
	ROSDASH.blocks[id].x = target.position('x');
	ROSDASH.blocks[id].y = target.position('y');
	var type = ROSDASH.blocks[id].type;
	if (undefined !== ROSDASH.blocks[id])
	{
		var pin_num = ROSDASH.widget_def[type].input.length;
		for (var i = 0; i < pin_num; ++ i)
		{
			window.cy.nodes('[id = "' + id + "-i" + i + '"]').positions(function (j, ele)
			{
				ele.position({
					x: target.position('x') + ROSDASH.INPUT_POS[pin_num][i][0],
					y: target.position('y') + ROSDASH.INPUT_POS[pin_num][i][1]
				});
			});
		}
		pin_num = ROSDASH.widget_def[type].output.length;
		for (var i = 0; i < pin_num; ++ i)
		{
			window.cy.nodes('[id = "' + id + "-o" + i + '"]').positions(function (j, ele)
			{
				ele.position({
					x: target.position('x') + ROSDASH.OUTPUT_POS[pin_num][i][0],
					y: target.position('y') + ROSDASH.OUTPUT_POS[pin_num][i][1]
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
		json.block[i] = ROSDASH.blocks[i];
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
				ROSDASH.loadDiagram(data);
				console.log("load diagram: " + ROSDASH.user + "-diagram.json");
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
		widget.widgetContent = '<iframe src="http://www.youtube.com/embed/SxeVZdJFB4s" frameborder="0" allowfullscreen></iframe>';
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
	if (true) //ROSDASH.checkWidgetTypeValid(name))
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
			ROSDASH.diagram_connection[block1].output = new Object();
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
			ROSDASH.diagram_connection[block2].output = new Object();
			ROSDASH.diagram_connection[block2].exist = false;
			ROSDASH.diagram_connection[block2].done = false;
		}
		var type2 = edge.target.substring(index + 1);
		if (type1.substring(0, 1) == "i" && type2.substring(0, 1) == "o")
		{
			ROSDASH.diagram_connection[block1].parent[block2] = type1;
			ROSDASH.diagram_connection[block1].output[block2] = type2;
		} else if (type1.substring(0, 1) == "o" && type2.substring(0, 1) == "i")
		{
			ROSDASH.diagram_connection[block2].parent[block1] = type2;
			ROSDASH.diagram_connection[block2].output[block1] = type1;
		}
	}
	for (var i in ROSDASH.diagram.block)
	{
		if (undefined === ROSDASH.diagram_connection[i])
		{
			ROSDASH.diagram_connection[i] = new Object();
			ROSDASH.diagram_connection[i].parent = new Object();
			ROSDASH.diagram_connection[i].output = new Object();
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
			for (var j in ROSDASH.diagram_connection[i].parent)
			{
				if (! (j in ROSDASH.diagram_output) || undefined === ROSDASH.diagram_output[j])
				{
					ready_flag = false;
				} else
				{
					var count = ROSDASH.diagram_connection[i].parent[j].substring(1);
					input[count] = ROSDASH.diagram_output[j][ROSDASH.diagram_connection[i].output[j]];
				}
			}
	console.debug(i);
	console.debug(ROSDASH.diagram_connection[i].parent);
	console.debug(input);
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
				ROSDASH.diagram_output[i] = fn(ROSDASH.diagram.block[i], input);
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
