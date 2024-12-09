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
      <template v-slot:bottom>
        <div class="d-flex">
          <div class="flex-grow-1">
            <v-pagination
              :model-value="page"
              :length="pageCount"
              @update:model-value="updatePage"
              rounded="circle"
            >
            </v-pagination>
          </div>
          <div class="pe-2">
            <v-select
              :model-value="limit"
              :items="[5, 10, 15]"
              min-width="80"
              variant="underlined"
              @update:model-value="updateLimit"
              :color="themeStore.color"
            ></v-select>
          </div>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useExpenseStore } from "@/stores/expense/useExpenseStore";
import { useThemeStore } from "@/stores/theme/useThemeStore";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const expenseStore = useExpenseStore();
const themeStore = useThemeStore();
const search = ref("");
const page = ref<number>(Number(route.query.page) || 1);
const limit = ref<number>(Number(route.query.limit) || 5);
const headers = [
  { key: "name", title: t("expense") },
  { key: "category", title: t("category") },
  { key: "amount", title: t("amount") },
  { key: "price", title: t("price") },
  { key: "createdAt", title: t("createdAt") },
];

function updatePage(newPage: number) {
  router.push({
    path: route.path,
    query: {
      ...route.query,
      page: newPage.toString(),
    },
  });
}

function updateLimit(newLimit: number) {
  router.push({
    path: route.path,
    query: {
      ...route.query,
      page: route.query.page,
      limit: newLimit.toString(),
    },
  });
}
watch(
  () => route.query,
  async (newQuery) => {
    page.value = Number(newQuery.page) || 1;
    limit.value = Number(newQuery.limit) || 5;

    await expenseStore.getAllExpenses(
      Number(newQuery.page),
      Number(newQuery.limit),
    );
  },
);

const expenses = computed(() => expenseStore.expenses);

const pageCount = computed(() => {
  if (expenseStore.totalElements !== null)
    return Math.ceil(expenseStore.totalElements / limit.value);
});

onMounted(() => {
  if (!expenseStore.expenses)
    expenseStore.getAllExpenses(page.value, limit.value);
});
</script>
