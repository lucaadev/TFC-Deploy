import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { before } from 'mocha';

import { app } from '../app';
import Users from '../database/models/Users';
import login from '../services/login.service';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da Model de User', () => {
  it('Model Users deve ter uma propriedade id', () => {
		const newUser = new Users();

		newUser.id = 1;

		expect(newUser.id).to.be.equal(1);
	});

  it('Model Users deve ter uma propriedade username', () => {
		const newUser = new Users();

    newUser.username = 'admin';

		expect(newUser.username).to.be.equal('admin');
	});

  it('Model Users deve ter uma propriedade role', () => {
		const newUser = new Users();

		newUser.role = 'admin';

		expect(newUser.role).to.be.equal('admin');
	});

  it('Model Users deve ter uma propriedade email', () => {
		const newUser = new Users();

		newUser.email = 'admin@gmail.com';

		expect(newUser.email).to.be.equal('admin@gmail.com');
	});
});

const user = [{
	username: 'User',
	role: 'user',
	email: 'user@user.com',
	password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
}];

const correctLoginInfo = {
	email: 'user@user.com',
	password: 'secret_user',
};

const incorrectLoginInfo = {
	email: '',
	password: '',
};

describe('Testes da rota de login', () => {
	before(() => {
		sinon.stub(Users, 'findAll')
		  .resolves([user[0]] as Users[]);
	});

	after(() => {(
		Users.findAll as sinon.SinonStub
	).restore()})

	
	it('O login é feito com sucesso', async () => {
		const newLogin = await chai.request(app).post('/login').send(correctLoginInfo);
		expect(newLogin.status).to.be.equal(200);
		expect(newLogin.body).to.be.a('object');
	});
	
	it('O login não é efetuado com sucesso', async () => {
		const newLogin = await chai.request(app).post('/login').send(incorrectLoginInfo);
		expect(newLogin.status).to.be.equal(400);
		expect(newLogin.body).to.be.a('object');
	});
});

describe('Testes do service de login', () => {
	before(() => {
		sinon.stub(Users, 'findAll')
			.resolves([user[0]] as Users[]);
	});

	after(() => {
		(
			Users.findAll as sinon.SinonStub
		).restore()
	})

	it('A função "login" retorna o usuário com sucesso', async () => {
		const getUser = await login(correctLoginInfo);
		expect(getUser).to.be.a('object');
	});
});
