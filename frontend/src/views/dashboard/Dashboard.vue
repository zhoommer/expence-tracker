<script setup lang="ts">
import { ref } from "vue";
import BarChart from "@/components/charts/BarChart.vue";
import DonutChart from "@/components/charts/DonutChart.vue";
import { useChartStore } from "@/stores/chart/useChartStore";
import { useThemeStore } from "@/stores/theme/useThemeStore";

const chartStore = useChartStore();
const themeStore = useThemeStore();

const currency = ref<"TRY" | "USD">("TRY");
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-select
          v-model="currency"
          variant="solo-filled"
          :color="themeStore.color"
          :label="$t('currency')"
          :items="[
            { label: 'USD', value: 'USD' },
            { label: 'TRY', value: 'TRY' },
          ]"
          item-title="label"
          item-value="value"
        ></v-select>
      </v-col>
      <v-col cols="12" lg="6">
        <DonutChart
          :title="
            currency === 'TRY'
              ? $t('total spending by category with TRY') + ' ₺'
              : $t('total spending by category with USD') + ' $'
          "
          :series="currency === 'TRY' ? chartStore.dataTRY : chartStore.dataUSD"
        />
      </v-col>
      <v-col cols="12" lg="6">
        <BarChart />
      </v-col>
    </v-row>
  </v-container>
</template>
