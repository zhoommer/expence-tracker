<script setup lang="ts">
import { onMounted, ref, defineProps } from "vue";
import Alert from "./common/Alert.vue";
import Appbar from "./layout/Appbar.vue";
import Sidebar from "./layout/Sidebar.vue";
import AddExpenseForm from "./features/expense/AddExpenseForm.vue";
import Skeleton from "./common/Skeleton.vue";

import { ThemeStore } from "@/stores/theme/themeStore";
import { AlertStore } from "@/stores/alert/alertStore";
import { ExpenseStore } from "@/stores/expense/expenseStore";
import { UserStore } from "@/stores/user/userStore";
import { CategoriesStore } from "@/stores/categories/categoryStore";
import { ChartStore } from "@/stores/chart/chartStore";

interface Props {
  isAuth: boolean;
}

const themeStore = ThemeStore();
const userStore = UserStore();
const alertStore = AlertStore();
const expenseStore = ExpenseStore();
const categoryStore = CategoriesStore();
const chartStore = ChartStore();
const props = defineProps<Props>();

const show = ref(false);

onMounted(async () => {
  userStore.checkAuth();
  await userStore.getMe();
  await categoryStore.getOverlimitedExpenses();
  await categoryStore.getAll();
  await chartStore.getTotalExpensesByCategory();
});
</script>

<template>
  <v-responsive class="border rounded">
    <v-app>
      <Appbar />

      <Sidebar v-if="props.isAuth && !userStore.loading" />
      <v-main>
        <Skeleton
          v-if="
            userStore.loading || expenseStore.loading || categoryStore.loading
          "
        />
        <v-container
          v-if="
            !expenseStore.loading &&
            !chartStore.loading &&
            !categoryStore.loading
          "
          fluid
          class="border rounded-lg"
          height="100%"
        >
          <Alert v-if="alertStore.show" />
          <AddExpenseForm />
          <RouterView />
          <v-tooltip v-model="show" location="top" v-if="props.isAuth">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                :variant="themeStore.mode === 'light' ? 'flat' : 'tonal'"
                :color="themeStore.color"
                :size="$vuetify.display.mobile ? 'small' : 'large'"
                icon="mdi-plus"
                position="absolute"
                location="bottom end"
                class="ma-16"
                @click="expenseStore.showDialog()"
              ></v-btn>
            </template>
            <span>{{ $t("add expense") }}</span>
          </v-tooltip>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>
