App = Ember.Application.create({
	LOG_TRANSITIONS: true
});

App.Store = DS.Store.extend();

App.ApplicationAdapter = DS.RESTAdapter.extend({
	namespace : 'api'
});

 /*var socket = io.connect('http://localhost:8080')
socket.on('my_live_stream', function (data) {
	that.store.push('Pelicula', data.pelicula);
});*/