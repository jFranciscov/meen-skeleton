Meen Skeleton (Mysql - Ember - Express - Node).
=============

##Descripción

Aplicación de ejemplo con 2 módulos (películas y cines), tanto en el frontend(ember) como en el backend(express) se tiene el mismo modelo de objetos. Estos se comunican mediante una API REST.

##Tecnologías

- Mysql (DB)
- Ember (MVC frontend)
- Ember data (ORM frontend)
- Express (MVC backend)
- Sequelize (ORM backend)
- Node (Server)
- Gulp (Task runner)
- Foundation (UI framework)



##Requisitos


1.- Instalar node
```
sudo apt-get install nodejs
```
2.- Instalar npm
```
  sudo apt-get install npm
```  
3.- Instalar mysql
```
  sudo apt-get install mysql-server
```  
##Configuración


1.- Instalar dependencias
```
  sudo npm install
```  
2.- Configurar conexión a la BD, abrir archivo /models/index.js y cambiar parámetros de la conexión
```
  , sequelize = new Sequelize('database', 'user', 'pass', {
```  

Uso
=============
```
nodejs app.js
```
