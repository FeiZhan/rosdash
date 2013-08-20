var Analysis = function(){};

(function($){
	Math.rounder = function(value, decimals) {
		decimals = decimals || 2;
		var ten = Math.pow(10, decimals);
		return ((value * ten)|0) / ten;
	};

	$.setRound = function(sel, value, suffix) {
		suffix = suffix || "";
		sel = $(sel);
		sel.html && sel.html("" + Math.rounder(value) + "" + suffix);
		return sel;
	};

	/**
	 * jQuery doesn't have a nice helper to get to the padding. Boo.
	 */
	$.fn.analysis = function() {
		return $(this).closest('.analysis').data('analysis');
	};
})(jQuery);

(function($){
	Analysis = function(id){
		var self = this;
		var analysis = $("<div />")
			.addClass('analysis')
			.data('analysis', this);//Attach a reference back to the analysis;
		this.element = analysis;

		var tree = $(id)
			.before(analysis)
			.remove()
			.appendTo(analysis)
			.treetable()
			.click(this.click)
			.bind('insert', this.newNode)
			.bind('modified', this._calc);


		var save_box =
			$('<span />')
				.addClass('save-box')
				.append(
					$('<textarea rows=10 cols=80></textarea>')
					.width(tree.width())
				)
				.append(
					$('<button>Close</button>')
						.button({icons: { primary: 'ui-icon-close' }})
						.click(function(){
							$(this).closest('.save-box').hide()
						})
				);
		analysis.append(save_box);
		save_box.hide();

		var grade_total = $('<span />');
		var cost_total = $('<span />');
		var point_total = $('<span />');
		var buttons = $('<span />')
			.append(
				$('<button>Save</button>')
					.button({icons: { primary: 'ui-icon-disk' }})
					.addClass('save')
					.click(this.save)
			)
			.append(
				$('<button>Open</button>')
					.button({icons: { primary: 'ui-icon-folder-open' }})
					.addClass('restore')
					.click(this.restore)
			)
			.addClass('buttons');

		tree.after(
			$('<h2 />').text('Grade: ')
				.append(grade_total)
				.append(' Cost: ')
				.append(cost_total)
				.append(' Per Point: ')
				.append(point_total)
				.addClass('ui-widget-header footer')
				.append(buttons)
		);

		this.calculate = function(li) {
			var grade, weight, cost, children;
			if(undefined === li)
			{	//Calcing the entire analysis.
				children = tree.treetable('body');
				weight = 100;
			}
			else
			{	//Just doing one branch
				children = $(li).children('ul').children('li');
				weight = parseFloat($(li).children('span.weight:first').html().replace('%', ''));
			}

			if(children.length === 0)
			{	//We're a leaf, floating on the winds...
				var span, input;
				span = $(li).children('span.grade');
				input = span.find('input')[0];
				grade = parseInt((input && input.value) || span.html());

				span = $(li).children('span.cost');
				input = span.find('input')[0];
				cost = parseInt((input && input.value) || span.html());
			}
			else
			{	//Weighted average the children.
				grade = 0; cost = 0;
				children.each(function(){
					var calc = self.calculate(this);
					grade += (calc[0] * calc[1]);
					cost += calc[2];
				});
				grade /= 100;

				grade = Math.rounder(grade);

				//Fill in the node.
				((li && $(li).children('span.grade')) || grade_total).html(grade).addClass('aggregate');
				((li && $(li).children('span.cost')) || cost_total).html(cost).addClass('aggregate');
			}

			if(undefined === li)
			{	//At the head, so go back to calculate cost/value
				return _calculate_value();
			}
			else
			{
				return [weight, grade, cost];
			}
		}

		var _calculate_value = function(li, weight) {
			var children, cost, points, value;
			if(undefined === li)
			{	//Start from the top
				children = tree.treetable('body');
				weight = 1;
				cost = cost_total.text();
				grade = grade_total.text();
			}
			else
			{
				children = $(li).children('ul').children('li');
				weight *= (parseInt($(li).children('span.weight:first').text().replace('%', ''))/100);
				cost = $(li).children('span.cost:first').text();
				grade = $(li).children('span.grade:first').text();
			}

			value = Math.rounder(((100-grade) / cost) * weight, 4);
			((li && $(li).children('span.value:first')) || point_total).text(value);

			$(children).each(function(){
				_calculate_value(this, weight);
			});
		}

		var _calculate = function() {
			self.calculate();
		}

		var input_aspect = function(span) {
			var val = span.html();
			val = val.replace(/^&nbsp;$/, '');
			var close = function(){span.html(input.val()?input.val():"&nbsp;");}
			var input = $('<input type="text" />')
				.val(val)
				.width(span.width() * 0.95)
				.blur(close)
				.keypress( function(event){ if(event.which == '13'){ close(); } } );
			span.html(input);
			input.focus().select();
		};

		var input_weight = function(span) {
			var val = parseInt(span.html().replace('%', ''));

			if(isNaN(val))
			{	val = 50;	}
			var slider = $('<div />')
				.slider({
					orientation: "vertical",
					range: "min",
					min: 0,
					max: 100,
					step: 5,
					value: 0 + val,
					slide: function(event, ui) {
						span.text('' + ui.value + '%');
						_calculate();
					}
				});

			var holder = $('<div />')
				.addClass('slider-holder')
				.css('position', 'absolute')
				.html(slider);

			span.after(holder);

			holder.position({
					my: "center center",
					at: 'right center',
					of: span
				});

			//The first time through the event, this binds to the document,
			//which hasn't received the event. So, we need to not clos
			//the first time this handler is called.
			//TODO Find a better way to handle this.
			var first = true;
			$(document).bind('click', function(event) {
				if(first) {first = false; return;}
				if($(event.target).parents('.slider-holder').length <= 0)
				{
					holder.remove();
					$(this).unbind(event);
				}
			});
		};

		var input_spin = function(span, def) {
			var self = this;
			if(span.closest('li').find('li').length <= 0)
			{	//Can't edit the grade for non-leaves
				var val = parseInt(span.html());
				if(isNaN(val))
				{	val = def;	}
				var max = (0 == def) ? "" : "max=100 ";
				var input = $('<input type=number min=0 '+max+'step=5 />')
					.width(span.width() * 0.95)
					.val(val)
					.click(_calculate)
					.change(_calculate)
					.blur(_calculate)
					.blur(function(){
						span.html(input.val()?input.val():def);
					});
				span.html(input);
				input.focus();
			}
		};

		/**
		 * Click marshaller
		 */
		this.input = function(span, event) {
			if(span.hasClass('aspect')) {
				input_aspect(span);
			}
			else if (span.hasClass('weight')) {
				input_weight(span);
			}
			else if (span.hasClass('grade')) {
				input_spin(span, 50);
			}
			else if (span.hasClass('cost')) {
				input_spin(span, 0);
			}
		};

		this.treetable = function() {
			return tree;
		};
	};

	/**
	 * Public stub for callbacks.
	 */
	Analysis.prototype._calc = function () {
		$(event.target).closest('.analysis').data('analysis').calculate();
	};

	/**
	 * Click handler
	 */
	Analysis.prototype.click = function(event) {
		var span = $(event.target).closest('span');
		if(span.parents('.head').length === 0)
		{	//In the body...
			var input = span.find('input');
			if(input.length == 0)
			{	//Build some inputs.
				$(this).data('analysis').input(span, event);
			}
		}
	};

	/**
	 * Callback for the tree's insert event. Initializes the spans in the newly
	 * added row.
	 */
	Analysis.prototype.newNode = function(event, newNode) {
		$(newNode).find('.weight').html('50%');
		$(newNode).find('.grade').html('50')
		$(newNode).find('.cost').html('0')
		$(newNode).find('.aspect').click();
	};

	Analysis.prototype.save = function(){
		var self = $(this).analysis();
		var string = self.treetable().treetable('save');
		$(self.element)
			.find('.save-box')
			.show()
			.find('textarea')
			.text(string);
	};

	Analysis.prototype.restore = function(){
		var self = $(this).analysis();
		$(self.element)
			.find('.save-box')
			.show()
			.find('textarea')
			.text('');

		var close = $(self.element).find('.save-box button');
		var closefunc = function() {
			var text = $(this).closest('.save-box').find('textarea').text();
			self.treetable().treetable('restore', text);
			close.button('text', 'Close');
			$(this).unbind('click', closefunc);
		}
		close
			.click(closefunc)
			.button('text', 'Save');
	};
})(jQuery);
