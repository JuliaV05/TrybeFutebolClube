import { DataTypes } from "sequelize";

class Matches extends Model {
    declare id: number;
    declare home_team_id: number;
    declare home_team_goals: number;
    declare away_team_id: number;
    declare away_team_goals: number;
    declare in_progress: boolean;
}

Matches.init({
  id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  home_team_id: {
    type: DataTypes.INTEGER,
    allowNull: 
  },

});