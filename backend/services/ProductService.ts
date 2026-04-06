import { parseSequelizeError } from "@/lib/dbValidation";
import { Brand } from "@/models/brands";
import { Category } from "@/models/categories";
import { ProductImage } from "@/models/product_images";
import { Product, ProductUpdateAttributes } from "@/models/products";

export default class ProductService {
  static async create(name: string, description: string, brandId: number, categoryId: number): Promise<Product | null | undefined> {
    try {
      return await Product.create({ name, description, brandId, categoryId });
    } catch (error) {
      parseSequelizeError(error, "create");
    }
  }
  static async getById(id: number): Promise<Product | null | undefined> {
    try {
      return await Product.findOne({ where: { id } });
    } catch (error) {
      parseSequelizeError(error, 'delete');
    }
  }
  static async getAll(): Promise<Product[] | null | undefined> {
    try {
      return await Product.findAll({ include: [ { model: Category }, { model: Brand }, { model: ProductImage } ] });
    } catch (error) {
      parseSequelizeError(error, "read");
    }
  }
  static async deleteById(id: number): Promise<void> {
    try {
      await Product.destroy({ where: { id } });
    } catch (error) {
      parseSequelizeError(error, 'delete')
    }
  }
  static async updateById(id: number, data: ProductUpdateAttributes): Promise<void> {
    try {
      await Product.update(data, { where: { id } });
    } catch (error) {
      parseSequelizeError(error, 'update');
    }
  }
}