import { reactive } from "vue";
import { useI18n } from "vue-i18n";
import { CategoriesStore } from "@/stores/categories/categoryStore";
import { addExpense } from "@/stores/expense/actions";
import { AlertStore } from "@/stores/alert/alertStore";

interface InitialState {
  name: string;
  categoryId: number | null;
  amount: number | null;
  price: number | null;
  currency: "TRY" | "USD";
}

export function useExpenseForm() {
  const { t } = useI18n();
  const categoriesStore = CategoriesStore();
  const alertStore = AlertStore();
  const initialState: InitialState = reactive({
    name: "",
    categoryId: null,
    amount: null,
    price: null,
    currency: "USD",
  });

  function translatedItems() {
    return categoriesStore.categories.map(
      (item: { id: number; name: string }) => ({
        id: item.id,
        title: t(item.name),
      }),
    );
  }
  const handleSubmit = async () => {
    const data = {
      name: initialState.name,
      categoryId: initialState.categoryId,
      amount: Number(initialState.amount),
      price: Number(initialState.price),
      currency: initialState.currency,
    };
    try {
      await addExpense(data);
      alertStore.success({
        title: "",
        text: t("your expense has been added successfully."),
      });
      initialState.name = "";
      initialState.categoryId = null;
      initialState.amount = null;
      initialState.price = null;
    } catch (error) {
      console.log("error");
    }
  };

  return {
    initialState,
    translatedItems,
    handleSubmit,
  };
}
