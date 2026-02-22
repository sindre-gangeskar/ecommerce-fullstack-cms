import { Sequelize, Model, Optional, DataTypes } from "sequelize";

export interface CategoryAttributes {
  id?: number;
  name: string;
  parentId?: number;
}

export interface CreationCategoryAttributes extends Optional<CategoryAttributes, "id"> { };
export class Category extends Model<CategoryAttributes, CreationCategoryAttributes> {
  declare public id: number;
  declare public name: string
  declare public parentId?: number;
}

export function initCategory(sequelize: Sequelize) {
  Category.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
    parentId: { type: DataTypes.INTEGER, allowNull: true, references: {model: 'categories', key: 'id'} },
  }, { sequelize, timestamps: false, tableName: 'categories' })
}