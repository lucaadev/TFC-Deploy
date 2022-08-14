/* eslint-disable max-lines-per-function */
import teamsService from '../../services/teams.service';
import Matches from '../../database/models/Matches';
import insertData from './insertData';
import ILeaderboard from '../../interfaces/ILeaderBoard.interface';
import { IMatch } from '../../interfaces/match.interface';

const filterByBoss = (matches: IMatch[], id: number, type: string) => {
  if (type === 'away') return matches.filter(({ awayTeam }) => awayTeam === id);
  if (type === 'home') return matches.filter(({ homeTeam }) => homeTeam === id);
  return matches;
};

const finishedMatches = async () => Matches.findAll({ where: { inProgress: false } });

const createLb = async (type: string) => {
  const finishedGames = await finishedMatches();
  const allTeams = await teamsService.getTeams();

  const lb: ILeaderboard[] = allTeams.map(({ id, teamName }) => {
    const filtered = filterByBoss(finishedGames, id, type);
    const {
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency,
    } = insertData(filtered, type);
    return {
      name: teamName,
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency,
    };
  });
  return lb;
};

export default createLb;
