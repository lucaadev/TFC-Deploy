import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Users Entity', () => {
  it('Model Users deve ter uma propriedade id', () => {
		const newUser = new Users();

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

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
