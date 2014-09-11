App.CineController = Ember.ObjectController.extend({
	actions: {
		guardar: function(){
			this.get('model').save();
			this.set('editando', false);
			this.transitionToRoute('cines');
		},
		eliminar: function(){
			var cine = this.get('model');
			cine.destroyRecord();
			this.transitionToRoute('cines');
		}
	}
});

App.AgregarCineController = Ember.ObjectController.extend({
	actions: {
		guardar: function(){
			var cine = this.store.createRecord('cine',{
				nombre : this.get('nombre'),
				ciudad : this.get('ciudad')
			});
			cine.save().then();

			this.transitionToRoute('cines');
		},
		cancelar: function(){
			this.transitionToRoute('cines');
		}
	}
});