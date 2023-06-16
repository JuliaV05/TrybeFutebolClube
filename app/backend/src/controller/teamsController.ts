import { Request, Response } from 'express';
import teamsServices from '../services/teamsServices';

export default class teamsController {
  public static async getAllTeams(_req: Request, res: Response) {
    try {
      const allTeams = await teamsServices.getAllTeams();
      res.status(200).json(allTeams);
    } catch (error) {
      res.status(400).json({ message: 'Teams not found' });
    }
  }

  public static async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const teamById = await teamsServices.getById(id);
      res.status(200).json(teamById);
    } catch (error) {
      res.status(400).json({ message: 'Team not found' });
    }
  }
}
