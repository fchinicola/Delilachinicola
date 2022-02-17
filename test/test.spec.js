//const app = require('../src/index')
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const { deleteOne } = require('../src/models/Product');

chai.use(chaiHttp);
const url = `http://localhost:3000`;


describe('Pruebas unitarias de login de un usuario', () => {
  it('Login de usuario', () => {
    chai.request(url)
      .post('/api/v2/users/login')
      .set('content-type', 'application/json')
      .send({
        "username": "admin",
        "password": "admin",
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(202);
      });
  });
});
