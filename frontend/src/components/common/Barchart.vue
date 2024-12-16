<template>
  <v-card
    :title="$t('exceeding the limit')"
    elevation="3"
    :max-height="!$vuetify.display.mobile ? '400' : ''"
    :min-height="!$vuetify.display.mobile ? '400' : ''"
  >
    <apexchart
      type="bar"
      width="95%"
      height="80%"
      :options="chartOptions"
      :series="[
        { name: $t('limit'), data: props.limit },
        { name: $t('spending'), data: props.spending },
      ]"
    >
    </apexchart>
  </v-card>
</template>

<script setup lang="ts">
import { reactive, defineProps } from "vue";
import { useI18n } from "vue-i18n";
import { CategoriesStore } from "@/stores/categories/categoryStore";

const { t } = useI18n();
const categoryStore = CategoriesStore();

interface Props {
  limit: number[];
  spending: number[];
}

const props = defineProps<Props>();

const chartOptions = reactive({
  chart: {
    type: "bar",
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "20px",
      borderRadius: 5,
      borderRadiusApplication: "end",
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    categories: categoryStore.overLimitedExpenses.map(
      (expense) => expense.overLimitedExpensesTRY.categoryName,
    ),
  },
  yaxis: {
    title: {
      text: t("expenses") + " ₺",
    },
  },
  fill: {
    opacity: 1,
  },
  colors: ["#36A2EB", "#FF4500"],
});
</script>
