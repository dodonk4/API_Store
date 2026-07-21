interface IUserData {
  id: number,
  username: string,
  email: string,
  rol: "USER" | "ADMIN",
  password: string,
  refreshToken: string | null,
  updatedAt: Date,
  createdAt: Date,
}

export type UserData = IUserData;
export type CreateUserData = Omit<UserData, "id" | "rol">;
export type UserResponse = Omit<UserData, "password" | "refreshToken">;
export interface LoginResponse extends UserResponse {
  accessToken: string;
}