<template>
  <v-card
    v-if="!chartStore.loading"
    elevation="3"
    :title="$t('total spending by category')"
    :max-height="!$vuetify.display.mobile ? '400' : ''"
    :min-height="!$vuetify.display.mobile ? '400' : ''"
  >
    <apexchart
      type="donut"
      :series="props.series"
      :options="chartOptions"
      width="100%"
      height="80%"
    ></apexchart>
  </v-card>
</template>

<script setup lang="ts">
import { reactive, defineProps } from "vue";
import { useChartStore } from "@/stores/chart/useChartStore";
import { convertedLabels } from "@/utils/convertedLabels/convertedLabels";

const chartStore = useChartStore();

interface Props {
  series: number[];
}

export interface Data {
  labels: string[];
  datasets: { backgroundColor: string[]; data: number[] }[];
}

const props = defineProps<Props>();

const chartOptions = reactive({
  chart: {
    type: "donut",
  },
  legend: {
    show: true,
    showForSingleSeries: false,
    showForNullSeries: true,
    showForZeroSeries: true,
    position: "right",
    horizontalAlign: "center",
    floating: false,
    fontSize: "12px",
    fontFamily: "Helvetica, Arial",
    fontWeight: 400,
    formatter: undefined,
    inverseOrder: false,
    width: undefined,
    height: undefined,
    tooltipHoverFormatter: undefined,
    customLegendItems: [],
    offsetX: 0,
    offsetY: 0,
    labels: {
      colors: undefined,
      useSeriesColors: false,
    },
    markers: {
      size: 7,
      shape: undefined,
      strokeWidth: 1,
      fillColors: undefined,
      customHTML: undefined,
      onClick: undefined,
      offsetX: 0,
      offsetY: 0,
    },
    itemMargin: {
      horizontal: 5,
      vertical: 0,
    },
    onItemClick: {
      toggleDataSeries: true,
    },
    onItemHover: {
      highlightDataSeries: true,
    },
  },
  responsive: [
    {
      breakpoint: 1024, // Tablet boyutları
      options: {
        chart: {
          width: "90%",
          height: "90%",
        },
        legend: {
          position: "right",
        },
      },
    },
    {
      breakpoint: 768, // Mobil boyutları
      options: {
        chart: {
          width: "100%",
          height: "300px", // Yüksekliği sabitleyebilirsiniz
        },
        legend: {
          show: false,
          position: "bottom",
        },
      },
    },
  ],
  labels: convertedLabels(chartStore.labels),
  colors: chartStore.backgroundColor,
});
</script>
