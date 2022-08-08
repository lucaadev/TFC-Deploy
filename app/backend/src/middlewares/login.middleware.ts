import { NextFunction, Request, Response } from 'express';
import { ILogin } from '../interfaces/login.interface';

const properties = ['email', 'password'];

const validateProperties = (login: ILogin): boolean => {
  for (let i = 0; i < properties.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(login, properties[i])) {
      return false;
    }
  }
  return true;
};

const LoginMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const login: ILogin = req.body;

  const valid = validateProperties(login);

  if (!valid || login.email.length === 0 || login.password.length === 0) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  next();
};

export default LoginMiddleware;
