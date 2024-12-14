<script setup lang="ts">
import Alert from "./alerts/Alert.vue";
import Appbar from "./appbar/Appbar.vue";
import Drawer from "./drawer/Drawer.vue";
import AddExpence from "./forms/AddExpence.vue";
import Skeleton from "./loader/Skeleton.vue";
import { useThemeStore } from "@/stores/theme/useThemeStore";
import { useAlertStore } from "@/stores/alert/useAlertStore";
import { onMounted, ref, defineProps } from "vue";
import { useExpenseStore } from "@/stores/expense/useExpenseStore";
import { useUserStore } from "@/stores/user/useUserStore";
import { useCategoriesStore } from "@/stores/categories/useCategoriesStore";
import { useChartStore } from "@/stores/chart/useChartStore";

interface Props {
  isAuth: boolean;
}

const themeStore = useThemeStore();
const userStore = useUserStore();
const alertStore = useAlertStore();
const expenseStore = useExpenseStore();
const categoryStore = useCategoriesStore();
const chartStore = useChartStore();
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

      <Drawer v-if="props.isAuth && !userStore.loading" />
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
          <AddExpence />
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
