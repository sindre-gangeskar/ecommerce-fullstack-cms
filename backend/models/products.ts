import { Sequelize, Model, Optional, DataTypes } from 'sequelize';

export interface ProductAttributes {
  id?: number;
  name: string;
  categoryId: number;
  brandId: number;
  description?: string;
}

export interface ProductCreationAttributes extends Optional<ProductAttributes, "id"> { };
export class Product extends Model<ProductAttributes, ProductCreationAttributes> {
  declare public id: number;
  declare public name: string;
  declare public categoryId: number;
  declare public brandId: number;
  declare public description?: string;
}

export function initProduct(sequelize: Sequelize) {
  Product.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
    categoryId: { type: DataTypes.INTEGER, references: { model: 'categories', key: 'id' }, allowNull: false },
    brandId: { type: DataTypes.INTEGER, references: { model: 'brands', key: 'id' }, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
  }, { sequelize, timestamps: true, tableName: 'products' })
}