
import type { Request, Response, NextFunction } from "express";

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error("Error en la API:", error.message);

  if (error.message === "EMAIL_ALREADY_EXISTS") {
    res.status(409).json({
      message: "Ya existe una cuenta registrada con ese correo",
    });
    return;
  }

  if (error.message === "INVALID_CREDENTIALS") {
    res.status(401).json({
      message: "Correo o contraseña incorrectos",
    });
    return;
  }

  res.status(500).json({
    message: "Error interno del servidor",
  });
}
