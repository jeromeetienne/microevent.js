var MicroEvent = require('../microevent.js')

function Foo () {}
MicroEvent.mixin(Foo)
f = new Foo

var legit_listener = function(){
    console.log("I'm legit");
}

var unbound_listener = function(){
    console.log("I'm not so legit");
}

f.bind("event", legit_listener)

f.unbind("event", unbound_listener)

console.log("You should see \"I'm legit\":")
console.log("")

f.trigger("event")