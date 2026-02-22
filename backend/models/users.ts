import { Sequelize, DataTypes, Optional, Model } from 'sequelize';

export interface UserAttributes {
  id?: number;
  email: string;
  roleId: number;
}

export interface UserCreationAttributes extends Optional<UserAttributes, "id"> { }
export class User extends Model<UserAttributes, UserCreationAttributes> {
  declare public id: number;
  declare public email: string;
  declare public roleId: number;
}

export function initUser(sequelize: Sequelize) {
  User.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    roleId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'roles', key: 'id' } }
  }, { sequelize, timestamps: true, modelName: 'users' })
}