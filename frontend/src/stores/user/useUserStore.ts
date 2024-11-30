import { defineStore } from "pinia";
import { AuthServices } from "@/services/authServices";
import { useAlertStore } from "../alert/useAlertStore";

const client = new AuthServices();
export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") as string | null,
    loading: false as boolean,
    error: "" as string | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    checkAuth() {
      if (!this.token) return false;
      return true;
    },

    async signin(credentials: { email: string; password: string }) {
      const alertStore = useAlertStore();
      this.loading = true;
      this.error = null;
      try {
        const response = await client.signin(credentials);
        this.token = response.access_token;
        alertStore.success({
          title: "",
          text: "Login successfull",
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
  },
});
