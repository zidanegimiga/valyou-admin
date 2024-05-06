<template lang="">
  <div class="card pie_chart_wrap h-full">
    <div class="mb-2">
      <h4 class="font-medium">{{ title }}</h4>
      <p class="pie_subtitle">{{ subtitle }}</p>
    </div>
    <div class="grid">
      <div class="col-12 md:col-5">
        <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full" />
      </div>
      <div class="col-12 md:col-7 pie__legend_container">
        <div class="pie__legend_wrap" v-if="Object.keys(datasets).length">
          <div v-for="(item, index) in datasets?.labels" class="pie__legend_text">
            <div class="pie__legend" :style="{ background: colorSet[index] }"></div>
            {{ item }}&emsp;&emsp;{{ datasets?.data[index] }}%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: "Title",
    },
    subtitle: {
      type: String,
      default: "subtitle",
    },
    datasets: {
      type: Object,
      default() {
        return {
          labels: ["Q1", "Q2", "Q3", "Q4", "Q5"],
          data: [24, 50, 27, 10, 37],
        };
      },
    },
    colorSet: {
      type: Array,
      default() {
        return [
          "#3b82f6",
          "#eab308",
          "#22c55e",
          "#ff6259",
          "#3494ff",
          "#556376",
          "#14b8a6",
          "#6366f1",
        ];
      },
    },
  },
  data() {
    return {
      chartData: null,
      chartOptions: {
        cutout: "50%",
        maintainAspectRatio: true,
        aspectRatio: 16 / 12,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    };
  },
  mounted() {
    this.chartData = this.setChartData();
  },
  methods: {
    setChartData() {
      const documentStyle = getComputedStyle(document.body);
      return {
        labels: this.datasets?.labels ?? [],
        datasets: [
          {
            data: this.datasets?.data ?? [],
            backgroundColor: [
              documentStyle.getPropertyValue("--blue-500"),
              documentStyle.getPropertyValue("--yellow-500"),
              documentStyle.getPropertyValue("--green-400"),
              documentStyle.getPropertyValue("--red-400"),
              documentStyle.getPropertyValue("--primary-500"),
              documentStyle.getPropertyValue("--bluegray-600"),
              documentStyle.getPropertyValue("--teal-500"),
              documentStyle.getPropertyValue("--indigo-500"),
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue("--blue-400"),
              documentStyle.getPropertyValue("--yellow-400"),
              documentStyle.getPropertyValue("--green-300"),
              documentStyle.getPropertyValue("--red-300"),
              documentStyle.getPropertyValue("--primary-300"),
              documentStyle.getPropertyValue("--bluegray-200"),
              documentStyle.getPropertyValue("--teal-400"),
              documentStyle.getPropertyValue("--indigo-400"),
            ],
            hoverOffset: 10,
            borderWidth: 0,
          },
        ],
      };
    },
  },
};
</script>
<style lang="scss">
.pie_chart_wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.pie_subtitle {
  font-size: 0.7rem;
  color: #aab2bf;
  font-weight: 300;
}
.pie__legend_container{
  display: flex;
  align-items: center;
}
.pie__legend_wrap {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  height: fit-content;
}
.pie__legend_text {
  display: flex;
  column-gap: 10px;
  align-items: center;
  font-size: 0.7rem;
  color: #a3a1a1;
  flex-basis: 40%;
}
.pie__legend {
  width: 4px;
  border-radius: 5px;
  height: 12px;
}
</style>
