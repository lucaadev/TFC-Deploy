import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

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

export default { getMatches };
