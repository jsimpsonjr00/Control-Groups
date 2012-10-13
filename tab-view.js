(function ( $ ) {
	if( $.JSUI.ControlGroup === undefined ) {
		$.JSUI = {};
	}
	
	$.JSUI.TabView = function ( element ) {
		var $this  = $(element),
			tabs  = $this.find(".control-group").controlGroup( "button", true, true ),
			panes = $this.find(".pane-group").controlGroup( ".pane", true, false );
		
		tabs.$element.on( "click.tabView", "button", { self: this }, this.click ); //capture button clicks
		panes.$element.on( "webkitTransitionEnd transitionend oTransitionEnd", ".pane", { self: this }, this.transitionEnd );
		this.tabGroup  = tabs.group;
	}
	$.JSUI.TabView.prototype = {
		constructor: $.JSUI.TabView,
		click: function ( e ) {
			var $button = $(e.target);
			$( $button.attr("data-pane") ).trigger("click", []);
			e.data.self.lock();
		},
		lock: function () {
			this.tabGroup.lock();
		},
		unlock: function () {
			this.tabGroup.unlock();
		},
		transitionEnd: function ( e ) {
			if( $(e.target).hasClass("pane") ) {
				e.data.self.unlock();
			}
		}
	};
	$.fn.tabView = function () {
		return this.each( function () { //return for chaining
			var view = new $.JSUI.TabView( this );
		});
	};
}(jQuery));