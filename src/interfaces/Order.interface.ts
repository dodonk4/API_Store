export interface OrderData {
  id: number;
  userId: number;
  state: "CART" | "PENDING_PAYMENT" | "PAID" | "CANCELED",
  date: Date,
}

export interface CreateOrderData {
  userId?: number;
  state?: "CART" | "PENDING_PAYMENT" | "PAID" | "CANCELED",
  date?: Date;
}

export interface UpdateOrderData {
  userId?: number;
  state?: "CART" | "PENDING_PAYMENT" | "PAID" | "CANCELED",
  date?: Date,
}