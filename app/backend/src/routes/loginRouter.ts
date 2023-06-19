import express = require('express');
import loginController from '../controller/loginController';
import loginValidate from '../middlewares/loginValidate';
import tokenValidate from '../middlewares/tokenValidate';

const loginRouter = express.Router();

loginRouter.post('/', loginValidate, (req, res) => loginController.postLogin(req, res));
loginRouter.get('/role', tokenValidate, (req, res) => loginController.getToken(req, res));

export default loginRouter;
