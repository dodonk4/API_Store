export default interface ProductoData {
  id?: number;
  nombre: string | null;
  descripcion: string | null;
  categoria: string | null; //No es opcional // Definir categorías con enum
  stock: number;
  precio: number;
  createdAt: Date;
  updatedAt: Date;
}