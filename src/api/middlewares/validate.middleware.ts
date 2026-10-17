
import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";

/**
 * Valida el cuerpo de una petición utilizando el esquema de Zod.
 */
export function validateBody(schema: ZodType) {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        message: "Error de validación",
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
      return;
    }

    req.body = result.data;
    next();
  };
}

/**
 * Comprueba que el ID de la tarea sea un entero positivo.
 */
export function validateTaskId(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const taskId = Number(req.params.id);

  if (!Number.isInteger(taskId) || taskId <= 0) {
    res.status(400).json({
      message: "El ID de la tarea debe ser un número entero positivo",
    });
    return;
  }

  next();
}
