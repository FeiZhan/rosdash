var ROSDASH = new Object();
ROSDASH.version = "1.0";
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
		var t = "";
		for (var i in topics)
		{
			t += topics[i] + ", ";
		}
		console.log('topics: ' + t);
	});
	ros.getServices(function (services)
	{
		ROSDASH.services = services;
		var t = "";
		for (var i in services)
		{
			t += services[i] + ", ";
		}
		console.log('services: ' + t);
	});
	ros.getParams(function (params)
	{
		ROSDASH.params = params;
		var t = "";
		for (var i in params)
		{
			t += params[i] + ", ";
		}
		console.log('params: ' + t);
	});
}
ROSDASH.checkROSValid = function (name, type)
{
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
	return (-1 == jQuery.inArray(name, ROSDASH.ros_blocks[type]));
}
var NEW_POS = [400, 0];
ROSDASH.addTopic = function (name, x, y)
{
	if ("" == name) // ! ROSDASH.checkROSValid(name, "topic") || ! ROSDASH.checkROSConflict(name, "topic"))
	{
		console.error("topic name not valid: " + name);
		return;
	}
	x = (typeof x !== 'undefined') ? x : NEW_POS[0];
	y = (typeof y !== 'undefined') ? y : NEW_POS[1];
	window.cy.add({
		group: "nodes",
		data: {
			id: "topic_" + name,
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
			id: "topic_" + name + "_o0",
			weight: 10,
			height: 20,
			faveColor: "grey",
			faveShape: "rectangle"
		},
		position: { x: x + 70, y: y },
		classes: "output",
		locked: true
	});
	ROSDASH.ros_blocks.topic.push(name);
	var block = {
		id: "topic_" + name,
		type: "topic",
		number: ROSDASH.ros_blocks.topic.length,
		input_num: 0,
		output_num: 1
	};
	ROSDASH.blocks["topic_" + name] = block;
	ROSDASH.updateDiagram();
}
ROSDASH.addTopicCallback = function ()
{
	ROSDASH.addTopic($("#topic").val());
}
ROSDASH.block_count = new Object();
ROSDASH.blocks = new Object();
ROSDASH.checkBlockNameValid = function (name)
{
	if (undefined === name || "" == name || " " == name || undefined === ROSDASH.checkWidgetNameValid(name))
	{
		console.log("block name not valid");
		return false;
	}
	return true;
}
ROSDASH.saveDiagram = function ()
{
	var json = {
		user: "",
		version: "1.0",
		type: "diagram",
		block: new Object(),
		edge: new Array()
	};
	for (var i in ROSDASH.blocks)
	{
		json.block[i] = ROSDASH.blocks[i];
		json.block[i].x = window.cy.$("#" + ROSDASH.blocks[i].id).position('x');
		json.block[i].y = window.cy.$("#" + ROSDASH.blocks[i].id).position('y');
	}
	window.cy.edges().each(function (i, ele)
	{
		var e = {
			source: ele.source().id(),
			target: ele.target().id()
		};
		json.edge.push(e);
	});
	ROSDASH.saveJson(json, "test4-diagram");
}
ROSDASH.loadDiagram = function (json)
{
	for (var i in json.block)
	{
		var x = parseFloat(json.block[i].x);
		var y = parseFloat(json.block[i].y);
		switch (json.block[i].type)
		{
		case "topic":
			ROSDASH.addTopic(i.substring(6), x, y);
			break;
		default:
			ROSDASH.addBlock(json.block[i].type, x, y);
			break;
		}
	}
	for (var i in json.edge)
	{
		ROSDASH.connectBlocks(json.edge[i].source, json.edge[i].target);
	}
	window.cy.fit();
}
ROSDASH.readBlockCallback = function ()
{
	$.getJSON('file/test4-diagram.json', function(data)
	{
		ROSDASH.loadDiagram(data);
	});
}
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
			console.log("ajax success: " + textStatus);
		},
		error: function(jqXHR, textStatus, errorThrown)
		{
			console.log("ajax error: " + textStatus);
		}
	});
}
ROSDASH.updateDiagram = function ()
{
	var json = {
		user: "",
		version: "1.0",
		type: "diagram",
		data: new Array()
	};
	cy.elements().each(function(i, ele)
	{
		json.data.push(ele.json());
	});
	$.ajax({
		type: "POST",
		url: "rosdash.php",
		dataType: 'json',
		data: {
				file_name: "test3-diagram",
				data: json
		},
		success: function( data, textStatus, jqXHR )
		{
			console.log("ajax success: " + textStatus);
		},
		error: function(jqXHR, textStatus, errorThrown)
		{
			console.log("ajax error: " + textStatus);
		}
	});
	ROSDASH.saveDiagram();
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
ROSDASH.addBlock = function (name, x, y)
{
	if (! ROSDASH.checkBlockNameValid(name))
	{
		return;
	}
	x = (typeof x !== 'undefined') ? x : NEW_POS[0];
	y = (typeof y !== 'undefined') ? y : NEW_POS[1];
	if (ROSDASH.block_count[name] === undefined)
	{
		ROSDASH.block_count[name] = 0;
	} else
	{
		++ ROSDASH.block_count[name];
	}
	var block = {
		type: name,
		number: ROSDASH.block_count[name]
	};
	var id = name + ROSDASH.block_count[name];
	block.id = id;
	window.cy.add({
		group: "nodes",
		data: {
			id: id,
			name: name + " " + ROSDASH.block_count[name],
			weight: 70,
			faveColor: "blue",
			faveShape: "rectangle"
		},
		position: { x: x, y: y },
		classes: "body"
	});
	var widget_template = ROSDASH.checkWidgetNameValid(name);
	block.input_num = widget_template.input_num;
	for (var i = 0; i < block.input_num; ++ i)
	{
		window.cy.add({
			group: "nodes",
			data: {
				id: id + "_i" + i,
				weight: 10,
				height: 20,
				faveColor: "grey",
				faveShape: "rectangle"
			},
			position: { x: x - 70, y: y },
			classes: "input",
			locked: true
		});
	}
	block.output_num = widget_template.output_num;
	for (var i = 0; i < block.output_num; ++ i)
	{
		window.cy.add({
			group: "nodes",
			data: {
				id: id + "_o" + i,
				weight: 10,
				height: 20,
				faveColor: "grey",
				faveShape: "rectangle"
			},
			position: { x: x + 70, y: y },
			classes: "output",
			locked: true
		});
	}
	ROSDASH.blocks[id] = block;
	ROSDASH.updateDiagram();
}
ROSDASH.addBlockCallback = function ()
{
	ROSDASH.addBlock($("#topic").val());
}
ROSDASH.removeBlockCallback = function ()
{
	var ele = window.cy.$(':selected');
	var name = $("#topic").val();
	if (ele.size() > 0)
	{
		ele.remove();
		ROSDASH.updateDiagram();
	} else if (undefined != name && "" != name)
	{
		ele = cy.nodes('[id = "' + name + '"]');
		if (0 == ele.size())
		{
			ele = cy.nodes('[name = "' + name + '"]');
		}
		if (0 < ele.size())
		{
			ele.remove();
		}
		ROSDASH.updateDiagram();
	}
}
ROSDASH.blockMoveCallback = function ()
{
	window.cy.on('position', function(evt)
	{
		var id = evt.cyTarget.id();
		if (undefined != ROSDASH.blocks[id])
		{
			var pin_num = ROSDASH.blocks[id].input_num;
			for (var i = 0; i < pin_num; ++ i)
			{
				window.cy.nodes('[id = "' + id + "_i" + i + '"]').positions(function (i, ele)
				{
					ele.position({
						x: evt.cyTarget.position('x') - 70,
						y: evt.cyTarget.position('y')
					});
				});
			}
			pin_num = ROSDASH.blocks[id].output_num;
			for (var i = 0; i < pin_num; ++ i)
			{
				window.cy.nodes('[id = "' + id + "_o" + i + '"]').positions(function (i, ele)
				{
					ele.position({
						x: evt.cyTarget.position('x') + 70,
						y: evt.cyTarget.position('y')
					});
				});
			}
		}
	});
	window.cy.on('free', function(evt)
	{
		ROSDASH.updateDiagram();
	});
}
ROSDASH.connect_former;
ROSDASH.connect_former_type;
ROSDASH.connectBlocks = function (source, target)
{
	cy.add({
		group: "edges",
		"data": {
		"source": source,
		"target": target,
		"faveColor": "grey",
		"strength": 10
		}
	});
	ROSDASH.saveDiagram();
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
		if (undefined === ROSDASH.connect_former)
		{
			ROSDASH.connect_former = evt.cyTarget;
			ROSDASH.connect_former_type = connect_type;
		} else if (undefined != ROSDASH.connect_former && connect_type != ROSDASH.connect_former_type)
		{
			ROSDASH.connectBlocks(ROSDASH.connect_former.id(), evt.cyTarget.id());
			ROSDASH.connect_former = undefined;
		} else
		{
			ROSDASH.connect_former = undefined;
			console.log("connect error");
		}
	});
}
ROSDASH.msg_json = {
	"std_msgs": new Object()
};
ROSDASH.widget_json = {
	"widgets": new Object()
};
ROSDASH.initJson = function ()
{
	for (var i in ROSDASH.msg_json)
	{
		$.getJSON("param/" + i + ".json", function(data, status, xhr)
		{
			for (var j in data)
			{
				ROSDASH.msg_json[j] = data;
				console.log("load json " + j + " : " + data[j]);
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
				console.log("load json " + j + " : " + data[j]);
			}
		});
	}
}
ROSDASH.gmap = undefined;
ROSDASH.initGmap = function ()
{
	if ($("#map-canvas").length)
	{
		var mapOptions = {
		  center: new google.maps.LatLng(-34.397, 150.644),
		  zoom: 8,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		ROSDASH.gmap = new google.maps.Map(document.getElementById("map-canvas"),
			mapOptions);
	} else
	{
		setTimeout(ROSDASH.initGmap, 300);
	}
}
ROSDASH.resizeGmap = function ()
{
	google.maps.event.trigger(ROSDASH.gmap, "resize");
}
ROSDASH.parseWidgetContent = function (widget)
{
	switch (widget.widgetType)
	{
	case "text":
		widget.widgetContent = "Lorem ipsum dolor sit amet,consectetur adipiscing elit. Aenean lacinia mollis condimentum. Proin vitae ligula quis ipsum elementum tristique. Vestibulum ut sem erat.";
		break;
	case "table":
		widget.widgetContent = myExampleData.tableWidgetData;
		break;
	case "bubbleChart":
		widget.widgetType = "chart";
		widget.widgetContent = new Object();
		widget.widgetContent.data = myExampleData.bubbleChartData;
		widget.widgetContent.options = myExampleData.bubbleChartOptions;
		break;
	case "pieChart":
		widget.widgetType = "chart";
		widget.widgetContent = new Object();
		widget.widgetContent.data = myExampleData.pieChartData;
		widget.widgetContent.options = myExampleData.pieChartOptions;
		break;
	case "barChart":
		widget.widgetType = "chart";
		widget.widgetContent = new Object();
		widget.widgetContent.data = myExampleData.barChartData;
		widget.widgetContent.options = myExampleData.barChartOptions;
		break;
	case "chart":
	case "lineChart":
		widget.widgetType = "chart";
		widget.widgetContent = new Object();
		widget.widgetContent.data = myExampleData.lineChartData;
		widget.widgetContent.options = myExampleData.lineChartOptions;
		break;
	case "gmap":
		widget.widgetContent = '<div id="map-canvas" class="sDashboardWidgetContent" />';
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
		widget.widgetContent = '<iframe width="560" height="315" src="http://www.youtube.com/embed/SxeVZdJFB4s" frameborder="0" allowfullscreen></iframe>';
		break;
	default:
		widget.widgetContent = '';
		break;
	}
	return widget;
}
ROSDASH.parseOneExampleData = function (widget)
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
ROSDASH.parseExampleData = function (widgets)
{
	for (var i in widgets)
	{
		ROSDASH.parseOneExampleData(widgets[i]);
	}
	return widgets;
}
ROSDASH.widget_num = new Object();
ROSDASH.checkWidgetNameValid = function (name)
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
					//console.log("checkWidgetNameValid " + json2[k].type + " " + name);
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
	console.log("wrong widget name: " + name);
	return undefined;
}
ROSDASH.addWidget = function (name)
{
	if (undefined != name && "" != name) //undefined != ROSDASH.checkWidgetNameValid(name))
	{
		if (undefined === ROSDASH.widget_num[name])
		{
			ROSDASH.widget_num[name] = 0;
		} else
		{
			++ ROSDASH.widget_num[name];
		}
		var widget = {
			widgetTitle : name + " " + ROSDASH.widget_num[name],
			widgetId : name + "-" + ROSDASH.widget_num[name],
			widgetType : name,
			widgetContent : undefined
		};
		widget = ROSDASH.parseWidgetContent(widget);
		$("#myDashboard").sDashboard("addWidget", widget);
		//ROSDASH.updateOrder();
	}
}
ROSDASH.initWidget = function (json)
{
	if (undefined === json || null == json || undefined === json.length)
	{
		return;
	}
	for (var i = json.length - 1; i >= 0; -- i)
	{
		ROSDASH.addWidget(json[i].widgetType);
	}
}
ROSDASH.addWidgetCallback = function ()
{
	$("#btnAddWidget").click(function()
	{
		var name = $("#text").val();
		ROSDASH.addWidget(name);
	});
}
ROSDASH.widget_order = new Array();
ROSDASH.updateOrder = function (sorted_widgets)
{
	$.ajax({
		type: "POST",
		url: "rosdash.php",
		dataType: 'json',
		data: {
				file_name: "test3-panel",
				data: sorted_widgets
		},
		success: function( data, textStatus, jqXHR )
		{
			console.log("save successful");
		},
		error: function(jqXHR, textStatus, errorThrown)
		{
			console.log("save error");
		}
	});
}
ROSDASH.diagram;
ROSDASH.selectedWidget;
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
ROSDASH.ros;
ROSDASH.connectROS = function (host, port)
{
	ROSDASH.ros = new ROSLIB.Ros();
	ROSDASH.ros.on('error', function(error) {
		console.log(error);
	});
	ROSDASH.ros.on('connection', function() {
		console.log('ROS connection made!');
	});
	ROSDASH.ros.connect('ws://localhost:9090');
}
ROSDASH.updateWidgets = function ()
{
	ROSDASH.Widgets.text("text-0", "topic /listener", ROSDASH.msgToStr(ROSDASH.rosMsg['/listener']));
	setTimeout(ROSDASH.updateWidgets, 200);
}
ROSDASH.Widgets = new Object();
ROSDASH.rosMsg = new Object();
ROSDASH.Widgets.topic = function (name, type)
{
	ROSDASH.rosMsg['/listener'] = "cannot connect to ROS";
	var listener = new ROSLIB.Topic({
		ros : ROSDASH.ros,
		name : '/listener',
		messageType : 'std_msgs/String'
	});
	listener.subscribe(function(message)
	{
		ROSDASH.rosMsg['/listener'] = message;
		//console.log('Received message on ' + listener.name + ': ' + message.data);
		//listener.unsubscribe();
	});
}
ROSDASH.msgToStr = function (msg)
{
	var str = "";
	if (typeof msg == "object" || typeof msg == "array")
	{
		for (var i in msg)
		{
			str += " ( " + i + ": ";
			str += ROSDASH.msgToStr(msg[i]);
			str += " ) ";
		}
	} else
	{
		str += msg;
	}
	return str;
}
ROSDASH.Widgets.text = function (id, header, content)
{
	$("#myDashboard").sDashboard("setContentById", id, content);
}
ROSDASH.widgetMaxCallback = function (e, data)
{
	switch (data.widgetDefinition.widgetType)
	{
	case "gmap":
		ROSDASH.resizeGmap();
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
		ROSDASH.initGmap();
		break;
	case "arbor":
		arborInit();
		break;
	case "network":
		draculaInit("dracula_canvas");
		break;
	}
}
ROSDASH.widgetRemoveCallback = function (e, data)
{
	//console.log(data.widgetDefinition);
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
