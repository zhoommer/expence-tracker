<template>
  <v-dialog v-model="expenseStore.dialog" max-width="600">
    <v-card prepend-icon="mdi-cash-multiple" title="Add Expense">
      <v-card-text>
        <v-row dense>
          <v-col cols="12" md="4" sm="6">
            <v-text-field
              v-model="initialState.name"
              label="Name*"
              :color="themeStore.color"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-select
              v-model="initialState.categoryId"
              label="Category*"
              :items="categories"
              item-title="label"
              item-value="value"
              :color="themeStore.color"
            >
            </v-select>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-text-field
              type="number"
              v-model="initialState.amount"
              label="Amount*"
              :color="themeStore.color"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-text-field type="number" label="Price*" required></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          text="Close"
          :variant="themeStore.variant"
          color="error"
          @click="expenseStore.dialog = false"
        ></v-btn>

        <v-btn
          color="success"
          text="Save"
          :variant="themeStore.variant"
          @click="expenseStore.dialog = false"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useExpenseStore } from "@/stores/expense/useExpenseStore";
import { useExpenseForm } from "@/hooks/addExpenseForm";
import { useThemeStore } from "@/stores/theme/useThemeStore";

const expenseStore = useExpenseStore();
const themeStore = useThemeStore();

const categories = [
  { label: "Electronic", value: 1 },
  { label: "Travel", value: 2 },
];
const { initialState, handleSubmit } = useExpenseForm();
</script>
