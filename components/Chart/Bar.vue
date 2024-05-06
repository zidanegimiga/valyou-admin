<template lang="">
  <div class="card bar__chart">
    <div class="flex justify-content-between align-items-center">
      <h4 class="font-medium">{{ title }}</h4>
      <Dropdown
        v-model="value"
        :options="items"
        :placeholder="placeholder"
        class="w-8rem bar_chart__dropdown"
      />
    </div>
    <div class="bar_chart__wrap mt-3">
      <Chart type="bar" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
<script>
export default {
  name: "BarChart",
  props: {
    title: {
      type: String,
      default: "Title",
      required: true,
    },
    modelValue: {
      default: "",
    },
    items: {
      type: Array,
      default() {
        return ["item 1", "item 2"];
      },
    },
    placeholder: {
      type: String,
      default: "Select your filter",
    },
    barColors: {
      type: Array,
      default() {
        return ["#1BD598"];
      },
    },
    chart_data: {
      type: Object,
      required: true,
      default() {
        return {
          labels: ["Q1", "Q2", "Q3", "Q4"],
          datasets: [
            {
              data: [540, 325, 702, 620],
              label: "Sales",
            },
          ],
        };
      },
    },
  },
  mounted() {
    if(this.value === ''){
      this.$emit('update:modelValue',this.items[0])
    }
  },
  emits: ["update:modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  data() {
    return {
      chartData: {
        labels: this.chart_data.labels,
        datasets: this.chart_data.datasets.map((item) => ({
          label: item?.label,
          data: item?.data,
          barThickness: item?.barThickness ?? 30,
          backgroundColor: this.barColors,
          borderColor: this.barColors,
          borderWidth: 1,
          borderRadius: 6,
        })),
      },
      chartOptions: {
        aspectRatio: 16 / 6,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#95a1ac",
              font: {
                weight: 400,
                size: 10,
              },
              autoSkip: false,
              maxRotation: 0,
              callback: (value, index, values) => {
                let label = this.chart_data.labels[value];
                if (/\s/.test(label)) {
                  return label.split(" ");
                } else {
                  return label;
                }
              },
            },
            grid: {
              display: false,
              drawBorder: false,
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: "#95a1ac",
              padding: 15,
              maxTicksLimit: 6,
              font: {
                size: 10,
              },
            },
            grid: {
              color: "#dfe7ef",
              drawBorder: false,
            },
            border: {
              display: false,
            },
          },
        },
      },
    };
  },
};
</script>
<style lang="scss">
.bar__chart{
  h4{
    font-size: 0.9rem;
  }
}
.bar_chart__dropdown{
  border-radius: 5px;
  border-color: #E2E7F1;
  .p-dropdown-label {
    color:#212121 !important;
  }
}
</style>
