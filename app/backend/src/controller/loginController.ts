import { Request, Response } from 'express';
import loginServices from '../services/loginServices';

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
}
