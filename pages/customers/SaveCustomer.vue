<template lang="">
  <div>
    <!-- Add New Customer-->
    <div class="card addNew__customer">
      <!-- Header -->
      <div class="grid flex justify-content-between">
        <div class="col-12 md:col-4 flex align-items-center">
          <span ref="Head_Name" v-if="route.query?._id" class="heading_newCus"
            >Edit Customer</span
          >
          <span ref="Head_Name" v-else class="heading_newCus"
            >Create New Customer</span
          >
        </div>
        <div
          class="flex align-items-center justify-content-end gap-3 col-12 md:col-3"
        >
          <Button
            label="Discard"
            severity="danger"
            outlined
            style="border-color: #ced6e3"
            @click="router.back()"
          />
          <Button @click.prevent="submit" class="font-bold px-5">Save</Button>
        </div>
      </div>
      <!-- Body -->
      <div class="grid addNew_wrapper">
        <div class="col-12 md:col-12">
          <!-- customer details -->
          <div class="grid col-12">
            <div class="col-12 md:col-12">
              <span class="small__text font-bold">CUSTOMER DETAILS</span>
            </div>
            <div class="col-12">
              <div class="leads__avatar_wrap logo_wrap">
                <PrimeUpdateAvatar
                @error="(e)=>{
                  console.log('error no Image',image);
                  selectedImageUrl = false
                  selectedImage= false;
                }" 
                :image="selectedImage ? (selectedImageUrl ? selectedImageUrl : image_src) : ''"
                :image_clickable="true"

                :label="route.query?._id ? `${form.inp_FirstName} ${form.inp_LastName}`: 'UR'" 
                :splits_label_bool="route.query?._id"
                :splits_only_first_last="true"
                shape="circle"
                class="custom_avatar"
                style="background: #5c9aa4; color: #fff" 
          />
                <div
                  v-ripple
                  class="edt_btn flex align-items-center justify-content-center p-ripple"

                  @click="(e)=>{
              e.target.children[1]?.click()
            }"
                >
                  <input
                    type="file"
                    ref="fileInput"
                    style="display: none"
                    @change="handleImageUpload"
                    accept="image/*"
                  />
                  <i
                    class="pi pi-pencil"
                    style="font-size: 1rem"
                    @click="handleImageUpload"
                  ></i>
                </div>
              </div>
            </div>
            <!-- First Name -->
            <div class="col-12 md:col-4">
              <CustomInputContainer label="First Name">
                <template v-slot>
                  <InputText
                    v-model="form.inp_FirstName"
                    type="text"
                    placeholder="Enter your First Name"
                    :class="{ 'p-invalid': validationErrors.inp_FirstName }"
                  />
                  <small
                    class="p-error p-min-error"
                    v-if="validationErrors.inp_FirstName"
                    >{{
                      useRegexUnderScore(validationErrors.inp_FirstName) ||
                      "&nbsp;"
                    }}</small
                  >
                </template>
              </CustomInputContainer>
            </div>
            <!-- Last Name -->
            <div class="col-12 md:col-4">
              <CustomInputContainer label="Last Name">
                <template v-slot>
                  <InputText
                    id="last_name"
                    v-model="form.inp_LastName"
                    type="text"
                    aria-describedby="last_name-error"
                    placeholder="Enter Your Last Name"
                    :class="{ 'p-invalid': validationErrors.inp_LastName }"
                  />
                  <small
                    class="p-error p-min-error"
                    v-if="validationErrors.inp_LastName"
                    id="last_name-error"
                    >{{
                      useRegexUnderScore(validationErrors.inp_LastName) ||
                      "&nbsp;"
                    }}</small
                  >
                </template>
              </CustomInputContainer>
            </div>

            <!-- Gender -->
            <div class="col-12 md:col-4">
              <CustomInputContainer label="Gender">
                <Dropdown
                  v-model="form.dd_Gender"
                  :options="dd_Gender_items"
                  :placeholder="form.dd_Gender"
                  :class="{ 'p-invalid': validationErrors.dd_Gender }"
                />
                <small
                  class="p-error p-min-error"
                  v-if="validationErrors.dd_Gender"
                  id="last_name-error"
                  >{{
                    useRegexUnderScore(validationErrors.dd_Gender) || "&nbsp;"
                  }}</small
                >
              </CustomInputContainer>
            </div>

            <!-- Nationality -->
            <div class="col-12 md:col-4">
              <CustomInputContainer label="Nationality">
                <Dropdown
                  :options="dd_Nationality_items"
                  v-model="form.dd_Nationality"
                  placeholder="Select Nationality"
                  :class="{ 'p-invalid': validationErrors.dd_Nationality }"
                />
                <small
                  class="p-error p-min-error"
                  v-if="validationErrors.dd_Nationality"
                  id="last_name-error"
                  >{{
                    useRegexUnderScore(validationErrors.dd_Nationality) ||
                    "&nbsp;"
                  }}</small
                >
              </CustomInputContainer>
            </div>

            <!-- Sales Rep -->
            <!-- 
                  optionLabel="label"
                  optionValue="id"
             -->
            <div class="col-12 md:col-4">
              <CustomInputContainer label="Sales Rep">
                <Dropdown
                  @change="(event) => (dd_SalesRep_id = event.value)"
                  v-model="form.dd_SalesRep"
                  placeholder="Select Sales Rep"

                  :options="dd_SalesRep_items"
                  :class="{ 'p-invalid': validationErrors.dd_SalesRep }"
                />
                <small
                  class="p-error p-min-error"
                  v-if="validationErrors.dd_SalesRep"
                  id="last_name-error"
                  >{{
                    useRegexUnderScore(validationErrors.dd_SalesRep) || "&nbsp;"
                  }}</small
                >
              </CustomInputContainer>
            </div>
            
            <!-- Preferred Languages -->
            <div class="col-12 md:col-4">
              <CustomInputContainer label="Preferred Languages">
                <MultiSelect
                  placeholder="Select Language"
                  v-model="form.dd_PreferredLanguages"
                  :options="dd_PreferredLanguages_items"
                  display="chip"
                  :class="{
                    'p-invalid': validationErrors.dd_PreferredLanguages,
                  }"
                >
                  <template #dropdownicon>
                    <i class="pi pi-plus-circle" style="color: #0090ff"></i>
                  </template>
                </MultiSelect>
              </CustomInputContainer>
              <small
                class="p-error p-min-error"
                v-if="validationErrors.dd_PreferredLanguages"
                >{{
                  useRegexUnderScore(validationErrors.dd_PreferredLanguages) ||
                  "&nbsp;"
                }}</small
              >
            </div>

            
            <!-- <div class="col-12 p-0"></div> -->

            <div class="col-12 md:col-4">
              <CustomInputContainer label="Email">
                <template v-slot>
                  <InputText
                    v-model="form.inp_Email"
                    type="email"
                    aria-describedby="email-error"
                    placeholder="eg: contact@example.com"
                    :class="{ 'p-invalid': validationErrors.inp_Email }"
                    
                  />
                  <small
                    class="p-error p-min-error"
                    v-if="validationErrors.inp_Email"
                    id="email-error"
                    >{{
                      useRegexUnderScore(validationErrors.inp_Email) || "&nbsp;"
                    }}</small
                  >
                </template>
              </CustomInputContainer>
            </div>

            <div class="col-12 md:col-4">
              <InputPhone
                v-model:dialCode="inp_phone_dial_code"
                v-model="form.inp_PhoneNumber"
                label="Phone Number"
                aria-describedby="phone_number-error"
                :input_class="{ 'p-invalid': validationErrors.inp_PhoneNumber }"
              />
              <small
                class="p-error p-min-error"
                v-if="validationErrors.inp_PhoneNumber"
                id="phone_number-error"
                >{{
                  useRegexUnderScore(validationErrors.inp_PhoneNumber) ||
                  "&nbsp;"
                }}</small
              >
            </div>

            <div class="col"></div>
          </div>
          <!-- additional details -->
          <div class="grid col-12">
            <!-- <div class="col-12 md:col-12">
              <span class="small__text font-bold"
                >Create Mobile App Credentials</span
              >
            </div> -->
            <div class="col-12 md:col-12">
              <p>
                <span class="font-bold">Note :</span>
                Upon creating customer, Mail will be sent to the customer's
                email address with the username(same as email) and generated
                password.
              </p>
            </div>
            <div class="col-12"></div>
            <!-- <div class="col-12 md:col-3">
              <CustomInputContainer label="Email">
                <template v-slot>
                  <InputText
                    v-model="form.inp_Email"
                    type="email"
                    disabled
                    placeholder="eg: contact@example.com"
                  />
                </template>
              </CustomInputContainer>
            </div>

            <div class="col-12 md:col-3">
              <CustomInputContainer label="Autogen Password">
                <template v-slot>
                  <span class="p-input-icon-right">
                    <i
                      class="pi pi-replay"
                      style="
                        transform: rotate(128deg) translate(0px, -2px);
                        color: #0a94ff;
                        " 
                        @click="form.inp_AutogenPassword = generateRandomId();"
                    />
                    <InputText
                      v-model="form.inp_AutogenPassword"
                      aria-describedby="email-error"
                      placeholder="M_12345678#"
                      :class="{ 'p-invalid': validationErrors.email }"
                    />
                  </span>

                  <small
                    class="p-error p-min-error"
                    v-if="validationErrors.email"
                    id="email-error"
                    >{{
                      useRegexUnderScore(validationErrors.email) || "&nbsp;"
                    }}</small
                  >
                </template>
              </CustomInputContainer>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <Toast position="top-right" />
  </div>
</template>
<script setup>
// ---------------------------------------------------------------
// # Configuration Section
// DEV MODE ONLY

import { useForm, useField } from "vee-validate"
import * as yup from "yup"
import { ref, watch } from "vue"

import { useRegexUnderScore } from "@/composables/regex"
import { useToast } from "primevue/usetoast"

import {
  CreateCustomer,
  EditCustomer,
  get_Nationalities_languages_list,
  get_SalesRep_list,
  GetCustomer,
} from "@/services/customers/save_customer"
import { getImagesURL } from "@/services/common/api_resource"

const router = useRouter()
const route = useRoute()
const toast = useToast()

// ---------------------------------------------------------------
// # Setup Components Controls like design
// dd means DropDown
// dp means DatePiker
// cb means CheckBox
// txt means TextArea
// inp means Input
// ~ other use same name of component

// Example
// inp_SellPrice = ref('');
// dd_SellPrice = ref('');

// for use Image
const selectedImage = ref("")
const image_src = ref("")
const fileInput = ref("")
const selectedImageUrl = ref("")

// const inp_phone_dial_code = ref({
//   name: "United Arab Emirates",
//   code: "AE",
//   emoji: "🇦🇪",
//   unicode: "U+1F1E6 U+1F1EA",
//   image:
//     "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AE.svg",
//   flag: "🇦🇪",
//   dial_code: "+971",
// })

const inp_phone_dial_code = ref("+971")
const form = ref({
  inp_FirstName: "",
  inp_LastName: "",
  dd_Gender: "",
  dd_Nationality: "",
  dd_SalesRep: "",
  dd_Gender: "",
  inp_Email: "",
  dd_PreferredLanguages: [],
  inp_PhoneNumber: undefined,
})
const Head_Name = ref(null)

// ---------------------------------------------------------------
// # Setup Components Data

// ## for controls
// list for option of component [use same name of v model]_items

// Example
// dd_SellPrice_items = ref([]);
const dd_Gender_items = ref(["Male", "Female"])
const dd_Nationality_items = ref(["Irani"])
const dd_SalesRep_items = ref(["Im User"])
const dd_PreferredLanguages_items = ref(["HR", "AR", "BR"])

// ## for displays

// ---------------------------------------------------------------
// # Setup Validation

const schema = yup.object({
  inp_FirstName: yup.string().matches(/^[a-zA-Z]+$/, 'Only alphabetic characters are allowed').min(2).required(),
  inp_LastName: yup.string().matches(/^[a-zA-Z]+$/, 'Only alphabetic characters are allowed').min(2).required(),
  dd_Gender: yup.string().min(2).required(),
  dd_Nationality: yup.string().min(2).required(),
  // dd_SalesRep: yup.string().notRequired(),
  dd_PreferredLanguages: yup.array().min(1).required(),
  inp_Email: yup
    .string()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "must be a valid email")
    .required(),

  inp_PhoneNumber: yup.string().min(7).max(15).required(),
})

const validationErrors = ref({})

const form_keys = Object.keys(form.value)
const Check_Validation = async () => {
  try {
    await schema.validate(form.value, { abortEarly: false })
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

// for Improve the performance
// const form_Debounced = refDebounced(form, 6000)
// watch(() => form_Debounced.value, Check_Validation, { deep: true })

// ---------------------------------------------------------------
// Functions For design

// ---------------------------------------------------------------
// Watch's for For design

// fix phone validation
// const inp_PhoneNumber_Debounced = refDebounced(form.inp_PhoneNumber, 6000)
// watch(() => form.inp_PhoneNumber, Check_Validation);

// ---------------------------------------------------------------
// API Integration

// ## sets variables integrations
const dd_SalesRep_id = ref("")

// ## resets Components Control for integrations
dd_Nationality_items.value = []
dd_SalesRep_items.value = []
dd_PreferredLanguages_items.value = []

// ## Watch's for API Integration

// ## Functions For API Integration
const images_links_ = ref([])
// ## Submit Form
const allow_submit = ref(true)
const submit = async (event) => {
  await Check_Validation()
  if (Object.keys(validationErrors.value).length == 0 && allow_submit.value) {
    // handel data

    // submitForm Here
    if (route.query?._id) {
      // Upload Image

      if (images_links_.value.length > 0) {
        var image_s = images_links_.value[0]
      } else {
        var image_s = null
      }

      // Edit mode

      try {
        let res = await EditCustomer(
          {
            first_name: form.value.inp_FirstName,
            middle_name: "",
            last_name: form.value.inp_LastName,
            gender: form.value.dd_Gender,
            nationality: form.value.dd_Nationality,
            preferred_languages: form.value.dd_PreferredLanguages,
            country_code: inp_phone_dial_code.value.replace("+", ""),
            mobile: form.value.inp_PhoneNumber.toString(),
            image_url: image_s,

            // sales_rep_id: form.value.dd_SalesRep,
            sales_rep_id: "6540ba40d15440500ee799f6",
          },
          route.query?._id
        )
        // make add disable
        allow_submit.value = false
        let current_btn_text =
          event.srcElement.textContent.split(" ")[
            event.srcElement.textContent.split(" ").length - 1
          ]
        let current_Head =
          Head_Name.value.textContent.split(" ")[
            Head_Name.value.textContent.split(" ").length - 1
          ]

        toast.add({
          severity: "success",
          summary: `${current_Head} Successfully ${current_btn_text}`,
          detail: "",
          life: 3000,
        })
        setTimeout(() => {
          router.push("/customers")
        }, 3000)
      } catch (error) {
        console.log(error.response?._data)
        if (error.response?._data != undefined) {
          if (error.response._data.code == 400) {
            toast.add({
              severity: "error",
              summary: error.response._data.message,
              detail: "",
              life: 3000,
            })
          }
        } else {
          toast.add({
            severity: "error",
            summary: error,
            detail: "",
            life: 3000,
          })
        }
      }
    } else {
      // Add mode

      // Upload Image

      if (images_links_.value.length > 0) {
        var image_s = images_links_.value[0]
      } else {
        var image_s = null
      }

      try {
        let res = await CreateCustomer({
          first_name: form.value.inp_FirstName,
          middle_name: "",
          last_name: form.value.inp_LastName,
          gender: form.value.dd_Gender,
          nationality: form.value.dd_Nationality,
          preferred_languages: form.value.dd_PreferredLanguages,
          country_code: inp_phone_dial_code.value.replace("+", ""),
          mobile: form.value.inp_PhoneNumber.toString(),
          image_url: image_s,

          email: form.value.inp_Email,
          sales_rep_id: "6540ba40d15440500ee799f6",
          // sales_rep_id: form.value.dd_SalesRep,
        })
        // make add disable
        allow_submit.value = false
        var current_btn_text =
          event.srcElement.textContent.split(" ")[
            event.srcElement.textContent.split(" ").length - 1
          ]
        var current_Head =
          Head_Name.value.textContent.split(" ")[
            Head_Name.value.textContent.split(" ").length - 1
          ]

        toast.add({
          severity: "success",
          summary: `${current_Head} Successfully ${current_btn_text}`,
          detail: "",
          life: 3000,
        })
        setTimeout(() => {
          router.push("/customers")
        }, 3000)
      } catch (error) {
        console.log(error.response?._data)
        if (error.response?._data != undefined) {
          if (error.response._data.code == 400) {
            toast.add({
              severity: "error",
              summary: error.response._data.message,
              detail: "",
              life: 3000,
            })
          }
          else if(error.response._data){
            toast.add({
            severity: "error",
            summary: error.response._data.message,
            detail: error.response._data.details,
            life: 3000,
          })
          }
        } else {
          toast.add({
            severity: "error",
            summary: error,
            detail: "",
            life: 3000,
          })
        }
      }
    }
  } else {
    toast.add({
      severity: "error",
      summary: "Please Validate inputs",
      detail: "Look at the red fields",
      life: 3000,
    })
  }
}

// ## onMounted // when we call the api

const handleApi = () => {
  // handel data here from input controls before send it

  // return function from services as $fetch Promise
  // Example
  //  return get_data_from_api();
  if (route.query?._id) {
    return GetCustomer({}, route.query?._id)
  }

  return Promise.resolve()
}

// handleData for display data from api
const handleData = (data) => {
  if (data) {
    form.value.inp_FirstName = data?.first_name
    form.value.inp_LastName = data?.last_name
    form.value.dd_Gender = data?.gender
    form.value.dd_Nationality = data?.nationality

    dd_SalesRep_id.value = data?.sales_rep_id // no api
    form.value.dd_SalesRep = data?.sales_rep_id // no api

    form.value.dd_PreferredLanguages = data?.preferred_languages

    form.value.inp_Email = data?.email

    form.value.inp_PhoneNumber = data?.mobile
    inp_phone_dial_code.value =
      data?.country_code[0] != "+"
        ? "+" + data?.country_code
        : data?.country_code

    selectedImage.value = true
    selectedImageUrl.value = data?.image_url
  }

  // Example
  // totalRecords_DataTable.value = data[0].totalCount[0].count;
  // invoices_TableData_api.value = data[0].paginatedResults.map((item) => ({
  //   invoice_no: item?.invoiceNo,
  //   matter: "Not available",
  //   type: "Not available",
  //   client_name: item?.client_name, //  item.client_name.customer_name ,
  //   due_date: new Date(item?.invoice_details.due_date)
  //     .toISOString()
  //     .slice(0, 10),
  //   total_amount: item?.subtotal,
  //   status: item?.bill_status.toUpperCase(),
  //   actions: item?.bill_status == "paid" ? ["View Timesheet"] : [],
  // }));
}

onMounted(() => {
  handleApi().then((res) => {
    handleData(res)
  })

  // getMatter_list().then((res) => {
  //   let val = res?.data.map((item) => ({
  //     label: item?.matter_name,
  //     id: item?.id,
  //   }));
  //   matter_id.value = val[0]?.id;
  //   dd_matter.value = val[0]?.id;
  //   dd_matter_items.value = val;
  // });
  get_SalesRep_list().then((res) => {
    // let val = res?.map((item) => ({
    //   label: `${item?.first_name} ${item?.last_name}`,
    //   id: item?.id,
    // }))

    let val = res?.map((item) => `${item?.first_name} ${item?.last_name}`);
    dd_SalesRep_items.value = val
  })

  get_Nationalities_languages_list().then((res) => {
    dd_Nationality_items.value = res?.nationalities
    dd_PreferredLanguages_items.value = res?.languages
  })
})

// Kept it for handle Upload an Image but this not the best practices
const handleImageUpload = async (event) => {
  // Trigger the file input element directly
  const fileInput = document.querySelector('input[type="file"]')
  if (fileInput) {
    fileInput.click()
  }
  if (event.target.files) {
    const file = event.target.files[0]
    // Display the selected image preview
    selectedImage.value = file
    selectedImageUrl.value = URL.createObjectURL(file)

    // Upload Images

    let images_links = []
    let files_list = []
    const form_data = new FormData()

    try {
      toast.add({
        severity: "info",
        summary: "Handling Image",
        detail: "Please Wait ...",
        life: 3000,
      })

      form_data.append("file", selectedImage.value, selectedImage.value.name)

      let res_images = await getImagesURL(form_data)
      images_links = res_images?.data.map((item) => item?.url)

      images_links_.value = images_links

      toast.add({
        severity: "success",
        summary: "Handling Image is Completed",
        detail: "",
        life: 3000,
      })
    } catch (error) {
      console.log(error.response?._data)
      if (error.response?._data != undefined) {
        if (error.response._data.code == 400) {
          toast.add({
            severity: "error",
            summary: error.response._data.message,
            detail: "",
            life: 3000,
          })
        }
      } else {
        toast.add({
          severity: "error",
          summary: error,
          detail: "",
          life: 3000,
        })
      }
    }
  }
}

// Add new customer
const submitForm = async (val) => {
  try {
    let payloadData = val
    const payload = {
      first_name: payloadData.first_name ?? "",
      last_name: payloadData.last_name ?? "",
      email: payloadData.email ?? "",
      phone_number: payloadData.phone_number ?? "",
      profile_image: "",
      customer_details: {
        handicap: payloadData.handicap ?? "",
        golf_club: payloadData.golf_club ?? "",
        website: "",
        city: "",
        address: "",
      },
      additional_details: {},
      notes: customer_note ?? "",
      password: payloadData.password ?? "",
    }
    const response = await useMyFetch(`/client/customer`, {
      method: "POST",
      body: payload,
    })
    const data = response
    if (data.status.value == "success") {
      toast.add({
        severity: "success",
        summary: "added successfully",
        detail: "",
        life: 3000,
      })
      setTimeout(() => {
        router.replace("/customers")
      }, 3000)
    }
  } catch (err) {
    toast.add({
      severity: "error",
      summary: " Customer Creation failed ",
      detail: "",
      life: 3000,
    })
  } finally {
  }
}
</script>
<style lang="scss">
.addNew__customer {
  height: 100vh !important;
  .addNew_wrapper {
    min-height: 90vh !important;
    max-height: 90vh !important;
    overflow: auto !important;
  }
  .addNew_wrapper::-webkit-scrollbar {
    display: none !important;
  }
  .heading_newCus {
    font-size: 1rem !important;
    font-weight: 600 !important;
    color: #000000 !important;
  }
}

.logo_wrap {
  position: relative !important;
  .edt_btn {
    width: 1.8rem !important;
    height: 1.8rem !important;
    position: absolute !important;
    background-color: #fff !important;
    border-radius: 50% !important;
    box-shadow: 0.2px 0.2px 3px 0.2px;
    z-index: 11;
    bottom: -15px !important;
    // right: -10px !important;
    right: 0 !important;
    cursor: pointer !important;
    transform: translate(0px, -13px);
  }
}

.custom_avatar {
  span.p-avatar-text {
    font-size: xx-large !important;
  }
}

.addNew__customer{
  .p-disabled,
.p-component:disabled {
  opacity: 0.6;
  background: #f4f5f6 !important;
}
}



.p-invalid {
  .p-inputnumber-input {
    border-color: #f3654a !important;
  }
}
</style>
