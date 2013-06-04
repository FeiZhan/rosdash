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
ROSDASH.updateDiagram = function ()
{
	var json = new Array();
	cy.elements().each(function(i, ele)
	{
		console.log( ele.id() + ' locates ' +  ele.position("x"));
		var e = new Object();
		if (ele.isNode())
		{
			e = {
				data: {
					id: ele.id(),
					name: ele.name(),
					weight: ele.weight()
				},
				position: {
					x: ele.position("x"),
					y: ele.position("y")
				}
			};
		} else {}
		
	});
}
ROSDASH.addBlockCallback = function ()
{
	var name = $("#topic").val();
	if (! ROSDASH.checkBlockNameValid(name))
	{
		return;
	}
	if (ROSDASH.block_count[name] === undefined)
	{
		ROSDASH.block_count[name] = 0;
	} else
	{
		++ ROSDASH.block_count[name];
	}
	var block = {
		type: name,
		number: ROSDASH.block_count[name],
		input_num: undefined,
		output_num: undefined
	};
	var id = name + ROSDASH.block_count[name];
	var NEW_POS = [400, 0];
	window.cy.add({
		group: "nodes",
		data: {
			id: id,
			name: id,
			weight: 70,
			faveColor: "blue",
			faveShape: "rectangle"
		},
		position: { x: NEW_POS[0], y: NEW_POS[1] }
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
			position: { x: NEW_POS[0] - 70, y: NEW_POS[1] },
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
			position: { x: NEW_POS[0] + 70, y: NEW_POS[1] },
			locked: true
		});
	}
	ROSDASH.blocks[id] = block;
	ROSDASH.updateDiagram();
}
ROSDASH.blockMoveCallback = function ()
{
	window.cy.on('position', function(evt)
	{
		var id = evt.cyTarget.id();
		if (undefined === ROSDASH.blocks[id])
		{
			return;
		}
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
			window.cy.nodes('[id = "' + id + "_i" + i + '"]').positions(function (i, ele)
			{
				ele.position({
					x: evt.cyTarget.position('x') + 70,
					y: evt.cyTarget.position('y')
				});
			});
		}
		ROSDASH.updateDiagram();
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
ROSDASH.initGmap = function ()
{
	if ($("#map-canvas").length)
	{
		var mapOptions = {
		  center: new google.maps.LatLng(-34.397, 150.644),
		  zoom: 8,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(document.getElementById("map-canvas"),
			mapOptions);
	} else
	{
		setTimeout(ROSDASH.initGmap, 300);
	}
}
ROSDASH.parseOneExampleData = function (widget)
{
	if (widget.widgetContent == "myExampleData.textWidgetData")
	{
		widget.widgetContent = "Lorem ipsum dolor sit amet,consectetur adipiscing elit. Aenean lacinia mollis condimentum. Proin vitae ligula quis ipsum elementum tristique. Vestibulum ut sem erat.";
	} else if (widget.widgetContent == "myExampleData.tableWidgetData")
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
	console.log("wrong widget name");
	return undefined;
}
ROSDASH.addWidget = function (name)
{
	if (true) //undefined != ROSDASH.checkWidgetNameValid(name))
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
			widgetId : name + ROSDASH.widget_num[name],
			widgetType : name,
			widgetContent : "myExampleData." + name + "WidgetData"
		};
		widget = ROSDASH.parseOneExampleData(widget);
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
			json: {
				file_name: "test3-panel",
				data: sorted_widgets
			}
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

