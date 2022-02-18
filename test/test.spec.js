//const app = require('../src/index')
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const { getMaxListeners } = require('../src/models/User');

chai.use(chaiHttp);
const url = `http://localhost:3000`;


describe('Pruebas unitarias sobre usuarios', () => {
  it('Registro de un usuario que ya existe', (done) => {
    chai.request(url)
      .post('/api/v2/users/register')
      .set('content-type', 'application/json')
      .send({
        "username": "fchinicola",
        "password": "fchinicola",
        "nombre": "franco",
        "apellido": "chinicola",
        "direccion": "ushuaia",
        "telefono": "2901-xxxx",
        "email": "xxx@xxx.com",
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });

  it('Login de usuario administrador', (done) => {
    chai.request(url)
      .post('/api/v2/users/login')
      .set('content-type', 'application/json')
      .send({
        "username": "admin",
        "password": "admin",
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(202);
        expect(res.body).to.have.property('token');
        done();
      });
  });
});
