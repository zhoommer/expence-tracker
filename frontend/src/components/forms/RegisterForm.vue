<template>
  <v-form @submit.prevent="handleSubmit">
    <v-row>
      <v-col cols="12" lg="6">
        <v-text-field
          v-model="initialState.firstname"
          type="text"
          label="Name"
          placeholder="Enter your name"
          variant="underlined"
          prepend-inner-icon="mdi-account"
          :color="themeStore.color"
          required
          :error-messages="v$.firstname.$errors.map((e) => e.$message)"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="6">
        <v-text-field
          v-model="initialState.lastname"
          type="text"
          label="Surname"
          placeholder="Enter your surname"
          variant="underlined"
          prepend-inner-icon="mdi-account"
          :color="themeStore.color"
          required
          :error-messages="v$.lastname.$errors.map((e) => e.$message)"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="initialState.email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          variant="underlined"
          prepend-inner-icon="mdi-email"
          :color="themeStore.color"
          required
          :error-messages="v$.email.$errors.map((e) => e.$message)"
        ></v-text-field>
      </v-col>

      <v-col cols="12" lg="6" class="mt-5">
        <v-text-field
          v-model="initialState.password"
          :type="show ? 'text' : 'password'"
          label="Password"
          placeholder="Enter your password"
          variant="underlined"
          prepend-inner-icon="mdi-lock"
          :color="themeStore.color"
          :append-inner-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="show = !show"
          required
          :error-messages="v$.password.$errors.map((e) => e.$message)"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="6" class="mt-5">
        <v-text-field
          v-model="initialState.rePassword"
          :type="show ? 'text' : 'password'"
          label="Re-Password"
          placeholder="Enter your password"
          variant="underlined"
          prepend-inner-icon="mdi-lock"
          :color="themeStore.color"
          :append-inner-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="show = !show"
          required
          :error-messages="v$.rePassword.$errors.map((e) => e.$message)"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="initialState.birthDate"
          type="date"
          label="Birth Date"
          variant="underlined"
          :color="themeStore.color"
          required
          :error-messages="v$.birthDate.$errors.map((e) => e.$message)"
        ></v-text-field>
      </v-col>

      <v-col>
        <v-text-field
          v-model="initialState.phone"
          type="phone"
          label="Phone Number"
          variant="underlined"
          :color="themeStore.color"
          required
          :error-messages="v$.phone.$errors.map((e) => e.$message)"
        >
        </v-text-field>
      </v-col>

      <v-col cols="12" class="d-flex justify-end">
        <v-switch
          v-model="initialState.gender"
          :label="switchColor.label"
          :color="switchColor.color"
          false-icon="mdi-gender-male"
          true-icon="mdi-gender-female"
          false-value="MALE"
          true-value="FEMALE"
          required
          :error-messages="v$.gender.$errors.map((e) => e.$message)"
        ></v-switch>
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
import { useRegisterForm } from "@/hooks/userRegisterForm";

const {
  themeStore,
  userStore,
  initialState,
  switchColor,
  v$,
  show,
  handleSubmit,
  loading,
} = useRegisterForm();
</script>
