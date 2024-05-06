<template>
  <div class="w-full">
    <div class="item">
      <div class="wrapper-row align-items-center">
        <div class="item expand flex justify-start gap-4 align-center">
          <i
            @click.prevent="emit('routeToBannersList')"
            class="pi pi-arrow-left custom_arrow cursor-pointer"
          ></i>
          <h4 class="font-bold">
            {{
              props.isUserEditingBanner ? "Edit Banner" : "Create new banner"
            }}
          </h4>
        </div>
        <div class="flex align-center gap-2">
          <div class="item">
            <Button
              outlined
              label="Discard"
              @click.prevent="emit('routeToBannersList')"
            />
          </div>
          <div class="item">
            {{ console.log("Filesss: ", !fileUrl.length > 0) }}
            <Button
              label="Save"
              @click="handleSaveBanner"
              :disabled="false"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="w-full mt-7">
      <CustomInputContainer label="" class="mb-4">
        <template v-slot>
          <h5 class="font-bold mb-2">Title</h5>
          <InputText
            v-model="form.title"
            type="text"
            :placeholder="
              props.isUserEditingBanner
                ? selectedBanner.banner_name
                : 'Enter banner title here'
            "
            :class="{ 'p-invalid': validationErrors.title }"
          />
          <small class="p-error p-min-error" v-if="validationErrors.title">
            {{ "Title is a required field" || "&nbsp;" }}
          </small>
        </template>
      </CustomInputContainer>
      <CustomInputContainer label="">
        <template v-slot>
          <h5 class="font-bold mb-2 text-xs">Sub Text</h5>
          <InputText
            v-model="form.subText"
            type="text"
            placeholder="Enter banner sub text here"
            :class="{ 'p-invalid': validationErrors.subText }"
          />
          <small class="p-error p-min-error" v-if="validationErrors.subText">
            {{ "Sub-text is a required field" || "&nbsp;" }}
          </small>
        </template>
      </CustomInputContainer>
      <div class="flex justify-between items-center w-full mt-4 gap-4">
        <CustomInputContainer label="" class="w-full">
          <template v-slot>
            <h5 class="font-bold mb-2 text-xs">Button Text</h5>
            <InputText
              v-model="form.buttonText"
              type="text"
              placeholder="Enter button text here"
              :class="{ 'p-invalid': validationErrors.buttonText }"
            />
            <small
              class="p-error p-min-error"
              v-if="validationErrors.buttonText"
            >
              {{ "Button text is a required field" || "&nbsp;" }}
            </small>
          </template>
        </CustomInputContainer>
        <CustomInputContainer label="" class="w-full">
          <template v-slot>
            <h5 class="font-bold mb-2 text-xs">Button URL</h5>
            <InputText
              v-model="form.buttonUrl"
              type="text"
              placeholder="Enter button URL here"
              :class="{ 'p-invalid': validationErrors.buttonUrl }"
            />
            <small
              class="p-error p-min-error"
              v-if="validationErrors.buttonUrl"
            >
              {{ "Button URL is required" || "&nbsp;" }}
            </small>
          </template>
        </CustomInputContainer>
      </div>

      <div class="w-full mt-4">
        <CustomInputContainer label="">
          <template v-slot>
            <h5 class="font-bold mb-2 text-xs">Banner source</h5>
            <Dropdown
              @change="(event) => selectBannerSource(event)"
              v-model="form.bannerSource"
              :options="bannerSourceOptions"
              placeholder="Website or Mobile?"
              class="w-full"
              :class="{ 'p-invalid': validationErrors.bannerSource }"
            />
            <small
              class="p-error p-min-error"
              v-if="validationErrors.bannerSource"
            >
              {{
                "Please set where the banner appears" || "&nbsp;"
              }}
            </small>
          </template>
        </CustomInputContainer>
      </div>

      <h5 class="font-bold mt-4 mb-2 text-xs">Attach file</h5>
      <div>
        <div class="upload_file__custom">
          <Toast />
          <UploadFile
            v-model="files"
            :multiple="false"
            v-on:update:modelValue="handleFileChange"
          />
          <small class="p-error p-min-error" v-if="validationErrors.files">
            {{ useRegexUnderScore(validationErrors.files) || "&nbsp;" }}
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as yup from "yup"
import { ref, defineEmits, defineProps } from "vue"
import { useToast } from "primevue/usetoast"
import formValidator from "@/containers/utils/formValidator";

const props = defineProps(["isUserEditingBanner", "banner"])

const toast = useToast()
const emit = defineEmits(["routeToBannersList"])

const form = reactive({
  title: "",
  subText: "",
  buttonText: "",
  buttonUrl: "",
  bannerSource: "",
})
const bannerSourceOptions = ref(["website", "mobile"])
const selectBannerSource = (event) => {
  form.bannerSource = event.value
}

const isUserEditingBanner = ref(false)
const selectedBanner = ref([])

const schema = yup.object({
  title: yup.string().required(),
  subText: yup.string().required(),
  buttonText: yup.string().required(),
  buttonUrl: yup.string().required().url('Invalid URL. Please enter a valid URL with http or https.'),
  bannerSource: yup.string().required(),
  // files: yup.array().of(yup.array().required().min(1)),
});

const validationErrors = ref({})
const form_keys = Object.keys(form)
const Check_Validation = async () => {
  try {
    await schema.validate(form, { abortEarly: false })
    validationErrors.value = {}
  } catch (err) {
    validationErrors.value = err.inner.reduce((errors, error) => {
      let error_message = error.message

      form_keys.forEach((item) => {
        error_message = error_message.replace(item + " ", "")
      })
      return { ...errors, [error.path]: error_message }
    }, {})
  }
}

const fileUrl = ref("")
const files = ref([])
const hasImageChanged = ref(false);

const uploadFile = async () => {
  const formData = new FormData()
  formData.append("file", files.value[0], files.value[0].name)
  try {
    const { data } = await useMyFetch(`/admin/user/upload_file`, {
      method: "POST",
      body: formData,
    })
    fileUrl.value = data.value.data[0].url
  } catch (err) {
    console.log("error Response:", err)
  }
}

const handleFileChange = (e) => {
  console.log("Update: ", e);
  hasImageChanged.value = true;
  files.value = e;
  console.log("File: ", files.value)
}

async function createContent() {
  try {
    const payload = {
      image_url: fileUrl.value,
      banner_name: form.title,
      banner_source: form.bannerSource.toLowerCase(),
      sub_text: form.subText,
      button_text: form.buttonText,
      button_url: form.buttonUrl,
    }

    const response = await useMyFetch("admin/content/create_content", {
      method: "POST",
      body: payload,
    })

    if (response.data.value?.status == true) {
      toast.add({
        severity: "success",
        summary: "Banner added successfully",
        detail: "",
        life: 3000,
      })
      emit("routeToBannersList")
    } else {
      toast.add({
        severity: "error",
        summary: "Failed to upload image",
        detail: "",
        life: 3000,
      })
    }
  } catch (error) {}
}

async function updateContent() {
  try {
    const payload = {
      image_url: fileUrl.value,
      banner_name: form.title,
      banner_source: form.bannerSource,
      sub_text: form.subText,
      button_text: form.buttonText,
      button_url: form.buttonUrl,
    }

    const response = await useMyFetch(
      `admin/content/update_content/${props.banner}`,
      {
        method: "PATCH",
        body: payload,
      }
    )

    if (response.status.value === "success") {
      toast.add({
        severity: "success",
        summary: "Banner updated successfully",
        detail: "",
        life: 3000,
      })
      emit("routeToBannersList")
    } else {
      toast.add({
        severity: "error",
        summary: "Failed to update banner",
        detail: "",
        life: 3000,
      })
    }
  } catch (error) {}
}

const handleSaveBanner = async () => {
  const err = await formValidator(schema, validationErrors.value, form);
  validationErrors.value = err;

  if (Object.keys(validationErrors.value).length === 0) {
    if (props.isUserEditingBanner) {
      if (hasImageChanged.value && fileUrl.value.length === 0) {
        console.log("File: ", fileUrl.value.length);
        toast.add({
          severity: "error",
          summary: "Select a file before proceeding",
          detail: "",
          life: 3000,
        });
      } else {
        if (hasImageChanged.value) {
          await uploadFile();
        }
        await updateContent();
      }
    } else {
      await uploadFile();
      await createContent();
    }
  }
};

const editData = ref()
async function getContent() {
  const body = {
    match_values: {
      _id: props.banner,
    },
  }
  try {
    const response = await useMyFetch("admin/content/get_content", {
      method: "POST",
      body,
    })
    return response.data.value.result
  } catch (error) {
    console.log(error)
  }
}
onMounted(async () => {
  isUserEditingBanner.value = props.isUserEditingBanner
  if (isUserEditingBanner.value === true) {
    editData.value = await getContent()
    form.title = editData.value[0].banner_name
    form.subText = editData.value[0].sub_text
    form.buttonText = editData.value[0].button_text
    form.buttonUrl = editData.value[0].button_url
    form.bannerSource = editData.value[0].banner_source
    fileUrl.value = editData.value[0].image_url
  }
})
</script>
<style lang="scss">
.upload_file__custom .p-fileupload {
  // background: rgba(255, 75, 75, 0) !important;
  background: v-bind("$props.background_color") !important;
}

.upload_file__custom .p-fileupload-buttonbar {
  background: rgba(255, 0, 0, 0) !important;
}

.upload_file__custom {
  .p-fileupload-content {
    padding: 0px;
    border: none;
  }

  .p-fileupload .p-fileupload-buttonbar {
    border-radius: 0px;
  }

  .p-fileupload-buttonbar {
    background: #f4f5f6;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    width: 98%;
    margin: auto;
  }

  .p-fileupload {
    border: 2px dashed #e2e5ea;
    background: #f4f5f6;
    border-radius: 10px;
    position: relative;
  }

  .p-fileupload-content.file_absolute {
    position: absolute;
    inset: 0.5%;
    width: 99%;
    border-radius: inherit;
    background: transparent;
  }

  .file__button_wrap {
    position: relative;
    z-index: 1;
  }

  .files__item_wrap {
    justify-content: space-between;
    padding-right: 1rem !important;

    i {
      cursor: pointer;
    }
  }
}
</style>
