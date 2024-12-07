<template>
  <v-card v-if="!loading" elevation="3" class="pa-10">
    <Doughnut
      :data="data"
      :options="{ responsive: true, maintainAspectRatio: false }"
    />
  </v-card>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useChartStore } from "@/stores/chart/useChartStore";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";

const chartStore = useChartStore();
const loading = chartStore.loading;

export interface Data {
  labels: string[];
  datasets: { backgroundColor: string[]; data: number[] }[];
}

const data: Data = reactive({
  labels: chartStore.labels,
  datasets: [
    {
      backgroundColor: chartStore.backgroundColor,
      data: chartStore.data,
    },
  ],
});
ChartJS.register(ArcElement, Tooltip, Legend);
</script>
