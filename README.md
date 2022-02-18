# Delailah Resto API

## Descripcion:
API de gestion de pedidos de un restaurante, realizado para el segundo sprint proyect de Acamica. Con persistencia en una base de datos MongoDB

## Teconologias utilizadas:
- NodeJS
- fs
- Express
- Swagger
- Dotenv
- Redis
- Mongoose
- Chai y Mocha
- Helmet
- JWT

## Instalacion:

```bash
git clone
npm install
```

Se debe contar con Redis instalado y se utiliza MongoDB Atlas como Base de Datos.

Para las rutas que requieran como parametro {:iduser} al loguearse un usuario aparece en consola su id, asimismo se puede ingresar a JWT.io y pegar el token en el debbuger y se obtendra la misma informacion.

## Testing

### Se debe iniciar el servidor con:
```bash
npm run dev
```
### y en otra terminal: 
```bash
npm run test
```

## Uso a travez de Swagger

http://localhost:3000/api-docs/

## Direccion

http://localhost:3000/api/v2
