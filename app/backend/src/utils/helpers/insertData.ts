/* eslint-disable @typescript-eslint/no-explicit-any */

export const PPGame = (htGoals: number, atGoals: number, type: string) => {
  switch (type) {
    case 'home':
      if (htGoals === atGoals) return 1;
      if (htGoals > atGoals) return 3;
      return 0;
    case 'away':
      if (htGoals === atGoals) return 1;
      if (htGoals < atGoals) return 3;
      return 0;
    default:
      return 1;
  }
};

export const teamExploitation = (totalPoints: number, totalGames: number) => {
  const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
  return Number(efficiency);
};

export const goalsInFavor = (home: number, away: number, type: string) =>
  (type === 'home' ? home : away);

export const goalsAgainstFunc = (home: number, away: number, type: string) =>
  (type === 'home' ? away : home);

// eslint-disable-next-line max-lines-per-function
const insertData = (filtered: any, type: string) => {
  let totalPoints = 0;
  let totalGames = 0;
  let totalVictories = 0;
  let totalDraws = 0;
  let totalLosses = 0;
  let goalsFavor = 0;
  let goalsOwn = 0;
  let goalsBalance = 0;
  let efficiency = 0;
  filtered.forEach((match: any) => {
    const points = PPGame(match.homeTeamGoals, match.awayTeamGoals, type);
    totalPoints += points;
    totalVictories += (points === 3 ? 1 : 0);
    totalDraws += (points === 1 ? 1 : 0);
    totalLosses += (points === 0 ? 1 : 0);
    goalsFavor += goalsInFavor(match.homeTeamGoals, match.awayTeamGoals, type);
    goalsOwn += goalsAgainstFunc(match.homeTeamGoals, match.awayTeamGoals, type);
  });
  totalGames = filtered.length;
  goalsBalance = goalsFavor - goalsOwn;
  efficiency = teamExploitation(totalPoints, totalGames);

  return {
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
};

export default insertData;
