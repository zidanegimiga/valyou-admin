<template lang="">
  <Card class="card_container h-full count__card_wrap countIcon">
    <template #content>
      <div class="flex justify-content-between align-items-center p-2">
        <div class="flex align-items-center">
          <!-- <i class="pi pi-file count-icon" :style="{ color: props.color }"></i> -->
          <img :src="selectIcon(props.color)" class='mr-2'  />
          
          <h4 class="font-bold title">{{ props.title }}</h4>
        </div>
        <span class="count" :style="{ color: props.color }">{{
          props.count
        }}</span>
      </div>
    </template>
  </Card>
</template>
<script setup>
 import ColorPicker from "primevue/colorpicker";
import { ref,  onMounted, defineEmits } from "vue";
const props = defineProps(["title", "count", "color"]);
onMounted(() => {
  //   ProductService.getProductsMini().then((data) => (products.value = data));
})

const selectIcon=(color=>{
  switch (color) {
        case '#895BF1':
          return'/icons/projects_blue.svg'
        case '#22BA46':
          return '/icons/projects_orange.svg'
        case '#FFBF5E':
          return '/icons//projects_green.svg'
        default:
          return ''; }
})
</script>
<style lang="scss">
.countIcon {
  .count {
    font-size: 1.6875rem !important;
  }
  .count-icon {
    padding-inline-end: 0.9375rem;
    font-size: 	1.6875rem;
  }
}
.title {
  font-size: 1.0625rem;
}
</style>
