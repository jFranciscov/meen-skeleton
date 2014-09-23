App.PeliculaController = Ember.ObjectController.extend({
	actions: {
		guardar: function(){
			this.get('model').save();
			this.set('editando', false);
			this.transitionToRoute('peliculas');
		},
		eliminar: function(){
			var pelicula = this.get('model');
			pelicula.destroyRecord();
			this.transitionToRoute('peliculas');
		}
	}
});

App.AgregarPeliculaController = Ember.ObjectController.extend({
	actions: {
		guardar: function(){
			var nombre = this.get('nombre'),
				pais = this.get('pais'),
				autor = this.get('autor'),
				director = this.get('director'),
				pelicula = this.store.createRecord('pelicula',{
				nombre : nombre,
				pais : autor,
				autor : director,
				director : pelicula,
			});
			pelicula.save().then();

			this.transitionToRoute('peliculas');
		},
		cancelar: function(){
			this.transitionToRoute('peliculas');
		}
	}
});