import { Brand, BrandAttributes } from "models/brands";
export default class BrandService {
  static async getById(id: number): Promise<Brand | null> {
    try {
      return await Brand.findOne({ where: { id: id } });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  static async getAll(): Promise<Brand[]> {
    try {
      return await Brand.findAll();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  static async create(name: string): Promise<void> {
    try {
      await Brand.create({ name: name });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  static async delete(id: number): Promise<void> {
    try {
      await Brand.destroy({ where: { id: id } });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  static async update(id: number, data: BrandAttributes): Promise<void> {
    try {
      await Brand.update({ ...data }, { where: { id: id } })
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}