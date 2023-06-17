import express = require('express');
import loginController from '../controller/loginController';

const loginRouter = express.Router();

loginRouter.post('/', (req, res) => loginController.postLogin(req, res));

export default loginRouter;
