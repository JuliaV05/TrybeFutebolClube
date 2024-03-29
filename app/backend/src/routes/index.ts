import express = require('express');
import teamsRouter from './teamsRouter';
import loginRouter from './loginRouter';
import matchesRouter from './matchesRouter';
import leaderboardRouter from './leaderboardRouter';

const router = express.Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
