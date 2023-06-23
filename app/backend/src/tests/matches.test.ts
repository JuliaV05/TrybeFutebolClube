import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

import MatchesModel from '../database/models/matches';


chai.use(chaiHttp);
const { expect } = chai;

const matchesMock = [
{
"id": 1,
"homeTeamId": 16,
"homeTeamGoals": 1,
"awayTeamId": 8,
"awayTeamGoals": 1,
"inProgress": false,
"homeTeam": {
"teamName": "São Paulo"
},
"awayTeam": {
"teamName": "Grêmio"
}
},
{
"id": 2,
"homeTeamId": 16,
"homeTeamGoals": 2,
"awayTeamId": 9,
"awayTeamGoals": 0,
"inProgress": true,
"homeTeam": {
"teamName": "São Paulo"
},
"awayTeam": {
"teamName": "Internacional"
}
},
{
"message": "Finished"
},
];

describe('Test the Match flux', () => {
afterEach(() => {
sinon.restore();
});

it('Test if /matches route returns all matches', async () => {
sinon.stub(MatchesModel, 'findAll').resolves(matchesMock as unknown as MatchesModel[]);

const response = await chai.request(app).get('/matches');

expect(response.status).to.be.equal(200);
expect(response.body).to.be.deep.equal(matchesMock);
});

it('Test if /matches?inProgress=true route returns all matches in progress', async () => {
sinon.stub(MatchesModel, 'findAll').resolves(matchesMock as unknown as MatchesModel[]);

const response = await chai.request(app).get('/matches?inProgress=true');

expect(response.status).to.be.equal(200);
expect(response.body).to.be.equal(matchesMock);
});
});