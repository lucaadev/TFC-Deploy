import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { before } from 'mocha';

import { Response } from 'superagent';
import { app } from '../app';
import Teams from '../database/models/Teams';
import { allMatches } from './helpers/allMatches';
import { allTeams } from './helpers/allTeams';
import Matches from '../database/models/Matches';
import homeResult from './helpers/homeResult';
import awayResult from './helpers/awayResult';
import allResult from './helpers/allResult';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota de leaderBoard', () => {
  let chaiHttpResponse: Response;

  before(() => {
    sinon.stub(Matches, 'findAll')
      .resolves(allMatches as unknown as Matches[]);
    sinon.stub(Teams, 'findAll')
      .resolves(allTeams as unknown as Teams[]);
  });

  after(() => {
    (Matches.findAll as sinon.SinonStub).restore();
    (Teams.findAll as sinon.SinonStub).restore();
  })

  it('A função "getLeaderBoards" retorna a tabela de classificação ordenada no tipo "all"', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard/');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(allResult);
  });

  it('A função "getLeaderBoards" retorna a tabela de classificação ordenada para o tipo home', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard/home');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(homeResult);
  });

  it('A função "getLeaderBoards" retorna a tabela de classificação ordenada para o tipo away', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard/away');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(awayResult);
  });
});