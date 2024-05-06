<template lang="">
  <Dialog
    v-model:visible="value"
    modal
    :style="{ 'min-width': '10vw', 'max-width': '35rem' }"
  >
    <template #header>
      <h5 class="font-extraBold p-2">Log Meeting</h5>
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
        <CustomInputContainer label="Meeting Date">
          <template v-slot>
            <DatePicker
              v-model="meeting_date"
              showIcon
              class="custom__inner_date_picker w-full"
              id="meeting_date"
              dateFormat="dd/mm/yy"
              placeholder="Choose Meeting Date"
              :disabled="true"
            />
          </template>
        </CustomInputContainer>
      </div>
      <div class="col-12 md:col-6">
        <CustomInputContainer label="Meeting Location">
          <template v-slot>
            <InputText
              id="meeting_location"
              v-model="meeting_location"
              placeholder="Enter Meeting Location"
              :disabled="true"
            />
          </template>
        </CustomInputContainer>
      </div>
      <div class="col-12">
        <CustomInputContainer label="Meeting Agenda">
          <template v-slot>
            <InputText
              id="meeting_agenda"
              v-model="meeting_agenda"
              placeholder="Enter Meeting Agenda"
            />
          </template>
        </CustomInputContainer>
      </div>
      <div class="col-12">
        <CustomInputContainer label="Meeting Recording">
          <template v-slot>
            <FileUpload
              mode="basic"
              name="demo"
              url=""
              accept="audio/*,video/*"
              :maxFileSize="100000000"
              @uploader="onUpload"
              customUpload

              :auto="true"
              chooseLabel="Attach recording"
              class="custom__input_file_upload outlined secondary"
              outlined
            >
              <template #uploadicon>
                <i class="pi pi-paperclip"></i>
              </template>
            </FileUpload>
          </template>
        </CustomInputContainer>
      </div>
      <div class="col-12">
        <CustomInputContainer label="Additional Notes">
          <template v-slot>
            <Textarea
              id="additional_notes"
              v-model="additional_notes"
              placeholder="Enter notes"
            />
          </template>
        </CustomInputContainer>
      </div>
      <div class="col-12">
        <CustomInputContainer label="Documents">
          <template v-slot>
            <UploadFile v-model="document" />
          </template>
        </CustomInputContainer>
      </div>
      <div class="col-12 flex gap-2 justify-content-end align-content-center">
        <Button
          outlined
          @click.prevent="cancel"
          class="font-extraBold w-7rem flex align-items-center justify-content-center"
          >Cancel</Button
        >
        <Button
          @click.prevent="submitHandler"
          class="font-extraBold w-7rem flex align-items-center justify-content-center"
          >Done</Button
        >
      </div>
    </div>
    <Toast />
  </Dialog>
</template>
<script setup>
import { ref, computed } from "vue"
import { useToast } from "primevue/usetoast"
const toast = useToast()
import {
  getImageURL,
} from "@/services/leads"
const props = defineProps(["modelValue", "fields"])
const emit = defineEmits(["update:modelValue", "submit"])

const customer_name = ref("Victoria")
const activity = ref("Meeting")
const meeting_date = ref(new Date())
const meeting_location = ref("Dubai")
const meeting_agenda = ref("")
const additional_notes = ref("")
const files = ref([])

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
    meeting_date.value = new Date(newValue?.call_date) ?? ""
    meeting_location.value =
      newValue?.activity_object[0]?.meeting_location ?? "N/A"
    meeting_agenda.value = newValue?.activity_object[0]?.meeting_agenda ?? ""
    additional_notes.value = newValue?.additional_notes ?? ""
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
const submitHandler = async() => {
  let payload = {
    customer_name: customer_name.value,
    activity: activity.value,
    meeting_date: meeting_date.value,
    meeting_location: meeting_location.value,
    meeting_agenda: meeting_agenda.value,
    additional_notes: additional_notes.value,
    files: files.value,
    meeting_record:''
  }
  if (document.value.length > 0) {
    await getImageURL(document.value[0]).then((res) => {
      payload.files = res.data.value[0]
      })
  }
  if (activity_recording.value.length > 0) {
    await getImageURL(activity_recording.value[0]).then((res) => {
      payload.meeting_record = res.data.value[0]
    })
  }
    console.log(payload)
  emit("submit", payload)
  cancel()
}

</script>
<style lang="scss"></style>
