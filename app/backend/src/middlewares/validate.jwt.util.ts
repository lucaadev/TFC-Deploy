import { NextFunction, Request, Response } from 'express';
import jwt = require('jsonwebtoken');
import 'dotenv/config';

const secret = process.env.JWT_SECRET as string;

const validateJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token as string, secret);
    req.params.user = decoded as string;
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  next();
};

export default validateJwt;
