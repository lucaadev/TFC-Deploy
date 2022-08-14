import { Router } from 'express';
import lbController from '../controllers/leaderBoard.controller';

const router = Router();

router.get('/leaderboard', lbController.getLeaderBoards);
router.get('/leaderboard/home', lbController.getLeaderBoards);
router.get('/leaderboard/away', lbController.getLeaderBoards);
export default router;
