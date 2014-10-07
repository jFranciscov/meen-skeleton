var db = require('../models')

exports.select = function(req, res){
	console.log('=> GET | Obtener peliculas'.bold.get);

	var query;
	if(req.query.q1 != null){
		query = req.query.q1[0] + ' ' + (req.query.q2[0] == '=/=' ? 'LIKE  "%' + req.query.q3[0] + '%"': req.query.q2[0] + ' ' + req.query.q3[0]);
		if(req.query.q1.length > 1)
			for (i=1; i< req.query.q1.length; i++)
				query = query + ' AND ' + req.query.q1[i] + ' ' + (req.query.q2[i] == '=/=' ? 'LIKE  "%' + req.query.q3[i] + '%"': req.query.q2[i] + ' ' + req.query.q3[i]);
	}

		db.Pelicula
			.findAndCountAll({
				limit: req.query.limit,
				offset: req.query.offset,
				where : query
			})
			.success(function(resp){
				//console.log(JSON.stringify(resp.rows, null, 4).bold.get);
		   		res.json({peliculas : resp.rows, meta : { total : resp.count}});
			})
			.error(function(error){
				res.json({});
			});
}

exports.selectOne = function(req, res){
	console.log('=> GET | Obtener pelicula'.bold.get);
	db.Pelicula
		.find(req.params.id)
		.success(function(resp){
			console.log(JSON.stringify(resp, null, 4).bold.get)
	   		res.json({peliculas : resp})
		})
}

exports.insert = function(req, res){
	/*
	var pelicula;
	for (i=0; i<200; i++){
		pelicula = db.Pelicula.build({nombre: i, pais: i, autor : i, director : i});
		pelicula.save();
	}*/
	var pelicula = db.Pelicula.build({nombre: req.body.pelicula.nombre, pais: req.body.pelicula.pais, autor : req.body.pelicula.autor, director : req.body.pelicula.director});
	console.log('=> POST | Ingresar pelicula'.bold.post);
	pelicula
		.save()
		.success(function(resp){
			console.log(JSON.stringify(resp, null, 4).bold.post);
			res.send({peliculas : resp});
		});
}

exports.delete = function(req, res){
	console.log('=> DELETE | Eliminar pelicula'.bold.del);
	db.Pelicula
		.destroy(
			{id : req.params.id}
		).success(function(resp){
	  	console.log(('=> DELETE | Pelicula ' + req.params.id + ' eliminada correctamente').bold.del);
		});
}

exports.update = function(req, res){
	console.log('=> PUT | Actualizar pelicula'.bold.put);
	db.Pelicula
		.update(
			{
				nombre : req.body.pelicula.nombre,
				pais : req.body.pelicula.pais,
				autor : req.body.pelicula.autor,
				director : req.body.pelicula.director
			},
			{
				id : req.params.id
			}
		)
		.success(function(resp){
			console.log('Actualizado!'.bold.put);
			res.send('ok');
		})
}
