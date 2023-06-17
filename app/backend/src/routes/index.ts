import express = require('express');
import teamsRouter from './teamsRouter';
import loginRouter from './loginRouter';

const router = express.Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);

export default router;
