// import { prisma } from "../lib/prisma";
import db from '../database/init.ts';
import pool from '../database/index.ts';

interface UsuarioData {
  id? : number,
  nombre : string,
  email : string
}

class UsuarioPostgreSQL {
  static async create(data : UsuarioData, callback : (err : Error | null, usuario ? : UsuarioData) => void){
    const client = await pool.connect();
    const { nombre, email } = data;
    try {
      const resultUsuario = await client.query('INSERT INTO usuarios (nombre, email) VALUES (?)', [nombre, email]);
    } catch (error) {
      console.error(error);
    }finally{
      client.release();
    }
  }

  static async findAll(callback : (err : Error | null, ordenes ? : UsuarioData[]) => void){
    // const client = await pool.connect();
    try {
      // const resultAllUsuarios = await client.query('select * from usuarios');
      // const resultAllUsuarios = await prisma.usuarios.findMany();
      // callback(null, resultAllUsuarios.rows);
      // callback(null, resultAllUsuarios);
    } catch (error) {
      console.error(error);
    }
    // finally{
    //   client.release();
    // }
  }

}

class Usuario {
  static create(data : UsuarioData, callback : (err : Error | null, usuario ? : UsuarioData) => void) {
    const { nombre, email } = data;
    db.run(`INSERT INTO usuarios (nombre, email) VALUES (?, ?)`,
      [nombre, email], function(err) {
        if (err) return callback(err);
        callback(null, { id: this.lastID, ...data });
      });
  }

  static findById(id : number, callback : (err : Error | null, usuario ? : UsuarioData) => void) {
    db.get(`SELECT * FROM usuarios WHERE id = ?`, [id], callback);
  }

  static findAll(callback : (err : Error | null, usuarios ? : UsuarioData[]) => void) {
    db.all(`SELECT * FROM usuarios`, callback);
  }

  static update(id : number, data : Partial<UsuarioData>, callback : (err : Error | null, usuario ? : Partial<UsuarioData>) => void) {
    const { nombre, email } = data;

    let fields = [];
    let values = [];

    if (data.nombre !== undefined) {
      fields.push('nombre = ?');
      values.push(nombre);
    }

    if (data.email !== undefined) {
      fields.push('email = ?');
      values.push(email);
    }

    if (fields.length === 0) {
      return callback(new Error('Al menos un campo (nombre o email) es requerido'));
    }

    values.push(id);
    const sql = `UPDATE usuarios SET ${fields.join(', ')} WHERE id = ?`;

    db.run(sql, values, function(err) {
      if (err) return callback(err);
      if (this.changes === 0) return callback(new Error('Usuario no encontrado'));
        callback(null, { id, ...data });
      });
  }

  static delete(id : number, callback : (err : Error | null) => void) {
    db.run(`DELETE FROM usuarios WHERE id = ?`, [id], function(err : Error | null) {
      if (err) return callback(err);
      if (this.changes === 0) return callback(new Error('Usuario no encontrado'));
      callback(null);
    });
  }
}

export { Usuario, UsuarioPostgreSQL };