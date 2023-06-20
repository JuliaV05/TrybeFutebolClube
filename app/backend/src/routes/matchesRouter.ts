import express = require('express');
import matchesController from '../controller/matchesController';
import tokenValidate from '../middlewares/tokenValidate';
import matchesValidate from '../middlewares/matchesValidate';

const matchesRouter = express.Router();

matchesRouter.get('/', (req, res) => matchesController.getAllMatches(req, res));
matchesRouter.patch(
  '/:id/finish',
  tokenValidate,
  (req, res) => matchesController.getByIdMatches(req, res),
);
matchesRouter.patch('/:id', tokenValidate, (req, res) => matchesController.updateMatches(req, res));
matchesRouter.post(
  '/',
  tokenValidate,
  matchesValidate,
  (req, res) => matchesController.createMatches(req, res),
);

export default matchesRouter;
