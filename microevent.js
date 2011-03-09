var MicroEvent	= function(){}
MicroEvent.prototype	= {
	fcts	: {},
	bind	: function(event, fct){
		this.fcts[event]	= this.fcts[event]	|| [];
		this.fcts[event].push(fct);
		return this;
	},
	unbind	: function(event, fct){
		var arr	= this.fcts[event];
		if( typeof arr !== 'undefined' )	return this;
		arr.splice(arr.indexOf(fct), 1);
		return this;
	},
	trigger	: function(event /* , args... */){
		var arr	= this.fcts[event];
		if( typeof arr === 'undefined' )	return this;
		for(var i = 0; i < arr.length; i++){
			arr[i].apply(this, Array.prototype.slice.call(arguments, 1))
		}
		return this;
	}
};

// export in common js
if( typeof module !== "undefined"){
	module.exports	= MicroEvent
}
