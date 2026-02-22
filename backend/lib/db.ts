import { initBrand, Brand, BrandAttributes } from "models/brands";
import { initCategory, Category, CategoryAttributes } from "models/categories";
import { initProduct, Product, ProductAttributes } from "models/products";
import sequelize from "models";
import { Sequelize } from "sequelize";
import { initImgType } from "models/image_types";
import { initProductImages } from "models/product_images";
import { ImageType } from "models/image_types";
import { ProductImage } from "models/product_images";
import { Role, initRole } from "models/roles";
import { User, initUser } from 'models/users';
export function initialize(sequelize: Sequelize): void {
  initBrand(sequelize);
  initCategory(sequelize);
  initProduct(sequelize);
  initImgType(sequelize);
  initProductImages(sequelize);
  initRole(sequelize);
  initUser(sequelize);
  /* Many-to-one relationship between products and brands */
  Brand.hasMany(Product, { foreignKey: 'brandId', onDelete: 'RESTRICT' });
  Product.belongsTo(Brand, { foreignKey: 'brandId' });

  /* Many-to-one relationship between products and categories */
  Category.hasMany(Product, { foreignKey: 'categoryId', onDelete: 'RESTRICT' });
  Product.belongsTo(Category, { foreignKey: 'categoryId' });

  /* Many-to-one relationship between image types and product images */
  ImageType.hasMany(ProductImage, { foreignKey: 'imageTypeId', onDelete: 'RESTRICT' });
  ProductImage.belongsTo(ImageType, { foreignKey: 'imageTypeId' });

  /* Many-to-one relationship between product images and products */
  Product.hasMany(ProductImage, { foreignKey: 'productId', onDelete: 'CASCADE' });
  ProductImage.belongsTo(Product, { foreignKey: 'productId' });

  Role.hasMany(User, { foreignKey: 'roleId', onDelete: 'RESTRICT' });
  User.belongsTo(Role, { foreignKey: 'roleId' });
}

export async function seed(): Promise<void> {
  try {
    initialize(sequelize);
    const hasBrands = await Brand.count() > 0;
    const hasCategories = await Category.count() > 0;
    const hasProducts = await Product.count() > 0;

    const brands: BrandAttributes[] = [ { name: "adidas" }, { name: "umbro" }, { name: "nike" }, { name: "nvidia" }, { name: "amd" }, { name: "samsung" }, { name: "microsoft" }, { name: "primtex" } ];
    const mainCategories: CategoryAttributes[] = [ { name: "clothing" }, { name: "entertainment" }, { name: "office" }, { name: "furnitures" }, { name: "electronics" } ]

    if (!hasBrands)
      await Brand.bulkCreate(brands);

    if (!hasCategories)
      await Category.bulkCreate(mainCategories);

    const brandEntries = await Brand.findAll();
    const categoryEntries = await Category.findAll();

    const nike = brandEntries.find(b => b.name === "nike");
    const clothing = categoryEntries.find(c => c.name === "clothing");

    const furnitures = categoryEntries.find(c => c.name === "furnitures");
    const electronics = categoryEntries.find(c => c.name === "electronics");

    const subCategories: CategoryAttributes[] = [
      { name: "computer components", parentId: electronics?.id },
      { name: "jackets", parentId: clothing?.id },
      { name: "pants", parentId: clothing?.id },
      { name: "shoes", parentId: clothing?.id },
      { name: "outerwear", parentId: clothing?.id },
      { name: "underwear", parentId: clothing?.id },
      { name: "desks", parentId: furnitures?.id },
      { name: "chairs", parentId: furnitures?.id },
      { name: "sofas", parentId: furnitures?.id },
      { name: "beds", parentId: furnitures?.id },
    ]

    await Category.bulkCreate(subCategories);
    const childCategories = await Category.findAll();
    const accumulatedCategoriesSet = new Set([ ...categoryEntries, ...childCategories ]);
    const accumulatedCategories: CategoryAttributes[] = Array.from(accumulatedCategoriesSet);
    const shoes = accumulatedCategories.find(c => c.name === "shoes");
    const jackets = accumulatedCategories.find(c => c.name === "jackets");
    const primtex = brandEntries.find(b => b.name === "primtex");
    if (!nike || !clothing || !shoes || !primtex) return;

    const products: ProductAttributes[] = [
      { name: "Nike Superflex Blue", brandId: +nike.id, categoryId: +shoes?.id! },
      { name: "Nike Superflex Red", brandId: +nike.id, categoryId: +shoes?.id! },
      { name: "Nike Superflex Black", brandId: +nike.id, categoryId: +shoes?.id! },
      { name: "Primtex Leather Jacket", brandId: +primtex.id, categoryId: +jackets?.id! },
    ]

    if (!hasProducts)
      await Product.bulkCreate(products);
    console.info('Database has been seeded')
  } catch (error) {
    console.error(error);
    throw error;
  }
}