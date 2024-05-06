<template>
    <div class="card col-12 flex flex-column gap-2 custom_height">
        <!-- Top wrapper -->
          <div class="flex align-items-center justify-content-between">
            <span class=" font-bold black_color ">{{ title }}</span>
            <div class="customer_dropdown">
              <Dropdown  v-model="selected_time"  :options="categories" placeholder="This week" class="w-full md:w-10rem" />
            </div>
          </div>

        <!-- Table -->
    <div class="mt-3">
      <DataTable class="insights_table" :value="payments_table" tableStyle="min-width:100%" style="border: none !important;" >
        <Column
          field="service"
          header="Service"
          class=" font-medium p-2"
         
        >
        <template #body="slotProps">
            <span class=" font-weight-large black_text font_exsmall ">{{ slotProps.data.service }}</span>
          </template></Column>
        <Column
          field="service_number"
          header="Than Last week"
          class="accent font-medium p-2"
         
        >
        <template #body="slotProps">
            <span class=" font-medium black_text font_exsmall ">{{ slotProps.data.service_number }}</span>
          </template>
        </Column>
        <Column
          field="booking_confirmed"
          header="Confirmed Booking"
          class="accent font-medium"
         
        ></Column>
        <Column
          field="booking_conversion"
          header="Booking Conversion"
          class="accent font-medium"
        >
        </Column>
      </DataTable>
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

const payments_table = [
  {
    service: 'Practice Session',
    service_number: '7.2%',
    booking_confirmed: '215',
    booking_conversion:'80%'
   },
   {
    service: 'Club Assessments',
    service_number: '7.2%',
    booking_confirmed: '215',
    booking_conversion:'80%'
   },
   {
    service: 'Tune up',
    service_number: '7.2%',
    booking_confirmed: '215',
    booking_conversion:'80%'
   },
   {
    service: 'Indoor Coaching',
    service_number: '7.2%',
    booking_confirmed: '215',
    booking_conversion:'80%'
   },
  
];
</script>
<style lang="scss">
.customer_dropdown .p-dropdown .p-dropdown-label {
  font-size: 1rem !important;
  font-weight: 600 !important;
  color: #000000 !important;
}
.insights_table .p-datatable-table tbody > tr > td {
  font-size: 0.8rem !important;
  border: none !important;
}

.insights_table .p-datatable-table th {
  font-weight: 600  !important;
  color: #0A2C4F !important;
}

</style>