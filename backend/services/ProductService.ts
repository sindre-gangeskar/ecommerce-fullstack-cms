import { parseSequelizeError } from "@/lib/dbValidation";
import { Brand } from "@/models/brands";
import { Category } from "@/models/categories";
import { Product } from "@/models/products";

export default class ProductService {
  static async create(name: string, description: string, brandId: number, categoryId: number): Promise<Product | null | undefined> {
    try {
      return await Product.create({ name, description, brandId, categoryId });
    } catch (error) {
      parseSequelizeError(error, "create");
    }
  }
  static async getAll(): Promise<Product[] | null | undefined> {
    try {
      return await Product.findAll({ include: [ { model: Category }, { model: Brand } ] });
    } catch (error) {
      parseSequelizeError(error, "read");
    }
  }
}