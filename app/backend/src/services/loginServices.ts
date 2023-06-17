import bcrypt = require('bcryptjs');
import { generateToken } from '../utils/jwt';
import Users from '../database/models/users';

interface UserToken {
  token: string,
}

export default class loginServices {
  public static async postLogin(email: string, password: string): Promise<UserToken> {
    const login = await Users.findOne({ where: { email } });
    if (!login) {
      throw new Error('Invalid email or password');
    }
    const decodePassword = await bcrypt.compare(password, login.dataValues.password);
    if (!decodePassword) {
      throw new Error('Unauthorized user');
    }
    const token = generateToken(email, login.role);
    return { token };
  }
}
