export default interface ProductoData {
  id?: number;
  nombre: string | null;
  descripcion: string | null;
  categoria: string | null;
  stock: number;
  precio: number;
}