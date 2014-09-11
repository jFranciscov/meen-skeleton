var attr = DS.attr;

App.Pelicula = DS.Model.extend({
	nombre: attr('string'),
	pais: attr('string'),
	autor: attr('string'),
	director: attr('string')
});