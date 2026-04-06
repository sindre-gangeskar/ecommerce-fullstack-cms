import { parseSequelizeError } from "@/lib/dbValidation";
import { Brand, BrandAttributes } from "models/brands";
export default class BrandService {
  static async getById(id: number): Promise<Brand | null | undefined> {
    try {
      return await Brand.findOne({ where: { id: id } });
    } catch (error) {
      parseSequelizeError(error, 'read');
    }
  }
  static async getAll(): Promise<Brand[] | null | undefined> {
    try {
      return await Brand.findAll();
    } catch (error) {
      parseSequelizeError(error, 'read');
    }
  }
  static async create(name: string): Promise<Brand | null | undefined> {
    try {
      return await Brand.create({ name: name });
    } catch (error) {
      console.error(error);
      parseSequelizeError(error, 'create');
    }
  };
  static async deleteById(id: number): Promise<void> {
    try {
      await Brand.destroy({ where: { id: id } });
    } catch (error) {
      parseSequelizeError(error, 'delete');
    }
  };
  static async updateById(id: number, data: BrandAttributes): Promise<void> {
    try {
      await Brand.update({ ...data }, { where: { id: id } })
    } catch (error) {
      parseSequelizeError(error, 'update');
    }
  };
}