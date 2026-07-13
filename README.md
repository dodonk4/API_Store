# API Store

API REST desarrollada con **Node.js**, **Express**, **TypeScript** y **Prisma ORM** para la gestión de una tienda online.

El proyecto implementa autenticación mediante JWT, autorización basada en roles, validación de datos con Zod y una arquitectura en capas orientada al mantenimiento y la escalabilidad.

---

## Características

* Gestión de usuarios.
* Gestión de productos.
* Gestión de órdenes.
* Asociación de productos a órdenes.
* Autenticación mediante JSON Web Tokens (JWT).
* Refresh Tokens.
* Autorización basada en roles.
* Validación de datos con Zod.
* Manejo centralizado de errores.
* Persistencia con PostgreSQL utilizando Prisma ORM.
* Tests de integración con Jest y Supertest.

---

## Tecnologías utilizadas

| Tecnología | Descripción               |
| ---------- | ------------------------- |
| TypeScript | Lenguaje principal        |
| Node.js    | Entorno de ejecución      |
| Express    | Framework para la API     |
| Prisma ORM | Acceso a la base de datos |
| PostgreSQL | Base de datos relacional  |
| Zod        | Validación de datos       |
| JWT        | Autenticación             |
| Jest       | Testing                   |
| Supertest  | Tests de integración      |

---

## Arquitectura

El proyecto sigue una arquitectura en capas para separar responsabilidades.

```text
src/
├── config/
├── controllers/
├── errors/
├── interfaces/
├── lib/
├── middlewares/
├── routes/
├── schemas/
├── services/
├── types/
└── utils/
```

### Descripción de las capas

| Carpeta     | Responsabilidad                                        |
| ----------- | ------------------------------------------------------ |
| controllers | Reciben las solicitudes HTTP y coordinan la respuesta. |
| services    | Contienen la lógica de negocio.                        |
| routes      | Definen los endpoints de la API.                       |
| middlewares | Autenticación, autorización y validaciones.            |
| schemas     | Esquemas de validación con Zod.                        |
| errors      | Clases de errores personalizadas.                      |
| utils       | Funciones auxiliares reutilizables.                    |
| lib         | Configuración de librerías externas como Prisma.       |

---

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/dodonk4/API_Store.git
cd API_Store
```

Instalar las dependencias:

```bash
npm install
```

---

## Variables de entorno

Crear un archivo `.env.development` con las variables necesarias.

Ejemplo:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/api_store_dev"

AUTH_SECRET="your_jwt_access_token_secret" 
AUTH_SECRET_EXPIRES_IN="15m"
AUTH_REFRESH_SECRET="your_jwt_refresh_token_secret"
AUTH_REFRESH_SECRET_EXPIRES_IN="24h"

PORT=3000
```

También es posible utilizar los archivos de entorno correspondientes para testing y producción.

---

## Base de datos

Ejecutar las migraciones:

```bash
npm run migrate:dev
```

Si se desea cargar datos iniciales:

```bash
npm run seed:dev
```

---

## Ejecutar el proyecto

Modo desarrollo:

```bash
npm run dev
```

Modo producción:

```bash
npm start
```

---

## Ejecutar los tests

```bash
npm test
```

Las pruebas utilizan una base de datos independiente para no afectar los datos del entorno de desarrollo.

---

## Estructura general de la API

La API permite gestionar:

* Usuarios
* Productos
* Órdenes
* Productos pertenecientes a una orden
* Autenticación de usuarios

Cada recurso cuenta con los endpoints necesarios para realizar operaciones CRUD, respetando los códigos de estado HTTP correspondientes.

---

## Manejo de errores

La aplicación utiliza clases de errores personalizadas para responder de forma consistente.

Entre ellas:

* BadRequestError
* UnauthorizedError
* ForbiddenError
* NotFoundError
* ConflictError
* ValidationError

Esto permite centralizar el manejo de errores y mantener una respuesta uniforme en toda la API.

---

## Seguridad

La API incorpora diferentes mecanismos de seguridad:

* Autenticación mediante Access Token y Refresh Token.
* Autorización basada en roles.
* Validación de datos mediante Zod.
* Contraseñas almacenadas de forma segura mediante hash.
* Manejo centralizado de errores para evitar exponer información sensible.

---

## Próximas mejoras

* Documentación interactiva con Swagger/OpenAPI.
* Deploy de la API.
* Dockerización del proyecto.

---

## Licencia

Este proyecto se distribuye bajo la licencia MIT.

---

## Autor

**Ismael Madarieta**

GitHub: https://github.com/dodonk4
