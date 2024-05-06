<template>
  <div class="wrapper-column">
    <!-- Heading & add new btn -->
    <div class="item card">
      <div class="wrapper-row">
        <div class="item">
          <div class="flex align-items-center h-full">
            <h3 class="font-bold">Manage Campaigns</h3>
          </div>
        </div>
        <div class="item expand"></div>
        <div class="item">
          <div class="flex align-items-center h-full">
            <Button
              label="Add Campaign"
              icon="pi pi-plus"
              @click="
                () => {
                  Sidebar_visible = !Sidebar_visible
                }
              "
            />
          </div>
        </div>
      </div>
    </div>

    <div class="item mt-3 expand card">
      <div class="wrapper-column">
        <div class="item expand">
          <ComponentsLibraryRpDataTable
            class="h-27rem"
            :api_URL="api_URL"
            :isPagination="true"
            :isSearch="true"
            header="All Campaigns"
            :isFilterBy="true"
            datatable_key="_campaigns_key"
            :key="_key"
          >
            <template #datatable_header="slotsProps">
              <div class="flex justify-content-between my-4">
                <span class="text-gray font-light uppercase">{{
                  campaign_type_list
                }}</span>
                <MenuPopFilter
                  :inherent_attrs="true"
                  severity="secondary"
                  :items="slotsProps?.reactive_refs?.FilterBy_model"
                  @clear="slotsProps.FilterBy_options.btn_filter_clear"
                  @submit="slotsProps.FilterBy_options.btn_filter_submit"
                  :key="slotsProps.FilterBy_options.key_filter"
                  @selected="selected"
                />
              </div>
            </template>
            <template #campaign_message="slotsProps">
              {{
                slotsProps.data.campaign_type == "email"
                  ? slotsProps.data.subject
                  : slotsProps.data.campaign_message
              }}
            </template>
            <template #createdAt="slotsProps">
              {{ moment(slotsProps.data.createdAt).format("YYYY-MM-DD") }}
            </template>
            <template #status="slotProps">
              <div class="w-full text-center">
                <Tag
                  class="p-0 font-size-small font-bold"
                  :value="slotProps?.data?.status"
                  style="
                    font-size: 12px !important;
                    min-width: 3.5rem;
                    padding: 3px !important;
                    padding-left: 6px !important;
                    padding-right: 6px !important;
                  "
                  :style="getSeverity(slotProps?.data?.status)"
                />
              </div>
            </template>
          </ComponentsLibraryRpDataTable>
        </div>
      </div>
    </div>
    <SidebarPrime
      v-model:visible="Sidebar_visible"
      position="right"
      class="w-full md:w-30rem"
      :showCloseIcon="false"
      :pt="{
        header: {
          style: 'justify-content: start',
        },
      }"
    >
      <template #header>
        <TextIconTitle
          text="Create a new campaign"
          text_class="font-bold text-lg"
          text_style="color:#000"
          icon_class="font-bold"
          icon_x="0px"
          @click="Sidebar_visible = !Sidebar_visible"
        />
      </template>
      <div class="wrapper-column">
        <h5 class="font-bold my-5">Select type of campaign</h5>
        <div class="flex mb-3">
          <Button
            :outlined="campaign_type == 'email'"
            class="mr-2"
            @click="() => (campaign_type = 'sms')"
            >SMS</Button
          >
          <Button
            :outlined="campaign_type == 'sms'"
            @click="() => (campaign_type = 'email')"
            >Email</Button
          >
        </div>
        <div class="item grid">
          <div class="col-12 pl-0">
            <CustomInputContainer label="Campaign Name">
              <template v-slot>
                <InputText
                  v-model="form.campaign_name"
                  type="text"
                  placeholder="Enter your campaign name here"
                  :class="{ 'p-invalid': validationErrors.campaign_name }"
                />
                <small
                  class="p-error p-min-error"
                  v-if="validationErrors.campaign_name"
                >
                  {{
                    useRegexUnderScore(validationErrors.campaign_name) ||
                    "&nbsp;"
                  }}
                </small>
              </template>
            </CustomInputContainer>
          </div>
          <div class="col-12 pl-0">
            <CustomInputContainer label="Send To">
              <template v-slot>
                <InputText
                  v-model="user_count"
                  type="text"
                  placeholder="Enter your location name here"
                  disabled
                />
              </template>
            </CustomInputContainer>
          </div>
          <div class="col-12 pl-0" v-if="campaign_type == 'email'">
            <CustomInputContainer label="Subject">
              <template v-slot>
                <InputText
                  v-model="form.campaign_subject"
                  type="text"
                  placeholder="Enter your subject name here"
                  :class="{ 'p-invalid': validationErrors.campaign_subject }"
                />
                <small
                  class="p-error p-min-error"
                  v-if="validationErrors.campaign_subject"
                >
                  {{
                    useRegexUnderScore(validationErrors.campaign_subject) ||
                    "&nbsp;"
                  }}
                </small>
              </template>
            </CustomInputContainer>
          </div>
          <div class="col-12 pl-0">
            <p class="black_text font-medium mb-2">Message</p>
            <div v-if="campaign_type == 'email'">
              <Editor
                v-model="form.campaign_email_message"
                editorStyle="height: 320px"
              />
              <small
                class="p-error p-min-error"
                v-if="validationErrors.campaign_email_message"
              >
                {{
                  useRegexUnderScore(validationErrors.campaign_email_message) ||
                  "&nbsp;"
                }}
              </small>
            </div>
            <div v-else>
              <Textarea
                v-model="form.campaign_message"
                variant="outlined"
                placeholder="Type your message here"
                autoResize
                rows="5"
                cols="30"
                :maxlength="160"
                :class="{ 'p-invalid': validationErrors.campaign_message }"
              />

              <small
                class="p-error p-min-error"
                v-if="validationErrors.campaign_message"
              >
                {{
                  useRegexUnderScore(validationErrors.campaign_message) ||
                  "&nbsp;"
                }}
              </small>
              <span class="text-xs flex justify-content-end"
                >Character limit: 160</span
              >
            </div>
          </div>
          <div class="col-12 pl-0" v-if="campaign_type == 'email'">
            <p class="mb-2">Attachment</p>
            <UploadFile
              v-model="files"
              :multiple="false"
              v-on:update:modelValue="uploadFile"
            />
          </div>
        </div>
        <div class="flex justify-content-end mt-4 pb-4">
          <Button
            outlined
            class="mr-2"
            @click="Sidebar_visible = !Sidebar_visible"
            >Cancel</Button
          >
          <Button @click="submit_form">Create Campaign</Button>
        </div>
      </div>
    </SidebarPrime>
  </div>
</template>

<script setup>
import * as yup from "yup"
import { useToast } from "primevue/usetoast"
import moment from "moment-timezone"
import { createCampaign } from "@/services/campaigns/createCampaign"

const baseURL = useRuntimeConfig().public.baseURL
const api_URL = `${baseURL}admin/campaigns/campaign/list/All`

const toast = useToast()
const Sidebar_visible = ref(false)
const campaign_type = ref("sms")
const campaign_type_list = ref("")
const selected = (e) => {
  campaign_type_list.value = e
}
const _key = ref(0)
const getSeverity = (item) => {
  switch (item) {
    case "Pending":
      return {
        color: "#FFB536",
        backgroundColor: "#FFB53620",
      }

    case "Sent":
      return {
        color: "#1AD598",
        backgroundColor: "#1AD59833",
      }
    case "Failed":
      return {
        color: "#F3654A",
        backgroundColor: "#F3654A33",
      }
    default:
      return {
        color: "#1AD598",
        backgroundColor: "#1AD59820",
      }
  }
}
const form = reactive({
  campaign_name: "",
  campaign_message: "",
  campaign_email_message: "",
  campaign_subject: "",
  campaign_attachment: "",
})
const schema_sms = yup.object({
  campaign_name: yup.string().required(),
  campaign_message: yup.string().required(),
})
const schema_email = yup.object({
  campaign_name: yup.string().required(),
  campaign_email_message: yup.string().required(),
  campaign_subject: yup.string().required(),
})
const validationErrors = ref({})

const form_keys = Object.keys(form)

const Check_Validation = async () => {
  try {
    if (campaign_type.value == "email") {
      await schema_email.validate(form, { abortEarly: false })
    } else {
      await schema_sms.validate(form, { abortEarly: false })
    }
    validationErrors.value = {}
  } catch (err) {
    validationErrors.value = err.inner.reduce((errors, error) => {
      let error_message = error.message

      form_keys.forEach((item) => {
        error_message = error_message.replace(item + " ", "")
      })
      error_message = error_message.replace(error.path + " ", "")

      return { ...errors, [error.path]: error_message }
    }, {})
  }
}
const Clear_Validation = () => {
  validationErrors.value = {}
}
const files = ref([])
const uploadFile = async () => {
  const formData = new FormData()
  formData.append("file", files.value[0], files.value[0].name)
  try {
    const { data } = await useMyFetch(`/admin/user/upload_file`, {
      method: "POST",
      body: formData,
    })
    form.campaign_attachment = data.value.data[0].url
  } catch (err) {
    console.log("error Response:", err)
  }
}

const user_count = ref(0)
const userCount = async () => {
  try {
    const { data } = await useMyFetch(`/admin/campaigns/user_count?type=email`)
    user_count.value = data.value.count
  } catch (err) {
    console.log("error Response:", err)
  }
}

const submit_form = async () => {
  await Check_Validation()

  if (Object.keys(validationErrors.value).length === 0) {
    let payload = {
      campaign_name: form.campaign_name,
      campaign_type: campaign_type.value,
      campaign_message:
        campaign_type == "email"
          ? form.campaign_email_message
          : form.campaign_message,
    }
    if (campaign_type.value == "email") {
      payload = {
        ...payload,
        subject: form.campaign_subject,
      }
    }
    try {
      let res = await createCampaign(payload)

      toast.add({
        severity: "success",
        summary: "Inventory added successfully",
        detail: "",
        life: 3000,
      })
      setTimeout(() => {
        Sidebar_visible.value = false
        _key.value += 1
      }, 1000)
    } catch (error) {
      console.log("res: ", error)
      if (error.response._data.code == 400) {
        toast.add({
          severity: "error",
          summary: error.response._data.message,
          detail: "",
          life: 3000,
        })
      } else if (error.response._data.code === 500) {
        toast.add({
          severity: "error",
          summary: "An error occurred, please try again",
          detail: "",
          life: 3000,
        })
      }
    }
  }
}
onMounted(() => {
  userCount()
})
</script>

<style lang="scss">
.icon-container {
  border: 1px solid #e2e7f1;
  border-radius: 8px;
  padding: 0.2rem 0.4rem;
  cursor: pointer;
  &.active {
    border-color: #0a94ff !important;
    background-color: transparent !important;
    .pi {
      color: #0a94ff !important;
    }
  }
}
</style>
