<template>
  <div
    class="col-12 p-0 flex align-items-center flex-wrap player_card"
    :style="{ background: bgcolor }"
  >
    <!-- profile card -->
    <div
      class="p-1 col-12 md:col-3 lg:col-3 card flex flex-wrap align-items-center gap-3 customCard_height "
    >
      <Avatar :image="image" class="" size="large" shape="circle"> </Avatar>
      <div class="flex flex-column gap-1">
        <span class="font-size-small black_text spacing_none font-bold">{{
          name
        }}</span>
        <span class="spacing_none custom_text">{{ reg_num }}</span>
      </div>
    </div>
    <!-- score -->
    <div
      class="p-0 col-12 md:col-7 lg:col-7 flex flex-wrap align-items-center justify-content-evenly gap-3 customCard_height"
    >
      <div
        class="flex flex-column align-items-center gap-1"
        v-for="(item, index) in score_table"
        :key="index"
      >
        <span class="black_text font-bold spacing_none">{{ item.round }}</span>
        <span class="custom_text small__text justify-content-evenly">{{
          item.round_score
        }}</span>
      </div>
    </div>
    <!-- action -->
    <div class="p-0 col-12 md:col-2 lg:col-2 flex align-items-center justify-content-center">
      <span class="primary spacing_none underline">View Score</span>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue"
const props = defineProps({
  bgcolor: {
    default: "#000000",
    type: String,
  },
  image: {
    default: "https://randomuser.me/api/portraits/men/32.jpg",
    type: String,
  },
  reg_num: {
    default: "HCP 6",
    type: String,
  },
  name: {
    default: "Alex",
    type: String,
  },
})
const score_table = ref([
  {
    round: "1",
    round_score: "PAR 4",
  },
  {
    round: "2",
    round_score: "PAR 4",
  },
  {
    round: "3",
    round_score: "PAR 4",
  },
  {
    round: "4",
    round_score: "PAR 4",
  },
  {
    round: "5",
    round_score: "PAR 4",
  },
  {
    round: "6",
    round_score: "PAR 4",
  },
  {
    round: "7",
    round_score: "PAR 4",
  },
  {
    round: "8",
    round_score: "PAR 4",
  },
])
</script>
<style lang="scss">
.player_card {
  border-radius: 0.625rem !important;
  padding: 1rem;
  border: solid 1px #e9e9e9 !important;
}
.customCard_height{
  height: 100% !important;
}
</style>
