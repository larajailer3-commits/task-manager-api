
import { Pool } from "pg";
import env from "./config/env";

const pool = new Pool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
});

pool.on("error", (error) => {
  console.error("Error inesperado en PostgreSQL:", error);
});

export default pool;
