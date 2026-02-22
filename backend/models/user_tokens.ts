import { Sequelize, DataTypes, Optional, Model } from 'sequelize';

export interface UserLoginTokenAttributes {
  id?: number;
  token: string;
  userId: number;
}

export interface UserLoginTokenCreationAttributes extends Optional<UserLoginTokenAttributes, "id"> { };
export class UserLoginToken extends Model<UserLoginTokenAttributes, UserLoginTokenCreationAttributes> {
  declare public id: number;
  declare public token: string;
  declare public userId: number;
}

export function initUserLoginToken(sequelize: Sequelize) {
  UserLoginToken.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    token: { type: DataTypes.TEXT, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } }
  }, { sequelize, timestamps: true, modelName: 'user_login_tokens' })
}