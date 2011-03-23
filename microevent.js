/**
 * MicroEvent - to make any js object an event emitter (server or browser)
 * 
 * - pure javascript - server compatible, browser compatible
 * - dont rely on the browser doms
 * - super simple - you get it immediatly, no mistery, no magic involved
 *
 * - create a MicroEventDebug with goodies to debug
 *   - make it safer to use
*/

var MicroEvent	= function(){}
MicroEvent.prototype	= {
	fcts	: {},
	bind	: function(event, fct){
		this.fcts = this.fcts || {};
		this.fcts[event] = this.fcts[event]	|| [];
		this.fcts[event].push(fct);
	},
	unbind	: function(event, fct){
		this.fcts = this.fcts || {};
		if( event in this.fcts === false  )	return;
		this.fcts[event].splice(this.fcts[event].indexOf(fct), 1);
	},
	trigger	: function(event /* , args... */){
		this.fcts = this.fcts || {};
		if( event in this.fcts === false  )	return;
		for(var i = 0; i < this.fcts[event].length; i++){
			this.fcts[event][i].apply(this, Array.prototype.slice.call(arguments, 1))
		}
	}
};

/**
 * mixin will delegate all MicroEvent.js function in the destination object
 *
 * - require('MicroEvent').mixin(Foobar) will make Foobar able to use MicroEvent
 *
 * @param {Object} the object which will support MicroEvent
*/
MicroEvent.mixin	= function(destObject){
	var props	= ['bind', 'unbind', 'trigger'];
	for(var i = 0; i < props.length; i ++){
		destObject.prototype[props[i]]	= MicroEvent.prototype[props[i]];
	}
}

// export in common js
if( typeof module !== "undefined" && ('exports' in module)){
	module.exports	= MicroEvent
}
