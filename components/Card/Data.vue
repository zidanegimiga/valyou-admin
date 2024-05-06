<template>
  <Card class="card_container data_card">
    <template #content>
      <div class="dc__label">{{ label }}</div>
      <p class="dc__info" :style="{ color: value_textColor }">
        {{ value }}
      </p>
      <div class="dc__value" :style="{ color: rate_textColor }">
        {{ rate }}
        <i class="pi pi-arrow-up"></i>
      </div>
    </template>
  </Card>
</template>
<script>
export default {
  name: "DataCard",
  props: {
    is_colored: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "Lorem Ipsum Dolor Imet.",
    },
    value: {
      type: String,
      default: "90%",
    },
    rate: {
      value: [Number, String],
      default: "70%",
    },
    rate_textColor: {
      type: String,
      default: "rgb(45, 245, 45)",
    },
    value_textColor: {
      type: String,
      default: "#000",
    },
  },
};
</script>
<style lang="scss">
.data_card {
  display: grid !important;
  min-width: 120px;
  height: 100%;
  padding: 0.8rem 1.3rem !important;

  .dc__label {
    // flex: 1;
    color: #616163;
    font-weight: 300;
    font-size: 0.9rem;
    line-height: 1.15;
    margin-bottom: 0.6rem;
    // padding: 4px 8px;
  }
  .dc__info {
    font-weight: 600;
    // min-height: 30px;
    // min-width: 35px;
    display: flex;
    color: #000;
    font-size: 1.1rem;
    line-height: 1.15;
    margin-bottom: 0.6rem;
    // padding: 4px 8px;
  }
  .dc__value {
    font-weight: 600;
    // min-height: 30px;
    // min-width: 35px;
    display: flex;
    color: rgb(45, 245, 45);
    font-size: 0.9rem;
    line-height: 1.15;
    align-items: center;
    font-weight: 400;
    column-gap: 0.4rem;
    // padding: 4px 8px;
    i{
      font-size: 0.8rem;
    }
  }
}
</style>
