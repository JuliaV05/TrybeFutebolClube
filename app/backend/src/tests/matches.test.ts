import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

// import Matches from '../database/models/matches';
import { matchesMock, inProgressTrue, inProgressFalse, matchesPatch } from './mocks/matchesMock';
import Matches from '../database/models/matches';



chai.use(chaiHttp);
const { expect } = chai;

describe('Testes do fluxo 3', () => {
afterEach(() => {
sinon.restore();
});

it('testa se o endpoint get retorna todas as partidas', async () => {
sinon.stub(Matches, 'findAll').resolves(matchesMock as unknown as Matches[]);

const response = await chai.request(app).get('/matches');

expect(response.status).to.be.equal(200);
expect(response.body).to.be.deep.equal(matchesMock);
});

it('testa se a rota /matches?inProgress=true retorna todas as partidas em andamento', async () => {
sinon.stub(Matches, 'findAll').resolves(inProgressTrue as unknown as Matches[]);

const response = await chai.request(app).get('/matches?inProgress=true');

expect(response.status).to.be.equal(200); 
expect(response.body).to.be.deep.equal(inProgressTrue);
});

it('se a rota /matches retorna finished matches', async () => {
    chai.request(app).get('/matches:inProgress=false').send().then((httpResponse) => {
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.deep.equal(inProgressFalse)
    });
  });

it('testa se a rota /matches/:id atualiza partidas em andamento', async () => {

const registrosMockadosCertinho = Matches.build(matchesPatch);

  sinon.stub(Matches, 'findAll')
  .resolves(registrosMockadosCertinho as unknown as Matches[]);

const response = await chai.request(app).patch('/matches/3');

expect(response.status).to.be.equal(200); 
expect(response.body).to.be.deep.equal(registrosMockadosCertinho);
});
});