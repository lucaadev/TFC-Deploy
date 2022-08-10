import { Router } from 'express';
import matchesController from '../controllers/matches.controller';

const router = Router();

router.get('/matches', matchesController.getMatches);

export default router;
