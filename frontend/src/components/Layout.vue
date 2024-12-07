<script setup lang="ts">
import Alert from "./alerts/Alert.vue";
import Appbar from "./appbar/Appbar.vue";
import Drawer from "./drawer/Drawer.vue";
import { useThemeStore } from "@/stores/theme/useThemeStore";
import { useAlertStore } from "@/stores/alert/useAlertStore";
import { ref, defineProps, onMounted, watch } from "vue";
import AddExpence from "./forms/AddExpence.vue";
import { useExpenseStore } from "@/stores/expense/useExpenseStore";
import { useCategoriesStore } from "@/stores/categories/useCategoriesStore";
import { useChartStore } from "@/stores/chart/useChartStore";

interface Props {
  isAuth: boolean;
}

const themeStore = useThemeStore();
const alertStore = useAlertStore();
const expenseStore = useExpenseStore();
const categoryStore = useCategoriesStore();
const chartStore = useChartStore();
const props = defineProps<Props>();

const show = ref(false);

onMounted(() => {
  categoryStore.getAll();
  chartStore.getTotalExpensesByCategory();
});
</script>

<template>
  <v-responsive class="border rounded">
    <v-app>
      <Appbar />

      <Drawer v-if="props.isAuth" />
      <v-main>
        <v-container fluid class="border rounded-lg" height="100%">
          <Alert v-if="alertStore.show" />
          <AddExpence />
          <RouterView />
          <v-tooltip v-model="show" location="top" v-if="props.isAuth">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                :variant="themeStore.mode === 'light' ? 'flat' : 'tonal'"
                :color="themeStore.color"
                icon="mdi-plus"
                size="large"
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
