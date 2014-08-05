/**
 * MicroEvent - to make any js object an event emitter (server or browser)
 * ------------------------------------------------------
 * Edited by Jeroen Ransijn in august 2014
 * - obj.bind is now obj.on
 * - obj.unbind is now obj.off
 * - Added chainability `obj.on('a', fn).on('b', fn)`
 * - Added on all events function `on('*', function (eventName) { })` and `trigger('*')`
 * - Some code reformatted
 * ------------------------------------------------------
 * - pure javascript - server compatible, browser compatible
 * - dont rely on the browser doms
 * - super simple - you get it immediatly, no mistery, no magic involved
*/
var MicroEvent = function () {};
MicroEvent.prototype = {
	on: function (event, fct) {
		this._events = this._events || {};
		this._events[event] = this._events[event] || [];
		this._events[event].push(fct);
		return this;
	},
	off: function (event, fct) {
		this._events = this._events || {};
		if ( ! (event in this._events) ) return this;
		this._events[event].splice(this._events[event].indexOf(fct), 1);
		return this;
	},
	trigger: function (event) {
		this._events = this._events || {};
		var argsAll = Array.prototype.slice.call(arguments, 0), args = argsAll.slice(1);
		argsAll.unshift('*');
		if (event !== '*') this.trigger.apply(this, argsAll);
		if ( ! (event in this._events) ) return this;
		var eventsLength = this._events[event].length;
		for (var i = 0; i < eventsLength; i++) {
			this._events[event][i].apply(this, args);
		}
		return this;
	}
};

/**
 * mixin will delegate all MicroEvent.js function in the destination object
 *
 * - require('MicroEvent').mixin(Foobar) will make Foobar able to use MicroEvent
 *
 * @param {Object} the object which will support MicroEvent
*/
MicroEvent.mixin = function (destObject) {
	var props	= ['on', 'off', 'trigger'];
	for (var i = 0; i < 3 /* props.length */; i++) {
		if ( typeof destObject === 'function' ) {
			destObject.prototype[props[i]]	= MicroEvent.prototype[props[i]];
		} else {
			destObject[props[i]] = MicroEvent.prototype[props[i]];
		}
	}
};

// export in common js
if( typeof module !== "undefined" && ('exports' in module)){
	module.exports	= MicroEvent;
}
