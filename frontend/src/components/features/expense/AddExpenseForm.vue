<template>
  <v-dialog v-model="expenseStore.dialog" max-width="600">
    <v-card prepend-icon="mdi-cash-multiple" :title="$t('add expense')">
      <v-card-text>
        <v-row dense>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="initialState.name"
              :label="$t('expense') + '*'"
              :color="themeStore.color"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" lg="6">
            <v-select
              v-model="initialState.categoryId"
              :label="$t('category') + '*'"
              :items="translatedItems()"
              item-title="title"
              item-value="id"
              :color="themeStore.color"
            >
            </v-select>
          </v-col>

          <v-col cols="12" lg="6">
            <v-text-field
              type="number"
              v-model="initialState.amount"
              :label="$t('amount') + '*'"
              :color="themeStore.color"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" lg="6">
            <v-text-field
              v-model="initialState.price"
              type="number"
              :label="$t('price') + '*'"
              required
            ></v-text-field>
          </v-col>

          <v-col>
            <v-select
              v-model="initialState.currency"
              :label="$t('currency') + '*'"
              :items="[
                { label: 'USD', value: 'USD' },
                { label: 'TRY', value: 'TRY' },
              ]"
              item-title="label"
              item-value="value"
            ></v-select>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          :text="$t('close')"
          :variant="themeStore.variant"
          color="error"
          @click="expenseStore.dialog = false"
        ></v-btn>

        <v-btn
          type="submit"
          :text="$t('save')"
          :variant="themeStore.variant"
          color="success"
          @click.prevent="handleSubmit"
          :loading="expenseStore.loading"
          :disabled="expenseStore.loading"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ExpenseStore } from "@/stores/expense/expenseStore";
import { ThemeStore } from "@/stores/theme/themeStore";
import { useExpenseForm } from "@/composables/useExpenseForm";

const expenseStore = ExpenseStore();
const themeStore = ThemeStore();

const { initialState, translatedItems, handleSubmit } = useExpenseForm();
</script>
