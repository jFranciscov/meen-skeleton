var attr = DS.attr;

App.Cine = DS.Model.extend({
	nombre: attr('string'),
	ciudad: attr('string')
});