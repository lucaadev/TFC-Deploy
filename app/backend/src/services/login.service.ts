import Users from '../database/models/Users';
import { ILogin } from '../interfaces/login.interface';

const doLogin = async (data: ILogin) => {
  const { email } = data;
  const [user] = await Users.findAll({ where: { email } });

  return user;
};

const validateLogin = async (id: number) => {
  const [userData] = await Users.findAll({ where: { id } });
  const { role } = userData;
  return role;
};

export { doLogin, validateLogin };
