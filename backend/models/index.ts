import { initialize } from "lib/db";
import { Sequelize, Options } from "sequelize";
const config: Options = {
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  dialect: 'mysql'
}
const sequelize: Sequelize = new Sequelize(config);

initialize(sequelize);
export default sequelize;