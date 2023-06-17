import express = require('express');
import teamsRouter from './teamsRouter';

const router = express.Router();

router.use('/teams', teamsRouter);

export default router;
