import { parseSequelizeError } from "@/lib/dbValidation";
import { ImageType } from "@/models/image_types";
import { ProductImage, ProductImageUpdateAttributes } from "@/models/product_images";

export class ProductImageService {
  static async create(img_url: string, productId: number, imageTypeId: number): Promise<ProductImage | null | undefined> {
    try {
      return await ProductImage.create({ img_url, productId, imageTypeId })
    } catch (error) {
      parseSequelizeError(error, 'create');
    }
  }
  static async getByProductId(productId: number): Promise<ProductImage[] | null | undefined> {
    try {
      return await ProductImage.findAll({ where: { productId }, include: { model: ImageType } });
    } catch (error) {
      parseSequelizeError(error, 'read');
    }
  }
  static async updateById(id: number, data: ProductImageUpdateAttributes): Promise<void> {
    try {
      await ProductImage.update(data, { where: { id } });
    } catch (error) {
      parseSequelizeError(error, 'update');
    }
  }
  static async deleteById(id: number): Promise<void> {
    try {
      await ProductImage.destroy({ where: { id: id } });
    } catch (error) {
      parseSequelizeError(error, 'delete');
    }
  }
}