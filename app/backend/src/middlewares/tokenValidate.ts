import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt';

const tokenValidate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    verifyToken(token);
    // const tokenConvert = verifyToken(token);
    // console.log(tokenConvert);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};
export default tokenValidate;
// esse arquivo trata o erro do token
