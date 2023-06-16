import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import Teams from '../database/models/teams';
import teamsMock from './mocks/teamsMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do fluxo 1', () => {
   it('testa se o endpoint get retorna todos os times', async () => {
     
    sinon.stub(Teams, 'findAll')
      .resolves(teamsMock as unknown as Teams[])

      const response = await chai.request(app).get('/teams');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.equal(teamsMock)
   })
});
