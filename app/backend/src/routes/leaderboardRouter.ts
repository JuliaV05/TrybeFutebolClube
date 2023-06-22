import express = require('express');
import leaderboardController from '../controller/leaderboardController';

const leaderboardRouter = express.Router();

leaderboardRouter.get('/home', (req, res) => leaderboardController.findAllTeamsHome(req, res));

export default leaderboardRouter;
