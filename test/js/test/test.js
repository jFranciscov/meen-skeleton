test('Ingresar pelicula', function() {
  visit('/peliculas/agregar');
  fillIn('#nombre','Titanic');
  fillIn('#pais','-');
  fillIn('#autor','-');
  fillIn('#director','-');
  click('#btnGuardar');
  andThen(function() {
    equal(find('ul li:last').text().replace(/\s/g, ''), 'Titanic');
  });
});

test('Ingresar pelicula', function() {
  visit('/peliculas/agregar');
  fillIn('#nombre','Titanic');
  fillIn('#pais','-');
  fillIn('#autor','-');
  fillIn('#director','-');
  click('#btnGuardar');
  andThen(function() {
    equal(find('ul li:last').text().replace(/\s/g, ''), 'Titaic');
  });
});	