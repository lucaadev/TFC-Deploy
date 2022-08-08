import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';

const getAllTeams = async (req: Request, res: Response) => {
  const allTeams = await TeamsService.getTeams();
  return res.status(200).json(allTeams);
};

const getTeamsById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const [team] = await TeamsService.getTeamsById(Number(id));
  return res.status(200).json(team);
};

export default {
  getAllTeams,
  getTeamsById,
};
