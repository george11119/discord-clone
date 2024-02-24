import { DataSource } from "typeorm"
import config from "./config"
import * as PostgresStringParser from "pg-connection-string"

const databaseUrl = config.DATABASE_URL || ""
const connectionOptions = PostgresStringParser.parse(databaseUrl)

export const db = new DataSource({
  type: "postgres",
  host: connectionOptions.host || "",
  port: parseInt(connectionOptions.port!),
  username: connectionOptions.user,
  password: connectionOptions.password,
  database: connectionOptions.database || "",
  entities: [__dirname + "./../models/*.{js,ts}"],
  logging: true,
  synchronize: true,
})
