<template>
  <v-form @submit.prevent="handleSubmit">
    <v-row>
      <v-col cols="12" lg="6">
        <v-text-field
          v-model="initialState.firstname"
          type="text"
          :label="$t('name')"
          :placeholder="$t('enter your name')"
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
          :label="$t('surname')"
          :placeholder="$t('enter your surname')"
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
          :placeholder="$t('enter your email')"
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
          :label="$t('password')"
          :placeholder="$t('enter your password')"
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
          :label="$t('re-password')"
          :placeholder="$t('enter your password')"
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
          :label="$t('birth date')"
          variant="underlined"
          :color="themeStore.color"
          required
          :error-messages="v$.birthDate.$errors.map((e) => e.$message)"
        ></v-text-field>
      </v-col>

      <v-col class="d-flex">
        <v-select
          v-model="initialState.countryCode"
          :items="countryPhoneCodes"
          item-title="code"
          item-value="code"
          :color="themeStore.color"
          :label="$t('country')"
          variant="underlined"
          max-width="70"
        ></v-select>
        <v-text-field
          v-model="initialState.phone"
          type="phone"
          :label="$t('phone number')"
          variant="underlined"
          :color="themeStore.color"
          required
          :error-messages="v$.phone.$errors.map((e) => e.$message)"
        >
        </v-text-field>
      </v-col>

      <v-col cols="12" class="d-flex justify-end">
        <v-btn-toggle
          v-model="initialState.gender"
          :color="themeStore.color"
          elevation="10"
        >
          <v-btn value="MALE" color="blue">
            <v-icon>mdi-gender-male</v-icon>
          </v-btn>
          <v-btn value="FEMALE" color="pink">
            <v-icon>mdi-gender-female</v-icon>
          </v-btn>
        </v-btn-toggle>
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
            >{{ $t("register") }}</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import { useRegisterForm } from "@/composables/useRegisterForm";
import { countryPhoneCodes } from "@/utils/countryPhoneCodes";

const { themeStore, initialState, v$, show, handleSubmit, loading } =
  useRegisterForm();
</script>
