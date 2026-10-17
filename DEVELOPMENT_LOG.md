# Bitácora de Desarrollo — Task Manager API

## 1. Desarrollo inicial de la API

**Prompt reconstruido (no literal):**

Necesito desarrollar una API REST para la gestión de tareas utilizando Node.js, Express, TypeScript y PostgreSQL. Quiero organizar el proyecto mediante una arquitectura por capas, separando las rutas y los middlewares, los controladores, los servicios y la persistencia de datos, para mantener el código organizado y facilitar su mantenimiento.

La API debe incluir la configuración del entorno mediante variables de entorno, el registro de usuarios y el inicio de sesión, protegiendo las contraseñas con bcrypt y utilizando JWT para la autenticación. También necesito implementar la autorización para que cada usuario solo pueda consultar y administrar sus propias tareas.

Se deben implementar las operaciones CRUD de tareas, validar los datos recibidos, manejar los errores de forma centralizada y documentar los endpoints con Swagger. Además, el proyecto debe contar con un README que explique la instalación y ejecución, un archivo de ejemplo para las variables de entorno y una bitácora que registre el proceso de desarrollo.

Quiero desarrollar estas funcionalidades teniendo en cuenta los requisitos técnicos del reto, revisando el código durante el proceso y realizando pruebas para comprobar que la API funcione correctamente.

### Qué se aceptó y por qué

Se utilizó esta orientación para organizar las funcionalidades principales y trabajar con las tecnologías solicitadas. La separación por capas ayuda a distribuir las responsabilidades del código, mientras que la autenticación, la autorización y las validaciones permiten controlar el acceso y los datos que recibe la API.

### Qué se rechazó o modificó y por qué

Durante la implementación fue necesario ajustar algunas partes del código para que funcionaran correctamente con la estructura del proyecto.

- **Middleware de validación:** se corrigió la organización de las funciones porque su ubicación generaba errores al importarlas desde las rutas. Se reorganizó el archivo para separar las validaciones y permitir su uso correcto.
- **Ruta de creación de tareas:** durante una prueba se modificó temporalmente la respuesta de la ruta para comprobar su comportamiento. Después se restauró la implementación correspondiente, incluyendo el middleware de validación.
- **Configuración del entorno:** se preparó un archivo `.env.example` para mostrar las variables necesarias. Las credenciales privadas deben mantenerse en `.env` y no publicarse en el repositorio.
- **Integración del código:** las propuestas se revisaron dentro del proyecto y se realizaron ajustes cuando aparecieron errores de compilación o de funcionamiento, en lugar de mantener una implementación que no respondiera correctamente.

Estos cambios se realizaron para corregir problemas de integración, conservar las validaciones y mantener una configuración adecuada para el proyecto.

### Verificación realizada

Se comprobó que el proyecto compilara sin errores mediante `npm run build`. También se realizaron pruebas de registro, inicio de sesión, operaciones CRUD, validación de datos y control de acceso entre usuarios. Finalmente, se abrió Swagger UI para comprobar que aparecieran las secciones de autenticación y tareas.

## 2. Decisiones de implementación propias

### 2.1. Diseño y revisión de la base de datos

Participé en la definición y revisión de los campos de la base de datos. Durante este proceso identifiqué aspectos que debían ajustarse respecto a la propuesta inicial y realicé cambios para que la información almacenada correspondiera mejor con las necesidades del proyecto.

Tuve en cuenta que los campos debían tener una utilidad dentro de la gestión de tareas y que la relación entre usuarios y tareas permitiera identificar quién es responsable de cada registro. Esta revisión fue importante para no aceptar automáticamente una estructura sin comprobar si respondía a las necesidades de la aplicación.

### 2.2. Ejecución de pruebas funcionales

Decidí comprobar el funcionamiento de la API mediante solicitudes reales, en lugar de quedarme únicamente con la revisión del código. Probé el registro, el inicio de sesión, la creación, consulta, actualización y eliminación de tareas, además de solicitudes sin autenticación y el acceso a tareas de otro usuario.

Consideré estas pruebas necesarias porque una aplicación puede compilar correctamente y aun así presentar problemas durante su ejecución. Revisar las respuestas me permitió comprobar el comportamiento de las funcionalidades y detectar errores que debían corregirse.