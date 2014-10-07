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

  queryParams:  ['page','q1','q2','q3'], // Parametros de la URL
  q1: 					[], // Campo de la consulta
  q2: 					[], // Operacion de la consulta
  q3: 					[], // Valor a buscar en la consulta
  page:         1,
  itemsPerPage: 40,

  esRecursiva: 	false,

  selected: 'nombre',
  signoSelected: '=/=',

  signos: ['=/=', '<', '>', '<=', '>=', '!='],
  columnas: ['nombre','pais','autor','director'],

  offset: function(){

      offset = (this.get('currentPage') - 1) * this.get('itemsPerPage');
      if(offset == 1) offset = 0;
      return offset;
  }.property('itemsPerPage','currentPage'),

  cambiaRecursiva: function(){
  	if(this.get('esRecursiva'))
  		this.set('esRecursiva', true);
  	else
  		this.set('esRecursiva', false);
  	console.log(this.get('esRecursiva'));
  }.observes('esRecursiva'),

  actions: {

    // Se cambia la pagina con alguno de los botones
    selectPage: function(number){
      this.set('page',number);
    },

    // Se envia el formulario de busqueda
    search: function(){
    	if(!this.get('esRecursiva')){
    		this.set('q1',[]);
    		this.set('q2',[]);
    		this.set('q3',[]);
    	}
    	this.set('page', 1);
    	this.q1.pushObject(this.get('selected'));
    	this.q2.pushObject(this.get('signoSelected'));
    	this.q3.pushObject(this.get('buscar'));
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