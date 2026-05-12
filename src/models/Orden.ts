import db from '../database/init';

interface OrdenData {
  id?: number;
  usuarioId: number;
  productos: { productoId: number; cantidad: number }[];
}

class Orden {
  static create(data : OrdenData, callback : (err : Error | null, orden ? : OrdenData) => void) {
    const { usuarioId, productos } = data;
    db.run(`INSERT INTO ordenes (usuarioId) VALUES (?)`, [usuarioId], function(err) {
      if (err) return callback(err);
      const ordenId = this.lastID;
      // Insertar productos en orden_productos
      const stmt = db.prepare(`INSERT INTO orden_productos (ordenId, productoId, cantidad) VALUES (?, ?, ?)`);
      productos.forEach((prod : any) => {
        stmt.run([ordenId, prod.productoId, prod.cantidad]);
      });
      stmt.finalize();
      callback(null, { id: ordenId, usuarioId, productos });
    });
  }

  static findById(id : number, callback : (err : Error | null, orden ? : OrdenData) => void) {
    db.get(`SELECT * FROM ordenes WHERE id = ?`, [id], (err : Error | null, orden : OrdenData | null) => {
      if (err) return callback(err);
      if (!orden) return callback(null, undefined);
      // Obtener productos
      db.all(`SELECT productoId, cantidad FROM orden_productos WHERE ordenId = ?`, [id], (err : Error | null, productos : any) => {
        if (err) return callback(err);
        orden.productos = productos;
        callback(null, orden);
      });
    });
  }

  static findAll(callback : (err : Error | null, ordenes ? : OrdenData[]) => void) {
    db.all(`SELECT * FROM ordenes`, (err : Error | null, ordenes : OrdenData[] | null) => {
      if (err) return callback(err);
      if (!ordenes || ordenes.length === 0) return callback(null, []);
      
      let processed = 0;
      ordenes.forEach((orden : OrdenData) => {
        db.all(`SELECT productoId, cantidad FROM orden_productos WHERE ordenId = ?`, [orden.id], (err : Error | null, productos : { productoId: number; cantidad: number }[]) => {
          if (!err) orden.productos = productos || [];
          processed++;
          if (processed === ordenes.length) callback(null, ordenes);
        });
      });
    });
  }

  static update(id : number, data : OrdenData, callback : (err : Error | null, orden ? : Partial<OrdenData>) => void) {
    const { productos } = data;
    // Primero, eliminar productos existentes
    db.run(`DELETE FROM orden_productos WHERE ordenId = ?`, [id], (err) => {
      if (err) return callback(err);
      // Insertar nuevos productos
      const stmt = db.prepare(`INSERT INTO orden_productos (ordenId, productoId, cantidad) VALUES (?, ?, ?)`);
      productos.forEach((prod : { productoId: number; cantidad: number }) => {
        stmt.run([id, prod.productoId, prod.cantidad]);
      });
      stmt.finalize();
      callback(null, { id, productos });
    });
  }

  static delete(id : number, callback : (err : Error | null) => void) {
    db.run(`DELETE FROM orden_productos WHERE ordenId = ?`, [id], (err : Error | null) => {
      if (err) return callback(err);
      db.run(`DELETE FROM ordenes WHERE id = ?`, [id], function(err : Error | null) {
        if (err) return callback(err);
        if (this.changes === 0) return callback(new Error('Orden no encontrada'));
        callback(null);
      });
    });
  }
}

export default Orden;