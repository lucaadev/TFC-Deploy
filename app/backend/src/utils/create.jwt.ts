import 'dotenv/config';
import jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'jwt_secret';

const jwtConfig = {
  expiresIn: '5d',
  algorithm: 'HS256',
};

const token = (data = {}) => jwt.sign({ data }, SECRET as string, jwtConfig as object);

export default token;
