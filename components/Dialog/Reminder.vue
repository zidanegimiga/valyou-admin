<template lang="">
  <Dialog
    v-model:visible="value"
    modal
    header="Set Reminder"
    :style="{ 'min-width': '28vw' }"
  >
    <div
      class="flex gap-2 align-items-center justify-content-between reminder_input_wrap"
    >
      <CustomInputContainer label="Date">
        <template v-slot>
          <DatePicker
            showIcon
            class="custom__inner_date_picker"
            placeholder="DDMMYYYY"
            v-model="date"
            dateFormat="dd MM yy"
          />
        </template>
      </CustomInputContainer>
      <CustomInputContainer label="Time">
        <template v-slot>
          <DatePicker
            timeOnly
            placeholder="00:00 PM"
            v-model="time"
            hourFormat="12"
          />
        </template>
      </CustomInputContainer>
    </div>
    <div class="flex gap-2 mt-4 justify-content-end">
      <Button outlined @click.prevent="value = !value">Cancel</Button>
      <Button @click.prevent="handleSubmit">Set</Button>
    </div>
  </Dialog>
</template>
<script>
export default {
  name: "ReminderDialog",
  props: {
    modelValue: {
      default: false,
    },
  },
  emits: ["submit",'update:modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  data() {
    return {
      date: null,
      time: null,
    };
  },
  watch: {
    value: {
      handler(newVal) {
        if (!newVal) {
          this.date = null;
          this.time = null;
        }
      },
    },
  },
  methods: {
    handleSubmit() {
      this.$emit("submit", {
        date: this.date,
        time: this.time?.toLocaleTimeString() ?? null,
      });
      this.value = !this.value
    },
  },
};
</script>
<style lang="scss">
.reminder_input_wrap {
  & > div:first-child {
    flex: 2;
  }
  & > div:last-child {
    flex: 1;
  }
  .p-calendar {
    width: 100%;
  }
}
</style>
