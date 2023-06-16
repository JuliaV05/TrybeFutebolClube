import Teams from '../database/models/teams';

export default class teamsServices {
  public static async getAllTeams() {
    const allTeams = await Teams.findAll();
    return allTeams;
  }

  public static async getById(id: string) {
    const teamById = await Teams.findByPk(id);
    return teamById;
  }
}
