import { Router } from 'express';
import matchesController from '../controllers/matches.controller';
import validateJwt from '../middlewares/validate.jwt.util';
import validateTeams from '../middlewares/Match.middleware';

const router = Router();

router.get('/matches', matchesController.getMatches);
router.post('/matches', validateJwt, validateTeams, matchesController.createMatch);
router.patch('/matches/:id', matchesController.updateMatch);
router.patch('/matches/:id/finish', matchesController.finishMatch);

export default router;
