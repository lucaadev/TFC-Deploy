import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import { IMatch } from '../interfaces/match.interface';

const getMatches = async () => {
  const matches = await Matches.findAll({
    include: [{
      model: Teams,
      as: 'teamHome',
      attributes: { exclude: ['id'] } },
    {
      model: Teams,
      as: 'teamAway',
      attributes: { exclude: ['id'] },
    }],
  });

  return matches;
};

const createMatch = async (data: IMatch) => {
  const { id } = await Matches.create(data);

  return { id, ...data, inProgress: true };
};

const finishMatch = async (id: number) => {
  await Matches.update({ inProgress: false }, { where: { id } });
};

export default { getMatches, createMatch, finishMatch };
