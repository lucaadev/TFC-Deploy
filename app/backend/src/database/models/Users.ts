import { Model, DataTypes } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

export default class Users extends Model {
  public id!: number;
  public username: string;
  public role: string;
  public email: string;
  public password: string;
}

Users.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    // ... Outras configs
    underscored: true,
    sequelize: db,
    modelName: 'users',
    timestamps: false,
  },
);

/**
 * `Workaround` para aplicar as associations em TS:
 * Associations 1:N devem ficar em uma das instâncias de modelo
 * */

// OtherModel.belongsTo(Users, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Users, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Users.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Users.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });
