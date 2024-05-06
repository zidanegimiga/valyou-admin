<template lang="">
  <div class="card gauge_chart_wrap h-full">
    <div class="mb-2">
      <h4 class="font-medium">{{ title }}</h4>
      <p class="gauge_subtitle">{{ subtitle }}</p>
    </div>
    <div class="flex gap-4 mt-5">
      <div class="gauge_chart_container pl-5">
        <Chart type="doughnut" :data="chartData" :options="chartOptions" class="gauge_chart" />
        <span class="gauge__value_text">{{ value }}%</span>
        <div class="gauge__lines_wrap">
          <div class="gauge__lines">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div class="gauge__numbers">
            <div>0%</div>
            <div>25%</div>
            <div>50%</div>
            <div>75%</div>
            <div>100%</div>
          </div>
        </div>
      </div>
      <div class="col-12 md:col-7">
        <slot name="contents"></slot>
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
    value: {
      type: Number,
      default: 100,
      required: true,
    },
    colorSet: {
      type: Array,
      default() {
        return ["#3b82f6", "#9fa9b7"];
      },
    },
    legend_title: {},
  },
  data() {
    return {
      chartData: null,
      chartOptions: {
        cutout: "80%",
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        rotation: -90,
        circumference: 180,
        cutoutPercentage: 95,
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
        labels: [],
        datasets: [
          {
            data: [this.value, 100 - this.value] ?? [],
            backgroundColor: [
              documentStyle.getPropertyValue("--blue-500"),
              documentStyle.getPropertyValue("--bluegray-50"),
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue("--blue-400"),
              documentStyle.getPropertyValue("--bluegray-50"),
            ],
            borderWidth: 5,
            borderColor: documentStyle.getPropertyValue("--bluegray-50"),
            hoverBorderColor: "transparent",
          },
        ],
      };
    },
  },
};
</script>
<style lang="scss">
.gauge_chart_wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.gauge_subtitle {
  font-size: 0.7rem;
  color: #aab2bf;
  font-weight: 300;
}
.gauge_chart_container {
  position: relative;
  display: flex;
}
.gauge__value_text {
  position: absolute;
  bottom: 1rem;
  right: 50%;
  left: 50%;
  transform: translateX(-15px);
  font-size: 2rem !important;
  font-weight: 600 !important;
}
.gauge_chart {
  canvas {
    // width: 479px !important;
    // height:300px !important;
    height: 150px !important;
    width: 239px !important;
  }
}
.gauge__lines_wrap {
  position: absolute;
  bottom: 0px;
  left: 0px;
}
.gauge__lines {
  position: absolute;
  bottom: 0px;
  left: 0px;
  div {
    width: 12px;
    background: #9e9d9d;
    height: 1px;
    position: absolute;
    z-index: 1;
    border-radius: 10px;
    &:nth-child(1) {
      bottom: 1.4rem;
      right: -1.8rem;
      &::after {
        content: "";
        height: 0.7px;
        width: 8px;
        background: #aab2bf;
        position: absolute;
        top: -1.7rem;
        left: 0.5rem;
        transform: rotate(18deg);
      }
    }
    &:nth-child(2) {
      bottom: 6.5rem;
      left: 3.3rem;
      transform: rotate(45deg);
      &::before {
        content: "";
        height: 0.7px;
        width: 8px;
        background: #aab2bf;
        position: absolute;
        top: 1.7rem;
        left: 0.4rem;
        transform: rotate(-7deg);
      }
      &::after {
        content: "";
        height: 0.7px;
        width: 8px;
        background: #aab2bf;
        position: absolute;
        top: -1.7rem;
        left: 0.4rem;
        transform: rotate(11deg);
      }
    }
    &:nth-child(3) {
      bottom: 9rem;
      left: 8.9rem;
      transform: rotate(90deg);
      &::before {
        content: "";
        height: 0.7px;
        width: 8px;
        background: #aab2bf;
        position: absolute;
        top: 2rem;
        left: 0.62rem;
        transform: rotate(-16deg);
      }
      &::after {
        content: "";
        height: 0.7px;
        width: 8px;
        background: #aab2bf;
        position: absolute;
        top: -2rem;
        left: 0.5rem;
        transform: rotate(12deg);
      }
    }
    &:nth-child(4) {
      bottom: 6.9rem;
      left: 14.4rem;
      transform: rotate(130deg);
      &::before {
        content: "";
        height: 0.7px;
        width: 8px;
        background: #aab2bf;
        position: absolute;
        top: 1.8rem;
        left: 0.4rem;
        transform: rotate(-9deg);
      }
      &::after {
        content: "";
        height: 0.7px;
        width: 8px;
        background: #aab2bf;
        position: absolute;
        top: -2rem;
        left: 0.5rem;
        transform: rotate(12deg);
      }
    }
    &:nth-child(5) {
      bottom: 1.2rem;
      left: 17.2rem;
      &::before {
        content: "";
        height: 0.7px;
        width: 8px;
        background: #aab2bf;
        position: absolute;
        top: -1.8rem;
        left: -0.2rem;
        transform: rotate(-9deg);
      }
    }
  }
}
.gauge__numbers {
  font-size: 0.5rem;
  position: absolute;
  top: 0px;
  color: #959292;
  div {
    transform: rotate(0deg) !important;
    position: relative;
    z-index: 1;
    &:nth-child(1) {
      bottom: 2rem;
      right: 0rem;
    }
    &:nth-child(2) {
      bottom: 8.3rem;
      left: 2.4rem;
    }
    &:nth-child(3) {
      bottom: 11.76rem;
      left: 8.9rem;
    }
    &:nth-child(4) {
      bottom: 10rem;
      left: 15.5rem;
    }
    &:nth-child(5) {
      bottom: 4.4rem;
      left: 18.4rem;
    }
  }
}
</style>
