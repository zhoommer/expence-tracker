import { computed, onMounted, ref, watch } from "vue";
import { ExpenseStore } from "@/stores/expense/expenseStore";
import { getAllExpenses } from "@/stores/expense/actions";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { debounce } from "chart.js/helpers";

export function useExpenseTable() {
  const { t } = useI18n();
  const route = useRoute();
  const router = useRouter();
  const expenseStore = ExpenseStore();
  const searchQuery = ref<string>((route.query.query as string) || "");
  const currency = ref<"" | "USD" | "TRY">(
    route.query.currency as "USD" | "TRY" | "",
  );
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

  function updateCurrency(newCurrency: string) {
    updateURL({ currency: newCurrency });
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

      getAllExpenses(
        searchQuery.value,
        currency.value,
        page.value,
        limit.value,
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
      getAllExpenses(
        searchQuery.value,
        currency.value,
        page.value,
        limit.value,
      );
  });

  return {
    headers,
    updatePage,
    updateLimit,
    updateSearchQuery,
    updateCurrency,
    expenses,
    page,
    limit,
    pageCount,
    searchQuery,
    currency,
  };
}
