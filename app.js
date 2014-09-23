var express 		= require('express')
	, bodyParser 	= require('body-parser')
	, db      		= require('./models')
	, pelicula 		= require('./routes/pelicula')
	, cine 				= require('./routes/cine')
	, colors 			= require('colors')
	, http    		= require('http')
	, path    		= require('path')

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('env', process.env.NODE_ENV || 'development');
app.use(bodyParser.json());
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, { message: 'Error del servidor'});
});

if(app.get('env') == 'development'){
	console.log('development');
	app.use(express.static(path.join(__dirname, 'dev')));
}

if(app.get('env') == 'test'){
	console.log('test');
	app.use(express.static(path.join(__dirname, 'test')));
}

if(app.get('env') == 'production'){
	console.log('production');
	app.use(express.static(path.join(__dirname, 'prod')));
}

colors.setTheme({
	error : 'red',
	post : 'yellow',
	get : 'green',
	put : 'blue',
	del : 'grey'
});

app.get('/api/peliculas',pelicula.select);
app.get('/api/peliculas/:id',pelicula.selectOne);
app.post('/api/peliculas',pelicula.insert);
app.delete('/api/peliculas/:id',pelicula.delete);
app.put('/api/peliculas/:id',pelicula.update);

app.get('/api/cines',cine.select);
app.post('/api/cines',cine.insert);
app.delete('/api/cines/:id',cine.delete);
app.put('/api/cines/:id',cine.update);

db
  .sequelize
  .sync()
  .complete(function(err) {
    if (err) {
      throw err
    } else {
      http.createServer(app).listen(app.get('port'), function(){
        console.log(('Servidor corriendo en ' + app.get('port')).bold)
      })
    }
  })