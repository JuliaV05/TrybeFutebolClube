import jwt = require('jsonwebtoken');

const secret = String(process.env.JWT_SECRET);

const JWT_CONFIG: jwt.SignOptions = {
  algorithm: 'HS256',
  expiresIn: '30d',
};

export const generateToken = (email: string, role: string) =>
  jwt.sign({ email, role }, secret, JWT_CONFIG);

export const verifyToken = (token: string) => jwt.verify(token, secret);

export const getUserToken = (token: string) => jwt.decode(token);

export default { jwt };
