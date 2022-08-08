import Teams from '../database/models/Teams';

async function getTeams() {
  return Teams.findAll();
}

async function getTeamsById(id: number) {
  return Teams.findAll({ where: { id } });
}

export default {
  getTeams,
  getTeamsById,
};
