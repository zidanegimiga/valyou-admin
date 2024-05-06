<template lang="">
  <Dialog
    v-model:visible="value"
    modal
    :style="{ 'min-width': '10vw', 'max-width': '35rem' }"
  >
    <template #header>
      <h5 class="font-extraBold p-2">Log Email</h5>
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
      <!-- <div class="col-12 md:col-6">
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
      </div> -->
      <!-- <div class="col-12 md:col-6">
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
      </div> -->
      <!-- <div class="col-12">
        <CustomInputContainer label="Meeting Recording">
          <template v-slot>
            <FileUpload
              mode="basic"
              name="demo"
              url=""
              accept="audio/*,video/*"
              :maxFileSize="1000000"
              @uploader="onUpload"
              customUpload
              :auto="true"
              chooseLabel="Attach recording"
              class="custom__input_file_upload outlined secondary"
              outlined
            >
              <template #uploadicon>
                <i class="pi pi-paperclip"></i>
              </template>f
            </FileUpload>
          </template>
        </CustomInputContainer>
      </div> -->
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
import { getImageURL } from "@/services/leads"
const customer_name = ref("Victoria")
const activity = ref("Email")
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
const activity_recording = ref([])
const document = ref([])
const fileName = ref("")
const onUpload = (val) => {
  activity_recording.value.push(val.files[0])
  fileName.value = val.files[0].name
}
const submitHandler = async () => {
  let payload = {
    customer_name: customer_name.value,
    activity: activity.value,
    notes: notes.value,
  }
//   if (document.value.length > 0) {
//     await getImageURL(document.value[0]).then((res) => {
//       payload.files = res.data.value[0]
//     })
//   }
  if (activity_recording.value.length > 0) {
    await getImageURL(activity_recording.value[0]).then((res) => {
      payload.meeting_record = res.data.value[0]
    })
  }
  cancel()
  emit("submit", payload)
  value.value = false
}
</script>
<style lang="scss"></style>
