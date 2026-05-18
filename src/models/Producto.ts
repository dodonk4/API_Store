import db from '../database/init.ts';

interface ProductoData {
  id?: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
}

class Producto {
  static create(data : Omit<ProductoData, 'id'>, callback: (err: Error | null, producto?: ProductoData) => void) {
    const { nombre, descripcion, precio, stock } = data;
    db.run(`INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)`,
      [nombre, descripcion, precio, stock], function(err : Error | null) {
        if (err) return callback(err);
        callback(null, { id: this.lastID, ...data });
      });
  }

  static findById(id : number, callback: (err: Error | null, producto?: ProductoData) => void) {
    db.get(`SELECT * FROM productos WHERE id = ?`, [id], callback);
  }

  static findAll(callback: (err: Error | null, productos?: ProductoData[]) => void) {
    db.all(`SELECT * FROM productos`, callback);
  }

  static update(id : number, data : Partial<ProductoData>, callback: (err: Error | null, producto?: ProductoData) => void) {
    Producto.findById(id, (err: Error | null, producto?: ProductoData) => {
      if (err) return callback(err);
      if (!producto) return callback(new Error('Producto no encontrado'));

      const fields = [];
      const values = [];

      if (data.nombre !== undefined) {
        fields.push('nombre = ?');
        values.push(data.nombre);
      }
      if (data.descripcion !== undefined) {
        fields.push('descripcion = ?');
        values.push(data.descripcion);
      }
      if (data.precio !== undefined) {
        fields.push('precio = ?');
        values.push(data.precio);
      }
      if (data.stock !== undefined) {
        fields.push('stock = ?');
        values.push(data.stock);
      }

      if (fields.length === 0) {
        return callback(null, producto);
      }

      values.push(id);
      const sql = `UPDATE productos SET ${fields.join(', ')} WHERE id = ?`;

      db.run(sql, values, function(err) {
        if (err) return callback(err);
        if (this.changes === 0) return callback(new Error('Producto no encontrado'));

        const updatedProducto : ProductoData = {
          id,
          nombre: data.nombre !== undefined ? data.nombre : producto.nombre,
          descripcion: data.descripcion !== undefined ? data.descripcion as string : producto.descripcion as string,
          precio: data.precio !== undefined ? data.precio : producto.precio,
          stock: data.stock !== undefined ? data.stock : producto.stock,
        };
        callback(null, updatedProducto);
      });
    });
  }

  static delete(id : number, callback : (err : Error | null) => void) {
    db.run(`DELETE FROM productos WHERE id = ?`, [id], function(err : Error | null) {
      if (err) return callback(err);
      if (this.changes === 0) return callback(new Error('Producto no encontrado'));
      callback(null);
    });
  }
}

export default Producto;