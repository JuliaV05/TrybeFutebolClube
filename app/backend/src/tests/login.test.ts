import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Users from '../database/models/users'
// import login from '../mocks/usersMock'

chai.use(chaiHttp);

const { expect } = chai;

describe.only('Testes do fluxo 2...', () => {
  afterEach(sinon.restore)
  
    // it('testa endpoint post Users', async () => {

    //  const response = (await chai.request(app).post('/login').send({ email: "", password: ""}));
    //  console.log(response.body);
    //  expect(response.status).to.be.equal(400);
    //  expect(response.body).to.be.equal(login);
    // })
    it('Teste a postLogin caso tenha "All fields must be filled"', async () => {
      const chaiHttpResponse = await chai.request(app).post('/login').send({email: "", password: ""});
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({message: "All fields must be filled"});
    });

    it('Rota /login não permite acesso sem os campos email e password preenchidos', async () => {
      const chaiHttpResponse = await chai.request(app).post('/login').send({
          email: "admin@admiiiin.com",
          password: "12678"
      });
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: "Invalid email or password" });
    });
})