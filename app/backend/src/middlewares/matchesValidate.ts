import { Request, Response, NextFunction } from 'express';
import Teams from '../database/models/teams';

const findTeams = async (homeTeamId: number, awayTeamId: number) =>
  Promise.all([
    Teams.findOne({ where: { id: homeTeamId } }),
    Teams.findOne({ where: { id: awayTeamId } }),
  ]);

const notTeams = (res: Response) => {
  res.status(404).json({ message: 'There is no team with such id!' });
};
const verifyExistingMatches = async (
  homeTeamId: number,
  awayTeamId: number,
  res: Response,
  next: NextFunction,
) =>
  next();

export default async function matchesValidate(req: Request, res: Response, next: NextFunction) {
  const { homeTeamId, awayTeamId } = req.body;
  if (homeTeamId === awayTeamId) {
    // Correção: Verificar se os times são iguais e retornar erro se forem
    return res
      .status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  try {
    const [homeTeam, awayTeam] = await findTeams(homeTeamId, awayTeamId);
    if (!homeTeam || !awayTeam) {
      // Correção: Verificar se algum dos times não existe e retornar erro se não existir
      return notTeams(res);
    }
    return await verifyExistingMatches(homeTeamId, awayTeamId, res, next);
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while validating the match' });
  }
}
