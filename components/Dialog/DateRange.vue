<template lang="">
  <Dialog
    v-model:visible="value"
    modal
    header="Date Range"
    :style="{ 'min-width': '25vw' }"
  >
    <div
      class="flex gap-2 align-items-center justify-content-between reminder_input_wrap"
    >
      <CustomInputContainer label="From">
        <template v-slot>
          <DatePicker
            showIcon
            class="custom__inner_date_picker"
            placeholder="DDMMYYYY"
            v-model="from_date"
            dateFormat="dd MM yy"
          />
        </template>
      </CustomInputContainer>
      <CustomInputContainer label="To">
        <template v-slot>
          <DatePicker
            showIcon
            class="custom__inner_date_picker"
            placeholder="DDMMYYYY"
            v-model="to_date"
            dateFormat="dd MM yy"
            :minDate="from_date"
          />
        </template>
      </CustomInputContainer>
    </div>
    <div class="flex gap-2 mt-4 justify-content-center">
      <Button outlined @click.prevent="cancel" class="justify-content-center w-50"
        >Cancel</Button
      >
      <Button @click.prevent="handleSubmit" class="justify-content-center w-50">Done</Button>
    </div>
  </Dialog>
</template>

<script setup>
import { ref, computed } from "vue"
const emit = defineEmits(["update:modelValue", "submit"])
const from_date = ref(null)
const to_date = ref(null)
const props = defineProps({
  modelValue: {
    default: false,
  },
})

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit("update:modelValue", value)
  },
})

const handleSubmit = () => {
  emit("submit", {
    from_date: from_date.value.toISOString().substr(0, 10),
    to_date: to_date.value.toISOString().substr(0, 10),
  })
}
const cancel = () =>{
    from_date.value = ''
    to_date.value = ''
    value.value = !value
}
</script>

<style lang="scss">
.reminder_input_wrap {
  & > div {
    flex: 1;
  }
  .p-calendar {
    width: 100%;
  }
}
</style>
