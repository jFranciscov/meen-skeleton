App.CinesRoute = Ember.Route.extend({
	model: function(){
	    return this.store.find('cine');
	}
});

App.CineRoute = Ember.Route.extend({
	model: function(params){
	    return this.store.find('cine',params.id);
	}
});