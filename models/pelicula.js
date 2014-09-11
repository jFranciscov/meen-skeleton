module.exports = function(sequelize, DataTypes) {
  var Pelicula = sequelize.define('Pelicula', {
    nombre: DataTypes.STRING,
    pais: DataTypes.STRING,
    autor: DataTypes.STRING,
    director: DataTypes.STRING
  }, {
  	timestamps: false,
    classMethods: {
      associate: function(models) {
        Pelicula.hasMany(models.Cine)
      }
    }
  })

  return Pelicula
}
