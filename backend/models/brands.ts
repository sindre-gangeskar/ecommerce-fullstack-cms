import { Sequelize, Model, Optional, DataTypes } from 'sequelize';

export interface BrandAttributes {
  id?: number;
  name: string;
}

export interface BrandCreationAttributes extends Optional<BrandAttributes, "id"> { };
export class Brand extends Model<BrandAttributes, BrandCreationAttributes> {
  declare public id: string;
  declare public name: string;
}

export function initBrand(sequelize: Sequelize) {
  Brand.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true }
  }, { sequelize, timestamps: false, tableName: 'brands' })
}