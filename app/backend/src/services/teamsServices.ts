import Teams from '../database/models/teams';

export default class teamsServices {
  public static async getAllTeams() {
    const allTeams = await Teams.findAll();
    return allTeams;
  }
}
