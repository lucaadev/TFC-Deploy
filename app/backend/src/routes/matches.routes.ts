import { Router } from 'express';
import matchesController from '../controllers/matches.controller';
import validateJwt from '../middlewares/validate.jwt.util';

const router = Router();

router.get('/matches', matchesController.getMatches);
router.post('/matches', validateJwt, matchesController.createMatch);
router.patch('/matches/:id/finish', matchesController.finishMatch);

export default router;
