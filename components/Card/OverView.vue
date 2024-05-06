<template lang="">
  <Card class="card_container h-full count__card_wrap" :class="{ card_border: is_colored }">
    <template #content>
      <div class="flex align-center gap-4 w-full">
        <img class="icon_bg" alt="" src="/icons/dashboard.svg">
        <div class="flex flex-column">
          <span class="gray_text">Total Bookings</span>
          <h1 class="font-size-large">24</h1>
        </div>
      </div>
    </template>
  </Card>
</template>
<script>
export default {
  name: "OverViewCards",
  props: {
    is_colored: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "label",
    },
    count: {
      value: [Number,String],
      default: 1000,
    },
    count_backgroundColor: {
      type: String,
      default: "#ceeaff",
    },
    count_textColor: {
      type: String,
      default: "#84caff",
    },
  },
};
</script>
<style lang="scss">
.count__card_wrap{
  .p-card-body,.p-card-content{
    height: 100%;
  }
}
.card_border{
  border:  solid 2px #E2E7F1 !important;
}
.count_card {
  display: flex !important;
  align-items: center;
  min-width: 120px;
  height: 100%;
  label {
    flex: 1;
    color: #8D98A9;
    font-weight: 300 ;
    font-size: 0.8rem !important;
    line-height: 1.3;
    letter-spacing: 0.02rem !important;
  }
  .count__span {
    font-weight: 600;
    min-height: 30px;
    min-width: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    font-size: 1.8rem !important;
    margin-right: 0.8rem;
  }
  .count__label{
    font-size: 0.875rem !important;
  }
}
.count_text_wrap {
  // padding: 0.4rem;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 30px;
  min-width: 35px;
  font-weight: 600;
  p{
    color: #000 !important;
  }
  span{
    font-size: 25px !important;
    color: #000 !important;
  }
}
</style>
