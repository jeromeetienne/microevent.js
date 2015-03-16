define(function(){
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
    var MicroEvent	= function(){};
    MicroEvent.prototype	= {
        bind	: function(event, fct){
            this._events = this._events || {};
            this._events[event] = this._events[event]	|| [];
            this._events[event].push(fct);
        },
        unbind	: function(event, fct){
            this._events = this._events || {};
            if( event in this._events === false  )	return;
            this._events[event].splice(this._events[event].indexOf(fct), 1);
        },
        trigger	: function(event /* , args... */){
            this._events = this._events || {};
            if( event in this._events === false  )	return;
            for(var i = 0; i < this._events[event].length; i++){
                this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
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
            if( typeof destObject === 'function' ){
                destObject.prototype[props[i]]	= MicroEvent.prototype[props[i]];
            }else{
                destObject[props[i]] = MicroEvent.prototype[props[i]];
            }
        }
    }

    return MicroEvent;
});
