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
ROSDASH.addTopicCallback = function ()
{
	var name = $("#topic").val();
	if (! ROSDASH.checkROSValid(name, "topic") || ! ROSDASH.checkROSConflict(name, "topic"))
	{
		console.log("topic name not valid");
		return;
	}
	window.cy.add({
		group: "nodes",
		data: {
			name: name,
			weight: 65,
			faveColor: "green",
			faveShape: "rectangle"
		},
		position: { x: 400, y: 0 }
	});
	ROSDASH.ros_blocks.topic.push(name);
}
ROSDASH.block_count = new Object();
ROSDASH.checkNameValid = function (name)
{
	if (undefined === name || "" == name || " " == name)
	{
		return false;
	}
	return true;
}
ROSDASH.addBlockCallback = function ()
{
	var name = $("#topic").val();
	if (! ROSDASH.checkNameValid(name))
	{
		console.log("block name not valid");
		return;
	}
	if (ROSDASH.block_count[name] === undefined)
	{
		ROSDASH.block_count[name] = 0;
	} else
	{
		++ ROSDASH.block_count[name];
	}
	var id = name + "_" + ROSDASH.block_count[name];
	window.cy.add({
		group: "nodes",
		data: {
			id: id + "_i0",
			parent: id,
			weight: 20,
			height: 20,
			faveColor: "black",
			faveShape: "rectangle"
		},
		position: { x: 330, y: 0 },
		locked: true
	});
	window.cy.add({
		group: "nodes",
		data: {
			id: id + "_o0",
			parent: id,
			weight: 20,
			height: 20,
			faveColor: "black",
			faveShape: "rectangle"
		},
		position: { x: 470, y: 0 },
		locked: true
	});
	window.cy.add({
		group: "nodes",
		data: {
			id: id,
			weight: 70,
			faveColor: "blue",
			faveShape: "rectangle"
		},
		position: { x: 400, y: 0 }
	});
}
ROSDASH.blockFollowCallback = function ()
{
	window.cy.on('position', function(evt)
	{
		window.cy.nodes('[id ^= "' + evt.cyTarget.id() + '"][id !="' + evt.cyTarget.id() + '"]').positions(function (i, ele)
		{
			ele.position({
				x: evt.cyTarget.position('x') + 100,
				y: evt.cyTarget.position('y')
			});
		});
	});
}
ROSDASH.connect_former;
ROSDASH.connect_former_type;
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
			console.log("select " + evt.cyTarget.id());
			ROSDASH.connect_former = evt.cyTarget;
			ROSDASH.connect_former_type = connect_type;
		} else if (undefined != ROSDASH.connect_former && connect_type != ROSDASH.connect_former_type)
		{
			console.log("connect " + ROSDASH.connect_former.id() + " " + evt.cyTarget.id());
			cy.add({
				group: "edges",
				"data": {
				"source": ROSDASH.connect_former.id(),
				"target": evt.cyTarget.id(),
				"faveColor": "grey",
				"strength": 10
				}
			});
			ROSDASH.connect_former = undefined;
		} else
		{
			ROSDASH.connect_former = undefined;
			console.log("connect error");
		}
	});
}
