import { Request, Response } from 'express';
import leaderboardHomeServices from '../services/leaderboardHomeServices';
import leaderboardAwayServices from '../services/leaderboardAwayServices';
import leaderboardAllTeamsServices from '../services/leaderboardAllTeamsServices';

export default class leaderboardController {
  public static async findAllTeamsHome(req: Request, res: Response) {
    const teamsHome = await leaderboardHomeServices.returnsDataSorted();
    res.status(200).json(teamsHome);
  }

  public static async findAllTeamsAway(req: Request, res: Response) {
    const teamsAway = await leaderboardAwayServices.findAllTeamsAway();
    res.status(200).json(teamsAway);
  }

  public static async findAllTeams(req: Request, res: Response) {
    const bothTeams = await leaderboardAllTeamsServices.returnsDataSorted();
    res.status(200).json(bothTeams);
  }
}
