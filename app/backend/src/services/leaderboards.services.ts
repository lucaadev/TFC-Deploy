import ILeaderboard from '../interfaces/ILeaderBoard.interface';
import createLb from '../utils/helpers/createLb';
import formattedBoard from '../utils/helpers/formattedBoard.functions';

const getLeaderBoards = async (type: string) => {
  const lb = await createLb(type) as unknown as ILeaderboard[];
  const lbFormatted = formattedBoard(lb);
  return lbFormatted;
};

export default { getLeaderBoards };
