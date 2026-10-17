
export const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Task Manager API",
    version: "1.0.0",
    description: "API REST para gestionar usuarios y tareas con autenticación JWT.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor local",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      Task: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          title: { type: "string", example: "Estudiar TypeScript" },
          description: {
            type: "string",
            nullable: true,
            example: "Repasar interfaces y tipos",
          },
          due_date: {
            type: "string",
            format: "date",
            nullable: true,
            example: "2026-10-20",
          },
          status: {
            type: "string",
            enum: ["pendiente", "en curso", "completada"],
            example: "pendiente",
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          message: { type: "string", example: "Error de validación" },
        },
      },
    },
  },
  paths: {
    "/health": {
      get: {
        summary: "Verificar que la API funciona",
        responses: {
          "200": { description: "API funcionando" },
        },
      },
    },
    "/health/db": {
      get: {
        summary: "Verificar conexión con PostgreSQL",
        responses: {
          "200": { description: "Conexión exitosa" },
          "500": { description: "Error de conexión" },
        },
      },
    },
    "/auth/register": {
      post: {
        tags: ["Autenticación"],
        summary: "Registrar un usuario",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "password"],
                properties: {
                  name: { type: "string", example: "Usuario de prueba" },
                  email: { type: "string", format: "email", example: "usuario@example.com" },
                  password: { type: "string", format: "password", example: "MiClaveSegura123!" },
                },
              },
            },
          },
        },
        responses: {
          "201": { description: "Usuario registrado" },
          "400": { description: "Datos inválidos" },
          "409": { description: "El correo ya existe" },
        },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Autenticación"],
        summary: "Iniciar sesión y obtener un token JWT",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string", format: "email", example: "usuario@example.com" },
                  password: { type: "string", format: "password", example: "MiClaveSegura123!" },
                },
              },
            },
          },
        },
        responses: {
          "200": { description: "Inicio de sesión exitoso" },
          "401": { description: "Credenciales incorrectas" },
        },
      },
    },
    "/tasks": {
      get: {
        tags: ["Tareas"],
        summary: "Consultar las tareas del usuario autenticado",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "Lista de tareas",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Task" },
                },
              },
            },
          },
          "401": { description: "Token ausente o inválido" },
        },
      },
      post: {
        tags: ["Tareas"],
        summary: "Crear una tarea",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title"],
                properties: {
                  title: { type: "string", example: "Estudiar para la prueba" },
                  description: { type: "string", nullable: true },
                  due_date: { type: "string", format: "date", nullable: true },
                  status: {
                    type: "string",
                    enum: ["pendiente", "en curso", "completada"],
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": { description: "Tarea creada" },
          "400": { description: "Datos inválidos" },
          "401": { description: "No autenticado" },
        },
      },
    },
    "/tasks/{id}": {
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "integer", minimum: 1 },
        },
      ],
      get: {
        tags: ["Tareas"],
        summary: "Consultar una tarea propia por ID",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "Tarea encontrada",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Task" },
              },
            },
          },
          "401": { description: "No autenticado" },
          "404": { description: "Tarea no encontrada" },
        },
      },
      put: {
        tags: ["Tareas"],
        summary: "Actualizar una tarea propia",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title", "status"],
                properties: {
                  title: { type: "string", example: "Terminar el proyecto" },
                  description: { type: "string", nullable: true },
                  due_date: { type: "string", format: "date", nullable: true },
                  status: {
                    type: "string",
                    enum: ["pendiente", "en curso", "completada"],
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": { description: "Tarea actualizada" },
          "400": { description: "Datos inválidos" },
          "401": { description: "No autenticado" },
          "404": { description: "Tarea no encontrada" },
        },
      },
      delete: {
        tags: ["Tareas"],
        summary: "Eliminar una tarea propia",
        security: [{ bearerAuth: [] }],
        responses: {
          "204": { description: "Tarea eliminada" },
          "401": { description: "No autenticado" },
          "404": { description: "Tarea no encontrada" },
        },
      },
    },
  },
};
