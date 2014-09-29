App = Ember.Application.create({
	LOG_TRANSITIONS: true
});

App.Store = DS.Store.extend();

App.ApplicationAdapter = DS.RESTAdapter.extend({
	namespace : 'api'
});

/*var socket = io.connect('http://localhost:3000')
	socket.on('api/peliculas', function (data) {
	console.log(data);
});*/