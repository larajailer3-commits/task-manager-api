# Task Manager API

API REST para la gestión de tareas, desarrollada con Node.js, Express, TypeScript y PostgreSQL. Incluye autenticación mediante JWT, protección de contraseñas con bcrypt y control de acceso por usuario.

## Tecnologías

- Node.js
- Express
- TypeScript
- PostgreSQL
- JSON Web Tokens (JWT)
- bcrypt
- Zod
- Swagger UI / OpenAPI
- `pg` para la conexión con PostgreSQL
- `dotenv` para la configuración del entorno

## Funcionalidades

- Registro de usuarios.
- Inicio de sesión y generación de tokens JWT.
- Creación, consulta, actualización y eliminación de tareas.
- Validación de datos de entrada mediante Zod.
- Protección de rutas mediante autenticación Bearer JWT.
- Restricción del acceso a las tareas según el usuario autenticado.
- Manejo centralizado de errores.
- Documentación interactiva de la API con Swagger.
- Endpoints para comprobar el estado de la API y la conexión con PostgreSQL.

## Requisitos previos

- Node.js y npm.
- PostgreSQL.
- Git.
- Una base de datos configurada para el proyecto.

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/larajailer3-commits/task-manager-api.git
```

### 2. Entrar en la carpeta del proyecto

```bash
cd task-manager-api
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Configurar las variables de entorno

Crear un archivo `.env` tomando como referencia `.env.example` y configurar las credenciales de PostgreSQL y la clave secreta JWT para el entorno local.

### 5. Configurar la base de datos

Crear la base de datos `task_manager` en PostgreSQL.

Después, ejecutar el archivo `database/schema.sql` sobre esa base de datos para crear las tablas `users` y `tasks` y el índice necesario.

El script debe ejecutarse después de conectarse a la base de datos `task_manager`.

Verificar que las credenciales configuradas en `.env` permitan conectarse a PostgreSQL.

## Variables de entorno

Configurar las siguientes variables en el archivo `.env`:

| Variable | Descripción |
|---|---|
| `PORT` | Puerto en el que se ejecuta el servidor |
| `DB_HOST` | Dirección del servidor PostgreSQL |
| `DB_PORT` | Puerto de PostgreSQL |
| `DB_NAME` | Nombre de la base de datos |
| `DB_USER` | Usuario de PostgreSQL |
| `DB_PASSWORD` | Contraseña de PostgreSQL |
| `JWT_SECRET` | Clave secreta utilizada para firmar los tokens JWT |

**Importante:** no publicar el archivo `.env` ni compartir contraseñas o claves secretas. El archivo `.env.example` debe contener únicamente valores de ejemplo.

## Ejecución

### Modo desarrollo

```bash
npm run dev
```

### Compilar el proyecto

```bash
npm run build
```

### Ejecutar la versión compilada

```bash
npm start
```

## Documentación de la API

Con el servidor en ejecución, abrir la siguiente dirección:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

Si se utiliza un puerto diferente, reemplazar `3000` por el valor configurado en `PORT`.

Swagger UI permite consultar la documentación de los endpoints y probar las solicitudes disponibles.

## Endpoints principales

| Método | Ruta | Función |
|---|---|---|
| GET | `/health` | Comprobar el estado de la API |
| GET | `/health/db` | Comprobar la conexión con PostgreSQL |
| POST | `/auth/register` | Registrar un usuario |
| POST | `/auth/login` | Iniciar sesión |
| GET | `/tasks` | Consultar las tareas propias |
| GET | `/tasks/:id` | Consultar una tarea propia |
| POST | `/tasks` | Crear una tarea |
| PUT | `/tasks/:id` | Actualizar una tarea propia |
| DELETE | `/tasks/:id` | Eliminar una tarea propia |

Las rutas de tareas requieren autenticación mediante un token JWT enviado en la cabecera HTTP:

```http
Authorization: Bearer <token>
```

## Validaciones y seguridad

- Las contraseñas se almacenan mediante hash utilizando bcrypt.
- Las rutas de tareas requieren autenticación.
- Cada usuario solo puede acceder a sus propias tareas.
- Los datos de entrada se validan antes de procesarse.
- Los errores se gestionan mediante un middleware centralizado.
- Las credenciales se configuran mediante variables de entorno.

## Documentación del desarrollo

El archivo `DEVELOPMENT_LOG.md` registra el proceso de desarrollo, el uso de asistentes de inteligencia artificial, los ajustes realizados, las verificaciones efectuadas y las decisiones de implementación propias.

## Estado del proyecto

Proyecto desarrollado como reto técnico para demostrar conocimientos en desarrollo backend, diseño de API REST, bases de datos relacionales, autenticación, validación de datos y documentación técnica.