import { compareSync } from 'bcryptjs';
import Users from '../database/models/Users';
import { ILogin } from '../interfaces/login.interface';

const login = async (data: ILogin) => {
  const { email, password } = data;
  const [user] = await Users.findAll({ where: { email } });

  if (!user) return false;

  const validPassword = compareSync(password, user.password);

  if (!validPassword) return false;

  return user;
};

export default login;
