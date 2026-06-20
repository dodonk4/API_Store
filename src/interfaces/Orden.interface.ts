export default interface OrdenData {
  id: number;
  usuarioId: number | null;
  estado: "CARRITO" | "PAGO_PENDIENTE" | "PAGADA" | "CANCELADA",
  fecha: Date | null,
}