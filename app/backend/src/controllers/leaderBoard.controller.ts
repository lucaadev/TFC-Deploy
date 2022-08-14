import { Request, Response } from 'express';
import lbService from '../services/leaderboards.services';

const getLeaderBoards = async (req: Request, res: Response) => {
  let type = 'all';
  if (req.url.includes('home')) type = 'home';
  if (req.url.includes('away')) type = 'away';
  const leaderboard = await lbService.getLeaderBoards(type);
  return res.status(200).json(leaderboard);
};

export default {
  getLeaderBoards,
};
