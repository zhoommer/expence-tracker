import { reactive } from "vue";

interface InitialState {
  name: string;
  categoryId: number | null;
  amount: number | null;
  price: number | null;
}

export function useExpenseForm() {
  const initialState: InitialState = reactive({
    name: "",
    categoryId: null,
    amount: null,
    price: null,
  });

  const handleSubmit = async () => {
    console.log(initialState);
  };

  return {
    initialState,
    handleSubmit,
  };
}
