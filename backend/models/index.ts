import { initialize } from "lib/db";
import { Sequelize, Options } from "sequelize";
import { dbName, dbUsername, dbPassword, dbHost, dbPort, dbDialect } from "helpers/envVariables";
const config: Options = {
  database: dbName,
  username: dbUsername,
  password: dbPassword,
  host: dbHost,
  port: +dbPort,
  dialect: dbDialect
}
const sequelize: Sequelize = new Sequelize(config);

initialize(sequelize);
export default sequelize;