import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import Teams from '../database/models/teams';
import { teamById, teamsMock } from './mocks/teamsMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do fluxo 1', () => {
   it('testa se o endpoint get retorna todos os times', async () => {
     
   const registrosMockadosCertinho = Teams.bulkBuild(teamsMock)
   
   sinon.stub(Teams, 'findAll')
      .resolves(registrosMockadosCertinho);

      const response = await chai.request(app).get('/teams');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(teamsMock)
   });
 
   it('testa se o endpoint get busca o time pelo id', async () => {
 
const registrosMockadosCertinho = Teams.build(teamById);

      sinon.stub(Teams, 'findByPk')
         .resolves(teamById as unknown as Teams);

      const response = await chai.request(app).get('/teams/2');
      
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(teamById);
   });
});
