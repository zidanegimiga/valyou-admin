<template lang="">
  <div class="card barCombo_chart h-full">
    <div class="mb-4 flex align-items-center justify-content-between">
      <h4 class="font-medium">{{ title }}</h4>
      <div class="flex gap-3">
        <div v-for="(item, index) in dataset" :key="index" class="barCombo__legend_text">
          <div class="barCombo__legend" :style="{ background: colorSet[index] }"></div>
          {{ item.label }}
        </div>
      </div>
    </div>
    <Chart type="bar" :data="chartData" :options="chartOptions" />
  </div>
</template>
<script>
export default {
  name: "BarComboChart",
  data() {
    return {
      chartData: null,
      chartOptions: null,
    };
  },
  props: {
    dataset: {
      type: Array,
      required: true,
      default() {
        return [
          {
            label: "data 1",
            data: [65, 59, 80, 81, 56],
          },
          {
            label: "data 2",
            data: [28, 48, 40, 19, 86],
          },
        ];
      },
    },
    title: {
      type: String,
      required: true,
      default: "Title",
    },
    colorSet: {
      type: Array,
      default() {
        return ["#D1F7EA", "#1BD598"];
      },
    },
  },
  mounted() {
    this.chartData = this.setChartData();
    this.chartOptions = this.setChartOptions();
  },
  methods: {
    setChartData() {
      const documentStyle = getComputedStyle(document.documentElement);
      const colorSet = ["--green-200", "--green-400"];
      return {
        labels: ["Q1", "Q2", "Q3", "Q4", "Q5"],
        datasets: this.dataset.map((item, index) => ({
          label: item.label,
          backgroundColor: documentStyle.getPropertyValue(colorSet[index]),
          borderColor: documentStyle.getPropertyValue(colorSet[index]),
          data: item.data,
          borderRadius: 4,
          barThickness: 28,
        })),
      };
    },
    setChartOptions() {
      const documentStyle = getComputedStyle(document.documentElement);
      // const textColor = documentStyle.getPropertyValue("--text-color");
      const textColorSecondary = documentStyle.getPropertyValue("--text-color-secondary");
      const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
      return {
        maintainAspectRatio: true,
        aspectRatio: 16 / 6,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              font: {
                weight: 400,
              },
            },
            grid: {
              display: false,
              drawBorder: false,
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
              padding: 15,
              maxTicksLimit: 6,
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false,
            },
            border: {
              display: false,
            },
          },
        },
      };
    },
  },
};
</script>
<style lang="scss">
.barCombo_chart {
  h4 {
    font-size: 0.9rem;
    letter-spacing: 0rem !important;
  }
}
.barCombo__legend_text {
  display: flex;
  align-items: center;
  column-gap: 10px;
  font-size: 0.7rem !important;
  color: lightgray;
  .barCombo__legend {
    width: 4px;
    border-radius: 5px;
    height: 12px;
  }
}
</style>
