import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { before } from 'mocha';

import { app } from '../app';
import Teams from '../database/models/Teams';
import teamsService from '../services/teams.service';
import { allTeams } from './helpers/allTeams';

chai.use(chaiHttp);

const { expect } = chai;

const teams = allTeams;

describe('Testes da Model de Teams', () => {
  const Team = new Teams({ id: 1, teamName: 'Cruzeiro'});
  it('Model Teams deve ter uma propriedade id', () => {
    expect(Team.id).to.be.equal(1);
  });

  it('Model Teams deve ter uma propriedade username', () => {
    expect(Team.teamName).to.be.equal('Cruzeiro');
  });
});

describe('Testes da rota de teams', () => {
  before(() => {
    sinon.stub(Teams, 'findAll')
      .resolves( allTeams as unknown as Teams[]);
  });

  after(() => {
    (
      Teams.findAll as sinon.SinonStub
    ).restore()
  })


  it('Todos os times são retornados com sucesso', async () => {
    const newLogin = await chai.request(app).get('/teams');
    expect(newLogin.status).to.be.equal(200);
    expect(newLogin.body).to.deep.equal(allTeams);
  });

  it('Busca por ID retornada com sucesso', async () => {
    const newLogin = await chai.request(app).get('/teams/1');
    expect(newLogin.status).to.be.equal(200);
    expect(newLogin.body).to.deep.equal(allTeams[0]);
  });
});

describe('Testes do service de login', () => {
  before(() => {
    sinon.stub(Teams, 'findAll')
      .resolves(allTeams as unknown as Teams[]);
  });

  after(() => {
    (
      Teams.findAll as sinon.SinonStub
    ).restore()
  })

  it('A função "getTeams" retorna todos times com sucesso', async () => {
    const getTeams = await teamsService.getTeams();
    expect(getTeams).to.deep.equal(allTeams);
  });

  it('A função "getTeamsById" retorna o time com sucesso', async () => {
    const getTeam = await teamsService.getTeamsById(1);
    expect(getTeam[0]).to.deep.equal(allTeams[0]);
  });
});