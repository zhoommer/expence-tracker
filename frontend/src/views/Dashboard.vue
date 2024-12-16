<script setup lang="ts">
import { ref } from "vue";
import Barchart from "@/components/common/Barchart.vue";
import Donutchart from "@/components/common/Donutchart.vue";
import { ChartStore } from "@/stores/chart/chartStore";
import { ThemeStore } from "@/stores/theme/themeStore";
import { CategoriesStore } from "@/stores/categories/categoryStore";

const chartStore = ChartStore();
const themeStore = ThemeStore();
const categoryStore = CategoriesStore();

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
        <Donutchart
          :series="currency === 'TRY' ? chartStore.dataTRY : chartStore.dataUSD"
        />
      </v-col>
      <v-col cols="12" lg="6">
        <Barchart
          :limit="
            currency === 'TRY' ? categoryStore.limitTRY : categoryStore.limitUSD
          "
          :spending="
            currency === 'TRY'
              ? categoryStore.spendingTRY
              : categoryStore.spendingUSD
          "
        />
      </v-col>
    </v-row>
  </v-container>
</template>
