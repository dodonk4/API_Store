import { Decimal } from "@prisma/client/runtime/client";

export interface ProductoData {
  id?: number;
  nombre: string;
  descripcion?: string | null;
  categoria: string; //No es opcional // Definir categorías con enum
  stock: number;
  precio: Decimal;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductoData {
  nombre: string;
  descripcion?: string | null;
  categoria: string; //No es opcional // Definir categorías con enum
  stock: number;
  precio: Decimal;
}
