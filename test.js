

var Bar = function(){}
Bar.prototype	= {
	barta	: function(){
		console.log("barta");
	}
};

var Foo	= function(){}
Foo.prototype	= {
	foota	: function(){
		console.log("blabla");
	}
};

require('util').inherits(Foo, Bar)

var foo	= new Foo()
foo.barta();
foo.foota();
