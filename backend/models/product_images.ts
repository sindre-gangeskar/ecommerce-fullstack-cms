import { Sequelize, Optional, DataTypes, Model } from 'sequelize';

export interface ProductImageAttributes {
  id?: number;
  img_url: string;
  productId: number;
  imageTypeId: number;
}

export interface ProductImageCreationAttributes extends Optional<ProductImageAttributes, "id"> { }
export class ProductImage extends Model<ProductImageAttributes, ProductImageCreationAttributes> {
  declare public id: number;
  declare public img_url: string;
  declare public productId: number;
  declare public imageTypeId: number;
}

export function initProductImages(sequelize: Sequelize) {
  ProductImage.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    img_url: { type: DataTypes.TEXT, allowNull: false },
    productId: { type: DataTypes.INTEGER, references: { model: 'products', key: 'id' } },
    imageTypeId: { type: DataTypes.INTEGER, references: { model: 'image_types', key: 'id' } }
  }, { sequelize, timestamps: true, modelName: 'product_images' })
}