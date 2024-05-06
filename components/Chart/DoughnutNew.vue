<template>
    <div class="card col-12 flex flex-column gap-6 custom_height">
        <!-- Top wrapper -->
          <div class="flex align-items-center justify-content-between">
            <span class=" font-bold black_color ">{{ title }}</span>
            <div class=" ml-3 customer_dropdown">
              <Dropdown  v-model="selected_time"  :options="categories" placeholder="This week" class="w-full md:w-10rem" />
            </div>
          </div>
        <!--  chart -->
        <div class="flex align-items-center justify-content-around">
             <Chart type="doughnut" :data="doughnutData" :options="options" class="h-15rem"  />
            <!-- ledgers -->
             <div class=" flex flex-column gap-5" >
            <div  v-for="(item, index) in getCustomColor(dataLabels )" :key="index" class="">
              <div class="flex align-items-center ">
                <div
                  class="ledger_body mr-2"
                  :style="'background:' + item.color"
                ></div>
                <span class=" font-medium text_color  "> {{ dataLabels[index] }}</span>
              </div>
            </div>
        </div>
        </div>
        </div>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps({
  title: String,
});
definePageMeta({
  layout: "default",
});
const selected_time = ref("");
const dataValues = ref([15, 14, 11, 35, 25]);
const dataLabels = ref(["Club Assessment", "Elite Coaching", "Practice Golf", "Play Indoor Golf", "Tune Up"]);
const bgColors = ref(["#0A94FF", "#FFB536", "#1AD598", "#F3654A", "#895BF1"]);
const doughnutData = {
  labels: dataLabels.value,
  datasets: [
    {
      label: 'Paris',
      data: dataValues.value,
      backgroundColor: bgColors.value,
    }
  ]
};
const options = {
  responsive: true,
    type: 'doughnut',
  cutout: "75%",
  maintainAspectRatio: false,
  plugins: {
          legend: {
            display: false,
          },
        },
}; 
const getCustomColor = (val)  => {
      const newArray = []
      const color = bgColors.value
      val.forEach((data, index) => {
        newArray.push({
          color: color[index],
        })
      })
      return newArray
    };


</script>
<style lang="scss">
.ledger_body {
      width: 0.938rem !important;
      height: 0.375rem !important;
      border-radius: 30% !important;
    }
    .doughnut_chart{
        height: 250px !important;
    }
</style>