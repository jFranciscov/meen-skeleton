App.Router.map(function(){
	this.resource('peliculas', function(){
		this.resource('pelicula', { path : ':id'});
		this.resource('agregar_pelicula',{ path : 'agregar'});
	});
	this.resource('cines', function(){
		this.resource('cine', { path : ':id'});
		this.resource('agregar_cine',{ path : 'agregar'});
	});
});