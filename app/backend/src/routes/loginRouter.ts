import express = require('express');
import loginController from '../controller/loginController';
import loginValidate from '../middlewares/loginValidate';

const loginRouter = express.Router();

loginRouter.post('/', loginValidate, (req, res) => loginController.postLogin(req, res));

export default loginRouter;
