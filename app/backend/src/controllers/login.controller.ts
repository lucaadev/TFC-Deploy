import 'dotenv/config';
import { Request, Response } from 'express';
import { ILogin } from '../interfaces/login.interface';
import { doLogin, validateLogin } from '../services/login.service';
import createToken from '../utils/create.jwt';

const login = async (req: Request, res: Response) => {
  const data: ILogin = req.body;
  const user = await doLogin(data);

  if (!user) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  const token = createToken(user);

  req.headers.authorization = token;

  return res.status(200).json({ token });
};

const loginValidate = async (req: Request, res: Response) => {
  req.body = req.params.user;
  const { id } = req.body.data;
  const userRole = await validateLogin(id);
  return res.status(200).json({ role: userRole });
};

export default { login, loginValidate };
