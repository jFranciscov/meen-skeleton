var get = Ember.get, set = Ember.set;

Ember.PaginationMixin = Ember.Mixin.create({

  pages: function() {

    var availablePages = this.get('availablePages'),
    pages = [],
    page;

    for (i = 0; i < availablePages; i++) {
      page = i + 1;
      if(page == this.get('currentPage'))
        pages.push({ page_id: page.toString(), current_page: this.get('currentPage') });
      else
        pages.push({ page_id: page.toString()});
    }

    return pages;

  }.property('availablePages'),

  currentPage: function() {

    return parseInt(this.get('selectedPage'), 10) || 1;

  }.property('selectedPage'),

  nextPage: function() {

    var nextPage = parseInt(this.get('currentPage')) + 1;
    var availablePages = this.get('availablePages');

    if (nextPage <= availablePages)
        return nextPage;
    else
        return null;

  }.property('currentPage', 'availablePages'),

  prevPage: function() {

    var prevPage = this.get('currentPage') - 1;

    if (prevPage > 0) {
        return prevPage;
    }else{
        return null;
    }

  }.property('currentPage'),

  total : function(){
    return this.store.metadataFor(this.get('model').type).total;
  }.property('content.length'),

  availablePages: function() {
    return Math.ceil((this.store.metadataFor(this.get('model').type).total / this.get('itemsPerPage')) || 1);

  }.property('content.length'),

  paginatedContent: function() {

    var selectedPage = this.get('selectedPage') || 1;
    var upperBound = (selectedPage * this.get('itemsPerPage'));
    var lowerBound = (selectedPage * this.get('itemsPerPage')) - this.get('itemsPerPage');
    var models = this.get('content');

    return models.slice(lowerBound, upperBound);

  }.property('selectedPage', 'content.@each')

});

App.PeliculasController = Ember.ArrayController.extend(Ember.PaginationMixin, { 

  queryParams: ['page','nombre','pais'],

  page: 1,

  itemsPerPage: 40,

  offset: function(){

      offset = (this.get('currentPage') - 1) * this.get('itemsPerPage') + 1;
      if(offset == 1) offset = 0;
      return offset;

  }.property('itemsPerPage','currentPage'),

  selected: 'nombre',

  columnas: ['nombre','pais','autor','director'],

  refresh: function () {
    if(this.get('page') == 0) this.set('page',1);
    if (!this.get('isLoaded')) return;
    this.set('isLoaded',false);
    this.set('currentPage',this.get('page'));

    colBusqueda = this.get('selected');
    valBusqueda = this.get('buscar');
    query = {};
    query[colBusqueda] = valBusqueda;

    self = this;

    this.store.find('pelicula',{limit : this.get('itemsPerPage'), offset: this.get('offset'), p : query}).then(function (records) {
      self.set('isLoaded', true);
      self.set('model', records);
      self.transitionTo({queryParams : {'page' : self.get('page'), 'nombre' : self.get('nombre')}});
    });
  }.observes('page'),

  actions: {
    selectPage: function(number){
    this.set('page',number);
    }
  }
});

App.PeliculaController = Ember.ObjectController.extend({
	actions: {
		guardar: function(){
			this.get('model').save();
			this.transitionToRoute('peliculas');
		},
		eliminar: function(){
			this.get('model').destroyRecord();
			this.transitionToRoute('peliculas');
		},
    volver: function(){
      this.transitionToRoute('peliculas');
    }
	}
});

App.AgregarPeliculaController = Ember.ObjectController.extend({
	content: {},
	actions: {
		guardar: function(){
			var pelicula = this.store.createRecord('pelicula',{
				nombre : this.get('nombre'),
				pais : this.get('pais'),
				autor : this.get('autor'),
				director : this.get('director')
			});
			pelicula
        .save()
          .then(function(){
            console.log('El registro fue guardado!');
          }).catch(function(e){
            console.log('Ha ocurrido un error');
          });

			this.transitionToRoute('peliculas');
		},
		cancelar: function(){
			this.transitionToRoute('peliculas');
		}
	}
});