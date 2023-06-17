import { Request, Response } from 'express';

export default class loginController {
  public static async postLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    const login = await loginServices.postLogin(email, password);
    res.status(200).json(login);
  }
}
