<template lang="">
  <div class="wrapper-column h-full">
    <div class="item h-full">
      <div class="card pl-4 pr-4 h-full w-full">
        <div class="wrapper-column">
          <!-- Heading & btns -->
          <div class="item">
            <div class="wrapper-row pt-2">
              <div class="item expand">
                <div class="flex align-items-center h-full">
                  <h3 v-if="$route.query?._id" class="font-bold">
                    Edit Free Draw - {{ Draw_code }}
                  </h3>
                  <h3 v-else class="font-bold">Create Free Draw</h3>
                </div>
              </div>
              <div class="item">
                <div class="flex align-items-center h-full gap-3">
                  <Button
                    label="Discard"
                    severity="danger"
                    outlined
                    style="border-color: #ced6e3"
                    @click="$router.back()"
                  />

                  <Button label="Save & Publish" @click="Submit_Form" />
                </div>
              </div>
            </div>
          </div>

          <!-- form data -->
          <div class="mt-3 item expand overflow-y-auto">
            <div class="wrapper-row h-full">
              <div class="item" style="flex: 0.9">
                <div class="grid">
                  <div class="col-12 md:col-5">
                    <CustomInputContainer label="Free Draw Name">
                      <template v-slot>
                        <InputText
                          v-model="form.inp_FreeDrawName"
                          type="text"
                          placeholder="eg: name"
                          :class="{
                            'p-invalid': validationErrors?.inp_FreeDrawName,
                          }"
                        />
                        <small
                          class="p-error p-min-error"
                          v-if="validationErrors?.inp_FreeDrawName"
                        >
                          {{
                            useRegexUnderScore(
                              validationErrors?.inp_FreeDrawName
                            ) || "&nbsp;"
                          }}
                        </small>
                      </template>
                    </CustomInputContainer>
                  </div>

                  <!-- <div class="col-12 md:col-11">
                    <CustomInputContainer label="Description">
                      <template v-slot>
                        <Textarea
                          autoResize
                          rows="5"
                          cols="30"
                          v-model="form.inp_Description"
                          type="text"
                          placeholder="Type Description"
                          :class="{
                            'p-invalid': validationErrors?.inp_Description,
                          }"
                        />
                        <small
                          class="p-error p-min-error"
                          v-if="validationErrors?.inp_Description"
                        >
                          {{
                            useRegexUnderScore(
                              validationErrors?.inp_Description
                            ) || "&nbsp;"
                          }}
                        </small>
                      </template>
                    </CustomInputContainer>
                  </div> -->

                  <div class="col-12 md:col-3">
                    <CustomInputContainer label="Winner Percentage">
                      <template v-slot>
                        <InputNumber
                          suffix=" %"
                          v-model="form.inp_WinnerPercentage"
                          :min="0.01"
                          :max="99.99"
                          :minFractionDigits="2"
                          placeholder="Enter Percentage"
                          :class="{
                            'p-invalid': validationErrors?.inp_WinnerPercentage,
                          }"
                        />
                        <small
                          class="p-error p-min-error"
                          v-if="validationErrors?.inp_WinnerPercentage"
                        >
                          {{
                            useRegexUnderScore(
                              validationErrors?.inp_WinnerPercentage
                            ) || "&nbsp;"
                          }}
                        </small>
                      </template>
                    </CustomInputContainer>
                  </div>

                  <!-- <div class="col-12 md:col-1"></div> -->

                  <!-- <div class="col-12 md:col-3">
                    <CustomInputContainer label="1st Prize Amount">
                      <template v-slot>
                        <InputNumber
                          suffix=" AED"
                          v-model="form.inp_Prize1"
                          :min="1"
                          :minFractionDigits="0"
                          placeholder="Enter Prize"
                          :class="{
                            'p-invalid': validationErrors?.inp_Prize1,
                          }"
                        />
                        <small
                          class="p-error p-min-error"
                          v-if="validationErrors?.inp_Prize1"
                        >
                          {{
                            useRegexUnderScore(validationErrors?.inp_Prize1) ||
                            "&nbsp;"
                          }}
                        </small>
                      </template>
                    </CustomInputContainer>
                  </div> -->

                  <!-- <div class="col-12 md:col-1"></div> -->

                  <!-- <div class="col-12 md:col-3">
                    <CustomInputContainer label="2nd Prize Amount">
                      <template v-slot>
                        <InputNumber
                          v-model="form.inp_Prize2"
                          suffix=" AED"
                          :min="1"
                          :minFractionDigits="0"
                          placeholder="Enter Prize"
                          :class="{
                            'p-invalid': validationErrors?.inp_Prize2,
                          }"
                        />
                        <small
                          class="p-error p-min-error"
                          v-if="validationErrors?.inp_Prize2"
                        >
                          {{
                            useRegexUnderScore(validationErrors?.inp_Prize2) ||
                            "&nbsp;"
                          }}
                        </small>
                      </template>
                    </CustomInputContainer>
                  </div> -->

                  <!-- <div class="col-12 md:col-3">
                    <CustomInputContainer label="3rd Prize Amount">
                      <template v-slot>
                        <InputNumber
                          suffix=" AED"
                          v-model="form.inp_Prize3"
                          :min="1"
                          :minFractionDigits="0"
                          placeholder="Enter Prize"
                          :class="{
                            'p-invalid': validationErrors?.inp_Prize3,
                          }"
                        />
                        <small
                          class="p-error p-min-error"
                          v-if="validationErrors?.inp_Prize3"
                        >
                          {{
                            useRegexUnderScore(validationErrors?.inp_Prize3) ||
                            "&nbsp;"
                          }}
                        </small>
                      </template>
                    </CustomInputContainer>
                  </div>
                  <div class="col-12 md:col-1"></div> -->

                  <!-- <div class="col-12 md:col-3">
                    <CustomInputContainer label="4th Prize Amount">
                      <template v-slot>
                        <InputNumber
                          suffix=" AED"
                          v-model="form.inp_Prize4"
                          :min="1"
                          :minFractionDigits="0"
                          placeholder="Enter Prize"
                          :class="{
                            'p-invalid': validationErrors?.inp_Prize4,
                          }"
                        />
                        <small
                          class="p-error p-min-error"
                          v-if="validationErrors?.inp_Prize4"
                        >
                          {{
                            useRegexUnderScore(validationErrors?.inp_Prize4) ||
                            "&nbsp;"
                          }}
                        </small>
                      </template>
                    </CustomInputContainer>
                  </div>

                  <div class="col-12 md:col-1"></div> -->

                  <!-- <div class="col-12 md:col-3">
                    <CustomInputContainer label="5th Prize Amount">
                      <template v-slot>
                        <InputNumber
                          suffix=" AED"
                          v-model="form.inp_Prize5"
                          :min="1"
                          :minFractionDigits="0"
                          placeholder="Enter Prize"
                          :class="{
                            'p-invalid': validationErrors?.inp_Prize5,
                          }"
                        />
                        <small
                          class="p-error p-min-error"
                          v-if="validationErrors?.inp_Prize5"
                        >
                          {{
                            useRegexUnderScore(validationErrors?.inp_Prize5) ||
                            "&nbsp;"
                          }}
                        </small>
                      </template>
                    </CustomInputContainer>
                  </div>

                  <div class="col-12 md:col-1"></div> -->

                  <div class="col-12 md:col-3">
                    <CustomInputContainer label="Valyou Point">
                      <template v-slot>
                        <InputNumber
                          suffix=" AED"
                          :min="0.01"
                          :minFractionDigits="2"
                          v-model="form.inp_ValyouPoint"
                          placeholder="Entre Point"
                          :class="{
                            'p-invalid': validationErrors?.inp_ValyouPoint,
                          }"
                        />
                        <small
                          class="p-error p-min-error"
                          v-if="validationErrors?.inp_ValyouPoint"
                        >
                          {{
                            useRegexUnderScore(
                              validationErrors?.inp_ValyouPoint
                            ) || "&nbsp;"
                          }}
                        </small>
                      </template>
                    </CustomInputContainer>
                  </div>
                  <div class="col-12 md:col-4">
                    <CustomInputContainer label="1st Prize Amount">
                      <template v-slot>
                        <template v-if="true">
                          <!-- first -->
                          <template v-if="true">
                            <div>
                              <InputNumber
                                v-model="form.inp_PrizeAmount.amount"
                                placeholder="Enter Prize Amount"
                                :class="{
                                  'p-invalid':
                                    validationErrors['inp_PrizeAmount.amount'],
                                }"
                                mode="currency"
                                currency="AED"
                                locale="ae-AE"
                                :minFractionDigits="0"
                              />
                              <small
                                class="p-error p-min-error"
                                v-if="
                                  validationErrors['inp_PrizeAmount.amount']
                                "
                              >
                                {{
                                  useRegexUnderScore(
                                    validationErrors["inp_PrizeAmount.amount"]
                                  ) || "&nbsp;"
                                }}
                              </small>
                            </div>
                          </template>

                          <!-- sec -->
                          <template v-if="true">
                            <div
                              class="mt-2 wrapper-row align-items-center gap-2"
                              v-for="(item, index) in form.list_PrizeAmount"
                              :key="index"
                            >
                              <div class="item expand">
                                <CustomInputContainer label="">
                                  <template v-slot>
                                    <label v-if="index + 2 == 2"
                                      >{{ index + 2 }}nd Prize Amount</label
                                    >
                                    <label v-if="index + 2 == 3"
                                      >{{ index + 2 }}rd Prize Amount</label
                                    >
                                    <label v-if="index + 2 > 3"
                                      >{{ index + 2 }}th Prize Amount</label
                                    >

                                    <InputNumber
                                      v-model="item.amount"
                                      placeholder="Enter Prize Amount"
                                      :class="{
                                        'p-invalid':
                                          validationErrors[
                                            `list_PrizeAmount[${index}].amount`
                                          ],
                                      }"
                                      mode="currency"
                                      currency="AED"
                                      locale="ae-AE"
                                      :minFractionDigits="0"
                                    />
                                  </template>
                                </CustomInputContainer>
                                <small
                                  class="p-error p-min-error"
                                  v-if="
                                    validationErrors[
                                      `list_PrizeAmount[${index}].amount`
                                    ]
                                  "
                                >
                                  {{
                                    useRegexUnderScore(
                                      validationErrors[
                                        `list_PrizeAmount[${index}].amount`
                                      ]
                                    ) || "&nbsp;"
                                  }}
                                </small>
                              </div>

                              <div class="item">
                                <i
                                  style="font-size: 1.5rem; color: #f3654a"
                                  class="pi pi-minus-circle cursor-pointer"
                                  @click="
                                    () => {
                                      form.list_PrizeAmount.splice(index, 1)
                                      validationErrors.list_PrizeAmount.splice(
                                        index,
                                        1
                                      )
                                    }
                                  "
                                ></i>
                              </div>
                            </div>
                          </template>
                        </template>
                        <TextIconTitleV2
                          v-if="form.list_PrizeAmount.length < 9"
                          class="mt-2"
                          style="font-size: x-small"
                          icon="pi pi-plus"
                          label="Add Prize Amount"
                          icon_color="#0090FF"
                          @click="
                            form.list_PrizeAmount.push({
                              type: `prize_${form.list_PrizeAmount.length + 2}`,
                              amount: null,
                            })
                          "
                        />
                      </template>
                    </CustomInputContainer>
                  </div>
                  <!-- <div class="col-12 md:col-1"></div> -->

                  <!-- <div class="col-12 md:col-3">
                    <CustomInputContainer label="Draw Due Date">
                      <template v-slot>
                        <DatePicker
                          :minDate="new Date()"
                          v-model="form.inp_DrawDueDate"
                          placeholder="Select Date"
                          :class="{
                            'p-invalid': validationErrors?.inp_DrawDueDate,
                          }"
                        />
                        <small
                          class="p-error p-min-error"
                          v-if="validationErrors?.inp_DrawDueDate"
                        >
                          {{
                            useRegexUnderScore(
                              validationErrors?.inp_DrawDueDate
                            ) || "&nbsp;"
                          }}
                        </small>
                      </template>
                    </CustomInputContainer>
                  </div> -->
                </div>
              </div>
              <div class="item h-full" style="flex: 1">
                <div class="wrapper-column">
                  <div class="item h-full expand">
                    <!-- <div v-for="(item, index) in 30" :key="index">adsfasdf</div> -->
                    <CustomInputContainer
                      v-if="$route.query?._id == undefined"
                      label="Banner Image"
                      :validationError="validationErrors?.Banner_Image"
                    >
                      <template v-slot>
                        <UploadFileV2
                          class="mb-2"
                          v-model="form.Banner_Image"
                          :image_list="form.image_list"
                          @update:image_list="
                            (value) => (form.image_list = value)
                          "
                          accept="image/*"
                          :multiple="false"
                          :class="{
                            'p-invalid': validationErrors?.Banner_Image,
                          }"
                        />
                        <span class="gray_text"
                          >* Max file size 0.5MB (Dimensions: 750x500)</span
                        >
                        <!-- <br /> -->
                        <!-- <span class="gray_text">* Max 15 images</span> -->
                      </template>
                    </CustomInputContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// ---------------------------------------------------------------
// # Imports Section
import { reactive, provide, inject } from "vue" // for set connection with parents & children's

// ## <- services imports ->

import {
  CreateDraw,
  EditDraw,
  GetDraw,
} from "@/services/draw_manager/free_draw/save"

import { EasyGetImagesURL } from "@/services/common/api_resource"

// ## <- dummyData imports ->

// import {
//   data_current_user as d_cu,
//   data_user_list as d_ul,
// } from "@/dummyData/customers/customers_detail"

// ## <- containers & pages imports ->

//  import CustomerDetail from "@/containers/customers/CustomerDetail"
//  const Orders_View = defineAsyncComponent(()=> import("@/pages/orders/view_with_details.vue"))

// ---------------------------------------------------------------
// # Configuration Section
// DEV MODE ONLY

import * as yup from "yup"
import { ref, watch, customRef, computed } from "vue"
import { refDebounced } from "@vueuse/core"
import { useRegexUnderScore } from "@/composables/regex"
// important don't delete any Import

import { useToast } from "primevue/usetoast"
// You should to make shore this Components added to your template or layout
// <Toast position="top-right" />

// ## <- containers Async imports ->
// const CustomerOrder = defineAsyncComponent(()=>import("@/containers/customers/CustomerOrder.vue"));

// const { signIn } = useAuth() // if login
const toast = useToast()
const router = useRouter()
const route = useRoute()

// if login to set layout & disable auth
// definePageMeta({
//   layout: "empty",
//   auth: {
//     unauthenticatedOnly: true,
//     navigateAuthenticatedTo: "/",
//   },
//   transition: {
//     name: "fade",
//     mode: "out-in",
//   },
// })

// const state = inject('sharedState'); // get reactive data from parent
// to be able to interact with both components, whether the parent or the child, any changes you make in one of the components will be updated in the other.
// in parent you should to add
;`
import { reactive, provide } from 'vue';
// set reactive data from parent
const state = reactive({
  // data or variables
  customer_type:'dog'
});
provide('sharedState', state);
`

// <- container config ->
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  disableApi: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(["update:data"])
const container_Data = computed({
  // getter
  get() {
    return props.data
  },
  // setter
  set(newValue) {
    emit("update:data", newVal)
  },
})
watch(container_Data, (newVal) => {
  emit("update:data", newVal)
})
const route_query_id = computed(() => route.query?._id)
watch(route_query_id, (val) => {
  onAPI_call()
})
// make sure it's changed with this way :
// router.replace({ query: { _id: item._id } })

// how to use it in parent
// <im_component :data="data" @update:data="(value)=> data = value" />

// ---------------------------------------------------------------

// # Submit Form settings
// form data
const form = reactive({
  inp_FreeDrawName: "",
  // inp_Description: "",
  inp_WinnerPercentage: null,
  // inp_Prize1: null,
  // inp_Prize2: null,
  // inp_Prize3: null,
  // inp_Prize4: null,
  // inp_Prize5: null,
  inp_ValyouPoint: null,
  inp_PrizeAmount: { type: "prize_1", amount: null },
  list_PrizeAmount: [],
  // inp_DrawDueDate: null,
  Banner_Image: null,
})

const schema = yup.object({
  inp_FreeDrawName: yup.string().min(2).required(),
  // inp_Description: yup.string().min(2).required(),
  inp_WinnerPercentage: yup.number().required(),
  // inp_Prize1: yup.number().required(),
  // inp_Prize2: yup.number().required(),
  // inp_Prize3: yup.number().required(),
  // inp_Prize4: yup.number().required(),
  // inp_Prize5: yup.number().required(),
  inp_PrizeAmount: yup
    .object({
      type: yup.string().min(2).required(),
      amount: yup.number().min(2).required(),
    })
    .required(),
  list_PrizeAmount: yup
    .array()
    .required()
    .of(
      yup
        .object({
          type: yup.string().min(2).required(),
          amount: yup.number().min(2).required(),
        })
        .required()
    ),
  inp_ValyouPoint: yup.number().required(),
  // inp_DrawDueDate: yup.string().required(),

  Banner_Image: yup
    .array()
    .max(1)
    .when(["lead_min"], (lead_type, schema) => {
      if (route.query?._id) {
        return schema
      } else {
        return schema.min(1)
      }
      return schema
    })

    // .test("files Format", "Unsupported Format", function (files) {
    //   let valid = true
    //   let fileName
    //   if (files.length > 0) {
    //     files.forEach((file) => {
    //       if (file.type.includes) {
    //         if (!file.type.includes("image")) {
    //           // change this to the file types you want to accept
    //           valid = false
    //           fileName = file.name
    //         }
    //       }
    //     })
    //   }

    //   return (
    //     valid ||
    //     this.createError({
    //       message: `The file "${fileName}" has Unsupported Format`,
    //     })
    //   )
    // })

    // .test(
    //   "files images aspect ratio",
    //   "Incorrect image aspect ratio",
    //   async function (files) {
    //     let valid = true
    //     let fileName

    //     if (files.length > 0) {
    //       for (let i = 0; i < files.length; i++) {
    //         const file = files[i]

    //         if (file.objectURL == undefined) {
    //           break
    //         }

    //         const image = new Image()
    //         image.src = file.objectURL
    //         const promise = new Promise((resolve) => {
    //           image.onload = () => {
    //             resolve({ width: image.width, height: image.height })
    //           }
    //         })
    //         const dimensions = await promise
    //         const aspectRatio = dimensions.width / dimensions.height
    //         if (aspectRatio !== 1) {
    //           // change this to the aspect ratio you want
    //           valid = false
    //           fileName = file.name
    //           break
    //         }
    //       }
    //     }
    //     return (
    //       valid ||
    //       this.createError({
    //         message: `The file "${fileName}" has incorrect aspect ratio`,
    //       })
    //     )
    //   }
    // )

    // .test(
    //   "files images Dimensions",
    //   "Incorrect image dimensions",
    //   async function (files) {
    //     let valid = true
    //     let fileName

    //     if (files.length > 0) {
    //       for (let i = 0; i < files.length; i++) {
    //         const file = files[i]

    //         if (file.objectURL == undefined) {
    //           break
    //         }

    //         const image = new Image()
    //         image.src = file.objectURL
    //         const promise = new Promise((resolve) => {
    //           image.onload = () => {
    //             resolve({ width: image.width, height: image.height })
    //           }
    //         })
    //         const dimensions = await promise
    //         if (dimensions.width !== 500 || dimensions.height !== 500) {
    //           valid = false
    //           fileName = file.name
    //           break
    //         }
    //       }
    //     }
    //     return (
    //       valid ||
    //       this.createError({
    //         message: `The file "${fileName}" has Incorrect image dimensions`,
    //       })
    //     )
    //   }
    // )

    // .test("files Size", "file is too large", function (files) {
    //   let valid = true
    //   let fileName
    //   if (files.length > 0) {
    //     files.forEach((file) => {
    //       const size = file.size / 1024 / 1024 // size in MB
    //       if (size > 0.5) {
    //         // change this to the size limit you want
    //         valid = false
    //         fileName = file.name
    //       }
    //     })
    //   }
    //   return (
    //     valid ||
    //     this.createError({ message: `The file "${fileName}" is too large` })
    //   )
    // })
    .when(["lead_type"], (lead_type, schema) => {

      if (route.query?._id) {
        return schema.notRequired()
      } else {
        return schema.required()
      }
      return schema
    }),
})

// ADD THE Faction "Submit_Form" to @click="Submit_Form" to your Button
// Do not Touch anything
// only add your code in /*shared code*/ /*Edit mode*/ /*add mode*/ Code space

let redirect_bool = true
let redirect_to = "/draw-manager/free-draw" // "" | url
let redirect_mode = "replace" // replace | push

let throw_error_type = "error" // error | log | null
let unknown_error_occurred_showDetails = true // true | false

let success_summary = "Successfully"
let success_detail = "free draw saved"
let life_msg = 3000
let life_redirect = 3000

// #< DO NOT FORGET TO USE await >#
const request_func = async () => {
  /*shared code place*/
  // let res = await CreateCustomer({
  //   first_name: form.inp_FirstName,
  //   middle_name: "",
  //   last_name: form.inp_LastName,
  //   gender: form.dd_Gender,
  //   nationality: form.dd_Nationality,
  //   preferred_languages: form.dd_PreferredLanguages,
  //   country_code: inp_phone_dial_code.value.dial_code.replace("+", ""),
  //   mobile: form.inp_PhoneNumber.toString(),
  //   image_url: image_src.value,
  //   email: form.inp_Email,
  // });
}

const request_func_addMode = async () => {
  /*add mode*/

  let _Banner_Image = form.Banner_Image?.[0]

  // Upload Images

  let images_link = await EasyGetImagesURL(form.Banner_Image, toast)[0]
  console.log("images_link:", images_link)

  let obj = {
    draw_name: form.inp_FreeDrawName,
    description: form.inp_Description,
    winner_percentage: form.inp_WinnerPercentage,
    prize_1: form.inp_Prize1,
    prize_2: form.inp_Prize2,
    prize_3: form.inp_Prize3,
    prize_4: form.inp_Prize4,
    prize_5: form.inp_Prize5,
    threshold: 200, // Not in design
    status: "Live", // or "Draft" // Not in design
    draw_date: form.inp_DrawDueDate,
    image_url: images_link, //_Banner_Image,
    type: "Free Draw", // Not in design
    valyou_point: form.inp_ValyouPoint,
  }

  console.log("obj:", obj)
  // return

  await CreateDraw({
    draw_name: form.inp_FreeDrawName,
    // description: form.inp_Description,
    winner_percentage: form.inp_WinnerPercentage,
    // prize_1: form.inp_Prize1,
    // prize_2: form.inp_Prize2,
    // prize_3: form.inp_Prize3,
    // prize_4: form.inp_Prize4,
    // prize_5: form.inp_Prize5,
    prize_array: [form.inp_PrizeAmount, ...form.list_PrizeAmount],
    // draw_date: form.inp_DrawDueDate,
    image_url: images_link,
    valyou_point: form.inp_ValyouPoint,
  })
}

const request_func_editMode = async () => {
  /*Edit mode*/
  // return

  await EditDraw(
    {
      draw_name: form.inp_FreeDrawName,
      // description: form.inp_Description,
      winner_percentage: form.inp_WinnerPercentage,
      // prize_1: form.inp_Prize1,
      // prize_2: form.inp_Prize2,
      // prize_3: form.inp_Prize3,
      // prize_4: form.inp_Prize4,
      // prize_5: form.inp_Prize5,
      prize_array: [form.inp_PrizeAmount, ...form.list_PrizeAmount],
      // draw_date: form.inp_DrawDueDate,
      valyou_point: form.inp_ValyouPoint,
    },
    route.query?._id
  )
}

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

// for Upload user Image
// const selectedImage = ref("")
// const image_src = ref("")
// const fileInput = ref("")

// ## for display
const draw_id = ref("")

// ---------------------------------------------------------------
// # Setup Components Data

// ## for controls
// list for option of component [use same name of v model]_items

// Example
// dd_SellPrice_items = ref([]);

// ## for displays

// <- Data Table settings ->
// const data_TableData = ref(d_ol) // or  [1, 2, 3, 4]
// const limit_DataTable = ref(5)
// const page_DataTable = ref(1)
// const totalRecords_DataTable = ref(100)
// const first_DataTable = ref(1)
// const dd_RowsPerPage = ref(limit_DataTable.value)

// const dd_RowsPerPage_items = ref([dd_RowsPerPage.value, 10, 20, 30])

// const Menu_table = ref(null);

// const changePage = (paramPage) => {
//   page_DataTable.value = paramPage.page + 1
// }

// const getSeverity = (item) => {
//   switch (item.status) {
//     case "OVERDUE":
//       return {
//         color: "#F3654A",
//         backgroundColor: "#F3654A33",
//       }

//     case "APPROVAL":
//       return {
//         color: "#FFB536",
//         backgroundColor: "#FFB53633",
//       }

//     case "PAYMENT":
//       return {
//         color: "#FFB536",
//         backgroundColor: "#FFB53633",
//       }

//     case "PAID":
//       return {
//         color: "#1AD598",
//         backgroundColor: "#D1F7EA",
//       }

//     default:
//       return {
//         color: "#fff",
//         backgroundColor: "#1AD598",
//       }
//   }
// }

// watch(page_DataTable, () => {
//   onAPI_call()
// })

// watch(dd_RowsPerPage, () => {
//   onAPI_call()
// })

// ## for displays
// const SideBarVisible = ref(false)

// ---------------------------------------------------------------
// # Setup Validation

const validation_mode = ref("One by One") // default = null for stop validation
const validation_active_monitor = ref(true) // default = false
const validation_mode_list = ref([
  "Check All", // Check All on any Change on any fields
  // when one field have change we will Check_Validation on all other fields not only this field

  "One by One", // Check_Validation for One field
  // when one field have change we will Check_Validation only on this field
])
const validation_Debounced_num = ref(500)

const validationErrors = ref({})
const form_keys = Object.keys(form)

// we need to support nested Validation
const Check_Validation = async () => {
  try {
    await schema.validate(form, { abortEarly: false })
    validationErrors.value = {}
  } catch (err) {
    console.log("err:", err)
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

const Check_Validation_One = async (key) => {
  if (form[key] !== undefined && form[key] !== null) {
    try {
      await yup.reach(schema, key).validate(form[key], { abortEarly: false })
      validationErrors.value[key] = null
    } catch (err) {
      let validationErrors_value = err.inner.reduce((errors, error) => {
        let error_message = error.message

        form_keys.forEach((item) => {
          error_message = error_message.replace(item + " ", "")
        })
        return { ...errors, [key]: error_message }
      }, {})

      validationErrors.value[key] = validationErrors_value[key]
    }
  }
}

const Clear_Validation = () => {
  validationErrors.value = {}
}

/**
 * @typedef {Object} WatchOptions
 * @property {boolean} deep
 * @property {string} flush
 * @property {boolean} immediate
 * @property {function} onTrack
 * @property {function} onTrigger
 */

/**
 * @param {function} watchedValue
 * @param {function} watchHandler
 * @param {WatchOptions} watchOptions
 */
const createWatcher = (watchedValue, watchHandler, watchOptions) => {
  const stopWatcher = ref(null)

  const startWatcher = () => {
    stopWatcher.value = watch(watchedValue, watchHandler, watchOptions)
    const function_stopWatcher = () => {
      try {
        return stopWatcher.value()
      } catch (error) {
        return undefined
      }
    }

    return { stopWatcher: function_stopWatcher }
  }

  const function_stopWatcher = () => {
    try {
      return stopWatcher.value()
    } catch (error) {
      return undefined
    }
  }

  return { startWatcher, stopWatcher: function_stopWatcher }
}

// # createWatcher Faction
// its Same watch But you need to Start & Stop Watch
// Example How TO USE

// const val = ref(null);
// const { startWatcher: myStartWatcher, stopWatcher: myStopWatcher } = createWatcher(
//   cb_Remember_me,
//   ()=>{
//     val.value++
//     console.log("Val:",val.value);
//     if(val.value == 10){
//       myStopWatcher();
//     }
//   },
// );
// myStartWatcher();

// Template code

// const inp_Email_computed = computed(()=> form.inp_Email);
// const inp_Email_Debounced = refDebounced(inp_Email_computed,validation_Debounced_num.value)
// const {
//   startWatcher: startWatcher_inp_Email,
//   stopWatcher: stopWatcher_inp_Email
// } = createWatcher(()=>inp_Email_Debounced.value ,Check_Validation);

// let context_list = [{
//   key:"",
//   value:{}
// }];

// ## for loop in & make watch to all form

let context_list_CheckAll = []

for (const key in form) {
  // Check if the key is in the schema
  if (Object.hasOwnProperty.call(form, key)) {
    // Define computed and debounced variables
    const computedKey = ref(computed(() => form[key]))
    const debouncedKey = refDebounced(
      computedKey,
      validation_Debounced_num.value
    )

    // Create watcher
    const { startWatcher, stopWatcher } = createWatcher(
      () => debouncedKey.value,
      Check_Validation
    )

    // Push to the context list
    context_list_CheckAll.push({
      [key]: {
        startWatcher,
        stopWatcher,
        computed: computedKey,
        debounced: debouncedKey,
      },
    })
  }
}

// Initialize the context list
let context_list_OneByOne = []

for (const key in form) {
  // Check if the key is in the schema
  if (Object.hasOwnProperty.call(form, key)) {
    // Define computed and debounced variables
    const computedKey = ref(computed(() => form[key]))
    const debouncedKey = refDebounced(
      computedKey,
      validation_Debounced_num.value
    )

    // Create watcher
    const { startWatcher, stopWatcher } = createWatcher(
      () => debouncedKey.value,
      () => Check_Validation_One(key)
    )

    // Push to the context list
    context_list_OneByOne.push({
      [key]: {
        startWatcher,
        stopWatcher,
        computed: computedKey,
        debounced: debouncedKey,
      },
    })
  }
}

watch(
  validation_mode,
  (newVal) => {
    // for "Check All" MODE
    if (newVal == "Check All") {
      let num = 0
      for (const key in form) {
        if (Object.hasOwnProperty.call(form, key)) {
          context_list_CheckAll[num][key].startWatcher()
          num++
        }
      }
    } else {
      let num = 0
      for (const key in form) {
        if (Object.hasOwnProperty.call(form, key)) {
          context_list_CheckAll[num][key].stopWatcher()
          num++
        }
      }
      Clear_Validation()
    }

    // for "One by One" MODE
    if (newVal == "One by One") {
      let num = 0
      for (const key in form) {
        if (Object.hasOwnProperty.call(form, key)) {
          context_list_OneByOne[num][key].startWatcher()
          num++
        }
      }
    } else {
      let num = 0
      for (const key in form) {
        if (Object.hasOwnProperty.call(form, key)) {
          context_list_OneByOne[num][key].stopWatcher()
          num++
        }
      }
      Clear_Validation()
    }
  },

  { immediate: true }
)

// ---------------------------------------------------------------
// Functions For design

// ---------------------------------------------------------------
// Watch's for For design

// Example of Watch with form reactive object

// Example 1:

// const inp_Email_computed = computed(()=> form.inp_Email);
// const inp_Email_Debounced = refDebounced(inp_Email_computed,validation_Debounced_num.value);
// watch(()=>inp_Email_Debounced.value, (newVal)=>{
// //code place
// })

// Example 2:

// const inp_Email_computed = computed(()=> form.inp_Email);
// watch(inp_Email_computed, (newVal)=>{
// //code place
// })

// ---------------------------------------------------------------
// API Integration

// ## sets variables integrations
const Draw_code = ref("")

// ## resets Components Control for integrations

// ## Watch's for API Integration

// ## Functions For API Integration

// ## Submit Form
const blocked_submit = ref(false)
const addToastMessage = (severity, summary, detail) => {
  toast.add({
    severity,
    summary,
    detail,
    life: life_msg,
  })
}

const send_request_and_handelError_func = async (func = () => null) => {
  // auto handling error
  try {
    // Add your logic checks here
    if (!func || typeof func !== "function") {
      throw new Error("Invalid function provided")
    }

    await request_func()
    await func()

    blocked_submit.value = true

    addToastMessage("success", success_summary, success_detail)

    if (redirect_bool) {
      setTimeout(() => {
        if (redirect_mode == "push") {
          router.push(redirect_to)
        } else {
          router.replace(redirect_to)
        }
      }, life_redirect)
    }
  } catch (error) {
    let error_type = { ...error }.name // FetchError
    let error_text = error

    let errorMessage = ""
    let errorDetail = ""

    // if Error Happened
    if (error instanceof Error) {
      errorMessage = "An unexpected error occurred"

      // wherever of those error type
      // we should to display it
      if (throw_error_type == "error") {
        console.error(error)
      } else if (throw_error_type == "log") {
        console.log(error)
      }

      // Handling

      if (error?.response == undefined) {
        // check it if FitchError
        // Fitch Error
        // OurSide
        if (error.name == "FetchError") {
          errorDetail = error.name.toString()
          errorDetail += ":" + "\n" + error.message.toString()

          errorDetail += errorDetail
            ? "\n[ Please Try again ]"
            : "[ Please Try again ]"
        }

        // Handling other types of errors
        // from Client side
        else {
          errorMessage = "An unexpected error occurred"
          if (unknown_error_occurred_showDetails) {
            errorDetail = error.message
          }
        }
      }

      // Fitch Error
      // Server side
      else if (error?.response) {
        if (error.name == "FetchError") {
          errorDetail = ""
          errorMessage = "Detail"
          errorDetail += error?.response._data?.message
            ? error?.response._data?.message
            : error?.response._data
        }
      }

      // we stile need to add for those type of error (response)
      // error?.response?._data?.code > number like 400

      addToastMessage("error", errorMessage, errorDetail)
    }

    // errorDetail += errorDetail ? '\nPlease Try again' : 'Please Try again'
    // addToastMessage("error", errorMessage, errorDetail);
  }
}

const Head_Name = ref(null)
const allow_submit = ref(true)

const Submit_Form = async (event) => {
  await Check_Validation()

  if (
    Object.keys(validationErrors.value).length === 0 &&
    allow_submit.value &&
    !blocked_submit.value
  ) {
    // make add disable
    allow_submit.value = false

    if (route.query?._id) {
      // Edit mode

      await send_request_and_handelError_func(request_func_editMode)
    } else {
      // Add mode

      // Upload Images

      // let images_links = []
      // let files_list = []
      // const form_data = new FormData()

      // try {
      //   if (form.value.FileUpload.length > 0) {
      //     toast.add({
      //       severity: "info",
      //       summary: "Handling Images",
      //       detail: "Please Wait ...",
      //       life: 3000,
      //     })
      //   }

      //   for (let prop in form.value.FileUpload) {
      //     form_data.append(
      //       "file",
      //       form.value.FileUpload[prop],
      //       form.value.FileUpload[prop].name
      //     )
      //   }

      //   if (form.value.FileUpload.length > 0) {
      //     let res_images = await getImagesURL(form_data)
      //     images_links = res_images?.data.map((item) => item?.url)
      //   }
      // } catch (error) {
      //   console.log(error.response?._data)
      //   if (error.response?._data != undefined) {
      //     if (error.response._data.code == 400) {
      //       toast.add({
      //         severity: "error",
      //         summary: error.response._data.message,
      //         detail: "",
      //         life: 3000,
      //       })
      //     } else if (error.response._data) {
      //       toast.add({
      //         severity: "error",
      //         summary: error.response._data.message,
      //         detail: error.response._data.details,
      //         life: 3000,
      //       })
      //     }
      //   } else {
      //     toast.add({
      //       severity: "error",
      //       summary: error,
      //       detail: "",
      //       life: 3000,
      //     })
      //   }
      // }

      await send_request_and_handelError_func(request_func_addMode)
    }

    // make add available
    allow_submit.value = true
  } else if (Object.keys(validationErrors.value).length > 0) {
    toast.add({
      severity: "error",
      summary: "Please Validate inputs",
      detail: "Look at the red fields",
      life: life_msg,
    })
  } else {
    toast.add({
      severity: "error",
      summary: "DO NOT TRY TO SEND DATA MANY TIMES",
      detail: "wait please until redirect you",
      life: life_msg,
    })
  }
}

// ## onMounted // when we call the api

const handleApi = () => {
  // handel data here from input controls before send it

  // return function from services as $fetch Promise
  // Example
  //  return get_data_from_api();

  return GetDraw({}, route.query?._id)
}

// handleData for display data from api
const handleData = (data) => {
  if (data == undefined) {
    console.log("handleData: ", undefined)
    return undefined
  }

  form.inp_FreeDrawName = data?.draw_name
  // form.inp_Description = data?.description
  form.inp_WinnerPercentage = data?.winner_percentage
  // form.inp_Prize1 = data?.prize_1
  // form.inp_Prize2 = data?.prize_2
  // form.inp_Prize3 = data?.prize_3
  // form.inp_Prize4 = data?.prize_4
  // form.inp_Prize5 = data?.prize_5
  form.inp_PrizeAmount = data.prize_array[0]
  form.list_PrizeAmount = data.prize_array.slice(1)
  form.inp_ValyouPoint = data?.valyou_point

  // form.inp_DrawDueDate = new Date(data?.draw_date)

  Draw_code.value = data?.code
}

// <- call api ->

const onAPI_call = () => {
  // !props.disableApi && Object.keys(container_Data.value).length === 0
  // we can add try catch for this
  if (!props.disableApi) {
    if (route.query?._id) {
      handleApi().then((res) => {
        handleData(res)
      })
    }

    // getMatter_list().then((res) => {
    //   let val = res?.data.map((item) => ({
    //     label: item?.matter_name,
    //     id: item?.id,
    //   }));
    //   matter_id.value = val[0]?.id;
    //   dd_matter.value = val[0]?.id;
    //   dd_matter_items.value = val;
    // });
  }
}

onAPI_call()

onMounted(() => {
  // onAPI_call()
  // form.list_PrizeAmount = Array(9).fill({
  //   type: `prize_1`,
  //   amount: 0,
  // })
})
</script>
<style lang="scss">
.p-invalid {
  border-color: #f3654a !important;
  .p-inputnumber-input {
    border-color: #f3654a !important;
  }
}

.p-invalid.p-calendar.p-invalid.p-component > .p-inputtext {
  border-color: #f3654a !important;
}

.p-toast-message {
  white-space: pre-wrap;
}
</style>
