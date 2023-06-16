import express = require('express');
import teamsController from '../controller/teamsController';

const teamsRouter = express.Router();

teamsRouter.get('/', (req, res) => teamsController.getAllTeams(req, res));

export default teamsRouter;
