<template>
  <v-form @submit.prevent="handleSubmit">
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="formData.firstname"
          type="text"
          label="Name"
          placeholder="Enter your name"
          variant="underlined"
          prepend-inner-icon="mdi-account"
          :color="themeStore.color"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="formData.lastname"
          type="text"
          label="Surname"
          placeholder="Enter your surname"
          variant="underlined"
          prepend-inner-icon="mdi-account"
          :color="themeStore.color"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="formData.email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          variant="underlined"
          prepend-inner-icon="mdi-email"
          :color="themeStore.color"
        ></v-text-field>
      </v-col>

      <v-col cols="12" class="mt-5">
        <v-text-field
          v-model="formData.password"
          :type="show ? 'text' : 'password'"
          label="Password"
          placeholder="Enter your password"
          variant="underlined"
          prepend-inner-icon="mdi-lock"
          :color="themeStore.color"
          :append-inner-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="show = !show"
        ></v-text-field>
      </v-col>

      <v-col cols="12" class="mt-5">
        <div class="d-flex justify-center mt-5">
          <v-btn
            type="submit"
            :color="themeStore.color"
            size="large"
            width="300"
            :loading="loading"
            append-icon="mdi-account-plus"
            >Register</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useThemeStore } from "@/stores/theme/useThemeStore";
import { useUserStore } from "@/stores/user/useUserStore";
import { useRouter } from "vue-router";

const router = useRouter();
const themeStore = useThemeStore();
const userStore = useUserStore();

const show = ref(false);
const loading = userStore.loading;

const formData: {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  birthDate: string;
  phone: string;
  gender: "MALE" | "FEMALE";
} = reactive({
  email: "",
  password: "",
  firstname: "",
  lastname: "",
  birthDate: "",
  phone: "",
  gender: "MALE",
});

const handleSubmit = async () => {
  try {
    await userStore.signin(formData);
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};
</script>
