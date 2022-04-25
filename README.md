# Delailah Resto API

## Descripcion:
API de gestion de pedidos de un restaurante, realizado para el segundo cuarto sprint proyect de Acamica. Con persistencia en una base de datos MongoDB

## Teconologias utilizadas:
- NodeJs
- fs
- Express
- Swagger
- Dotenv
- Redis
- Mongoose
- Chai y Mocha
- Helmet
- JWT
- Passport.js
- Mercadopago API

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

http://localhost:3000/api/v2/api-docs/

## Direccion

http://localhost:3000/api/v2

## Dockerfile

```bash
docker build -t delilachinicola-img .
```

## Docker-compose

```bash
docker-compose up -d
```

## Direcciones para ingresar con Oauth2.0

- Google: http://localhost:3000/api/v2/auth/google
- Github: http://localhost:3000/api/v2/auth/github
- Linkedin: http://localhost:3000/api/v2/auth/linkedin
