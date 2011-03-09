var MicroEvent	= require('../microevent.js')

/* Periodically send out dummy events 
--------------------------------------------*/
var Metronome	= function( interval ){
	var self	= this;
	var nextTick	= function(){
		self.trigger('tick', Math.random()*100, "far");
		setTimeout(nextTick, interval);
	};	
	nextTick();
};

Metronome.prototype.foo	= function(){
	console.log("bar")
}


// how to inherit using underscore
// - require("underscore").extend(Metronome.prototype, new MicroEvent)

// how to inherit using nodejs
// - require('util').inherits(Metronome, MicroEvent);
// - FIXME this one doesnt work
// NOTE: node event emitter doesnt need new ? can i do the same ?
// - util.inherits(MyStream, events.EventEmitter);
//require('util').inherits(Metronome, MicroEvent);
require('util').inherits(Metronome.prototype, MicroEvent.prototype);

// how to inherit using jQuery
// - jQuery.extend(Metronome, new MicroEvent);

// how to inherit super simple
// Metronome.prototype = new MicroEvent;


var clock = new Metronome(500);

clock.bind('tick', function(number, str) {
	console.log('number emitted: '+ number, str);
	//this.foo();
}.bind(clock));



