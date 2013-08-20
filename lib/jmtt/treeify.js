(function($){


$.widget("ui.treeify", $.ui.treetable, {
	_create: function(){
		this.element.append("<li class='head'><span class='property'>Property</span><span class='type'>Type</span><span class='value'>Value</span></li>");
		// this.element.append("<li><span /><span /><span /></li>");
		$.ui.treetable.prototype._create.apply(this);
		return this;
	},

	_init: function(){
		$.ui.treetable.prototype._init.apply(this);
		return this;
	},

	load: function(obj){
		this._load(" ", obj);
		setTimeout($.proxy(function(){
			this.element.trigger("modified");
		}, this), 1);
		return this;
	},

	_load: function(property, thing, parent){
		var orphan = !(parent && parent.length);
		if(orphan){
			parent = $("<li></li>");
		}
		if($.isArray(thing)){
			this._loadArray(property, thing, parent);
		} else if ($.isPlainObject(thing)){
			this._loadObject(property, thing, parent);
		} else {
			this._loadValue(property, thing, parent);
		}
		if(orphan){
			this.element.append(parent.children('ul').children('li'));
		}
	},

	_loadObject: function(property, object, parent) {
		var child = this._new_node([property, "[Object]"]);
		$.each(object, $.proxy(function(key, val){
			this._load(key, val, child);
		}, this));
		this._add_child(parent, child);
	},

	_loadArray: function(property, array, parent) {
		var child = this._new_node([property, "[Array]"]);
		$.each(array, $.proxy(function(i, val){
			this._load(" ", val, child);
		}, this));
		this._add_child(parent, child);
	},

	_loadValue: function(property, value, parent){
		var child = this._new_node([property, "[Value]", value]);
		this._add_child(parent, child);
	}
});

this.Treeify = function(obj){
	return $("<ul></ul>").treeify().treeify("load", obj);
};



}.call(this, jQuery));