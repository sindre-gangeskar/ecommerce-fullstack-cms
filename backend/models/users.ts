import { Sequelize, DataTypes, Optional, Model } from 'sequelize';
import { RoleAttributes } from './roles';

export interface UserAttributes {
  id?: number;
  email: string;
  roleId?: number;
  role?: RoleAttributes;
}

export interface UserCreationAttributes extends Optional<UserAttributes, "id"> { }
export class User extends Model<UserAttributes, UserCreationAttributes> {
  declare public id: number;
  declare public email: string;
  declare public roleId?: number;
  declare public role?: RoleAttributes
}

export function initUser(sequelize: Sequelize) {
  User.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: { msg: 'Incorrect email format, please double-check and try again' } } },
    roleId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'roles', key: 'id' }, defaultValue: 1 }
  }, { sequelize, timestamps: true, modelName: 'users' })
}