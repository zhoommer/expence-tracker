import axiosClient from "../axios";
import type { SignUpCredentials } from "@/definations/signup-credentials.type";
import type { User } from "@/definations/user.type";

export class AuthServices {
  private client = axiosClient;

  async signin(credentials: {
    email: string;
    password: string;
  }): Promise<{ access_token: string; refresh_token: string }> {
    const response = await this.client.post<{
      access_token: string;
      refresh_token: string;
    }>("/auth/signin", credentials);
    return response.data;
  }

  async signup(
    credentials: SignUpCredentials,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const response = await this.client.post<{
      access_token: string;
      refresh_token: string;
    }>("/auth/signup", credentials);
    return response.data;
  }

  async getMe(): Promise<{ message: string; data: User }> {
    const response = await this.client.get<{ message: string; data: User }>(
      "/profile/me",
    );
    return response.data;
  }
}
