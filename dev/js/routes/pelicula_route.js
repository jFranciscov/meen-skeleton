App.PeliculasRoute = Ember.Route.extend({
	model: function(){
	    return this.store.find('pelicula');
	}
});

App.PeliculaRoute = Ember.Route.extend({
	model: function(params){
	    return this.store.find('pelicula',params.id);
	}
});