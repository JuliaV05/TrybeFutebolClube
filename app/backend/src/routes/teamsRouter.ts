import express = require('express');
import teamsController from '../controller/teamsController';

const teamsRouter = express.Router();

teamsRouter.get('/teams', (req, res) => teamsController.getAllTeams(req, res));
teamsRouter.get('/teams/:id', (req, res) => teamsController.getById(req, res));

export default teamsRouter;
