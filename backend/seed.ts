import { seed } from "lib/db"
import sequelize from "models";
(async () => {
  await seed(sequelize);
})()