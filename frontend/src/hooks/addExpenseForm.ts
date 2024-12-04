import { reactive } from "vue";
import { useI18n } from "vue-i18n";
import { useCategoriesStore } from "@/stores/categories/useCategoriesStore";
import { useExpenseStore } from "@/stores/expense/useExpenseStore";

interface InitialState {
  name: string;
  categoryId: number | null;
  amount: number | null;
  price: number | null;
}

export function useExpenseForm() {
  const { t } = useI18n();
  const categoriesStore = useCategoriesStore();
  const expenseStore = useExpenseStore();
  const initialState: InitialState = reactive({
    name: "",
    categoryId: null,
    amount: null,
    price: null,
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
    };
    try {
      await expenseStore.addExpense(data);
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
