var MicroEvent = require('./microevent.js')
function Foo () {}
MicroEvent.mixin(Foo)
f = new Foo
b = new Foo
f.bind("blerg", function(val){ console.log("f got blerg", val) })
f.trigger("blerg", "yes")
b.trigger("blerg", "no")