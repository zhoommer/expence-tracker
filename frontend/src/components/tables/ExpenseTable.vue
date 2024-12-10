<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-cash"></v-icon> &nbsp; {{ $t("expenses") }}

      <v-spacer></v-spacer>

      <v-text-field
        v-model="searchQuery"
        density="compact"
        :label="$t('search')"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
        @input="updateSearchQuery"
      ></v-text-field>
    </v-card-title>

    <v-divider></v-divider>
    <v-data-table
      v-model="expenseStore.expenses"
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
              :color="themeStore.color"
              :model-value="page"
              :length="pageCount"
              size="small"
              rounded="circle"
              @update:model-value="updatePage"
            >
            </v-pagination>
          </div>
          <div class="pe-2">
            <v-select
              :color="themeStore.color"
              :model-value="limit"
              :items="[5, 10, 15]"
              min-width="80"
              variant="underlined"
              @update:model-value="updateLimit"
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
import { debounce } from "chart.js/helpers";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const expenseStore = useExpenseStore();
const themeStore = useThemeStore();
const searchQuery = ref<string>((route.query.query as string) || "");
const page = ref<number>(Number(route.query.page) || 1);
const limit = ref<number>(Number(route.query.limit) || 5);
const headers = [
  { key: "name", title: t("expense") },
  { key: "category", title: t("category") },
  { key: "amount", title: t("amount") },
  { key: "price", title: t("price") },
  { key: "createdAt", title: t("createdAt") },
];

function updateURL(updatedParams: Record<string, string>) {
  router.push({
    path: route.path,
    query: {
      ...route.query,
      ...updatedParams,
    },
  });
}

function updatePage(newPage: number) {
  updateURL({ page: newPage.toString() });
}

function updateLimit(newLimit: number) {
  updateURL({ limit: newLimit.toString() });
}

const updateSearchQuery = debounce((newQuery: string) => {
  updateURL({ query: newQuery[0].target?.value });
}, 500);

watch(
  () => route.query,
  async (newQuery) => {
    page.value = Number(newQuery.page) || 1;
    limit.value = Number(newQuery.limit) || 5;
    searchQuery.value = (newQuery.query as string) || "";

    expenseStore.getAllExpenses(searchQuery.value, page.value, limit.value);
  },
);

const expenses = computed(() => expenseStore.expenses);

const pageCount = computed(() => {
  if (expenseStore.totalElements !== null)
    return Math.ceil(expenseStore.totalElements / limit.value);
});

onMounted(() => {
  if (!expenseStore.expenses)
    expenseStore.getAllExpenses(searchQuery.value, page.value, limit.value);
});
</script>
