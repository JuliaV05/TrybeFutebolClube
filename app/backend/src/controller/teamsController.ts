import { Request, Response } from 'express';
import teamsServices from '../services/teamsServices';

export default class teamsController {
  public static async getAllTeams(_req: Request, res: Response) {
    try {
      const allTeams = await teamsServices.getAllTeams();
      res.status(200).json(allTeams);
    } catch (error) {
      res.status(404).json({ message: 'Teams not found' });
    }
  }
}
