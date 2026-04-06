import { parseSequelizeError } from "@/lib/dbValidation";
import { Category, UpdateCategoryAttributes } from "@/models/categories";

export default class CategoryService {
  static async create(name: string): Promise<Category | null | undefined> {
    try {
      return await Category.create({ name });
    } catch (error) {
      parseSequelizeError(error, 'create');
    }
  }
  static async getAll(): Promise<Category[] | null | undefined> {
    try {
      return await Category.findAll();
    } catch (error) {
      parseSequelizeError(error, 'read');
    }
  }
  static async getById(id: number): Promise<Category | null | undefined> {
    try {
      return await Category.findOne({ where: { id } });
    } catch (error) {
      parseSequelizeError(error, 'read');
    }
  }
  static async deleteById(id: number): Promise<void> {
    try {
      await Category.destroy({ where: { id } });
    } catch (error) {
      parseSequelizeError(error, 'delete');
    }
  }
  static async updateById(id: number, data: UpdateCategoryAttributes): Promise<void> {
    try {
      await Category.update(data, { where: { id } });
    } catch (error) {
      parseSequelizeError(error, "update");
    }
  }
}