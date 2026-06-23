interface IUsuarioData {
  id: number,
  nombre: string,
  email: string,
  rol: "USER" | "ADMIN",
  password: string,
  refreshToken: string | null,
  updatedAt: Date,
  createdAt: Date,
}

export type UsuarioData = IUsuarioData;
export type CreateUsuarioData = Omit<UsuarioData, "id" | "rol">;