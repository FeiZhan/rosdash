var ROSDASH = new Object();

///////////////////////////////////// constant parameters

///////////////////////////////////// dialog

//@deprecated dialog form
ROSDASH.initDialog = function ()
{
	// for diagram
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
					//$( this ).dialog( "close" );
					//ROSDASH.property_open = false;
				},
				Cancel: function() {
					//$( this ).dialog( "close" );
					//ROSDASH.property_open = false;
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
	} else 	//for panel
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
					ROSDASH.property_open = false;
				},
				Cancel: function() {
					$( this ).dialog( "close" );
					ROSDASH.property_open = false;
				}
			},
			close: function() {
				$( [] ).val( "" ).removeClass( "ui-state-error" );
				ROSDASH.property_open = false;
			}
		});
	}
}
ROSDASH.property_open = false;
// show property dialog when button is clicked
ROSDASH.showProperty = function ()
{
	// leave margin for dialog
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
// save property to block when close
ROSDASH.saveProperty = function (dialog)
{
	$(dialog).find("input").each(function (i, ele)
	{
		ROSDASH.blocks[ROSDASH.selected_block][$(ele).attr("name")] = $(ele).val();
	});
}

ROSDASH.form_canvas = "rosform";
ROSDASH.form_data = [{
	type: "fieldset",
	label: "ROSDASH",
	name: "rosform",
	inputWidth: "auto",
	list: [{
		type: "button",
		value: "add ROS item",
		name: "addROSitem"
	}, {
		type: "button",
		value: "add block",
		name: "addblock"
	}, {
		type: "button",
		value: "add constant",
		name: "addconstant"
	}]
}];
ROSDASH.form;
ROSDASH.initForm = function ()
{
	ROSDASH.form = new dhtmlXForm(ROSDASH.form_canvas, ROSDASH.form_data);
}
ROSDASH.blockForm = function (block)
{
	if (undefined === block || undefined === block.type)
	{
		return;
	}
	ROSDASH.form.unload();
	ROSDASH.form_data = [{
        type: "fieldset",
        label: block.id,
        name: "rosform",
        inputWidth: "auto",
        list: []
	}];
	var list;
	switch (block.type)
	{
	case "constant":
		list = {
			type: "input",
			label: "value",
			rows: 5,
			value: block.value
		};
		ROSDASH.form_data[0].list.push(list);
		break;
	case "topic":
	case "service":
		list = {
			type: "input",
			label: "rosname",
			rows: 2,
			value: block.rosname
		};
		ROSDASH.form_data[0].list.push(list);
		list = {
			type: "input",
			label: "rostype",
			rows: 2,
			value: block.rostype
		};
		ROSDASH.form_data[0].list.push(list);
		break;
	case "param":
		list = {
			type: "input",
			label: "rosname",
			rows: 2,
			value: block.rosname
		};
		ROSDASH.form_data[0].list.push(list);
		break;
	default:
		break;
	}
	ROSDASH.form = new dhtmlXForm(ROSDASH.form_canvas, ROSDASH.form_data);
}

///////////////////////////////////// toolbar

ROSDASH.toolbar = undefined;
ROSDASH.list_depth;
//@todo reconfigure
ROSDASH.listInToolbar = function ()
{
	ROSDASH.toolbar.forEachItem(function(itemId) {
		if (itemId != "logo")
		{
			ROSDASH.toolbar.removeItem(itemId);
		}
    });
    ROSDASH.toolbar.addButton("main", 1, "", "redo.gif", "redo_dis.gif");
    var count = 1;
    for (var i in ROSDASH.list_depth)
    {
		if (typeof ROSDASH.list_depth[i] == "string")
		{
			ROSDASH.toolbar.addButton("list-" + ROSDASH.list_depth[i], ++ count, ROSDASH.list_depth[i], "settings.gif", "settings.gif");
		} else if ("_" == i)
		{
			continue;
		} else
		{
			ROSDASH.toolbar.addButton("list-" + i, ++ count, i, "other.gif", "other.gif");
		}
	}
	if ("_" in ROSDASH.list_depth)
	{
		var list = ROSDASH.list_depth["_"];
		for (var i in list)
		{
			if (typeof list[i] == "string")
			{
				ROSDASH.toolbar.addButton("list-" + list[i], ++ count, list[i], "settings.gif", "settings.gif");
			} else if ("_" == i)
			{
				continue;
			} else
			{
				ROSDASH.toolbar.addButton("list-" + i, ++ count, i, "settings.gif", "settings.gif");
			}
		}
	}
}
ROSDASH.listProperty = function (type)
{
	ROSDASH.toolbar.forEachItem(function(itemId){
		if (itemId != "logo" && itemId != "input")
		{
			ROSDASH.toolbar.removeItem(itemId);
		}
    });
    ROSDASH.toolbar.addButton("setproperty", 2, "set property", "paste.gif", "paste_dis.gif");
    ROSDASH.toolbar.addButton("main", 3, "back", "redo.gif", "redo_dis.gif");
	var selected;
	switch (type)
	{
	case "panel":
		if (undefined === ROSDASH.selected_widget)
		{
			return;
		}
		selected = ROSDASH.widgets[ROSDASH.selected_widget];
		break;
	case "diagram":
		if (undefined === ROSDASH.selected_block)
		{
			return;
		}
		selected = ROSDASH.blocks[ROSDASH.selected_block];
		break;
	}
	var count = 3;
	for (var i in selected)
	{
		ROSDASH.toolbar.addButton("property-" + i, ++ count, i, "settings.gif", "settings.gif");
	}
}
ROSDASH.selected_property;
ROSDASH.initPanelToolbar = function ()
{
	if ($("#toolbarObj").length <= 0)
	{
		console.error("toolbar not ready " + "#toolbarObj");
		return;
	}
	if (undefined === ROSDASH.toolbar)
	{
		ROSDASH.toolbar = new dhtmlXToolbarObject("toolbarObj");
		ROSDASH.toolbar.setIconSize(32);
		ROSDASH.toolbar.setIconsPath("lib/dhtmlxSuite/dhtmlxToolbar/samples/common/imgs/");
		ROSDASH.toolbar.attachEvent("onClick", function(id)
		{
			if ("property-" == id.substring(0, 9))
			{
				if (undefined === ROSDASH.selected_widget)
				{
					return;
				}
				var selected = ROSDASH.widgets[ROSDASH.selected_widget];
				var property = id.substring(9);
				ROSDASH.toolbar.setValue("input", selected[property], true);
				ROSDASH.selected_property = property;
				return;
			}
			switch (id)
			{
			case "main":
				ROSDASH.initPanelToolbar();
				break;
			case "addwidget":
				ROSDASH.addWidgetByType(ROSDASH.toolbar.getValue("input"));
				break;
			case "listwidget":
				ROSDASH.list_depth = ROSDASH.widget_list;
				ROSDASH.listInToolbar();
				break;
			case "adddiagram":
				ROSDASH.addToDiagram();
				break;
			case "save":
				ROSDASH.savePanel();
				break;
			case "undo":
				console.log("undo");
				break;
			case "redo":
				console.log("redo");
				break;
			case "property":
				//ROSDASH.showProperty();
				ROSDASH.listProperty("panel");
				break;
			case "setproperty":
				ROSDASH.setWidgetProperty();
				break;
			case "diagram":
				var url = 'diagram.html?user=' + ROSDASH.user_conf.name + '&panel=' + ROSDASH.user_conf.panel_name + '&host=' + ROSDASH.user_conf.ros_host + '&port=' + ROSDASH.user_conf.ros_port;
				if (undefined !== ROSDASH.selected_widget)
				{
					url += '&selected=' + ROSDASH.selected_widget;
				}
				window.open(url);
				break;
			default:
				var widget_id = id.substring(5);
				if (widget_id in ROSDASH.list_depth)
				{
					if (typeof ROSDASH.list_depth[widget_id] == "string")
					{
						ROSDASH.addWidgetByType(widget_id);
					} else
					{
						ROSDASH.list_depth = ROSDASH.list_depth[widget_id];
						ROSDASH.listInToolbar();
					}
				} else if (("_" in ROSDASH.list_depth))
				{
					for (var i in ROSDASH.list_depth["_"])
					{
						if (ROSDASH.list_depth["_"][i] == widget_id)
						{
							ROSDASH.addWidgetByType(widget_id);
						}
					}
				} else
				{
					console.error("unknown widget in toolbar: ", id);
				}
				break;
			}
		});
	}
	ROSDASH.toolbar.forEachItem(function(itemId)
	{
		ROSDASH.toolbar.removeItem(itemId);
	});
	var logo_text = '<a href="index.html" target="_blank">ROSDASH</a>';
	if ("index" != ROSDASH.user_conf.name)
	{
		logo_text += '-<a href="panel.html?user=' + ROSDASH.user_conf.name + '" target="_blank">' + ROSDASH.user_conf.name + '</a>';
		if ("index" != ROSDASH.user_conf.panel_name)
		{
			logo_text += "-" + ROSDASH.user_conf.panel_name;
		}
	}
    ROSDASH.toolbar.addText("logo", 0, logo_text);
    ROSDASH.toolbar.addInput("input", 1, "", 60);
    ROSDASH.toolbar.addButton("addwidget", 2, "add widget", "new.gif", "new_dis.gif");
    ROSDASH.toolbar.addButton("listwidget", 3, "list widget", "new.gif", "new_dis.gif");
    ROSDASH.toolbar.addButton("adddiagram", 4, "add to diagram", "cut.gif", "cut_dis.gif");
    ROSDASH.toolbar.addButton("save", 5, "save", "save.gif", "save_dis.gif");
    ROSDASH.toolbar.addButton("undo", 6, "undo", "undo.gif", "undo_dis.gif");
    ROSDASH.toolbar.addButton("redo", 7, "redo", "redo.gif", "redo_dis.gif");
    ROSDASH.toolbar.addButton("property", 8, "property", "paste.gif", "paste_dis.gif");
    ROSDASH.toolbar.addButton("diagram", 9, "diagram", "database.gif", "database.gif");
}
ROSDASH.setWidgetProperty = function ()
{
	if (undefined === ROSDASH.selected_widget)
	{
		return;
	}
	var selected = ROSDASH.widgets[ROSDASH.selected_widget];
	var value = ROSDASH.toolbar.getValue("input");
	switch (ROSDASH.selected_property)
	{
	case "id":
		return;
		break;
	case "width":
	case "height":
	case "header_height":
		selected[ROSDASH.selected_property] = value;
		console.log("set property", selected.widgetId, ROSDASH.selected_property, value);
		break;
	}
}
ROSDASH.initDiagramToolbar = function ()
{
	if ($("#toolbarObj").length <= 0)
	{
		console.error("toolbar not ready " + "#toolbarObj");
		return;
	}
	if (undefined === ROSDASH.toolbar)
	{
		ROSDASH.toolbar = new dhtmlXToolbarObject("toolbarObj");
		ROSDASH.toolbar.setIconSize(32);
		ROSDASH.toolbar.setIconsPath("lib/dhtmlxSuite/dhtmlxToolbar/samples/common/imgs/");
		ROSDASH.toolbar.attachEvent("onClick", function(id)
		{
			if ("property-" == id.substring(0, 9))
			{
				if (undefined === ROSDASH.selected_block)
				{
					return;
				}
				var selected = ROSDASH.blocks[ROSDASH.selected_block];
				var property = id.substring(9);
				ROSDASH.toolbar.setValue("input", selected[property], true);
				ROSDASH.selected_property = property;
				return;
			}
			switch (id)
			{
			case "main":
				ROSDASH.initDiagramToolbar();
				break;
			case "addblock":
				window.cy.center(ROSDASH.addBlockByType(ROSDASH.toolbar.getValue("input")));
				break;
			case "listblock":
				ROSDASH.list_depth = ROSDASH.block_list;
				ROSDASH.listInToolbar();
				break;
			case "listconst":
				ROSDASH.list_depth = ROSDASH.block_list.constant;
				ROSDASH.listInToolbar();
				break;
			case "addros":
				window.cy.center(ROSDASH.addTopicByName(ROSDASH.toolbar.getValue("input")));
				break;
			case "listros":
				ROSDASH.list_depth = ROSDASH.ros_msg;
				ROSDASH.listInToolbar();
				break;
			case "remove":
				ROSDASH.removeBlock(ROSDASH.toolbar.getValue("input"));
				break;
			case "save":
				ROSDASH.saveDiagram();
				break;
			case "undo":
				console.log("undo");
				break;
			case "redo":
				console.log("redo");
				break;
			case "property":
				//ROSDASH.showProperty();
				ROSDASH.listProperty("diagram");
				break;
			case "setproperty":
				ROSDASH.setBlockProperty();
				break;
			case "panel":
				var url = 'panel.html?user=' + ROSDASH.user_conf.name + '&panel=' + ROSDASH.user_conf.panel_name + '&host=' + ROSDASH.user_conf.ros_host + '&port=' + ROSDASH.user_conf.ros_port;
				if (undefined !== ROSDASH.selected_block)
				{
					url += '&selected=' + ROSDASH.selected_block;
				}
				window.open(url);
				break;
			case "fit":
				window.cy.fit();
				break;
			case "find":
				ROSDASH.findBlock(ROSDASH.toolbar.getValue("input"));
				break;
			case "addcomment":
				var c = ROSDASH.addBlockComment(ROSDASH.toolbar.getValue("input"));
				if (undefined !== c)
				{
					window.cy.center(c);
				}
				break;
			default:
				var block_id = id.substring(5);
				if (typeof ROSDASH.list_depth != "object" && typeof ROSDASH.list_depth != "array")
				{
					console.error("unknown widget in toolbar: ", block_id);
				} else if (block_id in ROSDASH.list_depth)
				{
					if (typeof ROSDASH.list_depth[block_id] == "string")
					{
						window.cy.center(ROSDASH.addBlockByType(block_id));
					} else
					{
						ROSDASH.list_depth = ROSDASH.list_depth[block_id];
						ROSDASH.listInToolbar();
					}
				} else if (("_" in ROSDASH.list_depth))
				{
					for (var i in ROSDASH.list_depth["_"])
					{
						if (ROSDASH.list_depth["_"][i] == block_id)
						{
							window.cy.center(ROSDASH.addBlockByType(block_id));
						}
					}
				} else
				{
					console.error("unknown widget in toolbar: ", block_id);
				}
				break;
			}
		});
	}
	ROSDASH.toolbar.forEachItem(function(itemId)
	{
		ROSDASH.toolbar.removeItem(itemId);
	});
	var logo_text = '<a href="index.html" target="_blank">ROSDASH</a>';
	if ("index" != ROSDASH.user_conf.name)
	{
		logo_text += '-<a href="panel.html?user=' + ROSDASH.user_conf.name + '" target="_blank">' + ROSDASH.user_conf.name + '</a>';
		if ("index" != ROSDASH.user_conf.panel_name)
		{
			logo_text += "-" + ROSDASH.user_conf.panel_name;
		}
	}
    ROSDASH.toolbar.addText("logo", 0, logo_text);
    ROSDASH.toolbar.addInput("input", 1, "", 130);
    ROSDASH.toolbar.addButton("addblock", 2, "add block", "new.gif", "new_dis.gif");
    ROSDASH.toolbar.addButton("listblock", 3, "list block", "new.gif", "new_dis.gif");
    ROSDASH.toolbar.addButton("listconst", 5, "list constant", "new.gif", "new_dis.gif");
    ROSDASH.toolbar.addButton("addros", 6, "add ROS", "new.gif", "new_dis.gif");
	//@bug
	//ROSDASH.toolbar.addButton("listros", 7, "list ROS", "new.gif", "new_dis.gif");
    ROSDASH.toolbar.addButton("remove", 8, "remove", "remove-icon.gif", "remove-icon.gif");
    ROSDASH.toolbar.addButton("save", 9, "save", "save.gif", "save_dis.gif");
    //ROSDASH.toolbar.addButton("undo", 10, "undo", "undo.gif", "undo_dis.gif");
    //ROSDASH.toolbar.addButton("redo", 11, "redo", "redo.gif", "redo_dis.gif");
    ROSDASH.toolbar.addButton("property", 12, "property", "paste.gif", "paste_dis.gif");
    ROSDASH.toolbar.addButton("fit", 13, "fit", "stylesheet.gif", "stylesheet.gif");
    ROSDASH.toolbar.addButton("panel", 14, "panel", "database.gif", "database.gif");
    ROSDASH.toolbar.addButton("find", 15, "find", "cut.gif", "cut_dis.gif");
    ROSDASH.toolbar.addButton("addcomment", 16, "add comment", "new.gif", "new_dis.gif");
}
ROSDASH.setBlockProperty = function ()
{
	if (undefined === ROSDASH.selected_block)
	{
		return;
	}
	var selected = ROSDASH.blocks[ROSDASH.selected_block];
	var value = ROSDASH.toolbar.getValue("input");
	switch (ROSDASH.selected_property)
	{
	case "id":
		return;
		break;
	case "value":
	case "rosname":
	case "rostype":
		selected[ROSDASH.selected_property] = value;
		console.log("set property", selected.id, ROSDASH.selected_property, value);
		break;
	}
}

///////////////////////////////////// user configure

ROSDASH.checkUserConfValid = function ()
{
	if (ROSDASH.user_conf.run_msec < 100)
	{
		console.error("run_msec is too low: ", ROSDASH.user_conf.run_msec);
		ROSDASH.user_conf.run_msec = 100;
	}
}
ROSDASH.setUser = function (user, panel_name)
{
	if (undefined === user || "" == user)
	{
		//console.error("invalid user: " + user);
		// default value of ROSDASH.user_conf.name is "index"
	} else
	{
		ROSDASH.user_conf.name = user;
		if ($("#toolbarObj").length > 0)
		{
			var logo_text = ROSDASH.toolbar.getItemText("logo") + '-<a href="panel.html?user=' + ROSDASH.user_conf.name + '" target="_blank">' + ROSDASH.user_conf.name + '</a>';
			ROSDASH.toolbar.setItemText("logo", logo_text);
		}
	}
	if (undefined === panel_name || "" == panel_name)
	{
		//console.error("invalid panel_name: " + panel_name);
		// default value of ROSDASH.user_conf.panel_name is "index"
	} else
	{
		ROSDASH.user_conf.panel_name = panel_name;
		if ($("#toolbarObj").length > 0)
		{
			ROSDASH.toolbar.setItemText("logo", ROSDASH.toolbar.getItemText("logo") + "-" + ROSDASH.user_conf.panel_name);
		}
	}
}
ROSDASH.user_conf = {
	// basic
	version: "1.0",
	name: "index",
	discrip: "",
	panel_name: "index",
	view_type: "panel",

	// ros
	ros_host: "",
	ros_port: "",

	// files
	panel_names: [],
	js: [],
	css: [],
	json: [],

	// panel
	disable_selection: true,
	run_msec: 200,
	widget_width: 400,
	widget_height: 230,
	header_height: 16,
	content_height: 180
};
ROSDASH.setUserConf = function (conf)
{
	for (var i in conf)
	{
		if (i in ROSDASH.user_conf)
		{
			if ("version" == i && ROSDASH.user_conf.version != conf.version)
			{
				console.error("configure version conflicts", conf.version);
				return;
			}
			if ("name" == i && ROSDASH.user_conf.name != conf.name)
			{
				console.error("configure user name conflicts", conf.name);
				return;
			}
			if ("panel_name" == i && ROSDASH.user_conf.panel_name != conf.panel_name)
			{
				console.error("configure panel name conflicts", conf.panel_name);
				return;
			}
			ROSDASH.user_conf[i] = conf[i];
		}
	}
	ROSDASH.checkUserConfValid();
}

///////////////////////////////////// ROS

ROSDASH.ros;
ROSDASH.ros_connected = false;
ROSDASH.connectROS = function (host, port)
{
	// don't need ROS
	if (typeof host === "undefined" || "" == host || " " == host)
	{
		return;
	}
	// default value for port
	port = (typeof port !== "undefined" && "" != port && " " != port) ? port : "9090";
	ROSDASH.ros = new ROSLIB.Ros();
	ROSDASH.ros.on('error', function(error) {
		console.error("ROS connection error: ", error);
		ROSDASH.ros_connected = false;
	});
	ROSDASH.ros.on('connection', function() {
		ROSDASH.ros_connected = true;
		console.log('ROS connection made: ' + host + ":" + port);
		ROSDASH.user_conf.ros_host = host;
		ROSDASH.user_conf.ros_port = port;
		ROSDASH.getROSNames(ROSDASH.ros);
	});
	ROSDASH.ros.connect('ws://' + host + ':' + port);
}
//@deprecated
ROSDASH.topics;
ROSDASH.services;
ROSDASH.params;
// ROS list for toolbar
ROSDASH.ros_msg = {
	topic: {"_": new Array()},
	service: {"_": new Array()},
	param: {"_": new Array()}
};
// get existing ROS names from ROSLIB
ROSDASH.getROSNames = function (ros)
{
	ROSDASH.topics = new Array();
	ROSDASH.services = new Array();
	ROSDASH.params = new Array();
	ROSDASH.ros.getTopics(function (topics)
	{
		ROSDASH.topics = topics;
		for (var i in topics)
		{
			ROSDASH.ros_msg.topic["_"].push(topics[i]);
		}
	});
	ROSDASH.ros.getServices(function (services)
	{
		ROSDASH.services = services;
		for (var i in services)
		{
			ROSDASH.ros_msg.service["_"].push(services[i]);
		}
	});
	ROSDASH.ros.getParams(function (params)
	{
		ROSDASH.params = params;
		for (var i in params)
		{
			ROSDASH.ros_msg.param["_"].push(params[i]);
		}
	});
}
// check if name is an existing ROS name
//@deprecated
ROSDASH.checkROSValid = function (name, type)
{
	type = (typeof type !== "undefined") ? type : "topic";
	var array;
	switch (type)
	{
	case "service":
		array = ROSDASH.services;
		break;
	case "param":
		array = ROSDASH.params;
		break;
	default:
		array = ROSDASH.topics;
		break;
	}
	return (jQuery.inArray(name, array) != -1);
}
// ROS blocks existing in the diagram
ROSDASH.ros_blocks = {
	topic: new Array(),
	service: new Array(),
	param: new Array()
};
// if conflict with existing ROS blocks
ROSDASH.checkROSConflict = function (name, type)
{
	type = (type in ROSDASH.ros_blocks) ? type : "topic";
	return (-1 != jQuery.inArray(name, ROSDASH.ros_blocks[type]));
}

///////////////////////////////////// msg type definition

ROSDASH.msg_json = {
	"std_msgs": new Object()
};
ROSDASH.msg_def = new Object();
// get message type definition from ROSDASH.msg_def
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
				if (json2.name == name)
				{
					return json2;
				}
			}
		}
	}
	return undefined;
}
ROSDASH.checkMsgTypeValid = function (name)
{
	return (undefined !== ROSDASH.getMsgDef(name));
}

///////////////////////////////////// widget definitions

ROSDASH.widget_json = {
	"widgets": new Object()
};
ROSDASH.widget_def = new Object();
// lists for toolbar
ROSDASH.block_list = new Object();
ROSDASH.widget_list = new Object();
ROSDASH.init_count = 0;
// init msg type and widget definitions from json
ROSDASH.initJson = function ()
{
	// read from message type definition json
	for (var i in ROSDASH.msg_json)
	{
		++ ROSDASH.init_count;
		$.getJSON("param/" + i + ".json", function(data, status, xhr)
		{
			for (var j in data)
			{
				ROSDASH.msg_json[j] = data;
				// add to block list constant
				if (undefined === ROSDASH.block_list.constant)
				{
					ROSDASH.block_list.constant = new Object();
				}
				if (undefined === ROSDASH.block_list.constant["_"])
				{
					ROSDASH.block_list.constant["_"] = new Array();
				}
				var list = ROSDASH.block_list.constant["_"];
				for (var k in data[j])
				{
					if (undefined != data[j][k].name)
					{
						//$("#msg-list").append('<li><a href="">' + data[j][k].name + '</a></li>');
						// add to block list for toolbar
						list.push(data[j][k].name);
					}
				}
			}
		}).always(function() {
			// if json connection replies, count the init value
			-- ROSDASH.init_count;
		});
	}
	// read from widget definition json
	for (var i in ROSDASH.widget_json)
	{
		++ ROSDASH.init_count;
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
						// add to widget-list in the drop-down menu
						//$("#widget-list").append('<li><a href="">' + data[j][k].type + '</a></li>');
						// add to block list for toolbar
						var list = ROSDASH.block_list;
						var list2 = ROSDASH.widget_list;
						// add category name to list
						for (var m in data[j][k].category)
						{
							var c = data[j][k].category[m];
							// add to block list
							if (c in list)
							{
								list = list[c];
							} else
							{
								list[c] = new Object();
								list = list[c];
							}
							// add to widget list
							if (data[j][k].has_panel)
							{
								if (c in list2)
								{
									list2 = list2[c];
								} else
								{
									list2[c] = new Object();
									list2 = list2[c];
								}
							}
						}
						// add definition to block list
						if ("_" in list)
						{
							list["_"].push(data[j][k].type);
						} else
						{
							list["_"] = new Array();
							list["_"].push(data[j][k].type);
						}
						// add definition to widget list
						if (data[j][k].has_panel)
						{
							if ("_" in list2)
							{
								list2["_"].push(data[j][k].type);
							} else
							{
								list2["_"] = new Array();
								list2["_"].push(data[j][k].type);
							}
						}
					}
				}
			}
		}).always(function() {
			-- ROSDASH.init_count;
		});
	}
}
// load json files from user config
ROSDASH.loadConfJson = function ()
{
	++ ROSDASH.init_count;
	// load user config json
	$.getJSON("file/" + ROSDASH.user_conf.name + "/conf.json", function(data, status, xhr)
	{
		ROSDASH.setUserConf(data);
		console.log("load user config: ", ROSDASH.user_conf.name + "/conf.json");
		// load json specified by user config
		for (var i in ROSDASH.user_conf.json)
		{
			++ ROSDASH.init_count;
			$.getJSON(i, function(data, status, xhr)
			{
				console.log("load user specified json: ", i);
				// load widgets from json specified by user
				//@todo can be changed into a function
				for (var j in data)
				{
					ROSDASH.widget_json[j] = data;
					for (var k in data[j])
					{
						if (undefined != data[j][k].type)
						{
							ROSDASH.widget_def[data[j][k].type] = data[j][k];
							// add to widget-list in the drop-down menu
							//$("#widget-list").append('<li><a href="">' + data[j][k].type + '</a></li>');
						}
					}
				}
			}).always(function() {
				-- ROSDASH.init_count;
			});
		}
	}).always(function() {
		-- ROSDASH.init_count;
	});
}
ROSDASH.checkWidgetTypeValid = function (name)
{
	return (name in ROSDASH.widget_def);
}

///////////////////////////////////// blocks

// default settings for blocks
ROSDASH.NEW_POS = [0, 0];
ROSDASH.INPUT_POS = {
	"1": [[-70, 0]],
	"2": [[-70, -20], [-70, 20]],
	"3": [[-70, -20], [-70, 0], [-70, 20]],
	"4": [[-70, -30], [-70, -10], [-70, 10], [-70, 30]],
	"5": [[-70, -40], [-70, -20], [-70, 0], [-70, 20], [-70, 40]],
	// more is coming
};
ROSDASH.OUTPUT_POS = {
	"1": [[70, 0]],
	"2": [[70, -20], [70, 20]],
	"3": [[70, -20], [70, 0], [70, 20]],
	"4": [[70, -30], [70, -10], [70, 10], [70, 30]],
	"5": [[70, -40], [70, -20], [70, 0], [70, 20], [70, 40]],
	// more is coming
};
// generate the position for new blocks to be
//@todo getNextNewBlockPos
ROSDASH.getNextNewBlockPos = function ()
{
	return ROSDASH.NEW_POS;
}
//@deprecated
ROSDASH.addTopicByName = function (name)
{
	return ROSDASH.addTopic({rosname: name});
}
ROSDASH.addTopic = function (def)
{
	if ("" == def.rosname || ROSDASH.checkROSConflict(def.rosname, "topic"))
	{
		console.error("topic name not valid: " + def.rosname);
		return;
	}
	var next_pos = ROSDASH.getNextNewBlockPos();
	var x = (typeof def.x !== "undefined") ? parseFloat(def.x) : next_pos[0];
	var y = (typeof def.y !== "undefined") ? parseFloat(def.y) : next_pos[1];
	var count = ROSDASH.ros_blocks.topic.length;
	var id = "topic-" + count;
	var body = window.cy.add({
		group: "nodes",
		data: {
			id: id,
			name: def.rosname,
			faveColor: 'Gold'
		},
		position: { x: x, y: y },
		classes: "body"
	});
	window.cy.add({
		group: "nodes",
		data: {
			id: id + "-i0"
		},
		position: { x: x + ROSDASH.INPUT_POS[1][0][0], y: y + ROSDASH.INPUT_POS[1][0][1] },
		classes: "input",
		locked: true
	});
	window.cy.add({
		group: "nodes",
		data: {
			id: id + "-o0"
		},
		position: { x: x + ROSDASH.OUTPUT_POS[1][0][0], y: y + ROSDASH.OUTPUT_POS[1][0][1] },
		classes: "output",
		locked: true
	});
	var block = {
		id: id,
		type: "topic",
		rosname: def.rosname,
		rostype: 'std_msgs/String',
		number: ROSDASH.ros_blocks.topic.length,
		x: x,
		y: y
	};
	ROSDASH.blocks[id] = block;
	ROSDASH.ros_blocks.topic.push(name);
	return body;
}
// a list of configuration for each block
ROSDASH.blocks = new Object();
ROSDASH.addBlockByType = function (type)
{
	var block = {
		type: type,
	};
	return ROSDASH.addBlock(block);
}
ROSDASH.addConstant = function (const_type)
{
	var block = {
		type: "constant",
		constant: true,
		constname: const_type,
		value: ""
	};
	return ROSDASH.addBlock(block);
}
ROSDASH.addBlock = function (def)
{
	var block = ROSDASH.initBlockConf(def);
	// if fail to init a block by definition
	if (undefined === block)
	{
		return;
	}
	// if no position specified, use the position for a new block
	var next_pos = ROSDASH.getNextNewBlockPos();
	block.x = (typeof def.x != "undefined") ? parseFloat(def.x) : next_pos[0];
	block.y = (typeof def.y != "undefined") ? parseFloat(def.y) : next_pos[1];
	// determine the block number
	def = ROSDASH.getBlockNum(def, block.list_name);
	var color = "Aquamarine";
	switch (def.type)
	{
	case "constant":
		color = "Chartreuse";
		break;
	case "topic":
	case "service":
	case "param":
		color = "Gold";
		break;
	}
	// add the body of the block
	var body = window.cy.add({
		group: "nodes",
		data: {
			id: block.id,
			name: block.name,
			faveColor: color,
		},
		position: { x: block.x, y: block.y },
		classes: "body"
	});
	// add input pins
	for (var i = 0; i < block.input_num; ++ i)
	{
		window.cy.add({
			group: "nodes",
			data: {
				id: block.id + "-i" + i
			},
			position: { x: block.x + ROSDASH.INPUT_POS[block.input_num][i][0], y: block.y + ROSDASH.INPUT_POS[block.input_num][i][1] },
			classes: "input",
			locked: true
		});
	}
	// add output pins
	for (var i = 0; i < block.output_num; ++ i)
	{
		window.cy.add({
			group: "nodes",
			data: {
				id: block.id + "-o" + i
			},
			position: { x: block.x + ROSDASH.OUTPUT_POS[block.output_num][i][0], y: block.y + ROSDASH.OUTPUT_POS[block.output_num][i][1] },
			classes: "output",
			locked: true
		});
	}
	// save the information of the block into ROSDASH.blocks based on id
	ROSDASH.blocks[block.id] = block;
	return body;
}
// init the configuration of a new block
ROSDASH.initBlockConf = function (def)
{
	if (ROSDASH.checkWidgetTypeValid(def.type))
	{
		block = def;
		block.list_name = ("constant" != def.type) ? def.type : def.constname;
		if ("topic" == def.type || "service" == def.type || "param" == def.type)
		{
			block.rosname = "";
			block.rostype = "";
		}
	} else if (ROSDASH.checkMsgTypeValid(def.type))
	{
		block = def;
		block.type = "constant";
		block.list_name = def.type;
		block.constant = true;
		block.constname = def.type;
		block.value = "";
	} else
	{
		// the widget type is invalid, and the error message is sent from ROSDASH.checkWidgetTypeValid
		return undefined;
	}
	block.input_num = ROSDASH.widget_def[def.type].input.length;
	block.input = ROSDASH.widget_def[def.type].input;
	block.output_num = ROSDASH.widget_def[def.type].output.length;
	block.output = ROSDASH.widget_def[def.type].output;
	return block;
}
// determine the block number
ROSDASH.getBlockNum = function (def, block_type)
{
	// if no block number specified
	if (undefined === def.number)
	{
		// if no count, initialize to zero
		if (undefined === ROSDASH.widget_def[block_type])
		{
			ROSDASH.widget_def[block_type] = new Object();
			ROSDASH.widget_def[block_type].count = 0;
		} else if (undefined === ROSDASH.widget_def[block_type].count)
		{
			ROSDASH.widget_def[block_type].count = 0;
		} else
		{
			++ ROSDASH.widget_def[block_type].count;
		}
		def.number = ROSDASH.widget_def[block_type].count;
		def.id = block_type + "-" +  ROSDASH.widget_def[block_type].count;
		def.name = block_type + " " +  ROSDASH.widget_def[block_type].count;
	}
	// if no widget_def, initialize to def.number
	else if (undefined === ROSDASH.widget_def[block_type])
	{
		ROSDASH.widget_def[block_type] = new Object();
		ROSDASH.widget_def[block_type].count = def.number;
	}	// if no count, initialize to def.number
	else if (undefined === ROSDASH.widget_def[block_type].count)
	{
		ROSDASH.widget_def[block_type].count = 0;
	}	// if larger than count, set count to def.number
	else if (def.number > ROSDASH.widget_def[block_type].count)
	{
		ROSDASH.widget_def[block_type].count = def.number;
	} else	// otherwise, ignore the count
	{
		// test if conflict with other block number
		for (var i in ROSDASH.blocks)
		{
			if (block_type == ROSDASH.blocks[i].type && def.number == ROSDASH.blocks[i].number)
			{
				console.error("block number conflicts: " + def.id);
				return;
			}
		}
	}
	return def;
}

///////////////////////////////////// pins

//@todo
ROSDASH.addPin = function (block, type, num)
{
	var pin = block[type][num];
	/*if (! ROSDASH.checkPinDataType(pin.datatype))
	{
		return false;
	}*/
	if ("true" == pin.subordinate || true == pin.subordinate)
	{
		return;
	}
	var pin_pos = ("input" == type) ? ROSDASH.INPUT_POS[block.input_num][num] : ROSDASH.OUTPUT_POS[block.output_num][num]
	window.cy.add({
		group: "nodes",
		data: {
			id: block.id + "-" + type.substring(0, 1) + i,
			height: ROSDASH.PIN_SIZE[0],
			weight: ROSDASH.PIN_SIZE[1],
			faveColor: ROSDASH.PIN_COLOR,
			faveShape: ROSDASH.BLOCK_SHAPE
		},
		position: { x: block.x + pin_pos[0], y: block.y + pin_pos[1] },
		classes: type,
		locked: true
	});
	block[type][num].exist = true;
}
ROSDASH.getBlockParent = function (block)
{
	var index = block.lastIndexOf("-");
	return block.substring(0, index);
}
ROSDASH.getPinNum = function (pin)
{
	var index = pin.lastIndexOf("-");
	return parseFloat(pin.substring(index + 2));
}
// change the pins of a block
//@todo
ROSDASH.changePin = function (block, pin_type, pin_num, action)
{
	var tmp = block;
	ROSDASH.removeBlock(block.id);
	switch (action)
	{
	case "add":
		tmp[pin_type][pin_num].exist = true;
		break;
	case "remove":
		tmp[pin_type][pin_num].exist = false;
		break;
	}
	ROSDASH.addBlock(tmp);
}

///////////////////////////////////// block actions

// find block by ID or name
ROSDASH.findBlock = function (id)
{
	if (undefined === id || "" == id || " " == id)
	{
		return undefined;
	}
	var block;
	window.cy.nodes("#" + id).each(function (i, ele) {
		block = ele;
	});
	if (undefined !== block)
	{
		block.select();
		window.cy.center(block);
	} else
	{
		window.cy.nodes('[name="' + id + '"]').each(function (i, ele) {
			block = ele;
		});
		if (undefined !== block)
		{
			block.select();
			window.cy.center(block);
		} else
		{
			console.debug("cannot find", id);
		}
	}
	return block;
}
ROSDASH.selected_block;
// update the property dialog box when selected
//@deprecated
ROSDASH.selectBlockCallback = function (evt)
{
	var html = "";
	// select node
	if (evt.cyTarget.isNode())
	{
		var id = evt.cyTarget.id();
		// select pin
		if (evt.cyTarget.hasClass("pin") || evt.cyTarget.hasClass("input") || evt.cyTarget.hasClass("output"))
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
		// select body
		} else if (evt.cyTarget.hasClass("body"))
		{
			var block = ROSDASH.blocks[id];
			var widget = ROSDASH.widget_def[block.type];
			// add a popup to selected block to show description
			ROSDASH.addBlockPopup(block);
			ROSDASH.blockForm(block);
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
		} else
		{
			return;
		}
	} else		// select edge
	{
		ROSDASH.selected_block = undefined;
		// add a popup to selected edge to show description
		ROSDASH.addEdgePopup(evt.cyTarget);
		html = '<p>type: edge</p>'
				+ '<p>source: ' + evt.cyTarget.source().id() + '</p>'
				+ '<p>target: ' + evt.cyTarget.target().id() + '</p>';
	}
	$("#dialog-form").find("#property").html(html);
}
ROSDASH.removeBlock = function (name)
{
	var ele = window.cy.$(':selected');
	var id;
	var type;
	// priority on selected elements
	if (ele.size() > 0 )
	{
		ele.each(function (i, ele)
		{
			id = ele.id();
			if (ele.id() in ROSDASH.blocks)
			{
				type = ROSDASH.blocks[ele.id()].type;
				delete ROSDASH.blocks[ele.id()];
			}
			ele.remove();
		});
	}	// then the argument block
	else if (undefined != name && "" != name)
	{
		id = name;
		// first check id
		ele = window.cy.nodes('[id = "' + name + '"]');
		if (0 == ele.size())
		{
			// then check name
			ele = window.cy.nodes('[name = "' + name + '"]');
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
	// remove pins
	for (var i = 0; i < ROSDASH.widget_def[type].input.length; ++ i)
	{
		ROSDASH.removeBlock(id + "-i" + i);
	}
	for (var i = 0; i < ROSDASH.widget_def[type].output.length; ++ i)
	{
		ROSDASH.removeBlock(id + "-o" + i);
	}
}
// let pins follow body when moving
ROSDASH.followBlock = function (target)
{
	var id = target.id();
	if (undefined === ROSDASH.blocks[id])
	{
		// target does not exist
		return;
	}
	// update the information in ROSDASH.blocks
	ROSDASH.blocks[id].x = target.position('x');
	ROSDASH.blocks[id].y = target.position('y');
	var type = ROSDASH.blocks[id].type;
	// update input pins
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
	// update output pins
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
ROSDASH.blockMoveCallback = function ()
{
	// let pins follow the body when move
	window.cy.on('position', function(evt)
	{
		ROSDASH.followBlock(evt.cyTarget);
	});
	//@deprecated
	window.cy.on('free', function(evt)
	{
		//ROSDASH.saveDiagram();
	});
}
//  the former one when connecting
ROSDASH.connect_former = new Object();
// connect two pins
ROSDASH.connectBlocks = function (source, target)
{
	// if source and target do not exist
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
	var flag = false;
	// if target has duplicate connection
	window.cy.edges().each(function (i, ele)
	{
		if (ele.source().id() == target || ele.target().id() == target)
		{
			console.error("duplicate connect: " + target);
			flag = true;
			return;
		}
	});
	if (flag)
	{
		return;
	}
	// add edge
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
		// mark the connect type
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
		// if no former or unselected the former for a while
		if (undefined === ROSDASH.connect_former.block || new Date().getTime() - ROSDASH.connect_former.unselect > 300)
		{
			ROSDASH.connect_former.block = evt.cyTarget;
			ROSDASH.connect_former.type = connect_type;
		}	// can be connected if connect types are different
		else if (undefined != ROSDASH.connect_former.block && connect_type != ROSDASH.connect_former.type)
		{
			if (1 == connect_type)
			{
				ROSDASH.connectBlocks(evt.cyTarget.id(), ROSDASH.connect_former.block.id());
			} else if (2 == connect_type)
			{
				ROSDASH.connectBlocks(ROSDASH.connect_former.block.id(), evt.cyTarget.id());
			}
			ROSDASH.connect_former.block = undefined;
		} else // connect failed
		{
			ROSDASH.connect_former.block = undefined;
		}
	});
	// update the unselect time stamp
	window.cy.on('unselect', function(evt)
	{
		ROSDASH.connect_former.unselect = new Date().getTime();
	});
}

///////////////////////////////////// block popups and comments

// remove all popups when unselected
ROSDASH.removePopup = function ()
{
	// remove previous popups
	cy.$('.popup').each(function(i, ele) {
		ele.remove();
	});
}
ROSDASH.addPinPopup = function (block, pin_type, num)
{
	if (undefined === block[pin_type][num] || undefined === block[pin_type][num].name)
	{
		return;
	}
	var pin_t = pin_type.substring(0, 1);
	var pin_pos = window.cy.nodes('#' + block.id + "-" + pin_t + num).position();
	var text = block[pin_type][num].name;
	window.cy.add({
		group: "nodes",
		data: {
			id: block.id + "-p" + pin_t + num,
			name: text,
			weight: 40,
			height: 80,
			faveShape: "ellipse",
			"faveColor": "Cornsilk",
		},
		position: { x: pin_pos.x + (("input" == pin_type) ? -70 : 70), y: pin_pos.y },
		classes: "popup"
	});
	window.cy.add({
		group: "edges",
		"data": {
		"source": block.id + "-p" + pin_t + num,
		"target": block.id + "-" + pin_t + num,
		"strength": 100,
		'target-arrow-shape': 'triangle'
		}
	});
}
// when a block is clicked, popup descriptions for the block and its inputs and outputs
ROSDASH.addBlockPopup = function (target)
{
	ROSDASH.removePopup();
	// if has description, popup
	if (undefined !== ROSDASH.widget_def[target.type] && undefined !== ROSDASH.widget_def[target.type].descrip)
	{
		var text = target.id + " : " + ROSDASH.widget_def[target.type].descrip;
		var width = 400;
		window.cy.add({
			group: "nodes",
			data: {
				id: target.id + "-p",
				name: text,
				weight: width,
				height: 80,
				faveShape: "roundrectangle",
				"faveColor": "Cornsilk",
			},
			position: { x: target.x, y: target.y - 100 },
			classes: "popup"
		});
		window.cy.add({
			group: "edges",
			"data": {
			"source": target.id + "-p",
			"target": target.id,
			"strength": 100,
			'target-arrow-shape': 'triangle'
			}
		});
	}
	// popup names for inputs
	for (var i = 0; i < target.input_num; ++ i)
	{
		ROSDASH.addPinPopup(target, "input", i);
	}
	// popup names for outputs
	for (var i = 0; i < target.output_num; ++ i)
	{
		ROSDASH.addPinPopup(target, "output", i);
	}
}
ROSDASH.addEdgePopup = function (edge)
{
	ROSDASH.removePopup();
	var source_id = ROSDASH.getBlockParent(edge.source().id());
	var target_id = ROSDASH.getBlockParent(edge.target().id());
	var source_num = ROSDASH.getPinNum(edge.source().id());
	var target_num = ROSDASH.getPinNum(edge.target().id());
	if (undefined === ROSDASH.blocks[source_id].output[source_num] || undefined === ROSDASH.blocks[target_id].input[target_num])
	{
		return;
	}
	ROSDASH.addPinPopup(ROSDASH.blocks[source_id], "output", source_num);
	ROSDASH.addPinPopup(ROSDASH.blocks[target_id], "input", target_num);
}
ROSDASH.comment_count = 0;
ROSDASH.addBlockComment = function (content)
{
	if (undefined === content || "" == content || " " == content)
	{
		return undefined;
	}
	var block = window.cy.add({
		group: "nodes",
		data: {
			id: "c-" + ROSDASH.comment_count,
			name: content,
			weight: 100,
			height: 80,
			faveShape: "roundrectangle",
			faveColor: "Cornsilk",
		},
		position: { x: 0, y: 0 },
		classes: "comment"
	});
	++ ROSDASH.comment_count;
	return block;
}

///////////////////////////////////// diagram

ROSDASH.default_style = cytoscape.stylesheet()
	.selector('node').css({
		'shape': 'data(faveShape)',
		'background-color': 'data(faveColor)',
		'border-width': 1,
		'border-color': 'black',
		'width': 'mapData(weight, 10, 30, 20, 60)',
		'height': 'mapData(height, 0, 100, 10, 45)',
		'content': 'data(name)',
		'font-size': 25,
		'text-valign': 'center',
		'text-outline-width': 2,
		'text-outline-color': 'data(faveColor)',
		'color': 'black'
	})
	.selector(':selected').css({
		'border-width': 3,
		'border-color': 'black'
	})
	.selector('edge').css({
		'width': 'mapData(strength, 70, 100, 2, 6)',
		'line-color': 'data(faveColor)',
		'target-arrow-shape': 'triangle',
		'source-arrow-color': 'data(faveColor)',
		'target-arrow-color': 'data(faveColor)'
	})
	.selector('.body').css({
		'shape': 'roundrectangle',
		'width': '130',
		'height': '70'
	})
	.selector('.input').css({
		'shape': 'rectangle',
		'width': '10',
		'height': '10',
		'text-outline-color': 'grey',
		'background-color': 'grey',
		'border-width': 0,
	})
	.selector('.output').css({
		'shape': 'rectangle',
		'width': '10',
		'height': '10',
		'text-outline-color': 'grey',
		'background-color': 'grey',
		'border-width': 0,
	});
// save data to json in server
ROSDASH.saveJson = function (data, filename)
{
	$.ajax({
		type: "POST",
		url: "rosdash.php",
		dataType: 'json',
		data: {
			func: "saveFile",
			file_name: filename,
			data: data
		},
		success: function( data, textStatus, jqXHR )
		{
			console.log("saveJson success: ", textStatus);
		},
		error: function(jqXHR, textStatus, errorThrown)
		{
			console.log("saveJson error: ", jqXHR, textStatus, errorThrown);
		}
	});
}
ROSDASH.saveDiagram = function ()
{
	// basic json for a diagram
	var json = {
		user: ROSDASH.user_conf.name,
		panel_name: ROSDASH.user_conf.panel_name,
		version: ROSDASH.version,
		view_type: "diagram",
		block: new Object(),
		edge: new Array()
	};
	// add all blocks into json
	for (var i in ROSDASH.blocks)
	{
		json.block[i] = ROSDASH.blocks[i];
	}
	// add all edges into json
	window.cy.edges().each(function (i, ele)
	{
		var e = {
			source: ele.source().id(),
			target: ele.target().id()
		};
		json.edge.push(e);
	});
	ROSDASH.saveJson(json, json.user + "/" + json.panel_name + "-diagram");
}
ROSDASH.loadDiagram = function (json)
{
	// load blocks
	for (var i in json.block)
	{
		switch (json.block[i].type)
		{
		case "topic":
			ROSDASH.addTopic(json.block[i]);
			break;
		default:
			ROSDASH.addBlock(json.block[i]);
			break;
		}
	}
	// load edges
	for (var i in json.edge)
	{
		var source = json.edge[i].source;
		var index = source.lastIndexOf("-");
		var type1 = source.substring(index + 1, index + 2);
		var target = json.edge[i].target;
		index = target.lastIndexOf("-");
		var type2 = target.substring(index + 1, index + 2);
		if ("o" == type1 && "i" == type2)
		{
			ROSDASH.connectBlocks(source, target);
		} else if ("i" == type1 && "o" == type2)
		{
			ROSDASH.connectBlocks(target, source);
		}
	}
	// fit page into best view
	window.cy.fit();
}
ROSDASH.runDiagram = function (user, panel_name, selected)
{
	ROSDASH.initForm();
	ROSDASH.initDiagramToolbar();
	ROSDASH.setUser(user, panel_name);
	ROSDASH.user_conf.view_type = "diagram";
	ROSDASH.initJson();
	ROSDASH.loadConfJson();
	var style = ROSDASH.default_style;
	var empty_ele = {nodes: new Array(), edges: new Array()};
	// generate an empty cytoscape diagram
	$('#cy').cytoscape({
		showOverlay: false,
		style: style,
		elements: empty_ele,
		ready: function()
		{
			window.cy = this;
			// load diagram from json
			$.getJSON('file/' + ROSDASH.user_conf.name + "/" + ROSDASH.user_conf.panel_name + '-diagram.json', function(data)
			{
				function start()
				{
					if (0 <= ROSDASH.init_count)
					{
						ROSDASH.loadDiagram(data);
						window.cy.elements().unlock();
						window.cy.elements().unselect();
						window.cy.on('select', ROSDASH.selectBlockCallback);
						window.cy.on('unselect', ROSDASH.removePopup);
						console.log("load diagram: " + ROSDASH.user_conf.name + "/" + ROSDASH.user_conf.panel_name + '-diagram.json');
						ROSDASH.findBlock(selected);
					} else
					{
						console.log("loading");
						setTimeout(start, 200);
					}
				}
				start();
			}).error(function(d) {
				console.error("load diagram error: " + ROSDASH.user_conf.name + "/" + ROSDASH.user_conf.panel_name + '-diagram.json', d);
			});
			// set callback functions
			ROSDASH.blockMoveCallback();
			ROSDASH.connectBlocksCallback();
		}
	});
}
//@deprecated
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

///////////////////////////////////// widgets

// set the default value of widget content
ROSDASH.parseWidgetContent = function (widget)
{
	// set default value of content into example data from sDashboard
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
	default:
		widget.widgetContent = '';
		break;
	}
	// for class
	if (undefined !== ROSDASH.diagram_connection[widget.widgetId] && undefined !== ROSDASH.diagram_connection[widget.widgetId].instance)
	{
		// the object of widget class
		var obj = ROSDASH.diagram_connection[widget.widgetId].instance;
		// if cannot pass checking, do not run
		if ( ROSDASH.checkFuncByName("addWidget", obj) )
		{
			widget = ROSDASH.runFuncByName("addWidget", obj, widget);
		}
	}
	else // for jsobject
	{
		var w = ROSDASH.runFuncByName(ROSDASH.widget_def[widget.widgetType].addWidget, undefined, widget);
		if (undefined !== w)
		{
			widget = w;
		}
	}
	return widget;
}
// parse the string of "example data" into true value of that
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
// set the widget number
ROSDASH.getWidgetNum = function (def)
{
	// if the ROSDASH.widget_def of def.widgetType does not exist - for constant
	if (undefined === ROSDASH.widget_def[def.widgetType])
	{
		ROSDASH.widget_def[def.widgetType] = new Object();
		if (undefined === def.number)
		{
			ROSDASH.widget_def[def.widgetType].count = 0;
			def.number = ROSDASH.widget_def[def.widgetType].count;
		} else
		{
			ROSDASH.widget_def[def.widgetType].count = def.number;
		}
	} else if (undefined === ROSDASH.widget_def[def.widgetType].count)
	{
		if (undefined === def.number)
		{
			ROSDASH.widget_def[def.widgetType].count = 0;
			def.number = ROSDASH.widget_def[def.widgetType].count;
		} else
		{
			ROSDASH.widget_def[def.widgetType].count = def.number;
		}
	} else if (undefined === def.number)
	{
		++ ROSDASH.widget_def[def.widgetType].count;
		def.number = ROSDASH.widget_def[def.widgetType].count;
	} else if (def.number > ROSDASH.widget_def[def.widgetType].count)
	{
			ROSDASH.widget_def[def.widgetType].count = def.number;
	} else
	{
		// if widget number conflicts
		for (var i in ROSDASH.widgets)
		{
			if (ROSDASH.widgets[i].widgetType == def.widgetType && ROSDASH.widgets[i].number == def.number)
			{
				console.error("widget number conflicted: " + def.widgetId);
				// set a new widget number
				++ ROSDASH.widget_def[def.widgetType].count;
				def.number = ROSDASH.widget_def[def.widgetType].count;
			}
		}
	}
	return def;
}
ROSDASH.addWidgetByType = function (name)
{
	if (! ROSDASH.checkWidgetTypeValid(name))
	{
		return;
	}
	// set a new count number
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
	var widget = {
		widgetTitle : name + " " + ROSDASH.widget_def[name].count,
		widgetId : name + "-" + ROSDASH.widget_def[name].count,
		number : ROSDASH.widget_def[name].count,
		widgetType : name,
		widgetContent : undefined,
		// set the position of new widget as 0
		pos : 0,
		width: ROSDASH.user_conf.widget_width,
		height: ROSDASH.user_conf.widget_height,
		header_height: ROSDASH.user_conf.header_height,
		content_height: ROSDASH.user_conf.content_height
	};
	// move other widgets backward by one
	for (var i in ROSDASH.widgets)
	{
		++ ROSDASH.widgets[i].pos;
	}
	ROSDASH.addWidget(widget);
}
ROSDASH.addWidget = function (def)
{
	// if duplicate widget id
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
	def = ROSDASH.getWidgetNum(def);
	// save the definition of this widget
	ROSDASH.widgets[def.widgetId] = def;
	var widget = ROSDASH.parseExampleData(def);
	widget = ROSDASH.parseWidgetContent(widget);
	$("#myDashboard").sDashboard("addWidget", widget);
}
ROSDASH.removeWidget = function (id)
{
	var pos = ROSDASH.widgets[id].pos;
	// move widgets behind it forward by one
	for (var i in ROSDASH.widgets)
	{
		if (ROSDASH.widgets[i].pos > pos)
		{
			-- ROSDASH.widgets[i].pos;
		}
	}
	delete ROSDASH.widgets[id];
}
// callback function of sDashboard widget move
ROSDASH.moveWidget = function (sorted)
{
	// update all new positions
	for (var i in sorted)
	{
		if (sorted[i].widgetId in ROSDASH.widgets)
		{
			ROSDASH.widgets[sorted[i].widgetId].pos = i;
		}
	}
}
ROSDASH.selected_widget;
ROSDASH.selectWidgetCallback = function (e, data)
{
	ROSDASH.selected_widget = data.selectedWidgetId;
	var w = ROSDASH.widgets[ROSDASH.selected_widget];
	// update the property dialog
	/*var div = $("#dialog-form");
	if (undefined === w)
	{
		div.find("#property").html("");
		return;
	}
	var html = "";
	html += "<p>type: " + w.widgetType + "</p>";
	html += "<p>id: " + w.widgetId + "</p>";
	html += "<p>pos: " + w.pos + "</p>";
	div.find("#property").html(html);*/
}

///////////////////////////////////// panel

ROSDASH.loadPanel = function (json)
{
	if (null === json)
	{
		return;
	}
	json = json.widgets;
	var count = 0;
	for (var i in json)
	{
		++ count;
	}
	while (count)
	{
		// find the max widget position and add it
		var max = -1;
		var max_num;
		for (var i in json)
		{
			var pos = parseInt(json[i].pos);
			if (pos > max)
			{
				max = pos;
				max_num = i;
			}
		}
		ROSDASH.addWidget(json[max_num]);
		delete json[max_num];
		-- count;
	}
}
ROSDASH.savePanel = function ()
{
	var json = {
		user: ROSDASH.user_conf.name,
		panel_name: ROSDASH.user_conf.panel_name,
		version: ROSDASH.version,
		view_type: "panel",
		disable_selection: ROSDASH.user_conf.disable_selection,
		run_msec: ROSDASH.user_conf.run_msec,
		widget_width: ROSDASH.user_conf.widget_width,
		widget_height: ROSDASH.user_conf.widget_height,
		header_height: ROSDASH.user_conf.header_height,
		content_height: ROSDASH.user_conf.content_height,
		widgets: ROSDASH.widgets
	};
	ROSDASH.saveJson(json, ROSDASH.user_conf.name + "/" + ROSDASH.user_conf.panel_name + "-panel");
}
ROSDASH.runPanel = function (user, panel_name, selected)
{
	ROSDASH.initDialog();
	ROSDASH.initPanelToolbar();
	ROSDASH.setUser(user, panel_name);
	ROSDASH.user_conf.view_type = "panel";
	// generate empty dashboard
	$("#myDashboard").sDashboard({
		dashboardData : [],
		disableSelection : ROSDASH.user_conf.disable_selection
	});
	// bind callback functions
	$("#myDashboard").bind("sdashboardorderchanged", function(e, data)
	{
		ROSDASH.moveWidget(data.sortedDefinitions);
	});
	$("#myDashboard").bind("sdashboardheaderclicked", ROSDASH.selectWidgetCallback);
	$("#myDashboard").bind("sdashboardwidgetmaximized", ROSDASH.widgetMaxCallback);
	$("#myDashboard").bind("sdashboardwidgetminimized", ROSDASH.widgetMaxCallback);
	$("#myDashboard").bind("sdashboardwidgetadded", ROSDASH.widgetAddCallback);
	$("#myDashboard").bind("sdashboardwidgetremoved", function(e, data)
	{
		ROSDASH.removeWidget(data.widgetDefinition.widgetId);
	});
	$("#myDashboard").bind("sdashboardwidgetset", ROSDASH.widgetSetCallback);
	$("#myDashboard").bind("sdashboardheaderset", ROSDASH.headerSetCallback);
	
	ROSDASH.initJson();
	ROSDASH.loadConfJson();
	ROSDASH.readDiagram();
	// load panel from json
	$.getJSON('file/' + ROSDASH.user_conf.name + "/" + ROSDASH.user_conf.panel_name + '-panel.json', function(data)
	{
		function start()
		{
			// wait until all initializations finish
			if (0 <= ROSDASH.init_count)
			{
				ROSDASH.loadPanel(data);
				console.log("load panel: " + ROSDASH.user_conf.name + "/" + ROSDASH.user_conf.panel_name + '-panel.json');
				if (selected in ROSDASH.widgets)
				{
					$("#" + selected + " div.sDashboardWidgetHeader").css("background-color", "Aquamarine");
					ROSDASH.selectWidgetCallback(undefined, {selectedWidgetId: selected});
				}
				// start to run widgets
				ROSDASH.initWidgets();
				ROSDASH.runWidgets();
			} else
			{
				//console.log("loading");
				setTimeout(start, 200);
			}
		}
		start();
	}).error(function(d) {
		console.error("load panel error: " + ROSDASH.user_conf.name + "/" + ROSDASH.user_conf.panel_name + '-panel.json');
	});
}

///////////////////////////////////// diagram analysis

ROSDASH.diagram;
// read diagram json for panel execution
ROSDASH.readDiagram = function ()
{
	++ ROSDASH.init_count;
	$.getJSON('file/' + ROSDASH.user_conf.name + "/" + ROSDASH.user_conf.panel_name + '-diagram.json', function(data)
	{
		console.log("read diagram: ", ROSDASH.user_conf.name + "/" + ROSDASH.user_conf.panel_name + '-diagram.json');
		ROSDASH.diagram = data;
		ROSDASH.traverseDiagram();
	}).error(function(d) {
		console.error("read diagram error: ", ROSDASH.user_conf.name + "/" + ROSDASH.user_conf.panel_name + '-diagram.json', d);
	}).always(function() {
		-- ROSDASH.init_count;
	});
}
// connection relationship for diagram
ROSDASH.diagram_connection = new Object();
// traverse the diagram to obtain the connection relations
ROSDASH.traverseDiagram = function ()
{
	// for each edge
	for (var i in ROSDASH.diagram.edge)
	{
		var edge = ROSDASH.diagram.edge[i];
		// obtain one block of the edge
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
		// obtain the other block of the edge
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
		// save into ROSDASH.diagram_connection
		if (type1.substring(0, 1) == "i" && type2.substring(0, 1) == "o")
		{
			ROSDASH.diagram_connection[block1].parent[type1] = block2;
			ROSDASH.diagram_connection[block1].output[type1] = type2;
		} else if (type1.substring(0, 1) == "o" && type2.substring(0, 1) == "i")
		{
			ROSDASH.diagram_connection[block2].parent[type2] = block1;
			ROSDASH.diagram_connection[block2].output[type2] = type1;
		}
	}
	// for each block
	for (var i in ROSDASH.diagram.block)
	{
		// if it is not in the connection
		if (undefined === ROSDASH.diagram_connection[i])
		{
			// generate that block with no connection
			ROSDASH.diagram_connection[i] = new Object();
			ROSDASH.diagram_connection[i].parent = new Object();
			ROSDASH.diagram_connection[i].output = new Object();
			ROSDASH.diagram_connection[i].exist = true;
			ROSDASH.diagram_connection[i].done = false;

			// instantiate widget class
			ROSDASH.diagram_connection[i].instance = ROSDASH.newObjByName(ROSDASH.widget_def[ROSDASH.diagram.block[i].type].class_name, ROSDASH.diagram.block[i]);
		} else // if in the connection
		{
			if (undefined === ROSDASH.widget_def[ROSDASH.diagram.block[i].type])
			{
console.debug(ROSDASH.diagram.block[i].type, ROSDASH.widget_def);
for (var i in ROSDASH.widget_def)
{
	console.debug(i, ROSDASH.widget_def[i])
}
			}
			// validate the existence of the block
			ROSDASH.diagram_connection[i].exist = true;
			ROSDASH.diagram_connection[i].instance = ROSDASH.newObjByName(ROSDASH.widget_def[ROSDASH.diagram.block[i].type].class_name, ROSDASH.diagram.block[i]);
		}
	}
}

///////////////////////////////////// diagram execution

// new object by a string of name
ROSDASH.newObjByName = function (name, arg1, arg2)
{
	if (typeof name != "string")
	{
		//console.error("class name error");
		return undefined;
	}
	// split by . to parse class with namespaces
	var namespaces = name.split(".");
	var class_name = namespaces.pop();
	var context = window;
	// parse namespaces one by one
	for (var i in namespaces)
	{
		context = context[namespaces[i]];
	}
	// if the class is valid
	if(typeof context == "object" && typeof context[class_name] == "function")
	{
		if (undefined === arg1 && undefined === arg2)
		{
			return new context[class_name] ();
		} else if (undefined === arg2)
		{
			return new context[class_name] (arg1);
		} else
		{
			return new context[class_name] (arg1, arg2);
		}
	} else
	{
		//console.error("class does not exist: " + name);
		return undefined;
	}
}
// just check, no run
ROSDASH.checkFuncByName = function (name, context)
{
	if (typeof name != "string")
	{
		//console.error("function name error");
		return false;
	}
	// if context is undfined, it should be window
	context = (undefined !== context) ? context : window;
	// split by . to parse function with namespaces
	var namespaces = name.split(".");
	// parse namespaces one by one
	// cannot put the last function name here, or else that function cannot use class public variables
	for (var i = 0; i < namespaces.length - 1; ++ i)
	{
		context = context[namespaces[i]];
	}
	// if the function is valid
	if(typeof context == "object" && typeof context[namespaces[namespaces.length - 1]] == "function")
	{
		return true;
	} else
	{
		//console.error("function does not exist: " + name);
		return false;
	}
}
// check and run function by a string of name with at most two arguments
ROSDASH.runFuncByName = function (name, context, arg1, arg2)
{
	if (typeof name != "string")
	{
		//console.error("function name error");
		return undefined;
	}
	// if context is undfined, it should be window
	context = (undefined !== context) ? context : window;
	// split by . to parse function with namespaces
	var namespaces = name.split(".");
	// parse namespaces one by one
	// cannot put the last function name here, or else that function cannot use class public variables
	for (var i = 0; i < namespaces.length - 1; ++ i)
	{
		context = context[namespaces[i]];
	}
	// if the function is valid
	if(typeof context == "object" && typeof context[namespaces[namespaces.length - 1]] == "function")
	{
		// support 0, 1, 2 arguments
		if (undefined === arg1 && undefined === arg2)
		{
			return context[namespaces[namespaces.length - 1]] ();
		} else if (undefined === arg2)
		{
			return context[namespaces[namespaces.length - 1]] (arg1);
		} else
		{
			return context[namespaces[namespaces.length - 1]] (arg1, arg2);
		}
	} else
	{
		//console.error("function does not exist: " + name);
		return undefined;
	}
}
// the outputs for all blocks
ROSDASH.diagram_output = new Object();
// call init functions of widgets
ROSDASH.initWidgets = function ()
{
	for (var i in ROSDASH.diagram_connection)
	{
		// validate the existence of each block just once
		if (! ROSDASH.diagram_connection[i].exist)
		{
			console.error("widget does not exist: ", i);
			continue;
		}
		// for class
		if (undefined !== ROSDASH.diagram_connection[i].instance)
		{
			// run function by instance of widget class
			ROSDASH.runFuncByName("init", ROSDASH.diagram_connection[i].instance, ROSDASH.diagram.block[i]);
		}
		else // for jsobject
		{
			ROSDASH.runFuncByName(ROSDASH.widget_def[ROSDASH.diagram.block[i].type].init, undefined, ROSDASH.diagram.block[i]);
		}
	}
}
ROSDASH.done_count = 0;
ROSDASH.runWidgets = function ()
{
	ROSDASH.done_count = 0;
	var last_count = -1;
	// reset all blocks as undone
	for (var i in ROSDASH.diagram_connection)
	{
		ROSDASH.diagram_connection[i].done = false;
	}
	// if ROSDASH.done_count does not change, the diagram execution ends
	while (last_count < ROSDASH.done_count)
	{
		last_count = ROSDASH.done_count;
		for (var i in ROSDASH.diagram_connection)
		{
			if (! ROSDASH.diagram_connection[i].exist || ROSDASH.diagram_connection[i].done)
			{
				continue;
			}
			var ready_flag = true;
			var input = new Object();
			// for all the parents of this block
			for (var j in ROSDASH.diagram_connection[i].parent)
			{
				// if the parent is not ready
				if (! (ROSDASH.diagram_connection[i].parent[j] in ROSDASH.diagram_output) || undefined === ROSDASH.diagram_output[ROSDASH.diagram_connection[i].parent[j]])
				{
					ready_flag = false;
					break;
				} else
				{
					// get the corresponding order of this input
					var count = j.substring(1);
					// save this input
					input[count] = ROSDASH.diagram_output[ROSDASH.diagram_connection[i].parent[j]][ROSDASH.diagram_connection[i].output[j]];
				}
			}
			// if the block is ready to be execute with all the inputs are ready
			if (ready_flag)
			{
				// run the widget, and save the output into ROSDASH.diagram_output
				// for class
				if (undefined !== ROSDASH.diagram_connection[i].instance)
				{
					// the object of widget class
					var obj = ROSDASH.diagram_connection[i].instance;
					ROSDASH.diagram_output[i] = ROSDASH.runFuncByName("run", obj, input);
				}
				else // for jsobject
				{
					ROSDASH.diagram_output[i] = ROSDASH.runFuncByName(ROSDASH.widget_def[ROSDASH.diagram.block[i].type].run, undefined, ROSDASH.diagram.block[i], input);
				}
				ROSDASH.diagram_connection[i].done = true;
				++ ROSDASH.done_count;
			}
		}
	}
	// sleep for a while and start next cycle
	setTimeout(ROSDASH.runWidgets, ROSDASH.user_conf.run_msec);
}

///////////////////////////////////// panel callback

ROSDASH.widgetMaxCallback = function (e, data)
{}
// init the HTML for each widget when it is added
ROSDASH.widgetAddCallback = function (e, data)
{}
ROSDASH.widgetSetCallback = function (e, data)
{}
ROSDASH.headerSetCallback = function (e, data)
{}

//@todo
ROSDASH.addToDiagram = function ()
{
	if (undefined === ROSDASH.selected_widget)
	{
		console.error("cannot add to diagram");
		return;
	}
	var find = ROSDASH.selected_widget.lastIndexOf("-");
	var widget_type = ROSDASH.selected_widget.substring(0, find);
	var widget_num = parseFloat(ROSDASH.selected_widget.substring(find));
	ROSDASH.diagram.block[ROSDASH.selected_widget] = {
		id: ROSDASH.selected_widget,
		type: widget_type,
		number: widget_num,
		x: 400,
		y: 0
	};
	//ROSDASH.saveJson(ROSDASH.diagram, ROSDASH.user_conf.name + "test4-diagram");
}
