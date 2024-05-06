<!-- I change the check icon  to fit the design -->

<template lang="">
  <div class="stepper_container" :class="{ 'stepper-auto-width': auto_width }">
    <!-- {{timeline}}
    {{electedLeads?.processes}} -->
    <div
      v-for="(item, index) in timeline"
      :key="index"
      class="stepper-item"
      @click.prevent="
        handleStep(index);
        item_click(item.title);
      "
    >
      <i
        v-if="item.process_status == 'completed'"
        class="pi"
        :class="renderColorWithStatus(item.process_status)"
      >
        <svg
          color="#0A94FF"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4l4.25 4.25ZM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"
          />
        </svg>
      </i>
      <i
        v-else
        class="pi pi-circle"
        :class="renderColorWithStatus(item.process_status)"
      ></i>
      <span
        class="stepper-label"
        :class="{ 'stepper-label-done': item.process_status == 'completed' }"
      >
        {{ item.stage_name }}
      </span>
      <div
        class="stepper-line"
        v-if="index !== timeline.length - 1"
        :class="{ 'stepper-line-done': item.process_status === 'completed' }"
      ></div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  timeline: {
    type: Object,
  },
  auto_width: {
    type: Boolean,
    default: true,
  },
});
watch(
  () => props.timeline,
  (val) => {
    console.log(val);
  }
);
// function for SetStageCustomer
// const SetStageCustomer = useState("SetStageCustomer").value;
// const state = inject("sharedState");

const item_click = (item_title) => {
  let name = item_title
    .replace("<br/>", "")
    .replace("/", "")
    .replace("Conflict", "")
    .replace("ch", "Ch")
    .replace(" ", "");
  SetStageCustomer(state.customer_type, name);
};

const renderColorWithStatus = (status) => {
  switch (status) {
    case "progress":
    case "completed":
      return "primary";
    default:
      return "#CED6E3";
  }
};
</script>

<script></script>
<style lang="scss">
$stepper_primary_text_color: #3494ff;

.stepper_container {
  display: flex;
  flex-wrap: nowrap;
  position: relative;
  overflow: auto;
  padding-bottom: 1rem;
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
    color: #ced6e3;
    position: relative;
    top: 3px;
    left: 3px;
    &.primary {
      color: #3494ff;
    }
  }
  .stepper-item {
    position: relative;
    min-width: 80px;
    min-height: 70px;
    cursor: pointer;
  }
  .stepper-label {
    position: absolute;
    bottom: 0px;
    left: 0px;
    text-align: left;
    line-height: 1.2;
    font-size: 0.68rem !important;
    color: #8d98a9;
    font-weight: 700;
    &.stepper-label-done {
      color: $stepper_primary_text_color;
    }
  }
  .stepper-line {
    width: 80%;
    background: #ced6e3;
    height: 1.5px;
    position: absolute;
    top: 12px;
    left: 19px;
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
    .stepper-line {
      width: 100%;
    }
  }
}
</style>
