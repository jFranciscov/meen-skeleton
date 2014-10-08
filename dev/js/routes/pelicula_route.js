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
		},
		sortType: {
			refreshModel: true
		},
		sortBy: {
			refreshModel: true
		}
	},

	model: function(params){
		var controller = this.controllerFor('peliculas');
		controller.set('currentPage', params.page ? params.page : 1);
	  return this.store.find('pelicula',{ limit : controller.get('itemsPerPage'), offset: controller.get('offset'), sortBy: params.sortBy, sortType: params.sortType, q1 : params.q1, q2 : params.q2, q3 : params.q3});
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