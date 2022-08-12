import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { before } from 'mocha';

import { app } from '../app';
import Matches from '../database/models/Matches';
import matchesService from '../services/matches.service';
import { allMatches } from './helpers/allMatches';


chai.use(chaiHttp);

const { expect } = chai;

const match = {
  homeTeam: 16,
  homeTeamGoals: 1,
  awayTeam: 8,
  awayTeamGoals: 1,
  inProgress: false,
};

describe('Testes da Model de User', () => {
  const newMatch = new Matches(match);
  it('Model Matches deve ter uma propriedade "homeTeam"', () => {
    expect(newMatch.homeTeam).to.be.equal(16);
  });

  it('Model Matches deve ter uma propriedade "homeTeamGoals"', () => {
    expect(newMatch.homeTeamGoals).to.be.equal(1);
  });

  it('Model Matches deve ter uma propriedade "awayTeam"', () => {
    expect(newMatch.awayTeam).to.be.equal(8);
  });

  it('Model Matches deve ter uma propriedade "awayTeamGoals"', () => {
    expect(newMatch.awayTeamGoals).to.be.equal(1);
  });

  it('Model Matches deve ter uma propriedade "inProgress"', () => {
    expect(newMatch.inProgress).to.be.equal(false);
  });
});

describe('Testes da rota de matches', () => {
  before(() => {
    sinon.stub(Matches, 'findAll')
      .resolves(allMatches as unknown as Matches[]);
  });

  after(() => {
    (
      Matches.findAll as sinon.SinonStub
    ).restore()
  })


  it('Todos os times são retornados com sucesso', async () => {
    const matches = await chai.request(app).get('/matches');
    expect(matches.status).to.be.equal(200);
    expect(matches.body).to.deep.equal(allMatches);
  });
});

describe('Testes do service de matches', () => {
  before(() => {
    sinon.stub(Matches, 'findAll')
      .resolves(allMatches as unknown as Matches[]);
  });

  after(() => {
    (
      Matches.findAll as sinon.SinonStub
    ).restore()
  })

  it('A função "getMatches" retorna todos times com sucesso', async () => {
    const getMatches = await matchesService.getMatches();
    expect(getMatches).to.deep.equal(allMatches);
  });
});