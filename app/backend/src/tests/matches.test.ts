import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

import MatchesModel from '../database/models/matches';
import { matchesMock, inProgressTrue, inProgressFalse } from './mocks/matchesMock';
import Matches from '../database/models/matches';



chai.use(chaiHttp);
const { expect } = chai;

describe('Testes do fluxo 3', () => {
afterEach(() => {
sinon.restore();
});

it('testa se o endpoint get retorna todas as partidas', async () => {
sinon.stub(MatchesModel, 'findAll').resolves(matchesMock as unknown as MatchesModel[]);

const response = await chai.request(app).get('/matches');

expect(response.status).to.be.equal(200);
expect(response.body).to.be.deep.equal(matchesMock);
});

it('testa se a rota /matches?inProgress=true retorna todas as partidas em andamento', async () => {
sinon.stub(MatchesModel, 'findAll').resolves(inProgressTrue as unknown as MatchesModel[]);

const response = await chai.request(app).get('/matches?inProgress=true');

expect(response.status).to.be.equal(200);
expect(response.body).to.be.deep.equal(inProgressTrue);
});

it('A rota /matches retorna finished matches', async () => {
    chai.request(app).get('/matches:inProgress=false').send().then((httpResponse) => {
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.deep.equal(inProgressFalse)
    });
  });
});