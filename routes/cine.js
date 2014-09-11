var db = require('../models')

exports.select = function(req, res) {
  console.log('=> GET | Obtener cines'.bold.get);
  db.Cine
    .findAll()
    .success(function(resp){
      console.log(JSON.stringify(resp, null, 4).bold.get);
      res.json({cines : resp});
    });
}

exports.insert = function(req, res) {
  var cine = db.Cine.build({nombre: req.body.cine.nombre, ciudad: req.body.cine.ciudad});
  console.log('=> POST | Ingresar cine'.bold.post);
  cine
    .save()
    .success(function(resp){
      console.log(JSON.stringify(resp, null, 4).bold.post);
      res.send({cines : resp});
    });  
}

exports.delete = function(req, res) {
  console.log('=> DELETE | Eliminar cine'.bold.del);
  db.Cine
    .destroy(
      {id : req.params.id}
    ).success(function(resp){
      console.log(('=> DELETE | Cine ' + req.params.id + ' eliminado correctamente').bold.del);
    });
}

exports.update = function(req, res) {
  console.log('=> PUT | Actualizar cine'.bold.put);
  db.Cine
    .update(
      {
        nombre : req.body.cine.nombre,
        ciudad : req.body.cine.ciudad
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