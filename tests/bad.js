var MicroEvent = require('../microevent-debug.js')
function Foo () {}
MicroEvent.mixin(Foo)
f = new Foo
b = new Foo
f.bind("blerg", function(val){ console.log("f got blerg", val) })

console.log("You should see 'f got blerg yes' and nothing more:");
console.log("")

f.trigger("blerg", "yes")
b.trigger("blerg", "no")

c = {}
MicroEvent.mixin(c)
fooFunc = function(bar){console.log(bar)};
c.bind('foo', fooFunc)


console.log("")
console.log("You should see 'bar' once only:");
console.log("")
c.trigger('foo','bar')
c.unbind('foo', fooFunc);
c.trigger('foo', 'bar');

