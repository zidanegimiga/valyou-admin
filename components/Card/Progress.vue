<template lang="">
  <Card class="card_container h-full count__card_wrap progressCard">
    <template #content>
      <div class="p-2">
        <h4 class="font-bold">{{ props.title }}</h4>
        <div class="progress my-2">
          <span
            :style="{
              width: props.percentage + '%',
              backgroundColor: props.color,
            }"
          ></span>
        </div>
        <span>
          Completion:
          <span :style="{ color: props.color }"
            >{{ props.percentage }} %</span
          ></span
        >
      </div>
    </template>
  </Card>
</template>
<script setup>
const props = defineProps(["title", "percentage", "color"]);
</script>
<style lang="scss">
.progressCard {
  .progress {
    position: relative;
    height: 11px;
    width: 100%;
    border-radius: 2px;
    background-color: #8d98a926;
    span {
      position: absolute;
      left: 0;
      height: 100%;
      border-radius: 2px;
    }
  }
}
</style>
