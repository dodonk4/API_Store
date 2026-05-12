# API REST Store

Una API REST para gestionar productos, usuarios y órdenes en una tienda, implementada con Node.js y Express.js.

## Instalación

1. Clona el repositorio.
2. Instala las dependencias: `npm install`
3. Ejecuta el servidor: `npm start` o `npm run dev` para desarrollo.

## Endpoints

### Productos
- `POST /productos` - Registrar un nuevo producto
- `GET /productos/{productoId}` - Obtener datos de un producto
- `PUT /productos/{productoId}` - Actualizar un producto
- `DELETE /productos/{productoId}` - Eliminar un producto

### Usuarios
- `POST /usuarios` - Registrar un nuevo usuario
- `GET /usuarios/{usuarioId}` - Obtener datos de un usuario
- `PUT /usuarios/{usuarioId}` - Actualizar un usuario
- `DELETE /usuarios/{usuarioId}` - Eliminar un usuario

### Órdenes
- `POST /ordenes` - Registrar una nueva orden
- `GET /ordenes/{ordenId}` - Obtener datos de una orden
- `PUT /ordenes/{ordenId}` - Actualizar una orden (insertar productos)
- `DELETE /ordenes/{ordenId}` - Eliminar una orden

## Base de Datos

Utiliza SQLite para persistencia de datos. El archivo `store.db` se crea automáticamente al iniciar el servidor.