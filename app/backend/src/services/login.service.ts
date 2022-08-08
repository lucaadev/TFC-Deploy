import Users from '../database/models/Users';
import { ILogin } from '../interfaces/login.interface';

const login = async (data: ILogin) => {
  const { email } = data;
  const [user] = await Users.findAll({ where: { email } });

  return user;
};

export default login;
