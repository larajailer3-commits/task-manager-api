
import type { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { name, email, password } = req.body;

    const user = await authService.registerUser(name, email, password);

    res.status(201).json({
      message: "Usuario registrado correctamente",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { email, password } = req.body;

    const result = await authService.loginUser(email, password);

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

