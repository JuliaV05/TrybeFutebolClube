import express = require('express');
import teamsController from '../controller/teamsController';

const teamsRouter = express.Router();

teamsRouter.get('/', (req, res) => teamsController.getAllTeams(req, res));
teamsRouter.get('/:id', (req, res) => teamsController.getById(req, res));

export default teamsRouter;
