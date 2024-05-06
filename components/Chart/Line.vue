<template>
    <div class="card col-12 flex flex-column gap-5 custom_height">
        <!-- Top wrapper -->
          <div class="flex align-items-center justify-content-between">
            <span class=" font-bold black_color ">{{ title }}</span>
            <div class=" ml-3 customer_dropdown flex align-items-center gap-3">
              <Dropdown  v-model="selected_time"  :options="categories" placeholder="This Year" class="w-full md:w-10rem" />
              <Dropdown  v-model="selected_time"  :options="categories" placeholder="Indoor Coaching" class="w-full md:w-14rem" />
            </div>
          </div>
        <!--  chart -->
        <div class="" >
             <Chart  type="line" :data="chartData" :options="chartOptions" class="h-20rem" />
        </div>
        </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
const props = defineProps({
  title: String,
});
definePageMeta({
  layout: "default",
});
onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});
const chartData = ref();
const chartOptions = ref();
const selected_time = ref("");
const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels:  ['Jan', 'Feb', 'Mar', 'Apr', 'May' , 'Jun' , 'Jul' , 'Aug' , 'Sep' , 'Oct', 'Nov', 'Dec',],
        datasets: [
            {
                label: 'Dataset 2',
                fill: false,
                borderColor: documentStyle.getPropertyValue('--green-500'),
                tension: 0.1,
                pointStyle: 'circle',
                pointRadius: 6,
                pointBorderColor: '#5BEDF1',
                borderColor: '#5BEDF1',
                borderWidth: 4,
                data: [25, 15, 10, 15, 10, 15, 14, 12, 10, 15, 10, 20, 27]
            }
        ]
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        responsive: true,
        stacked: false,
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
               display: false,
            }
        },
        scales: {
            x: {
                ticks: {
                    display: true,
                    color: textColorSecondary
                },
                grid: {
                    display: false,
                    color: surfaceBorder
                }
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y1: {
                type: 'linear',
                display: false,
                position: 'right',
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    drawOnChartArea: false,
                    color: surfaceBorder
                }
            }
        }
    }
};
</script>
<style lang="scss">
.customer_dropdown .p-dropdown .p-dropdown-label {
  font-size: 1rem !important;
  font-weight: 600 !important;
  color: #000000 !important;
}
</style>