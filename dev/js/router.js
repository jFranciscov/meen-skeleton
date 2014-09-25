App.Router.map(function(){
	this.resource('peliculas');
	this.resource('pelicula', { path : 'peliculas/:id'});
	this.resource('agregar_pelicula',{ path : 'agregar'});
	this.resource('cines', function(){
		this.resource('cine', { path : ':id'});
		this.resource('agregar_cine',{ path : 'agregar'});
	});
	this.resource('login', { path: 'login'});
});