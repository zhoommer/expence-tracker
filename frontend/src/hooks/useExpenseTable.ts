import { computed, onMounted, ref, watch } from "vue";
import { useExpenseStore } from "@/stores/expense/useExpenseStore";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { debounce } from "chart.js/helpers";

export function useExpenseTable() {
  const { t } = useI18n();
  const route = useRoute();
  const router = useRouter();
  const expenseStore = useExpenseStore();
  const searchQuery = ref<string>((route.query.query as string) || "");
  const page = ref<number>(Number(route.query.page) || 1);
  const limit = ref<number>(Number(route.query.limit) || 5);
  const headers = [
    { key: "name", title: t("expense") },
    { key: "category", title: t("category") },
    { key: "amount", title: t("amount") },
    { key: "price", title: t("price") },
    { key: "createdAt", title: t("createdAt") },
    { key: "actions", title: t("delete") },
  ];

  const selectedExpenses = ref<
    {
      name: string;
      category: string;
      amount: number;
      price: number;
      createdAt: string;
    }[]
  >([]);

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

  return {
    headers,
    selectedExpenses,
    updatePage,
    updateLimit,
    updateSearchQuery,
    expenses,
    page,
    limit,
    pageCount,
    searchQuery,
  };
}
