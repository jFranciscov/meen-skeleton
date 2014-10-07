App.PeliculasRoute = Ember.Route.extend({

	queryParams:{
		page: {
			refreshModel: true
		},
		q1: {
			refreshModel: true
		},
		q2: {
			refreshModel: true
		},
		q3: {
			refreshModel: true
		}
	},

	model: function(params){
		var controller = this.controllerFor('peliculas');
		controller.set('currentPage', params.page ? params.page : 1);
	  return this.store.find('pelicula',{ limit : controller.get('itemsPerPage'), offset: controller.get('offset'), q1 : params.q1, q2 : params.q2, q3 : params.q3});
	},
	setupController: function(controller, model, params){
		controller.set('model',model);
		// Asignar a selected, signoSelect, y buscar el ultimo elemento del array de query, que seria el ultimo buscado
		//controller.set('selected', params.queryParams.nombre ? 'nombre' : (params.queryParams.pais ? 'pais' : (params.queryParams.autor ? 'autor' : (params.queryParams.director ? 'director' : 'nombre'))));
		//controller.set('buscar', params.queryParams.nombre ? params.queryParams.nombre : (params.queryParams.pais ? params.queryParams.pais : (params.queryParams.autor ? params.queryParams.autor : (params.queryParams.director ? params.queryParams.director : ''))))
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