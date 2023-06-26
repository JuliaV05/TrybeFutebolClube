import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import Matches from '../database/models/matches';
import { leaderAllMock } from './mocks/leaderboardMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa fluxo 4', () => {
  it('testa se a rota /home retorna todos os times de casa ', async () => {

    const registrosMockadosCertinho = Matches.bulkBuild(leaderAllMock)

    sinon.stub(Matches, 'findAll')
      .resolves(registrosMockadosCertinho);

      const response = await chai.request(app).get('/leaderboard/home');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.equal(registrosMockadosCertinho);
    });
});
