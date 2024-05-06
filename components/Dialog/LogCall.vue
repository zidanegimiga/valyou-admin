<template lang="">
  <Dialog
    v-model:visible="value"
    modal
    :style="{ 'min-width': '10vw', 'max-width': '35rem' }"
  >
    <template #header>
      <h5 class="font-extraBold p-2">Log Call</h5>
    </template>
    <div class="grid">
      <div class="col-12 md:col-6">
        <CustomInputContainer label="Customer Name">
          <template v-slot>
            <InputText
              id="customer_name"
              v-model="customer_name"
              placeholder="Enter Customer Name"
              :disabled="true"
            />
          </template>
        </CustomInputContainer>
      </div>
      <div class="col-12 md:col-6">
        <CustomInputContainer label="Activity">
          <template v-slot>
            <InputText
              id="activity"
              v-model="activity"
              placeholder="Enter Activity"
              :disabled="true"
            />
          </template>
        </CustomInputContainer>
      </div>
      <div class="col-12 md:col-6">
        <CustomInputContainer label="Call Date">
          <template v-slot>
            <DatePicker
              v-model="call_date"
              showIcon
              class="custom__inner_date_picker w-full"
              id="call_date"
              dateFormat="dd/mm/yy"
              placeholder="Choose Call Date"
              :disabled="true"
            />
          </template>
        </CustomInputContainer>
      </div>
      <div class="col-12 md:col-6">
        <CustomInputContainer label="Call Duration">
          <template v-slot>
            <Dropdown
              v-model="call_duration"
              :options="call_duration_items"
              placeholder="Select a Duration"
              class="w-full"
            />
          </template>
        </CustomInputContainer>
      </div>
      <div class="col-12">
        <CustomInputContainer label="Additional Notes">
          <template v-slot>
            <Textarea v-model="notes" :rows="7" placeholder="Enter Notes" />
          </template>
        </CustomInputContainer>
      </div>
    </div>
    <div class="col-12 flex gap-2 justify-content-end">
      <Button
        outlined
        @click.prevent="cancel"
        class="font-extraBold w-7rem align-items-center text-center flex justify-content-center"
        >Cancel</Button
      >
      <Button
        @click.prevent="submitHandler"
        class="font-extraBold w-7rem align-items-center text-center flex justify-content-center"
        >Submit</Button
      >
    </div>
  </Dialog>
</template>
<script setup>
import { ref, computed } from "vue"

const customer_name = ref("Victoria")
const activity = ref("Call")
const call_date = ref(new Date())
const call_duration_items = ref([
  "2 Minutes",
  "5 Minutes",
  "15 Minutes",
  "30 Minutes",
])
const call_duration = ref(call_duration_items.value[0])
const notes = ref("")

const props = defineProps(["modelValue", "fields"])
const emit = defineEmits(["update:modelValue", "submit"])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit("update:modelValue", value)
  },
})

watch(
  () => props.fields,
  (newValue) => {
    customer_name.value = newValue?.customer_name ?? "N/A"
    activity.value = newValue?.activity_name ?? ""
    call_date.value = new Date(newValue?.call_date) ?? ""
    call_duration.value = newValue?.call_duration ?? "N/A"
    notes.value = newValue?.activity_object[0]?.notes ?? ""
  }
)

const cancel = () => {
  value.value = false
}

const submitHandler = () => {
  let payload = {
    customer_name: customer_name.value,
    activity: activity.value,
    call_date: call_date.value,
    call_duration: call_duration.value,
    notes: notes.value,
  }
  emit("submit", payload)
  value.value = false
}
</script>
<style lang="scss"></style>
