import { Dialect } from "sequelize";

const accumulatedMissingEnvVariables: string[] = [];

if (!process.env.JWT_SECRET)
  accumulatedMissingEnvVariables.push('JWT_SECRET');

if (!process.env.DB_NAME)
  accumulatedMissingEnvVariables.push('DB_NAME');

if (!process.env.DB_HOST)
  accumulatedMissingEnvVariables.push('DB_HOST')

if (!process.env.DB_PORT)
  accumulatedMissingEnvVariables.push('DB_PORT');

if (!process.env.DB_USERNAME)
  accumulatedMissingEnvVariables.push('DB_USERNAME')

if (!process.env.DB_PASSWORD)
  accumulatedMissingEnvVariables.push('DB_PASSWORD');

if (!process.env.DB_DIALECT)
  accumulatedMissingEnvVariables.push('DB_DIALECT');

if (!process.env.DEFAULT_ADMIN_EMAIL)
  accumulatedMissingEnvVariables.push('DEFAULT_ADMIN_EMAIL');

if (!process.env.RESEND_API_KEY)
  accumulatedMissingEnvVariables.push('RESEND_API_KEY');

if (!process.env.RESEND_EMAIL)
  accumulatedMissingEnvVariables.push('RESEND_EMAIL');

if (accumulatedMissingEnvVariables.length > 0) {
  throw new Error(`Missing environment variables: ${accumulatedMissingEnvVariables}`)
}

const jwtSecret = process.env.JWT_SECRET!;
const dbName = process.env.DB_NAME!;
const dbHost = process.env.DB_HOST!;
const dbPort = process.env.DB_PORT!;
const dbUsername = process.env.DB_USERNAME!;
const dbPassword = process.env.DB_PASSWORD!;
const dbDialect = process.env.DB_DIALECT! as Dialect;
const defaultAdminEmail = process.env.DEFAULT_ADMIN_EMAIL!;
const resendAPIKey = process.env.RESEND_API_KEY!;
const resendEmail = process.env.RESEND_EMAIL!;
export { jwtSecret, dbName, dbPort, dbHost, dbUsername, dbPassword, dbDialect, defaultAdminEmail, resendAPIKey, resendEmail };