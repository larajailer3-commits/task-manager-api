
import { z } from "zod";

const taskFields = {
  title: z
    .string()
    .trim()
    .min(1, "El título es obligatorio")
    .max(150, "El título no puede superar 150 caracteres"),

  description: z
    .string()
    .trim()
    .max(2000, "La descripción no puede superar 2000 caracteres")
    .nullable()
    .optional(),

  due_date: z
    .string()
    .date("La fecha de vencimiento debe tener formato AAAA-MM-DD")
    .nullable()
    .optional(),

  status: z
    .enum(["pendiente", "en curso", "completada"])
    .optional(),
};

export const createTaskSchema = z.object(taskFields);

export const updateTaskSchema = z.object({
  ...taskFields,
  status: z.enum(["pendiente", "en curso", "completada"]),
});
