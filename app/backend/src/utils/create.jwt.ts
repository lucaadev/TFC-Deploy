import 'dotenv/config';
import jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'jwt_secret';

const jwtConfig = {
  expiresIn: '2h',
};

const token = (data = {}) => jwt.sign({ data }, SECRET, jwtConfig);

export default token;
