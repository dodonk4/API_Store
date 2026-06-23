interface IOrdenData {
  id: number;
  usuarioId: number | null;
  estado: "CARRITO" | "PAGO_PENDIENTE" | "PAGADA" | "CANCELADA",
  fecha: Date | null,
}

export type OrdenData = IOrdenData;