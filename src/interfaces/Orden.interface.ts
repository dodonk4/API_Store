export interface OrdenData {
  id: number;
  usuarioId: number;
  estado: "CARRITO" | "PAGO_PENDIENTE" | "PAGADA" | "CANCELADA",
  fecha: Date,
}

export interface CreateOrdenData {
  usuarioId?: number;
  estado?: "CARRITO" | "PAGO_PENDIENTE" | "PAGADA" | "CANCELADA",
  fecha?: Date;
}

export interface UpdateOrdenData {
  usuarioId?: number;
  estado?: "CARRITO" | "PAGO_PENDIENTE" | "PAGADA" | "CANCELADA",
  fecha?: Date,
}