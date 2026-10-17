
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),

  DB_HOST: z.string().min(1, "DB_HOST es obligatorio"),
  DB_PORT: z.coerce.number().int().positive().default(5432),
  DB_NAME: z.string().min(1, "DB_NAME es obligatorio"),
  DB_USER: z.string().min(1, "DB_USER es obligatorio"),
  DB_PASSWORD: z.string().min(1, "DB_PASSWORD es obligatorio"),
  JWT_SECRET: z.string().min(32, "JWT_SECRET debe tener al menos 32 caracteres"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "Error en la configuración de variables de entorno:",
    parsedEnv.error.flatten().fieldErrors
  );

  throw new Error("La configuración del entorno no es válida");
}

const env = Object.freeze(parsedEnv.data);

export default env;
