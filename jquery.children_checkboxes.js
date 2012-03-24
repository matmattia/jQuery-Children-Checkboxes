/**
* jQuery Children Checkboxes
* @name jquery.children_checkboxes.js
* @author Mattia - http://www.matriz.it
* @version 1.0.0
* @date February 27, 2012
* @category jQuery plugin
* @copyright (c) 2012 Mattia at Matriz.it (info@matriz.it)
* @license MIT - http://opensource.org/licenses/mit-license.php
* @example Visit http://www.matriz.it/projects/jquery-children-checkboxes/ for more informations about this jQuery plugin
*/
(function ($) {
	$.fn.children_checkboxes = function (opts, spec_opts) {
		var options = {
			'checkedClass': 'checked',
			'uncheckedClass': 'unchecked',
			'halfCheckedClass': 'half_checked'
		};
		$.extend(options, opts);
		return $(this).each(function (i, el) {
			var inp_options = options,
				inp = $(el),
				li = inp.closest('li'),
				children = li.length > 0 ? li.find('ul li input[type=checkbox]') : [],
				children_l = children.length;
			if (inp.attr('type') === 'checkbox' && children_l > 0) {
				if (spec_opts && spec_opts[i]) {
					$.extend(inp_options, spec_opts[i]);
				}
				inp.data('children_checkboxes_options', inp_options).change(function () {
					children.prop('checked', $(this).prop('checked'));
				});
				children.change(function () {
					var all_checked = true,
						all_unchecked = true,
						i = 0;
					for (i = 0; i < children_l; i++) {
						if ($(children[i]).prop('checked')) {
							all_unchecked = false;
						} else {
							all_checked = false;
						}
					}
					if (all_checked) {
						inp.prop('checked', true).removeClass(inp_options.uncheckedClass + ' ' + inp_options.halfCheckedClass).addClass(inp_options.checkedClass);
					} else {
						inp.prop('checked', false).removeClass(inp_options.checkedClass);
						if (all_unchecked) {
							inp.removeClass(inp_options.halfCheckedClass).addClass(inp_options.uncheckedClass);
						} else {
							inp.removeClass(inp_options.uncheckedClass).addClass(inp_options.halfCheckedClass);
						}
					}
				});
			}
		});
	};
})(jQuery);