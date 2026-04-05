import { Sequelize, DataTypes, Optional, Model } from 'sequelize';

export interface UserLoginTokenAttributes {
  id?: number;
  token: string;
  path: string;
  userId: number;
  expiresAt: Date
}

export interface UserLoginTokenCreationAttributes extends Optional<UserLoginTokenAttributes, "id"> { };
export class UserLoginToken extends Model<UserLoginTokenAttributes, UserLoginTokenCreationAttributes> {
  declare public id: number;
  declare public token: string;
  declare public path: string;
  declare public userId: number;
  declare public expiresAt: Date
}

export function initUserLoginToken(sequelize: Sequelize) {
  UserLoginToken.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    token: { type: DataTypes.TEXT, allowNull: false },
    path: { type: DataTypes.TEXT, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' }, unique: true },
    expiresAt: { type: DataTypes.DATE, allowNull: false, defaultValue: () => new Date(Date.now() + 1000 * 60 * 5) }
  }, { sequelize, timestamps: true, modelName: 'user_login_tokens' })
}