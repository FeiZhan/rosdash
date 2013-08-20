;(function($){

/**
 * jQuery doesn't have a nice helper to get to the padding. Boo.
 */
$.fn.padding = function(direction, value) {
	if(undefined === value)
	{
		var css = this.css('padding-' + direction) || "0px";
		var parts = /([0-9]+)([a-zA-Z]+)/.exec(css);
		return parts.slice(1);
	}
	else
	{
		this.css('padding-' + direction, value);
		return this;
	}
};

/**
 * Build the treetable as a widget.
 *
 * Options:
 *	columns:
 *		Specify the column layout and their order.
 *
 *	tree_cell:
 *		integer column or integer array columns to apply tree padding to. 1 is
 *		expander, N is controls.
 *
 *	cell_tag:
 *		String for tag to treat as cells.
 *
 * Events:
 *	modified:
 *		fired whenever anything about the tree changes (insert, delete, expand,
 *		collapse). Includes the row nearest to the modification, or undefined
 *		for tree-wide (eg on init).
 *
 *	insert:
 *		Fired when a row has been inserted. Includes the inserted row.
 *
 *	delete:
 *		Fired when a row has been deleted. Includes the deleted row, in an
 *		unattached from the DOM state.
 *
 *	expand:
 *		Fired when a row's children have been expanded. Includes the parent row.
 *
 *	collapse:
 *		Fired when a row's children have been collapsed. Include the parent row.
 *
 * Methods:
 *	body:
 *		Get a reference to the body elements of the tree.
 *
 *	save:
 *		Get a JSON representation of the data and structure of the tree.
 *
 *	load:
 *		Restore a JSON representation of the data and structure of the tree.
 */
$.widget("ui.treetable", $.ui.mouse, {
	options: {
		//Description of the columns. Maintains an ordering of their classes, so
		// we possibly could add column reordering in the future.
		columns: {
			count: 0,
			order: []
		},
		tree_cell: 2,
		//Default indentation padding.
		padding: [10, 'px'],
		cell_tag: "span"
	},

	_create: function(){
		var self = this;
		var tree = this.element;
		var head = $(tree.children('li.head'));
		var body = $(tree.children('li:not(.head)'));

		tree.addClass('treetable ui-widget');
		head.addClass('ui-widget-header');
		body.addClass('ui-widget-content');

		//Need to know how to buld a new cell based on whatever tag.
		this.options.cell_tag_html = "<" + this.options.cell_tag + " />";

		if(this.options.columns.count === 0)
		{	//Columns array wasn't given, so build it from the DOM
			head.first().children(this.options.cell_tag).each(function(i){
				//Name is the first class. A bit arbitrary... could use `data-`
				var name = $(this).attr('class').split(' ')[0];
				self.options.columns.order.push(name);
				self.options.columns[name] = {
					width: $(this).width()
				};
				self.options.columns.count++;
			});
		}

		//Add "Controls" to column head.
		$(this.options.cell_tag_html)
			.html('Controls')
			.addClass('controls')
			.appendTo(head); //Initial cell decoration.
		tree.find('li').each(function(){
			//_decorate_cells works one row at a time
			self._decorate_cells(this);
		});

		//Should probably make this configurable...
		var col1 = body.children(this.options.cell_tag+':nth-child(2)');
		this.options.padding = col1.padding('left');

		//Some of the common click events
		tree.bind('click', this._click);
		tree.bind('modified', this._resize);
		tree.bind('modified', this._recolor);

		//Add the resize handles
		head.find("span")
			.each(function(){
				//Reduce their width by 2px
				if(this.width) {this.width(this.width() - 2);}
			})
			.after($(this.options.cell_tag_html).addClass('handle'));
		head.find (
			this.options.cell_tag + ".handle:first, " +
			this.options.cell_tag +".handle:last"
		).remove();

		return this;
	},	//_create

	//On initialize, just assumed something's been changed.
	_init: function(){
		var self = this;
		var tree = this.element;
		var head = $(tree.children('li.head'));
		var body = $(tree.children('li:not(.head)'));

		//All the ULs will get ui-widget-content to break up the monotony of lis.
		//This has the nice effect of giving everything a box around it. Corners
		//might also be nice here.
		body.find('ul').addClass('ui-widget-content');

		//set up controls and expanders.
		this._expander(head);
		body.each(function(){
			self._expander(this);
			self._add_controls(this);
			$(this).find("li").each(function(){
				self._expander(this);
				self._add_controls(this);
			});
		});

		//Start the mouse listening
		this._mouseInit();

		this.element.trigger('modified');

		return this;
	},	//_init

	_destroy: function(){
		this._mouseDestroy();
	},	//_destroy

	//Click dispather
	_click: function(event) {
		$(this).treetable('clicker', event);
		// $.ui.treetable.prototype.clicker.apply($(this), [event]);
	},	//_click

	//One click handler for the entire table, the event.target tells us enough.
	clicker: function(event) {
		var button = $(event.target).closest('.ui-button');
		if(button.length > 0)
		{	//It's a button.
			//Find the row that its in.
			var li = button.closest('li');
			if(button.hasClass('adder'))
			{	//It's one of our adder buttons!
				var newNode = this._new_node();
				if(button.hasClass('add-child'))
				{	//Need a kid.
					this._add_child(li, newNode);
				}
				else if(button.hasClass('add-sibling'))
				{	//Found a sister?
					this._add_sibling(li, newNode);
				}
				this.element.trigger('modified', newNode);
				this.element.trigger("insert", newNode);
			}
			else if (button.hasClass('delete'))
			{	//Let it go away
				this._delete_node(li);
				this.element.trigger('modified', li);
				this.element.trigger("delete", li);
			}
			else if (button.hasClass('expander'))
			{	//Or is it a collapser?
				this._expand(li);
			}
		}
	},	//clicker

	_add_sibling: function(li, newNode) {
		if(li.hasClass('ui-widget-content'))
		{
			newNode.addClass('ui-widget-content');
		}
		li.after(newNode);
	},	//_add_sibling

	_add_child: function(li, newNode) {
		var ul;
		ul = li.children('ul');
		if(ul.length === 0)
		{	//Do we need to add all the children?
			li.append(
				$("<ul />")
					.addClass('ui-widget-content')
					.append(newNode)
				);
		}
		else
		{	//More kids coming.
			ul.children('li').last().after(newNode);
		}
		this._expander(li); //Reconfigure expander for the parent.
	},	//_add_child

	_new_node: function(vals) {
		var li = $("<li />");
		var columns = this.options.columns.order;
		vals = vals || {};
		for(var i=0; i<columns.length; i++)
		{	//Loop through the columns
			$(this.options.cell_tag_html)
				.addClass(columns[i])
				.text(vals[columns[i]] || vals[i] || "")
				.appendTo(li);
		}
		this._expander(li);
		this._add_controls(li);
		return li;
	},	//_new_node

	_delete_node: function(li) {
		var ul = li.parent();
		li.remove();
		if(ul.children().length === 0)
		{	//Going away...
			ul.parent().find('.expander button').remove();
			ul.remove();
		}
	},	//_delete_node

	_decorate_cells: function(li)
	/**
	 * Private method to get the row in line with the rest of the table by
	 * attaching any remaining cells and setting all the cell styles.
	 */
	{
		var cells, columns;
		columns = this.options.columns;
		cells = $(li).children(this.options.cell_tag);
		while(cells.length < columns.count)
		{	//Add enough cells...
			$(this.options.cell_tag_html).insertAfter($(li).children(this.options.cell_tag+":last"));
			cells = $(li).children(this.options.cell_tag);
		}

		for(i=0; i<cells.length; i++)
		{	//The easy part.
			$(cells[i]).addClass(columns.order[i]);
		}
	},	//_decorate_cells

	_add_controls: function(li)
	/**
	 * Add the sibling/child/delete controls.
	 */
	{
		if($(li).children(this.options.cell_tag+'.controls').length === 0)
		{	//Don't have it, need to add it...
			cell = $(this.options.cell_tag_html)
				.addClass('controls');
			$('<button>Add Sibling</button>')
				.button({icons: { primary: 'ui-icon-arrowthick-1-s' }, text: false })
				.addClass('adder add-sibling')
				.appendTo(cell);

			$('<button>Add Child</button>')
				.button({icons: { primary: 'ui-icon-arrowreturnthick-1-e' }, text: false })
				.addClass('adder add-child')
				.appendTo(cell);

			$('<button>Delete Row</button>')
				.button({icons: { primary: 'ui-icon-close' }, text: false })
				.addClass('delete')
				.appendTo(cell);

			$(li).children(this.options.cell_tag).last().after(cell);
		}
	},	//_add_controls


	_expander: function(li)
	/**
	 * Attach the expander control to the row.
	 */
	{
		var cell = $(li).children('.expander')[0]
		if(undefined === cell)
		{	//Need to add it...
			cell = $(this.options.cell_tag_html)
				.addClass('expander expanded');
			$(li).children(this.options.cell_tag).first().before(cell);
			cell = cell[0];
		}

		if (
			($(li).children('ul').length > 0) &&
			($(cell).children('button').length === 0)
		)
		{	//Have a ul and children, so add the expand/collapse button.
			$('<button>Collapse</button>')
				.button({icons: { primary: 'ui-icon-minusthick' }, text: false })
				.addClass('expander')
				.appendTo(cell);
		}
	},	//_expander

	_expand: function(li) {
		var cell = $(li).children('.expander');
		var button = cell.find('button');
		if(cell.hasClass('expanded'))
		{	//Collapse it...
			$(li).children('ul').hide();
			$(button).button("option", "icons", {primary: 'ui-icon-plusthick'});
			cell.removeClass('expanded').addClass('collapsed');
			this.element.trigger('modfied', li);
			this.element.trigger('collapse', li);
		}
		else
		{	//Expand it...
			$(li).children('ul').show();
			$(button).button("option", "icons", {primary: 'ui-icon-minusthick'});
			cell.removeClass('collapsed').addClass('expanded');
			this.element.trigger('modfied', li);
			this.element.trigger('expand', li);
		}
		this.recolor();
	},	//_expand

	_mouseStart: function(e) {
		this._xStart = undefined;
		if($(e.target).hasClass('handle'))
		{	//Make sure we're only expanding on the header handles
			//Store the starting x position
			this._xStart = e.pageX;
			//Store the column getting resized (the one before the handle)
			this._col = $(e.target).prev();
			this._startWidth = this._col.width();
		}
	},	//_mouseStart

	_mouseDrag: function(e) {
		if(this._xStart)
		{	//Currently dragging a head
			//Calculate the new x
			var x = e.pageX - this._xStart;
			//Calculate the new width
			this._col.width(Math.max(0, this._startWidth + x));
			this.resize();
		}
	},	//_mouseDrag

	_mouseEnd: function(e) {
		this._xStart = undefined;
	},	//_mouseEnd

	_resize: function()
	/**
	 * Resize event delegate
	 */
	{
		$(this).treetable('resize');
	},	//_resize

	resize: function()
	/**
	 * Force the table to resize the columns.
	 */
	{
		var self = this;
		this.body().find('li').andSelf().each(function(){
			self._resize_li(this);
		});
	},	//resize

	_resize_li: function(li)
	/**
	 * Handle a row at a time
	 */
	{
		var self = this;
		$(li).children(this.options.cell_tag).each(function(){
			$(this).width($('.head .' + ($(this).attr('class').split(' ')[0])).width());
			$(this).padding("right", "2px");
		});
		$(li).children(this.options.cell_tag+':nth-child('+this.options.tree_cell+')').each(function(){
			//Set the padding for the cels that need to be flexible.
			var depth = $(this).parents('li').length;
			var pad = self.options.padding[0] * depth;
			$(this).padding('left', pad + self.options.padding[1]);
			pad -= self.options.padding[0];

			//Have to calc the width on our own, taking into account the padding
			var className = $(this).attr('class').split(' ')[0];
			var width = $('.head .' +className).width() - pad;
			$(this).width(width);
		});
	},	//_resize_li

	_recolor: function()
	/**
	 * Recolor delegate.
	 */
	{
		$(this).treetable('recolor');
	},	//_recolor

	recolor: function()
	/**
	 * Apply even/odd styles.
	 */
	{
		//All the LIs that are not headers
		this.element.find('li:not(.ui-widget-header)')
			//No stylying
			.removeClass('odd even')
			//Only the uncollpsed elements
			.filter(':visible')
				//Add the even classes
				.filter(':even').addClass('even')
				.end() //Back to the visibles
				//And the odd clases
				.filter(':odd').addClass('odd');
	},	//recolor

	body: function()
	/**
	 * Need quick acces to the body DOM?
	 */
	{
		return $(this.element.children('li:not(.head)'));
	},	//body

	save: function() {
		var lia = [], body = this.body();

		for(var i=0; i < body.length; i++)
		{
			lia.push(this._save_li(body[i]));
		}
		return window.JSON.stringify({'options': this.options, 'lia': lia});
	},

	_save_li: function(li) {
		var self = this;
		var lia, child_lis;
		lia = [];

		for(var i=0; i<this.options.columns.count; i++)
		{
			var clazz = '.'+this.options.columns.order[i];
			lia.push($(li).children(clazz).html());
		}

		child_lis = $(li).children('ul').children('li');
		if(child_lis.length >= 0)
		{	//Save the children
			$(child_lis).each(function(){
				lia.push(self._save_li(this));
			});
		}

		return lia;
	},	//save

	restore: function(json) {
		var self = this;
		throw { message: 'Not implemented.' };
		this.options = json.options;
		self.parts.body = $('<ul />');
		$(json.lia).each(function(){
			self._restore_li(this, self.body);
		});
		return this;
	},	//restore

	_restore_li: function(arr, ul) {
		var self = this;
		var li;
		li = $('<li />');

		for(var i=0; i<this.options.columns.count; i++)
		{
			var cell = $(this.options.cell_tag_html)
				.addClass(this.options.columns.order[i])
				.html(arr.pop());
			cell.appendTo(li);
		}

		if(arr.left > 0)
		{
			var cul = $('<ul />');
			while(arr.length > 0)
			{
				this._restore_li(arr.pop(), cul);
			}
			cul.appendTo(li);
		}
		li.appendTo(ul);
	}	//_restore_li
});
})(jQuery);
