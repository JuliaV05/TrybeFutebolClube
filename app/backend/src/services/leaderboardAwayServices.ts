import Leaderboard from '../Interfaces/Leaderboard';
import teamsServices from './teamsServices';
import matchesServices from './matchesServices';
import MatchesAttributes from '../Interfaces/MatchesAttributes';

class LeaderboardAwayService {
  public static async findAllTeamsAway() {
    const teamsMatches = await teamsServices.getAllTeams();
    return Promise.all(
      teamsMatches.map(async (team) => {
        const matches = await matchesServices.findAllTeamsAway(team.id);
        return {
          name: team.teamName,
          totalPoints: this.calculatePntsAway(matches),
          totalGames: matches.length,
          totalVictories: this.calculateWins(matches),
          totalDraws: this.calculateATie(matches),
          totalLosses: this.calculateLosses(matches),
          goalsFavor: this.goalsFavor(matches),
          goalsOwn: this.goalsOwn(matches),
          goalsBalance: this.goalsFavor(matches) - this.goalsOwn(matches),
          efficiency: this.calculateEfficiency(this.calculatePntsAway(matches), matches.length),
        };
      }),
    );
  }

  // calcula pontos total dos times de fora
  public static calculatePntsAway(matches: MatchesAttributes[]) {
    const result = matches.reduce((acc, match) => {
      if (match.homeTeamGoals < match.awayTeamGoals) {
        const win = acc + 3; // soma de vitórias
        return win;
      }
      if (match.homeTeamGoals === match.awayTeamGoals) {
        const aTie = acc + 1; // soma de empate
        return aTie;
      }
      const loser = acc; // derrota
      return loser;
    }, 0);
    return result;
  }

  // calcula derrotas
  public static calculateLosses(matches: MatchesAttributes[]) {
    const loser = matches.reduce((acc, match) => {
      if (match.awayTeamGoals < match.homeTeamGoals) {
        return acc + 1; // soma de derotas
      }
      return acc;
    }, 0);
    return loser;
  }

  // função de gols a favor
  public static goalsFavor(matches: MatchesAttributes[]) {
    const gols = matches.reduce((acc, match) => acc + match.awayTeamGoals, 0);
    return gols;
  }

  // gols sofridos
  public static goalsOwn(matches: MatchesAttributes[]) {
    const gols = matches.reduce((acc, match) => acc + match.homeTeamGoals, 0);
    return gols;
  }

  // função de vitorias
  public static calculateWins(matches: MatchesAttributes[]) {
    const win = matches.reduce((acc, match) => {
      if (match.homeTeamGoals < match.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return win;
  }

  // calcula empate
  public static calculateATie(matches: MatchesAttributes[]) {
    const empate = matches.reduce((acc, matche) => {
      if (matche.homeTeamGoals === matche.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return empate;
  }

  // % porcentagem
  public static calculateEfficiency(totalPointos: number, totalGames: number): string {
    if (totalGames === 0) return '0';
    const efficiency = (totalPointos / (totalGames * 3)) * 100;
    return efficiency.toFixed(2).toString();
  }

  public static async sortResults(teams: Leaderboard[]):
  Promise<Leaderboard[]> {
    // const result = teams
    //   .sort((a, b) => b.goalsFavor - a.goalsFavor)
    //   .sort((a, b) => b.goalsBalance - a.goalsBalance)
    //   .sort((a, b) => b.totalVictories - a.totalVictories);
    const result = teams.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      if (a.totalVictories !== b.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }
      if (a.goalsBalance !== b.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }
      return b.goalsFavor - a.goalsFavor;
    });
    return result;
  }

  public static async returnsDataSorted(): Promise<Leaderboard[] | null> {
    const awayData = await this.findAllTeamsAway();
    const awayDataSorted = await this.sortResults(awayData);

    return [...awayDataSorted];
  }
}

export default LeaderboardAwayService;
