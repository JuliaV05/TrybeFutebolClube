import Leaderboard from '../Interfaces/Leaderboard';
import LeaderboardAwayServices from './leaderboardAwayServices';
import LeaderboardHomeServices from './leaderboardHomeServices';

class leaderboardAllTeamsServices {
  public static allMatchs(awayTeam: Leaderboard[], homeTeam: Leaderboard[]): Leaderboard[] {
    const teamsData: Record<string, Leaderboard> = {};
    [...homeTeam, ...awayTeam].forEach((data) => {
      const { name, ...rest } = data;
      if (!teamsData[name]) teamsData[name] = { name, ...rest };
      else {
        teamsData[name].totalPoints += data.totalPoints;
        teamsData[name].totalGames += data.totalGames;
        teamsData[name].totalVictories += data.totalVictories;
        teamsData[name].totalDraws += data.totalDraws;
        teamsData[name].totalLosses += data.totalLosses;
        teamsData[name].goalsFavor += data.goalsFavor;
        teamsData[name].goalsOwn += data.goalsOwn;
        teamsData[name].goalsBalance = teamsData[name].goalsFavor - teamsData[name].goalsOwn;
        const e = this.toCalcule(teamsData[name].totalPoints, teamsData[name].totalGames);
        teamsData[name].efficiency = e;
      }
    });
    return Object.values(teamsData); // Retorna um array com os dados do objeto teamsData
  }

  // porcentagem do efficiency
  public static toCalcule(totalPoints: number, totalGames: number): string {
    if (totalGames === 0) return '0';
    const efficiency = (totalPoints / (totalGames * 3)) * 100;
    return efficiency.toFixed(2).toString();
  }

  // ordena os times pelos pontos
  public static sortedTeamsByPoints(teams: Leaderboard[]): Leaderboard[] {
    return teams.sort((a, b) => {
      if (a.totalPoints === b.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      if (a.totalVictories === b.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }
      if (a.goalsBalance === b.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }
      return b.goalsFavor - a.goalsFavor;
    });
  }

  // função que retorna os dados dos times ordenados
  public static async returnsDataSorted(): Promise<Leaderboard[]> {
    const awayTeam = await LeaderboardAwayServices.returnsDataSorted();
    const homeTeam = await LeaderboardHomeServices.returnsDataSorted();
    if (awayTeam === null || homeTeam === null) {
      throw new Error('Away team data is null.');
    }
    const matches = this.allMatchs(awayTeam, homeTeam);
    const matchesDataSorted = this.sortedTeamsByPoints(matches);
    return matchesDataSorted;
  }
}
export default leaderboardAllTeamsServices;
