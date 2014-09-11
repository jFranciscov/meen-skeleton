Meen Skeleton (Mysql - Ember - Express - Node).
=============

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
2.- Configurar conexión a la BD
2.1.- Abrir archivo /models/index.js
2.2.- Cambiar parámetros de la conexión
```
  , sequelize = new Sequelize('database', 'user', 'pass', {
```  

Uso
=============
```
nodejs app.js
```
