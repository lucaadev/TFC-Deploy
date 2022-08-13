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

const updateMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  await matchesService.updateMatch(req.body, Number(id));
  return res.status(200).json({ response: 'match updated successfully!' });
};

const finishMatch = async (req: Request, res: Response) => {
  req.body = req.params;
  const { id } = req.body;
  await matchesService.finishMatch(Number(id));
  return res.status(200).json({ message: 'Finished' });
};

export default { getMatches, createMatch, updateMatch, finishMatch };
