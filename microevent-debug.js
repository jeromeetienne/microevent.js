/**
 * MicroEvent.js debug
 *
 * # it is the same as MicroEvent.js but it adds checks to help you debug
*/

var MicroEvent	= function(){}
MicroEvent.prototype	= {
	fcts	: {},	// TODO rename this to a more specific name to avoid collision while mixin()
	bind	: function(event, fct){
		this.fcts[event] = this.fcts[event]	|| [];
		this.fcts[event].push(fct);
	},
	unbind	: function(event, fct){
		console.assert(typeof fct === 'function');
		if( event in this.fcts === false  )	return;
		console.assert(this.fcts[event].indexOf(fct) !== -1);
		this.fcts[event].splice(this.fcts[event].indexOf(fct), 1);
	},
	trigger	: function(event /* , args... */){
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
	// set the data
	// - TODO make it more eleguant
	// - fcts can be shared
	destObject.prototype['fcts']	= {};
}

// export in common js
if( typeof module !== "undefined" && ('exports' in module)){
	module.exports	= MicroEvent
}
