import { NextFunction, Request, Response } from 'express';
import Teams from '../database/models/Teams';

const validateTeams = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  const ht = await Teams.findByPk(homeTeam);
  const at = await Teams.findByPk(awayTeam);

  if (homeTeam === awayTeam) {
    return res.status(401)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  if (!ht || !at) {
    return res.status(404)
      .json({ message: 'There is no team with such id!' });
  }

  next();
};

export default validateTeams;
