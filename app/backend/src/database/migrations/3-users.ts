import { Model, QueryInterface, DataTypes } from 'sequelize';
import Users from '../../Interfaces/Users';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Users>>('users', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          username: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          role: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          password: {
            type: DataTypes.STRING,
            allowNull: true,
          },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('users');
  },
};