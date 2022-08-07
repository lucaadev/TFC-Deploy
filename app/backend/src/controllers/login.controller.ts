import 'dotenv/config';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ILogin } from '../interfaces/login.interface';
import loginService from '../services/login.service';
import createToken from '../utils/create.jwt';

const login = async (req: Request, res: Response) => {
  const data: ILogin = req.body;
  const user = await loginService(data);

  if (!user || user.password !== data.password) {
    return res.status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Incorrect email or password' });
  }

  const token = createToken(user);

  req.headers.authorization = token;

  return res.status(StatusCodes.OK).send(token);
};

const loginValidate = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const secret = process.env.JWT_SECRET as string;
  const decoded = verify(token, secret);
  const { data } = decoded as JwtPayload;
  req.params.user = decoded as string;
  return res.status(StatusCodes.OK).send(data.role);
};

export default { login, loginValidate };
