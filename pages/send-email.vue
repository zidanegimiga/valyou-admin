<template lang="">
  <div class="grid">
    <div class="col-12">
      <form class="card">
        <template v-if="status === 0 || status === 1">
          <div class="flex justify-content-between align-items-center mb-6">
            <h5 class="font-bold">Email Receipt Name</h5>
            <div class="flex gap-2">
              <Button
                class="shady-border"
                outlined
                label="Discard"
                severity="secondary"
                @click.prevent="goBack"
              />
              <Button
                class="send-mail-btn"
                label="Send"
                v-if="status == 0"
                @click.prevent="emailProposal"
              />
              <Button
                class="send-mail-btn"
                label="Send Invoice Mail"
                v-if="status == 1"
                @click.prevent="emailInvoice"
              />
            </div>
          </div>
        </template>

        <div class="send-mail-input-grid">
          <p>From</p>
          <InputText
            type="email"
            v-model="from_email"
            placeholder="john@nathandigital.com"
          />
        </div>
        <div class="send-mail-input-grid">
          <p>Sent to</p>
          <InputText
            type="email"
            v-model="to_email"
            placeholder="admin@nathandigital.com"
          />
        </div>
        <div class="send-mail-input-grid">
          <p>Cc</p>
          <Chips
            separator=","
            id="cc_emails"
            v-model="cc_emails"
            placeholder="Give CC Emails (optional)"
          />
        </div>
        <div class="send-mail-input-grid">
          <p>Subject</p>
          <InputText
            type="text"
            v-model="subject"
            placeholder="eg: This is my Email Subject"
          />
        </div>
        <div class="send-mail-input-grid">
          <p>Attachments</p>
          <UploadFile v-model="files" />
        </div>
        <div class="send-mail-input-grid">
          <span></span>
          <Editor v-model="editor" editorStyle="height: 320px" />
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue"

import {
  useTimelineStatus,
  useStepperTimeline,
  updateTImeline,
} from "@/composables/store"

const timelineStatus = useTimelineStatus()
const stepper_timeline = useStepperTimeline()

const from_email = ref("")
const to_email = ref("")
const cc_emails = ref([])
const subject = ref("")
const editor = ref("")
const files = ref([])
const router = useRouter()

const status = ref(0)

onMounted(() => {
  switch (router.currentRoute.value.query.status) {
    case "email-proposal":
      status.value = 0
      break
    case "send-invoice":
      status.value = 1
      break
    default:
      status.value = 0
      break
  }
})

const goBack = () => {
  router.back()
}

const emailProposal = () => {
  timelineStatus.value = 4
  updateTImeline(4)
  router.replace("/leads/leads")
}

const emailInvoice = () => {
  timelineStatus.value = 6
  updateTImeline(6)
  router.replace("/leads/leads")
}
</script>
<style lang="scss">
.send-mail-btn {
  min-width: 130px;
  span {
    font-weight: 600 !important;
  }
}
.send-mail-input-grid {
  display: grid;
  align-items: center;
  display: -ms-inline-grid;
  display: -moz-inline-grid;
  grid-template-columns: 80px 1fr;
  margin-bottom: 1rem;
  p {
    font-weight: 600;
  }
  .p-inputtext {
    max-width: 25rem;
  }
  .upload_file__custom {
    max-width: 25rem;
  }
}
</style>
