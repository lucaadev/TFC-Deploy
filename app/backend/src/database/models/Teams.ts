import { Model, DataTypes } from 'sequelize';
import db from '.';

class Teams extends Model {
  public id!: number;
  public teamName: string;
}

Teams.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    teamName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'teams',
    timestamps: false,
  },
);

export default Teams;
