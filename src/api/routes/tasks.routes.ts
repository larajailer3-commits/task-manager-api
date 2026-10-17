
import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware";
import {
  validateBody,
  validateTaskId,
} from "../middlewares/validate.middleware";

import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../../controllers/tasks.controller";

import {
  createTaskSchema,
  updateTaskSchema,
} from "../../validators/tasks.validator";

const router = Router();

// Todas las rutas requieren un usuario autenticado.
router.use(authenticateToken);

router.get("/", getTasks);

router.get(
  "/:id",
  validateTaskId,
  getTaskById
);

router.post("/", validateBody(createTaskSchema), createTask);

router.put(
  "/:id",
  validateTaskId,
  validateBody(updateTaskSchema),
  updateTask
);

router.delete(
  "/:id",
  validateTaskId,
  deleteTask
);

export default router;
