describe("MicroEvent", function() {
	var micro_event;
	var event_funcs;

	beforeEach(function() {
		micro_event = new MicroEvent(); 

		event_funcs = {
			foo: function() {},
			bar: function() {},
			baz: function() {}
		};
		spyOn(event_funcs, 'foo');
		spyOn(event_funcs, 'bar');
		spyOn(event_funcs, 'baz');

	});

	it("binds a single function to an event", function() {
		micro_event.bind('event_one', event_funcs.foo);
		micro_event.trigger('event_one');

		expect(event_funcs.foo).toHaveBeenCalled();
		expect(event_funcs.foo.calls.length).toEqual(1);
	});

	it("passes arguments to a bound function", function() {
		micro_event.bind('event_one', event_funcs.foo);
		micro_event.trigger('event_one', 1, 2);

		expect(event_funcs.foo).toHaveBeenCalledWith(1, 2);
	});

	it("binds several functions to one event", function() {
		micro_event.bind('event_one', event_funcs.foo);
		micro_event.bind('event_one', event_funcs.bar);
		micro_event.bind('event_one', event_funcs.baz);

		micro_event.trigger('event_one');

		expect(event_funcs.foo).toHaveBeenCalled();
		expect(event_funcs.foo.calls.length).toEqual(1);

		expect(event_funcs.bar).toHaveBeenCalled();
		expect(event_funcs.bar.calls.length).toEqual(1);

		expect(event_funcs.baz).toHaveBeenCalled();
		expect(event_funcs.baz.calls.length).toEqual(1);
	});

	it("passes arguments to all functions bound to the same event", function() {
		micro_event.bind('event_one', event_funcs.foo);
		micro_event.bind('event_one', event_funcs.bar);
		micro_event.bind('event_one', event_funcs.baz);

		micro_event.trigger('event_one', 1, 2);

		expect(event_funcs.foo).toHaveBeenCalledWith(1, 2);
		expect(event_funcs.bar).toHaveBeenCalledWith(1, 2);
		expect(event_funcs.baz).toHaveBeenCalledWith(1, 2);
	});

	it("binds functions to several different events", function() {
		micro_event.bind('event_one', event_funcs.foo);
		micro_event.bind('event_two', event_funcs.bar);
		micro_event.bind('event_three', event_funcs.baz);

		micro_event.trigger('event_one');
		micro_event.trigger('event_two');
		micro_event.trigger('event_three');

		expect(event_funcs.foo).toHaveBeenCalled();
		expect(event_funcs.foo.calls.length).toEqual(1);

		expect(event_funcs.bar).toHaveBeenCalled();
		expect(event_funcs.bar.calls.length).toEqual(1);

		expect(event_funcs.baz).toHaveBeenCalled();
		expect(event_funcs.baz.calls.length).toEqual(1);
	});

	it("unbinds a function from an event", function() {
		micro_event.bind('event_one', event_funcs.foo);
		micro_event.bind('event_one', event_funcs.bar);

		micro_event.unbind('event_one', event_funcs.foo);

		micro_event.trigger('event_one');

		expect(event_funcs.foo).not.toHaveBeenCalled();

		expect(event_funcs.bar).toHaveBeenCalled();
		expect(event_funcs.bar.calls.length).toEqual(1);
	});

	it("keeps working when triggering unknown event", function() {
		micro_event.bind('event_one', event_funcs.foo);
		micro_event.bind('event_two', event_funcs.bar);

		micro_event.trigger('unknown_event');

		expect(event_funcs.foo).not.toHaveBeenCalled();
		expect(event_funcs.bar).not.toHaveBeenCalled();
	});

	it("keeps working when unbinding unknown event", function() {
		micro_event.bind('event_one', event_funcs.foo);
		micro_event.unbind('unknown_event');

		micro_event.trigger('event_one');

		expect(event_funcs.foo).toHaveBeenCalled();
	});
});

