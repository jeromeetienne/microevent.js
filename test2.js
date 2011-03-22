function Bar(){}
Bar.prototype.barta = function(){
  console.log('barta');
}

function Foo(){}
Foo.prototype.__proto__ = Bar.prototype;
Foo.prototype.foota = function(){
  console.log('foota');
}

//require('util').inherits(Foo, Bar)

var foo = new Foo()
foo.barta();
foo.foota();
