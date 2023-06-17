import { NextFunction, Request, Response } from 'express';

const loginValidate = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const numberPassword = 6;
  const emailRegex = /\S+@\S+\.\S+/;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (!emailRegex.test(email) || password.length < numberPassword) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  next();
};
export default loginValidate;
