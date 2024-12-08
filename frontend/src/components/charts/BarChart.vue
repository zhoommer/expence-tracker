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
      height="100%"
      :options="chartOptions"
      :series="series"
    >
    </apexchart>
  </v-card>
</template>

<script setup lang="ts">
import { useCategoriesStore } from "@/stores/categories/useCategoriesStore";
import { reactive } from "vue";

const categoryStore = useCategoriesStore();

const series = reactive([
  {
    name: "Limit",
    data: categoryStore.overLimitedExpenses.map((expense) => expense.limit),
  },
  {
    name: "Spending",
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
      text: "$ (Expenses)",
    },
  },
  fill: {
    opacity: 1,
  },
  colors: ["#36A2EB", "#FF4500"],
});
</script>
