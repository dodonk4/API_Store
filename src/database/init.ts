import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./store.db');
//const db = new sqlite3.Database('./store.db');


db.serialize(() => {
  // Crear tabla productos
  db.run(`CREATE TABLE IF NOT EXISTS productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    precio REAL NOT NULL,
    stock INTEGER NOT NULL
  )`);

  // Crear tabla usuarios
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  )`);

  // Crear tabla ordenes
  db.run(`CREATE TABLE IF NOT EXISTS ordenes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuarioId INTEGER NOT NULL,
    FOREIGN KEY (usuarioId) REFERENCES usuarios(id)
  )`);

  // Crear tabla orden_productos para productos en ordenes
  db.run(`CREATE TABLE IF NOT EXISTS orden_productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ordenId INTEGER NOT NULL,
    productoId INTEGER NOT NULL,
    cantidad INTEGER NOT NULL,
    FOREIGN KEY (ordenId) REFERENCES ordenes(id),
    FOREIGN KEY (productoId) REFERENCES productos(id)
  )`);
});

export default db;