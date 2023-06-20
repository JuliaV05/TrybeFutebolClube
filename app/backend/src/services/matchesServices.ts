import MatchesAttributes from '../Interfaces/MatchesAttributes';
import Goals from '../Interfaces/Goals';
import Matches from '../database/models/matches';
import Teams from '../database/models/teams';

export default class matchesServices {
  public static async getAllMatches() {
    const matches = await Matches.findAll({ include: [
      {
        model: Teams,
        as: 'homeTeam',
        attributes: ['teamName'],
        required: true,
      },
      {
        model: Teams,
        as: 'awayTeam',
        attributes: ['teamName'],
        required: true,
      },
    ],
    order: [['id', 'ASC']],
    });
    return matches;
  }

  public static async getByIdMatches(id: number) {
    await Matches.update({ inProgress: false }, { where: { id } });
    return 'Finished';
  }

  public static async updateMatches(id: number, goals: Goals) {
    const matches = await Matches.update(
      { homeTeamGoals: goals.homeTeamGoals, awayTeamGoals: goals.awayTeamGoals },
      { where: { id } },
    );
    return matches;
  }

  public static async createMatches(match: MatchesAttributes) {
    const matches = await Matches.create({
      ...match,
      inProgress: true,
    });
    return matches;
  }

  public static async findAllTeamsHome(id: number | string) {
    const teamsHome = await Matches.findAll({
      where: { homeTeamId: id, inProgress: false },
      include: [
        {
          model: Teams,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: Teams,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return teamsHome;
  }

  public static async findAllTeamsAway(id: number | string) {
    const teamsAway = await Matches.findAll({
      where: { awayTeamId: id, inProgress: false },
      include: [
        {
          model: Teams,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: Teams,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return teamsAway;
  }
}
