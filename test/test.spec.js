const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = `http://localhost:${process.env.PORT}`;


describe('Pruebas unitarias de usuarios', () => {
  it('Registrar un usuario nuevo', () => {
    chai.request(url)
      .post('/users/register')
      .send({
        username: 'TestUser',
        password: 'TestPassword',
        email: 'testemail@example.com'
      })
      .then(function (res) {
        expect(res).to.have.status(201);
      })
      .catch(function (err) {
        throw err;
      });
  });
});
