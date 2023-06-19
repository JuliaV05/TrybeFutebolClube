import express = require('express');
import matchesController from '../controller/matchesController';

const matchesRouter = express.Router();

matchesRouter.get('/', (req, res) => matchesController.getAllMatches(req, res));

export default matchesRouter;
