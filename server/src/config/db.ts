import { DataSource } from "typeorm"
import config from "./config"
import * as PostgresStringParser from "pg-connection-string"
import * as pg from "pg"
import logger from "../utils/logger"

const databaseUrl = config.DATABASE_URL || ""
const connectionOptions = PostgresStringParser.parse(databaseUrl)

pg.defaults.parseInputDatesAsUTC = true
pg.types.setTypeParser(
  pg.types.builtins.TIMESTAMP,
  (val: string) => new Date(`${val}Z`),
)

export const db = new DataSource({
  type: "postgres",
  host: connectionOptions.host || "",
  port: parseInt(connectionOptions.port!),
  username: connectionOptions.user,
  password: connectionOptions.password,
  database: connectionOptions.database || "",
  entities: [__dirname + "/../models/*.{js,ts}"],
  // logging: process.env.NODE_ENV === "test" ? false : true,
  logging: false,
  synchronize: true,
})

export const clearDatabase = async () => {
  const table_names = await db.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE'
  `)

  for (const { table_name } of table_names) {
    await db.query(`TRUNCATE TABLE "${table_name}" CASCADE`)
  }
}

export const initializeDatabase = async () => {
  try {
    // dont run in jest tests
    if (process.env.JEST !== "true") {
      await db.initialize()
      logger.info("Database initialized")
    }
  } catch (e) {
    logger.error("Database initialization error", e)
  }
}
