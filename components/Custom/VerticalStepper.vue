<template lang="">
  <div
    class="vert_stepper_container"
    :class="{ 'stepper-auto-width': auto_width }"
  >
    <div
      v-for="(item, index) in timeline"
      :key="index"
      class="stepper-item"
      @click.prevent="handleStep(index)"
    >
      <i
        class="pi pi-check-circle"
        v-if="item.status == 'done'"
        :class="renderColorWithStatus(item.status)"
      ></i>
      <i
        class="pi pi-times-circle"
        v-else-if="item.status == 'rejected'"
        :class="renderColorWithStatus(item.status)"
      ></i>
      <i
        v-else
        class="pi pi-circle"
        :class="renderColorWithStatus(item.status)"
      ></i>
      <div class="flex flex-column gap-1">
        <span class="stepper-label" v-html="item.title"> </span>
        <slot>

        </slot>
      </div>
      <div class="stepper-line" v-if="index !== timeline.length - 1"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CustomStepper",
  emits: {
    clickStep: null,
  },
  props: {
    timeline: {
      type: [Array],
      default() {
        return [
          {
            title: "Lead Received",
            status: "done",
          },
          {
            title: "Contact Client",
            status: "rejected",
          },
          {
            title: "Email Profile",
            status: "current",
          },
          {
            title: "Create Proposal",
            status: "pending",
          },
          {
            title: "Proposal Approval",
            status: "pending",
          },
          {
            title: "Talent's Profile",
            status: "pending",
          },
          {
            title: "Collect Documents",
            status: "pending",
          },
          {
            title: "Create Invoice",
            status: "pending",
          },
          {
            title: "Record Payment",
            status: "pending",
          },
        ]
      },
    },
    auto_width: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    renderColorWithStatus(status) {
      switch (status) {
        case "current":
        case "done":
          return "primary"
        case "rejected":
          return "danger"
        default:
          return "#aaa"
      }
    },
    handleStep(stepIndex) {
      this.$emit("clickStep", stepIndex)
    },
  },
}
</script>
<style lang="scss">
$stepper_primary_text_color: #3494ff;

.vert_stepper_container {
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: auto;
  padding-bottom: 1.7rem;
  /* width */
  &::-webkit-scrollbar {
    width: 10px;
    height: 2px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: $stepper_primary_text_color;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: darken($color: $stepper_primary_text_color, $amount: 10);
  }
  // background: green;
  i {
    background: #fff !important;
    border-radius: 50%;
    color: #8d98a9;
    position: relative;
    top: 3px;
    left: 3px;
    &.primary {
      color: #3494ff;
    }
    &.danger {
      color: #f36549;
    }
  }
  .stepper-item {
    position: relative;
    min-width: 80px;
    min-height: 70px;
    display: grid;
    grid-template-columns: 30px 1fr;
    cursor: pointer;
    i {
      background: #fff !important;
      max-height: 15px;
      max-width: 15px;
      position: relative;
      z-index: 1;
    }
  }
  .stepper-label {
    position: relative;
    text-align: left;
    line-height: 1.2;
    font-size: 0.7rem !important;
    font-weight: 600;
    color: #212121;
    letter-spacing: 0rem !important;
    &.stepper-label-done {
      color: $stepper_primary_text_color;
      font-weight: 600;
    }
  }
  .stepper-line {
    width: 2px;
    height: 90%;
    min-height: inherit;
    background: lightgray;
    height: 2px;
    position: absolute;
    top: 12px;
    left: 9.25px;
    &.stepper-line-done {
      background: $stepper_primary_text_color;
    }
  }

  &.stepper-auto-width {
    .stepper-item {
      flex: 1;
      min-height: 65px;
      min-width: 80px;
      &:last-child {
        flex: 0;
      }
    }
  }
}
</style>
