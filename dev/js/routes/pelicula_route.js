App.PeliculasRoute = Ember.Route.extend({
	model: function(params){
		var controller = this.controllerFor('peliculas');
		controller.set('currentPage', params.page ? params.page : 1);
	  return this.store.find('pelicula',{ limit : controller.get('itemsPerPage'), offset: controller.get('offset') });
	},
	setupController: function(controller, model){
		controller.set('model',model);
		controller.set('isLoaded', true);
	}
});

App.PeliculaRoute = Ember.Route.extend({
	model: function(params){
	  return this.store.find('pelicula', params.id);
	},
	setupController: function(controller, model){
      controller.set('model',model);
      controller.get('model').reload();
	}	
});