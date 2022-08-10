import { Request, Response } from 'express';
import matchesService from '../services/matches.service';

const getMatches = async (req: Request, res: Response) => {
  const matches = await matchesService.getMatches();
  return res.status(200).json(matches);
};

export default { getMatches };
