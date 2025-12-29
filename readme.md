1.- instala las dependencias
```
npm i
```
2.- coloca en las variables de entorno la url de la bd
```
DATABASE_URL="mysql://root:root@localhost:3306/made"
JWT_SECRET = "example_secret_key"

```
3.- Crea la base de datos 
```
create database made;
```

el archivo se encargara de crear automaticamente las tablas.
