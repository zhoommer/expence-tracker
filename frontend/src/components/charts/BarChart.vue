<template>
  <v-card
    :title="$t('exceeding the limit')"
    elevation="3"
    :max-height="!$vuetify.display.mobile ? '400' : ''"
    :min-height="!$vuetify.display.mobile ? '400' : ''"
  >
    <apexchart
      type="bar"
      width="100%"
      height="80%"
      :options="chartOptions"
      :series="series"
    >
    </apexchart>
  </v-card>
</template>

<script setup lang="ts">
import { useCategoriesStore } from "@/stores/categories/useCategoriesStore";
import { reactive } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const categoryStore = useCategoriesStore();
const series = reactive([
  {
    name: t("limit"),
    data: categoryStore.overLimitedExpenses.map((expense) => expense.limit),
  },
  {
    name: t("spending"),
    data: categoryStore.overLimitedExpenses.map(
      (expense) => expense.totalSpent,
    ),
  },
]);

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
      (expense) => expense.categoryName,
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
