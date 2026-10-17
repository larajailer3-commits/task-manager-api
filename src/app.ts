
import express from "express";
import pool from "./db";
import { errorHandler } from "./api/middlewares/error.middleware";
import tasksRoutes from "./api/routes/tasks.routes";
import authRoutes from "./api/routes/auth.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/tasks", tasksRoutes);

app.use("/auth", authRoutes);

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "API funcionando correctamente",
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

app.use(errorHandler);

export default app;
