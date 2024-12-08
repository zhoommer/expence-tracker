<script setup lang="ts">
import BarChart from "@/components/charts/BarChart.vue";
import DonutChart from "@/components/charts/DonutChart.vue";
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" lg="6">
        <DonutChart />
      </v-col>
      <v-col cols="12" lg="6">
        <BarChart />
      </v-col>
    </v-row>
  </v-container>
</template>
