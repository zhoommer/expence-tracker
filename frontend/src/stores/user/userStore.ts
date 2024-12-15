import { defineStore } from "pinia";
import { AuthServices } from "@/api/services/authService";
import { AuthAlertMessages } from "@/utils/alertMessages/auth/alertAuthMessages";
import { AlertStore } from "../alert/alertStore";
import type { SignUpCredentials } from "@/definations/signup-credentials.type";
import type { User } from "@/definations/user.type";

const client = new AuthServices();
const authAlertMessages = new AuthAlertMessages();

export const UserStore = defineStore("user", {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem("token") as string | null,
    loading: false as boolean,
    error: "" as string | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    fullName: (state) => state.user?.firstname + " " + state.user?.lastname,
  },

  actions: {
    checkAuth() {
      if (!this.token) return false;
      return true;
    },

    async signin(credentials: { email: string; password: string }) {
      const alertStore = AlertStore();
      this.loading = true;
      this.error = null;
      try {
        const response = await client.signin(credentials);
        if (response.access_token) {
          this.token = response.access_token;
          const profile = await client.getMe();
          if (profile.data) {
            this.user = profile.data;
          }
        }
        alertStore.success({
          title: "",
          text: authAlertMessages.successLogin(),
        });
        localStorage.setItem("token", response.access_token);
      } catch (error: any) {
        alertStore.error({
          title: "",
          text: String(error.response.data.message),
        });
        this.error = "Login failed";
      } finally {
        this.loading = false;
      }
    },

    async signup(credentials: SignUpCredentials) {
      const alertStore = AlertStore();
      this.loading = true;
      this.error = null;
      try {
        const response = await client.signup(credentials);
        alertStore.success({
          title: "",
          text: authAlertMessages.successSignUp(),
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (response) window.location.reload();
      } catch (error) {
        this.error = "Register failed";
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      const alertStore = AlertStore();
      alertStore.info({ title: "", text: authAlertMessages.successLogout() });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      localStorage.removeItem("token");
      this.user = null;
      this.token = null;
    },

    async getMe() {
      this.loading = true;
      this.error = null;

      try {
        const response = await client.getMe();
        this.user = response.data;
      } catch (error) {
        this.error = "Fetch failed";
      } finally {
        this.loading = false;
      }
    },
  },
});
