App.PeliculasRoute = Ember.Route.extend({
	model: function(){
		var controller = this.controllerFor('pelicula');
	  return this.store.find('pelicula',{ limit : 40, offset: 0 });
	},   

  setupController: function (controller, model) {
  	controller.set('model', model);
    controller.set('itemsPerPage', 40);
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