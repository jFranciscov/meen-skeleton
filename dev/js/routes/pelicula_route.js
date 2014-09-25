App.PeliculasRoute = Ember.Route.extend({

	model: function(){
		var controller = this.controllerFor('pelicula');
	  return this.get('store').findQuery('pelicula',{limit : 40, offset: 0 });
	},   

  setupController: function (controller, model) {
  	controller.set('model', model);
    controller.set('contentLoaded', true);
    controller.set('itemsPerPage', 40);
  }  
});

App.PeliculaRoute = Ember.Route.extend({
	model: function(params){
		console.log('aqui');
	  return this.store.update('pelicula', params.id);
	}
});