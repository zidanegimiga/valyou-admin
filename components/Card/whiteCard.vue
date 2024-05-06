<template>
    <div class="col-12 flex flex-column align-items-center gap-2 white_card" :style="{background: bgcolor}">
        <span class="score_color" >{{ score }}</span>
        <span class="score_title small__text font-medium spacing_none" >{{ game_title }}</span>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
const props = defineProps({
    bgcolor: {
      default: "#000000",
      type: String,
    },
    score: {
      default: "56",
      type: String,
    },
    game_title: {
      default: "Course Std Score",
      type: String,
    },
    
});
definePageMeta({
  layout: "default",
});
onMounted(() => {
});
// const chartData = ref();
// const chartOptions = ref();
// const selected_time = ref("");
</script>
<style lang="scss" >
.white_card{
    border-radius: 0.625rem!important;
    .score_color{
  color: #272727 !important;
  font-size: 1.25rem !important;
  font-weight: bold !important;
}
.score_title{
    color: #272727 !important;
}
}
</style>