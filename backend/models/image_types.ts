import { Sequelize, DataTypes, Optional, Model } from 'sequelize';

export interface ImageTypeAttributes {
  id?: number;
  name: string;
}

export interface ImageTypeCreationAttributes extends Optional<ImageTypeAttributes, "id"> { }
export class ImageType extends Model<ImageTypeAttributes, ImageTypeCreationAttributes> {
  declare public id: string;
  declare public name: string;
}

export function initImageType(sequelize: Sequelize) {
  ImageType.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true }
  }, { sequelize, modelName: 'image_types' })
}