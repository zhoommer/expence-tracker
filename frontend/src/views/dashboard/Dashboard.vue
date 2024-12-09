<script setup lang="ts">
import BarChart from "@/components/charts/BarChart.vue";
import DonutChart from "@/components/charts/DonutChart.vue";
import { useChartStore } from "@/stores/chart/useChartStore";

const chartStore = useChartStore();
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" lg="6">
        <DonutChart
          :title="$t('total spending by category') + ' ₺'"
          :series="chartStore.dataTRY"
        />
      </v-col>
      <v-col cols="12" lg="6">
        <BarChart />
      </v-col>
      <v-col cols="12" lg="6">
        <DonutChart
          :title="$t('total spending by category') + ' $'"
          :series="chartStore.dataUSD"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
