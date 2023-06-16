import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import db from '.';

class Teams extends Model<InferAttributes<Teams>,
InferCreationAttributes<Teams>> {
  declare id: number;
  declare teamName: number;
}

Teams.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    // field: 'team_name',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default Teams;
