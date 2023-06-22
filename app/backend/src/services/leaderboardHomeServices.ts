import Leaderboard from '../Interfaces/Leaderboard';
import MatchesAttributes from '../Interfaces/MatchesAttributes';
import Teams from '../database/models/teams';
import matchesServices from './matchesServices';

export default class leaderboardHomeServices {
  public static async findAllTeamsHome() {
    const teamsHome = await Teams.findAll();
    return Promise.all(
      teamsHome.map(async (team) => {
        const matches = await matchesServices.findAllTeamsHome(team.id);
        return {
          name: team.teamName,
          totalPoints: this.calculatePoints(matches),
          totalGames: matches.length,
          totalVictories: this.calculateWins(matches),
          totalDraws: this.calculateATie(matches),
          totalLosses: this.calculateLosses(matches),
          goalsFavor: this.goalsFavor(matches),
          goalsOwn: this.goalsOwn(matches),
          goalsBalance: this.goalsFavor(matches) - this.goalsOwn(matches),
          efficiency: this.calculateEfficiency(this.calculatePoints(matches), matches.length),
        };
      }),
    );
  }

  // calcula total de pontos
  public static calculatePoints(matches: MatchesAttributes[]) {
    const result = matches.reduce((acc, match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        const win = acc + 3; // Vitória
        return win;
      }
      if (match.homeTeamGoals === match.awayTeamGoals) {
        const aTie = acc + 1; // Empate
        return aTie;
      }
      const loser = acc; // Derrota
      return loser;
    }, 0);
    return result;
  }

  // calcula a derrota dos times
  public static calculateLosses(matches: MatchesAttributes[]) {
    const loser = matches.reduce((acc, match) => {
      if (match.awayTeamGoals > match.homeTeamGoals) {
        return acc + 1; // Soma de derotas
      }
      return acc;
    }, 0);
    return loser;
  }

  // gols a favor
  public static goalsFavor(matches: MatchesAttributes[]) {
    const gols = matches.reduce((acc, match) => acc + match.homeTeamGoals, 0);
    return gols;
  }

  // gols sofridos
  public static goalsOwn(matches: MatchesAttributes[]) {
    const gols = matches.reduce((acc, match) => acc + match.awayTeamGoals, 0);
    return gols;
  }

  // Vitorias
  public static calculateWins(matches: MatchesAttributes[]) {
    const win = matches.reduce((acc, match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        return acc + 1; // Soma de vitórias
      }
      return acc;
    }, 0);
    return win;
  }

  // calcula o empate dos times

  public static calculateATie(matches: MatchesAttributes[]) {
    const empate = matches.reduce((acc, match) => {
      if (match.homeTeamGoals === match.awayTeamGoals) {
        return acc + 1; // Soma de vitórias
      }
      return acc;
    }, 0);
    return empate;
  }

  // calcula a porcentagem
  public static calculateEfficiency(totalPoints: number, totalGames: number): string {
    if (totalGames === 0) return '0';
    const efficiency = (totalPoints / (totalGames * 3)) * 100;
    return efficiency.toFixed(2).toString();
  }

  // SORTE
  public static async sortResults(teams: Leaderboard[]) {
    const result = teams
      .sort((a, b) => b.goalsFavor - a.goalsFavor)
      .sort((a, b) => b.goalsBalance - a.goalsBalance)
      .sort((a, b) => b.totalPoints - a.totalPoints);

    // const result = teams.sort((a, b) => {
    //   if (a.totalPoints === b.totalPoints) {
    //     if (a.totalVictories === b.totalVictories) {
    //       if (a.goalsBalance === b.goalsBalance) {
    //         return b.goalsFavor - a.goalsFavor;
    //       }
    //       return b.goalsBalance - a.goalsBalance;
    //     }
    //     return b.totalVictories - a.totalVictories;
    //   }
    //   return b.totalPoints - a.totalPoints;
    // });
    return result;
  }

  // retorna os dados ordenados
  //   função que chama a função que busca todos os times de casa
  //  e a funçao que ordena os resultados
  public static async returnsDataSorted() {
    const homeData = await this.findAllTeamsHome();
    const homeDataSorted = await this.sortResults(homeData);

    return homeDataSorted;
  }
}
