<template lang="">
  <Dialog
    v-model:visible="value"
    modal
    :style="{ 'min-width': '10vw', 'max-width': '35rem' }"
    
  >
    <template #header>
      <h5 class="font-extraBold p-2">Add New Activity</h5>
    </template>
    <div class="grid">
      <div class="col-12 md:col-6">
        <CustomInputContainer label="Customer Name">
          <template v-slot>
            <Dropdown
              id="customer_name"
              v-bind="customer_name"
              :options="customer_name_items"
              optionLabel="name"
              optionValue="_id"
              filter
              placeholder="Select a Customer"
              aria-describedby="customer_name-error"
              :class="{ 'p-invalid': errors.customer_name }"
            >
            </Dropdown>
            <small
              class="p-error p-min-error"
              v-if="errors.customer_name"
              id="customer_name-error"
              >{{ useRegexUnderScore(errors.customer_name) || "&nbsp;" }}</small
            >
          </template>
        </CustomInputContainer>
      </div>
      <div class="col-12 md:col-6">
        <CustomInputContainer label="Activity">
          <template v-slot>
            <Dropdown
              v-bind="activity"
              :options="activity_items"
              placeholder="Select a Duration"
              class="w-full"
            />
          </template>
        </CustomInputContainer>
      </div>
      <div class="col-12 md:col-6">
        <CustomInputContainer label="Type">
          <template v-slot>
            <Dropdown
              v-model="type"
              :options="type_items"
              placeholder="Select a Type"
              class="w-full"
            />
          </template>
        </CustomInputContainer>
      </div>
      <div class="col-12 md:col-6">
        <CustomInputContainer :label="`${activity.modelValue} Date`">
          <template v-slot>
            <DatePicker
              v-model="call_date"
              showIcon
              class="custom__inner_date_picker w-full"
              id="call_date"
              dateFormat="dd/mm/yy"
              :placeholder="`Choose ${activity.modelValue} Date`"
            />
          </template>
        </CustomInputContainer>
      </div>
      <template v-if="activity.modelValue == 'Call'">
        <div class="col-12 md:col-6">
          <CustomInputContainer label="Duration">
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
      </template>
      <template v-if="activity.modelValue == 'Meeting'">
        <div class="col-12 md:col-6">
          <CustomInputContainer label="Meeting Location">
            <template v-slot>
              <InputText
                v-bind="meeting_location"
                placeholder="Enter Location"
                class="w-full"
                aria-describedby="meeting_location-error"
                :class="{ 'p-invalid': errors.meeting_location }"
              />
              <small
                class="p-error p-min-error"
                v-if="errors.meeting_location"
                id="meeting_location-error"
                >{{
                  useRegexUnderScore(errors.meeting_location) || "&nbsp;"
                }}</small
              >
            </template>
          </CustomInputContainer>
        </div>
      </template>
      <div class="col-12">
        <CustomInputContainer
          :label="`${
            activity.modelValue == 'Meeting'
              ? 'Meeting Agenda'
              : 'Additional Notes'
          }`"
        >
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

const props = defineProps(["modelValue"])
const emit = defineEmits(["update:modelValue", "submit"])

const activity_items = ref(["Meeting", "Call", "Email", "Task"])

const {
  handleSubmit,
  resetForm,
  meta,
  defineInputBinds,
  errors,
  defineComponentBinds,
} = useForm({
  validationSchema: yup.object({
    customer_name: yup.string().required(),
    meeting_location: yup.string().when("activity", (values, schema) => {
      if (values == "Meeting")
        return schema.min(2).required("meeting location is required")
      return schema
    }),
  }),
  initialValues: {
    customer_name: "",
    activity: activity_items.value[0],
  },
})
const customer_name = defineComponentBinds("customer_name")
const activity = defineComponentBinds("activity")

const customer_name_items = ref([])

const type_items_meeting = ["Schedule Meeting", "Log Meeting"]
const type_items_call = ["Schedule Call", "Log Call"]
const type_items_email = ["Schedule Email", "Log Email"]

const type_items = ref(type_items_meeting)
const type = ref(type_items.value[0])

watch(activity, (newValue) => {
  switch (newValue.modelValue) {
    case "Call":
      type_items.value = type_items_call
      break
    case "Meeting":
      type_items.value = type_items_meeting
      break
    case "Email":
      type_items.value = type_items_email
      break
    default:
      break
  }
  type.value = type_items.value[0]
})

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

const {
  isLoading,
  isError,
  data: customers_response,
  error,
  suspense,
} = useQuery({
  queryKey: ["activity_customers"],
  queryFn: () => getCustomersOnDropdown(),
  retry: 4,
  retryDelay: 2000,
})

onServerPrefetch(async () => {
  await suspense()
})

const { data } = await suspense()

customer_name_items.value = data.data.value

const submitHandler = handleSubmit((values) => {
  if (values && Object.keys(values).length > 0) {
    // add project details validation here
    let payload = {
      user_id: customer_name.value.modelValue,
      activity_name: activity.value.modelValue,
      activity_type: type.value,
      call_date: call_date.value,
      // reminder_time: String(time.value).substr(16, 17),
      reminder_time: time.value,
      activity_object: {},
    }
    if (activity.value.modelValue == "Call") {
      payload["call_duration"] = call_duration.value
      let tempArr = {
        notes: notes.value,
      }
      payload.activity_object['notes'] = tempArr
    }
    if (activity.value.modelValue == "Meeting") {
      let tempArr = {
        meeting_location: meeting_location.value.modelValue,
        meeting_agenda: notes.value,
      }
      payload.activity_object = tempArr
    }

    emit("submit", payload)
    value.value = false
    resetForm()
  }
})
</script>
<style lang="scss"></style>
