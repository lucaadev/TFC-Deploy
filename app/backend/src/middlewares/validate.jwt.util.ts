import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import 'dotenv/config';

const secret = process.env.JWT_SECRET as string;

const validateJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = verify(token, secret);
    req.params.user = decoded as string;
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }

  next();
};

export default validateJwt;
