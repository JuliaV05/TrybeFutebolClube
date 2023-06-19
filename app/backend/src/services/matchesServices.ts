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
}
