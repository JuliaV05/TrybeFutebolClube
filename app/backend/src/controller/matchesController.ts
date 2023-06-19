import { Request, Response } from 'express';
import matchesServices from '../services/matchesServices';

export default class matchesController {
  public static async getAllMatches(req: Request, res: Response) {
    const matches = await matchesServices.getAllMatches();
    res.status(200).json(matches);
  }
}
