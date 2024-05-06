<template lang="">
    <div>
      <div class="flex gap-2 pb-2 border-bottom-1 border-gray-200">
        <Avatar :image="item.image ? item.image : 'https://randomuser.me/api/portraits/women/96.jpg'" shape="circle" />
        <div>
          <h6 class="font-bold">{{ item.first_name }} {{ item.last_name }}</h6>
          <p class="ki__companyText">{{ company }}</p>
        </div>
        <div>
          
        </div>
      </div>
      <div class="flex justify-content-between align-items-center my-2">
        <p class="text-sm font-semibold">Added on</p>
        <p class=" font-semibold">{{ dayjs(item.createdAt).format('DD MMM, YYYY') }}</p>
      </div>
      <div class="flex justify-content-between align-items-center mb-2">
        <p class="text-sm font-semibold">Booking for</p>
        <p>{{ item.service_name }}</p>
      </div>
    </div>
  </template>
  <script setup>
  import {useDateWithTime} from "@/composables/dates"
  import dayjs from "dayjs"
  const props = defineProps({
      company: {
        type: String,
        default: "Company Name",
      },
      item:{
        type:Object
      }
    
})
  </script>
  <style lang="scss">
  .ki__companyText{
    color:#A2ABB9;
  }
  </style>
  