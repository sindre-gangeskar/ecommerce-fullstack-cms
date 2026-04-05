import { seed } from "lib/db"
import sequelize from "models/index";
(async () => {
  await seed(sequelize);
})()