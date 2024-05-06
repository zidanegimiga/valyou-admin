<template>
  <Card class="card_container data_card">
    <template #content>
      <div>
        <!-- Heading -->
        <div class="dc__label mb-5" :style="{ color: _textColor }">
          {{ label }}
        </div>
        <!-- lower banner -->
        <div class="dc__info flex align-items-center gap-7">
          <!-- profile section -->
          <div class="profile__section flex align-items-center gap-2">
            <img :src="logo_image" />
            <div class="flex flex-column gap-1">
              <span class="font-bold black_text day_title">{{
                day_title
              }}</span>
              <span class="small__text custom_text">{{ membership_type }}</span>
            </div>
          </div>
          <span class="customVertical_line"></span>
          <!-- lower left -->
          <div class="flex align-items-center gap-6">
            <div class="flex flex-column gap-1">
              <span class="small__text custom_text">{{
                active_subscription
              }}</span>
              <span v-if="subscription_value" class="black_text cus__value">{{
                subscription_value
              }}</span>
               <span v-else  class="black_text cus__value">N/A</span>
            </div>
            <div class="flex flex-column gap-1">
              <span class="small__text custom_text">{{ profit_title }} </span>
              <span v-if="total_profit" class="black_text cus__value">AED {{ total_profit.toLocaleString('ko-KR') }}</span>
              <span v-else class="black_text cus__value">N/A</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>
<script>
export default {
  name: "DataCard",
  props: {
    logo_image: {
      type: String,
      default: "/images/memberLogo.png",
    },
    is_colored: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    day_title: {
      type: String,
      default: "Weekday",
    },
    membership_type: {
      type: String,
      default: "Premium",
    },
    profit_title: {
      value: String,
      default: "Total profit",
    },
    total_profit: {
      value: Number,
      default: null,
    },
    active_subscription: {
      type: String,
      default: "Active subscriptions",
    },
    subscription_value: {
      type: Number,
      default: null,
    },
    _textColor: {
      type: String,
      default: "#1AD598",
    },
  },
}
</script>
<style lang="scss">
.data_card {
  display: grid !important;
  min-width: 120px;
  height: 100%;
  padding: 0.8rem 1.3rem !important;

  .dc__label {
    font-weight: 600 !important;
    font-size: 0.875rem !important;
    letter-spacing: 0 !important;
  }
  .dc__info {
    width: 100% !important;
    .day_title {
      letter-spacing: -0.28px !important;
      font-size: 0.875rem !important;
    }
    .day_status {
      letter-spacing: -0.24px !important;
    }
    .cus__value {
      font-weight: bold !important;
      font-size: 1rem !important;
    }
    .customVertical_line {
      width: 0.1px !important;
      height: 3.5vh !important;
      border-radius: 10px !important;
      background: #8d98a9 !important;
    }
  }
}
</style>
