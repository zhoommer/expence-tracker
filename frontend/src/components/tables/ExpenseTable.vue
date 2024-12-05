<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-cash"></v-icon> &nbsp; {{ $t("expenses") }}

      <v-spacer></v-spacer>

      <v-text-field
        v-model="search"
        density="compact"
        :label="$t('search')"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
      ></v-text-field>
    </v-card-title>

    <v-divider></v-divider>
    <v-data-table
      v-model:search="search"
      :filter-keys="['name']"
      :headers="headers"
      :items="expenses || []"
      :mobile="$vuetify.display.mobile"
      :theme="themeStore.mode"
      height="70dvh"
      hover
    >
      <template v-slot:item.category="{ value }">
        {{ t(value) }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useExpenseStore } from "@/stores/expense/useExpenseStore";
import { useThemeStore } from "@/stores/theme/useThemeStore";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const expenseStore = useExpenseStore();
const themeStore = useThemeStore();
const search = ref("");
const headers = [
  { key: "name", title: t("expense") },
  { key: "category", title: t("category") },
  { key: "amount", title: t("amount") },
  { key: "price", title: t("price") },
  { key: "createdAt", title: t("createdAt") },
];

const expenses = computed(() => expenseStore.expenses);

onMounted(() => {
  if (!expenseStore.expenses) expenseStore.getAllExpenses();
});
</script>
