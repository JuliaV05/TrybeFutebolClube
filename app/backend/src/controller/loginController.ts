import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import loginServices from '../services/loginServices';
import { verifyToken } from '../utils/jwt';

export default class loginController {
  public static async postLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const login = await loginServices.postLogin(email, password);
      res.status(200).json(login);
    } catch (error) {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  }

  public static async getToken(req: Request, res: Response) {
    const { authorization } = req.headers;
    const token = verifyToken(authorization || '') as JwtPayload;
    res.status(200).json({ role: token.role });
  }
}
