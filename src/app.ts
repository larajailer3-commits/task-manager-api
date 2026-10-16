
import express from "express";
import pool from "./db";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Task Manager API funcionando"
  });
});

app.get("/health/db", async (_req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS fecha");

    res.status(200).json({
      status: "ok",
      message: "Conexión con PostgreSQL exitosa",
      databaseTime: result.rows[0].fecha
    });
  } catch (error) {
    console.error("Error de conexión con PostgreSQL:", error);

    res.status(500).json({
      status: "error",
      message: "No se pudo conectar con PostgreSQL"
    });
  }
});

export default app;
