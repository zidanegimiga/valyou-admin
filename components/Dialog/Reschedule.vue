<template lang="">
  <Dialog
    v-model:visible="value"
    modal
    :style="{ 'min-width': '10vw', 'max-width': '35rem' }"
  >
    <template #header>
      <h5 class="font-extraBold p-2">{{ activityObj?.activity_type }}</h5>
    </template>
    <div class="grid">
      <div class="col-12 md:col-6">
        <CustomInputContainer label="Activity">
          <template v-slot>
            <InputText
              id="customer_name"
              v-model="activity"
              placeholder="Enter Customer Name"
              :disabled="true"
            />
          </template>
        </CustomInputContainer>
      </div>
      <div class="col-12 md:col-6">
        <CustomInputContainer :label="`${activityObj?.activity_type} Date`">
          <template v-slot>
            <DatePicker
              v-model="call_date"
              showIcon
              class="custom__inner_date_picker w-full"
              id="call_date"
              dateFormat="dd/mm/yy"
              :placeholder="`Choose ${activityObj?.activity_type} Date`"
            />
          </template>
        </CustomInputContainer>
      </div>
      <div class="col-12">
        <CustomInputContainer label="Meeting Agenda">
          <template v-slot>
            <Textarea v-model="notes" :rows="7" placeholder="Type Messages" />
          </template>
        </CustomInputContainer>
      </div>
      <div class="col-12">
        <div class="flex align-items-center mb-2">
          <Checkbox
            v-model="set_reminder"
            inputId="set_reminder"
            name="set_reminder"
            :binary="true"
          />
          <label for="set_reminder" class="ml-2"> Set Reminder </label>
        </div>
        <DatePicker
          timeOnly
          placeholder="00:00 PM"
          v-model="time"
          hourFormat="12"
          :disabled="!set_reminder"
        />
      </div>
      <div class="col-12 flex justify-content-end gap-2">
        <Button
          outlined
          @click.prevent="cancel"
          class="font-extraBold w-7rem align-items-center text-center flex justify-content-center"
          >Cancel</Button
        >
        <Button
          @click.prevent="submitHandler"
          class="font-extraBold w-7rem align-items-center text-center flex justify-content-center"
          >Done</Button
        >
      </div>
    </div>
  </Dialog>
</template>
<script setup>
import { ref, computed } from "vue"
import { getCustomersOnDropdown } from "@/services/customers"
import { useQuery } from "@tanstack/vue-query"
import { useForm } from "vee-validate"
import { useRegexUnderScore } from "@/composables/regex"
import * as yup from "yup"
const props = defineProps({
  activityObj: {
    type: Object,
  },
  modelValue: {
    type: String,
  },
})
const emit = defineEmits(["update:modelValue", "submit"])

const activity_items = ref(["Schedule Call", "Call", "Email", "Task"])

const {
  handleSubmit,
  resetForm,
  meta,
  defineInputBinds,
  errors,
  defineComponentBinds,
} = useForm({
  // validationSchema: yup.object({}),
})
const customer_name = defineComponentBinds("customer_name")
const {activityObj} = toRefs(props)
const activity = ref('')
watch(()=>activityObj.value , (val)=>{
  activity.value = val?.activity_name
})
const customer_name_items = ref([])

const type_items_meeting = ["Schedule Meeting", "Log Meeting"]
const type_items_call = ["Schedule Call", "Log Call"]
const type_items_email = ["Schedule Email", "Log Email"]

const type_items = ref(type_items_meeting)
const type = ref(type_items.value[0])

const call_date = ref(new Date())
const call_duration_items = ref([
  "2 Minutes",
  "5 Minutes",
  "15 Minutes",
  "30 Minutes",
])
const call_duration = ref(call_duration_items.value[0])
const meeting_location = defineComponentBinds("meeting_location")
const set_reminder = ref(false)
const notes = ref("")
const time = ref("")

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit("update:modelValue", value)
  },
})

watch(value, (newVal) => {
  if (!newVal) {
    resetForm()
    set_reminder.value = false
    time.value = ""
    notes.value = ""
  }
})

const cancel = () => {
  value.value = false
}

const submitHandler = handleSubmit((values) => {
  // if (values && Object.keys(values).length > 0) {
    // add project details validation here
    let payload = {
      activity_name: activity.value,
      call_date: call_date.value,
      reminder_time: time.value,
      activity_object:{
        notes:notes.value,
      },
    }
    emit("submit", payload)
    value.value = false
    resetForm()
  // }
})
</script>
<style lang="scss"></style>
