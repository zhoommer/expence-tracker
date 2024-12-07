<template>
  <v-card> </v-card>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";
import { useCategoriesStore } from "@/stores/categories/useCategoriesStore";

const categoryStore = useCategoriesStore();

ChartJS.register(ArcElement, Tooltip, Legend);

const data = reactive({
  labels: categoryStore.labels,
  datasets: categoryStore.datasets,
});

onMounted(() => {
  categoryStore.getTotalExpensesByCategory();
});

console.log("DATA: ", categoryStore.datasets);
</script>
