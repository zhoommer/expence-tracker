<template>
  <v-form @submit.prevent="handleSubmit">
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="formData.email"
          type="email"
          label="Email"
          :placeholder="$t('enter your email')"
          variant="underlined"
          prepend-inner-icon="mdi-email"
          :color="themeStore.color"
        ></v-text-field>
      </v-col>

      <v-col cols="12" class="mt-5">
        <v-text-field
          v-model="formData.password"
          :type="show ? 'text' : 'password'"
          :label="$t('password')"
          :placeholder="$t('enter your password')"
          variant="underlined"
          prepend-inner-icon="mdi-lock"
          :color="themeStore.color"
          :append-inner-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="show = !show"
        ></v-text-field>
      </v-col>

      <v-col cols="12" class="mt-5">
        <div class="d-flex justify-end">
          <RouterLink to="/forgot-password">{{
            $t("forgot password")
          }}</RouterLink>
        </div>
        <div class="d-flex justify-center mt-5">
          <v-btn
            type="submit"
            width="300"
            append-icon="mdi-login"
            :color="themeStore.color"
            :loading="userStore.loading"
            >{{ $t("log in") }}</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { ThemeStore } from "@/stores/theme/themeStore";
import { UserStore } from "@/stores/user/userStore";
import { useRouter } from "vue-router";

const router = useRouter();
const themeStore = ThemeStore();
const userStore = UserStore();

const show = ref(false);

const formData: { email: string; password: string } = reactive({
  email: "",
  password: "",
});

const handleSubmit = async () => {
  try {
    await userStore.signin(formData);
    router.push({ name: "Dashboard" });
  } catch (error) {
    console.log(error);
  }
};
</script>
