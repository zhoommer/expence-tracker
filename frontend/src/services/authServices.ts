import type { SignUpCredentials } from "@/definations/signup-credentials.type";
import axiosClient from "./axiosIntance";

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
}
