import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ILogin } from '../interfaces/login.interface';

const properties = ['email', 'password'];

function validateProperties(login: ILogin): [boolean, string | null] {
  for (let i = 0; i < properties.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(login, properties[i])) {
      return [false, properties[i]];
    }
  }
  return [true, null];
}

function LoginMiddleware(req: Request, res: Response, next: NextFunction) {
  const login: ILogin = req.body;

  const [valid] = validateProperties(login);

  if (!valid) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Incorrect email or password' });
  }

  next();
}

export default LoginMiddleware;
