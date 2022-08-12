import { Request, Response } from 'express';
import matchesService from '../services/matches.service';

const getMatches = async (req: Request, res: Response) => {
  const matches = await matchesService.getMatches();
  return res.status(200).json(matches);
};

const createMatch = async (req: Request, res: Response) => {
  const newMatch = await matchesService.createMatch(req.body);
  return res.status(201).json(newMatch);
};

const finishMatch = async (req: Request, res: Response) => {
  req.body = req.params;
  const { id } = req.body;
  await matchesService.finishMatch(Number(id));
  return res.status(200).json({ message: 'Finished' });
};

export default { getMatches, createMatch, finishMatch };
