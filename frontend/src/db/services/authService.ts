import { api } from "../config/api";
import type { User } from "../models/user";

type LoginPayload = { email: string; password: string };
type LoginResponse = { token: string; user?: User };
type RegisterPayload = { name: string; lastName: string; email: string; password: string };
type RegisterResponse = { token: string; user?: User };

export const authService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>("/auth/login", payload);
    // Almacena token si el backend lo devuelve
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    return data;
  },
  register: async (payload: RegisterPayload): Promise<RegisterResponse> => {
    const { data } = await api.post<RegisterResponse>("/auth/register", payload);
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    return data;
  },
  logout: (): void => {
    localStorage.removeItem("token");
    // opcional: llamar endpoint de logout si existe
  },

  me: async (): Promise<User> => {
    const { data } = await api.get<User>("/auth/me");
    return data;
  },
};