
import type { Request, Response, NextFunction } from "express";
import * as tasksService from "../services/tasks.service";

export async function getTasks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user!.id;
    const tasks = await tasksService.getTasks(userId);

    res.status(200).json({ data: tasks });
  } catch (error) {
    next(error);
  }
}

export async function getTaskById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const taskId = Number(req.params.id);
    const userId = req.user!.id;

    const task = await tasksService.getTaskById(taskId, userId);

    if (!task) {
      res.status(404).json({ message: "Tarea no encontrada" });
      return;
    }

    res.status(200).json({ data: task });
  } catch (error) {
    next(error);
  }
}

export async function createTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user!.id;
    const task = await tasksService.createNewTask(userId, req.body);

    res.status(201).json({ data: task });
  } catch (error) {
    next(error);
  }
}

export async function updateTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const taskId = Number(req.params.id);
    const userId = req.user!.id;

    const task = await tasksService.updateExistingTask(
      taskId,
      userId,
      req.body
    );

    if (!task) {
      res.status(404).json({ message: "Tarea no encontrada" });
      return;
    }

    res.status(200).json({ data: task });
  } catch (error) {
    next(error);
  }
}

export async function deleteTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const taskId = Number(req.params.id);
    const userId = req.user!.id;

    const deleted = await tasksService.removeTask(taskId, userId);

    if (!deleted) {
      res.status(404).json({ message: "Tarea no encontrada" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
