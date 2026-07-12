import { Decimal } from "@prisma/client/runtime/client";

export interface ProductData {
  id?: number;
  name: string;
  description?: string | null;
  category: string; //No es opcional // Definir categorías con enum
  stock: number;
  price: Decimal;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductData {
  name: string;
  description?: string | null;
  category: string; //No es opcional // Definir categorías con enum
  stock: number;
  price: Decimal;
}
