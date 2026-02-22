import { Sequelize, DataTypes, Optional, Model } from "sequelize";

export interface RoleAttributes {
  id?: number;
  name: string;
}

export interface RoleCreationAttributes extends Optional<RoleAttributes, "id"> { };
export class Role extends Model {
  declare public id: number;
  declare public name: string;
}

export function initRole(sequelize: Sequelize) {
  Role.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  }, { sequelize: sequelize, timestamps: false, modelName: 'roles' })
}