import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';

const router = Router();

router.get('/teams', TeamsController.getAllTeams);
router.get('/teams/:id', TeamsController.getTeamsById);

export default router;
