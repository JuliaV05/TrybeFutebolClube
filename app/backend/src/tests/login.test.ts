import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/users';
import * as bcrypt from 'bcryptjs';
import * as  jwt from 'jsonwebtoken';
import { login, user, token, invalidToken, role } from './mocks/loginMock';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do fluxo 2', () => {
  afterEach(sinon.restore)
  

    it('testa se a postLogin caso tenha "All fields must be filled"', async () => {
      const chaiHttpResponse = await chai.request(app).post('/login').send({email: "", password: ""});
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({message: "All fields must be filled"});
    });

    it('testa se a rota /login não permite acesso sem os campos email e password preenchidos', async () => {
      const chaiHttpResponse = await chai.request(app).post('/login').send({
          email: "admin@admiiiin.com",
          password: "12678"
      });
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: "Invalid email or password" });
    });

    it('testa se a rota /login não permite acesso sem o token', async () => {
      sinon.stub(Users, "findOne").resolves(user as Users);
      sinon.stub(bcrypt, 'compareSync').returns(true);
      sinon.mock(jwt).expects('sign').returns({token: ""});

      chai.request(app).post('/login').send(login).then((chaiHttpResponse) => {
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({message: 'Token not found'})});
    });

    it('testa se a rota /login não permite acesso sem um token valido', async () => {

          sinon.stub(Users, "findOne").resolves(user as Users);
          sinon.stub(bcrypt, 'compareSync').returns(true);
          sinon.mock(jwt).expects('verify').withArgs('token').returns(invalidToken);

          chai.request(app).post('/login').send(login).then((chaiHttpResponse) => {
          expect(chaiHttpResponse.status).to.be.equal(401);
          expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Token must be a valid token' })});
     });

     it('testa se a rota /login/validate retorna a data corretamente', async () => {
      sinon.stub(Users, "findOne").resolves(role as Users);
      sinon.stub(bcrypt, 'compareSync').returns(true);
      sinon.mock(jwt).expects('sign').returns(token);
      
      chai.request(app).post('/login/role').send(role).then((chaiHttpResponse) => {
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(role)});
    });


    it('testa se a rota /login/role não permite acesso sem o token', async () => {
      sinon.stub(Users, "findOne").resolves(role as Users);
      sinon.stub(bcrypt, 'compareSync').returns(true);
      sinon.mock(jwt).expects('sign').returns({token: ""});

      chai.request(app).post('/login/role').send(role).then((chaiHttpResponse) => {
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Token not found' })});
    });

    it('testa se a rota /login permite acesso com dados válidos', async () => {
      sinon.stub(Users, "findOne").resolves(user as Users);
      sinon.stub(bcrypt, 'compareSync').returns(true);
      sinon.mock(jwt).expects('sign').returns(token);

      chai.request(app).post('/login').send(login).then((chaiHttpResponse) => {
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal({token: token})});
    });
});
