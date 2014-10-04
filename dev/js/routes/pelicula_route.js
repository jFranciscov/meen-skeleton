App.PeliculasRoute = Ember.Route.extend({

	queryParams:{
		page: {
			refreshModel: true
		},
		nombre: {
			refreshModel: true
		},
		pais: {
			refreshModel: true
		},
		autor: {
			refreshModel: true
		},
		director: {
			refreshModel: true
		}
	},

	model: function(params){
		var controller = this.controllerFor('peliculas');
		controller.set('currentPage', params.page ? params.page : 1);
	  return this.store.find('pelicula',{ limit : controller.get('itemsPerPage'), offset: controller.get('offset'), nombre: params.nombre, pais: params.pais, autor: params.autor, director: params.director});
	},
	setupController: function(controller, model, queryParams){
		controller.set('model',model);
		controller.set('selected', queryParams.queryParams.nombre ? 'nombre' : (queryParams.queryParams.pais ? 'pais' : (queryParams.queryParams.autor ? 'autor' : (queryParams.queryParams.director ? 'director' : 'nombre'))));
		controller.set('buscar', queryParams.queryParams.nombre ? queryParams.queryParams.nombre : (queryParams.queryParams.pais ? queryParams.queryParams.pais : (queryParams.queryParams.autor ? queryParams.queryParams.autor : (queryParams.queryParams.director ? queryParams.queryParams.director : ''))))
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