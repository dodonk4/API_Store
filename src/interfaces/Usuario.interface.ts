export default interface UsuarioData {
  id?: number,
  nombre: string | null,
  email: string | null,
  rol: "USER" | "ADMIN",
  password: string,
  refreshToken: string | null,
  updatedAt: Date,
  createdAt: Date,
}