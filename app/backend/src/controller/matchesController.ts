import { Request, Response } from 'express';
import matchesServices from '../services/matchesServices';

export default class matchesController {
  public static async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const matches = await matchesServices.getAllMatches();
    if (inProgress !== undefined) {
      const findProgress = matches?.filter((match) =>
        match.inProgress === (inProgress === 'true'));
      return res.status(200).json(findProgress);
    }
    res.status(200).json(matches);
  }

  public static async getByIdMatches(req: Request, res: Response) {
    const { id } = req.params;
    const matches = await matchesServices.getByIdMatches(+id);
    res.status(200).json(matches);
  }

  public static async updateMatches(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const matches = await matchesServices.updateMatches(+id, { homeTeamGoals, awayTeamGoals });
    res.status(200).json(matches);
  }

  public static async createMatches(req: Request, res: Response) {
    try {
      const matches = await matchesServices.createMatches(req.body);
      res.status(201).json(matches);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error });
    }
  }
}
