module.exports = function(sequelize, DataTypes) {
  var Cine = sequelize.define('Cine', {
    nombre: DataTypes.STRING,
    ciudad: DataTypes.STRING
  }, {
  	timestamps: false,
  	classMethods: {
    	associate: function(models) {
      		Cine.belongsTo(models.Pelicula)
  		}
    }
  })

  return Cine
}
