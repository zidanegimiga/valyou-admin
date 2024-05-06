<template lang="">
  <div class="card mt-0 new-draw">
    <div class="flex justify-content-between">
      <h4 v-if="route.query?._id" class="font-bold">Edit Draw-Listing</h4>
      <h4 v-else class="font-bold">Create New Draw-Listing</h4>
      <div>
        <Button outlined severity="warning" @click="$router.back()"
          >Cancel</Button
        >
        <Button
          v-if="route.query?._id === undefined"
          outlined
          :class="`ml-2 ${false ? 'disabled-btn' : ''}`"
          @click="Submit_Form"
          >Save as Draft</Button
        >
        <Button
          v-if="route.query?._id === undefined"
          :class="`ml-2 ${false ? 'disabled-btn' : ''}`"
          @click="Submit_Form"
          >Save & Publish</Button
        >

        <Button
          v-if="route.query?._id"
          :class="`ml-2 ${false ? 'disabled-btn' : ''}`"
          @click="Submit_Form"
          >Update</Button
        >
      </div>
    </div>
    <h6 class="font-Bolder mt-5 ml-3">Draw Details</h6>
    <div class="grid">
      <div class="col-9">
        <div class="grid">
          <div class="col-12 md:col-6 mb-2">
            <div class="grid">
              <div class="col-12 mb-2" :key="dd_Product_key">
                <CustomInputContainer label="Product">
                  <template v-slot>
                    <Dropdown
                      v-if="!route.query?._id"
                      :disabled="route.query?._id ? true : false"
                      @change="(event) => (dd_Product_id = event.value)"
                      v-model="form.dd_Product"
                      :options="dd_Product_items"
                      optionLabel="label"
                      optionValue="id"
                      placeholder="Select a Product"
                      :class="{ 'p-invalid': validationErrors.dd_Product }"
                    />
                    <Dropdown
                      v-if="route.query?._id"
                      :disabled="true"
                      v-model="form.dd_Product"
                      :options="dd_Product_items"
                      placeholder="Select a Product"
                      :class="{ 'p-invalid': validationErrors.dd_Product }"
                    />
                    <small
                      class="p-error p-min-error"
                      v-if="validationErrors.dd_Product"
                    >
                      {{
                        useRegexUnderScore(validationErrors.dd_Product) ||
                        "&nbsp;"
                      }}
                    </small>
                  </template>
                </CustomInputContainer>
              </div>
              <div class="col-12 mb-2">
                <CustomInputContainer label="Threshold">
                  <template v-slot>
                    <InputNumber
                      v-model="form.inp_Threshold"
                      placeholder="Type a Threshold"
                      :class="{
                        'p-invalid': validationErrors.inp_Threshold,
                      }"
                      @update:modelValue="calculatePrizes()"
                    />
                    <small
                      class="p-error p-min-error"
                      v-if="validationErrors.inp_Threshold"
                    >
                      {{
                        useRegexUnderScore(validationErrors.inp_Threshold) ||
                        "&nbsp;"
                      }}
                    </small>
                  </template>
                </CustomInputContainer>

                <!-- <div class="col-12 md:col-3 mb-2">
                <CustomInputContainer label="Draw Date">
                  <template v-slot>
                    <DatePicker
                      :minDate="new Date()"
                      v-model="form.dd_Date"
                      placeholder="Select Date"
                      dateFormat="dd/mm/yy"
                      class="custom__inner_date_picker"
                      showIcon
                      :class="{ 'p-invalid': validationErrors.dd_Date }"
                    />
                  </template>
                </CustomInputContainer>
                <small
                  class="p-error p-min-error"
                  v-if="validationErrors.dd_Date"
                >
                  {{ useRegexUnderScore(validationErrors.dd_Date) || "&nbsp;" }}
                </small>
              </div> -->
              </div>
              <!-- <div class="col-12 md:col-6 mb-2">
                <CustomInputContainer label="Draw Name">
                  <template v-slot>
                    <InputText
                      v-model="form.inp_DrawName"
                      type="text"
                      placeholder="eg: name"
                      :class="{ 'p-invalid': validationErrors.inp_DrawName }"
                    />
                    <small
                      class="p-error p-min-error"
                      v-if="validationErrors.inp_DrawName"
                    >
                      {{
                        useRegexUnderScore(validationErrors.inp_DrawName) ||
                        "&nbsp;"
                      }}
                    </small>
                  </template>
                </CustomInputContainer>
              </div>
              <div class="col-12 mb-2">
                <CustomInputContainer label="Description">
                  <template v-slot>
  <Textarea
    v-model="form.txt_Description"
    rows="6"
    cols="30"
    placeholder="type description ..."
    :class="{ 'p-invalid': validationErrors.txt_Description }"
  />
  <small class="p-error p-min-error" v-if="validationErrors.txt_Description">
    {{ useRegexUnderScore(validationErrors.txt_Description) || "&nbsp;" }}
  </small>
</template>
                </CustomInputContainer>
              </div> -->
            </div>
          </div>
          <div class="col-12 md:col-6 mb-2">
            <CustomInputContainer
              label="Draw Card Banner Image"
              :validationError="
                validationErrors.UploadFileV2_DrawCardBannerImage
              "
            >
              <template v-slot>
                <UploadFileV2
                  v-model="form.UploadFileV2_DrawCardBannerImage"
                  accepts="image/*"
                  :multiple="false"
                  :image_list="form.image_list"
                  @update:image_list="(value) => updateImage(value)"
                  :class="{
                    'p-invalid':
                      validationErrors.UploadFileV2_DrawCardBannerImage,
                  }"
                />
                <span class="gray_text"
                  >* Max file size 0.5MB (Dimensions: 500x500)</span
                >
                <br />
                <!-- <span class="gray_text">* Max 15 images</span> -->
              </template>
            </CustomInputContainer>
          </div>
          <div class="col-12 md:col-3 mb-2">
            <CustomInputContainer label="Winner Percentage">
              <template v-slot>
                <InputNumber
                  v-model="form.inp_WinnerPercentage"
                  placeholder="Enter Winner Percentage"
                  :class="{
                    'p-invalid': validationErrors.inp_WinnerPercentage,
                  }"
                  :min="0"
                  :max="99"
                  suffix=" %"
                  @update:modelValue="calculatePrizes()"
                />
                <small
                  class="p-error p-min-error"
                  v-if="validationErrors.inp_WinnerPercentage"
                >
                  {{
                    useRegexUnderScore(validationErrors.inp_WinnerPercentage) ||
                    "&nbsp;"
                  }}
                </small>
              </template>
            </CustomInputContainer>
          </div>
          <div class="col-12 md:col-4 flex align-items-center" v-if="error">
            <p class="p-error p-min-error">{{ error }}</p>
          </div>
          <div class="col-12 md:col-4" v-else>
            <CustomInputContainer
              label="1st Prize Amount"
              :class="{
                disable:
                  form.inp_WinnerPercentage == null ||
                  form.inp_Threshold == null,
              }"
            >
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
                        v-if="validationErrors['inp_PrizeAmount.amount']"
                      >
                        {{
                          useRegexUnderScore(
                            validationErrors[
                              "inp_PrizeAmount.amount"
                            ].substring(23)
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
                              ].substring(27)
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
                              validationErrors.list_PrizeAmount.splice(index, 1)
                            }
                          "
                        ></i>
                      </div>
                    </div>
                  </template>
                </template>
                <TextIconTitleV2
                  v-if="form.list_PrizeAmount.length < prizesLength - 2"
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
          <!-- <div class="col-12 md:col-3 mb-2">
            <CustomInputContainer label="1st Prize Amount">
              <template v-slot>
                <InputNumber
                  v-model="form.inp_1stPrizeAmount"
                  placeholder="Enter 1st Prize Amount"
                  :class="{ 'p-invalid': validationErrors.inp_1stPrizeAmount }"
                  mode="currency"
                  currency="AED"
                  locale="ae-AE"
                  :minFractionDigits="0"
                />
                <small
                  class="p-error p-min-error"
                  v-if="validationErrors.inp_1stPrizeAmount"
                >
                  {{
                    useRegexUnderScore(validationErrors.inp_1stPrizeAmount) ||
                    "&nbsp;"
                  }}
                </small>
              </template>
            </CustomInputContainer>
          </div>
          <div class="col-12 md:col-3 mb-2">
            <CustomInputContainer label="2nd Prize Amount">
              <template v-slot>
                <InputNumber
                  v-model="form.inp_2stPrizeAmount"
                  placeholder="Enter 2nd Prize Amount"
                  :class="{ 'p-invalid': validationErrors.inp_2stPrizeAmount }"
                  mode="currency"
                  currency="AED"
                  locale="ae-AE"
                  :minFractionDigits="0"
                />
                <small
                  class="p-error p-min-error"
                  v-if="validationErrors.inp_2stPrizeAmount"
                >
                  {{
                    useRegexUnderScore(validationErrors.inp_2stPrizeAmount) ||
                    "&nbsp;"
                  }}
                </small>
              </template>
            </CustomInputContainer>
          </div>
          <div class="col-12 md:col-3 mb-2">
            <CustomInputContainer label="3rd Prize Amount">
              <template v-slot>
                <InputNumber
                  v-model="form.inp_3stPrizeAmount"
                  placeholder="Enter 3rd Prize Amount"
                  :class="{ 'p-invalid': validationErrors.inp_3stPrizeAmount }"
                  mode="currency"
                  currency="AED"
                  locale="ae-AE"
                  :minFractionDigits="0"
                />
                <small
                  class="p-error p-min-error"
                  v-if="validationErrors.inp_3stPrizeAmount"
                >
                  {{
                    useRegexUnderScore(validationErrors.inp_3stPrizeAmount) ||
                    "&nbsp;"
                  }}
                </small>
              </template>
            </CustomInputContainer>
          </div> -->
        </div>
      </div>
    </div>
    <Toast position="top-right" />
  </div>
</template>

<script setup>
// ---------------------------------------------------------------
// # Imports Section

// ## <- services imports ->

import {
  CreateDraw,
  EditDraw,
  GetDraw,
  GetProductsNames_list,
} from "@/services/draw_manager/draw_listing/save_draw"
import { getImagesURL } from "@/services/common/api_resource"

// ## <- dummyData imports ->

// import {
//   data_current_user as d_cu,
//   data_user_list as d_ul,
// } from "@/dummyData/customers/customers_detail"

// ## <- containers imports ->

//  import CustomerDetail from "@/containers/customers/CustomerDetail"

// ---------------------------------------------------------------
// # Configuration Section
// DEV MODE ONLY
import * as yup from "yup"
import { ref, watch, customRef, computed } from "vue"
import { refDebounced } from "@vueuse/core"
import { useRegexUnderScore } from "@/composables/regex"
// important don't delete any Import

import { useToast } from "primevue/usetoast"
// You should to make shore this Components added to your template
// <Toast position="top-right" />

import moment from "moment-timezone"

// const { signIn } = useAuth()
const toast = useToast()
const router = useRouter()
const route = useRoute()

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

// form data
const dd_Product = ref("")
const form = reactive({
  inp_DrawName: "",
  txt_Description: "",
  inp_WinnerPercentage: null,
  inp_PrizeAmount: { type: "prize_1", amount: null },
  list_PrizeAmount: [],
  // inp_1stPrizeAmount: null,
  // inp_2stPrizeAmount: null,
  // inp_3stPrizeAmount: null,
  dd_Product: "",
  inp_Threshold: null,
  // dd_Date: "",

  UploadFileV2_DrawCardBannerImage: null,

  image_list: [],
})

const updateImage = (value) => {
  form.image_list = value
}

const status = ref("")
const dd_Product_id = ref(null)
const dd_Product_key = ref(0)
// ---------------------------------------------------------------
// # Setup Components Data

// ## for controls
// list for option of component [use same name of v model]_items

// Example
// dd_SellPrice_items = ref([]);
const dd_Product_items = ref([])

// ## for displays

// ---------------------------------------------------------------
// # Setup Validation
const disable_api = false

const schema = yup.object({
  // inp_DrawName: yup.string().min(2).required(),
  // txt_Description: yup.string().min(2).required(),
  inp_WinnerPercentage: yup.number().required(),
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

  // inp_1stPrizeAmount: yup.number().required(),
  // inp_2stPrizeAmount: yup.number().required(),
  // inp_3stPrizeAmount: yup.number().required(),
  dd_Product: yup.string().min(2).required(),
  inp_Threshold: yup
    .number()
    .min(1)
    .when("Check if Im in edit mode", (val, schema) => {
      if (route.query?._id) {
        return schema.test(
          "not less then sold",
          "you can't set a Threshold more then sold",
          function () {
            let valid = true
            if (form.inp_Threshold < solid.value) {
              valid = false
            }
            console.log("from.inp_Threshold:", form.inp_Threshold)
            console.log("solid.value:", solid.value)
            return (
              valid ||
              this.createError({
                message: `( you can't set a Threshold more then sold ) sold is ${solid.value}`,
              })
            )
          }
        )
      } else {
        return schema
      }
    })

    .required(),
  // dd_Date: yup
  //   .string()
  //   // .when("Check if Im in edit mode & perverse date not should to select", (val, schema)=> {
  //   //   if(route.query?._id){
  //   //     return schema.test("","select a perverse date it's not then today not allow")
  //   //   }
  //   //   else{
  //   //     return schema;
  //   //   }
  //   // })
  //   .required(),

  UploadFileV2_DrawCardBannerImage: yup
    .array()
    .max(1)
    .min(1)
    .test("files Format", "Unsupported Format", function (files) {
      let valid = true
      let fileName
      if (files?.length !== undefined) {
        if (files.length > 0) {
          files.forEach((file) => {
            if (!file.type.includes("image")) {
              // change this to the file types you want to accept
              valid = false
              fileName = file.name
            }
          })
        }
      }

      return (
        valid ||
        this.createError({
          message: `The file "${fileName}" has Unsupported Format`,
        })
      )
    })

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

    .when(["inp_DrawName", "txt_Description"], (lead_type, schema) => {

      if (route.query?._id) {
        return schema.notRequired()
      } else {
        return schema.required()
      }
      return schema
    }),

  image_list: yup.array().notRequired(),
})

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
const Check_Validation = async () => {
  try {
    await schema.validate(form, { abortEarly: false })
    validationErrors.value = {}
  } catch (err) {
    console.log("err Check_Validation :", err)
    validationErrors.value = err.inner.reduce((errors, error) => {
      let error_message = error.message

      form_keys.forEach((item) => {
        error_message = error_message.replace(item + " ", "")
      })
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
      console.log("err:", err)
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

const prizesLength = ref(0)
const error = ref("")

const calculatePrizes = () => {
  form.list_PrizeAmount = []
  if (form.inp_Threshold && form.inp_WinnerPercentage) {
    let calc = Math.floor(
      (form.inp_WinnerPercentage / 100) * form.inp_Threshold
    )
    if (calc > 10) {
      prizesLength.value = 10
    } else {
      prizesLength.value = calc
    }
    if (calc < 2) {
      error.value = "The number of winners should be at least 2"
    } else {
      error.value = ""
    }
    // form.list_PrizeAmount = Array(prizesLength.value - 2).fill({
    //   type: `prize_${prizesLength.value - prizesLength.value + 1}`,
    //   amount: 0,
    // })
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
  // English comment: Check if the key is in the schema
  if (Object.hasOwnProperty.call(form, key)) {
    // English comment: Define computed and debounced variables
    const computedKey = ref(computed(() => form[key]))
    const debouncedKey = refDebounced(
      computedKey,
      validation_Debounced_num.value
    )

    // English comment: Create watcher
    const { startWatcher, stopWatcher } = createWatcher(
      () => debouncedKey.value,
      Check_Validation
    )

    // English comment: Push to the context list
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

// English comment: Initialize the context list
let context_list_OneByOne = []

for (const key in form) {
  // English comment: Check if the key is in the schema
  if (Object.hasOwnProperty.call(form, key)) {
    // English comment: Define computed and debounced variables
    const computedKey = ref(computed(() => form[key]))
    const debouncedKey = refDebounced(
      computedKey,
      validation_Debounced_num.value
    )

    // English comment: Create watcher
    const { startWatcher, stopWatcher } = createWatcher(
      () => debouncedKey.value,
      () => Check_Validation_One(key)
    )

    // English comment: Push to the context list
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
const solid = ref(0)

// ## resets Components Control for integrations

// ## Watch's for API Integration

// ## Functions For API Integration

// ## Submit Form settings
// ADD THE Faction "Submit_Form" to @click="Submit_Form" to your Button
// Do not Touch anything
// only add you code in /*Edit mode*/ /*add mode*/ Code space

const Head_Name = ref(null)
const allow_submit = ref(true)
const Submit_Form = async (event) => {
  await Check_Validation()
  if (Object.keys(validationErrors.value).length === 0 && allow_submit.value) {
    let current_btn_text =
      event.srcElement.textContent.split(" ")[
        event.srcElement.textContent.split(" ").length - 1
      ]
    // let current_Head =  Head_Name.value.textContent.split(' ')[ Head_Name.value.textContent.split(' ').length -1];
    let current_Head = ""

    let success_msg = "Create New Draw-Listing Successfully "
    if (route.query?._id) {
      success_msg = "Edit Draw-Listing Successfully "
    }
    let error_msg = ""
    // handel data

    // submitForm Here
    if (route.query?._id) {
      if (disable_api) {
        return
      }
      // Edit mode

      // let images_list = form.image_list.map((item) => item.link)
      // console.log("images_list:", images_list)

      // let images_links = []
      // let images_link = ""
      // let files_list = []
      // const form_data = new FormData()

      // try {
      //   if (form.UploadFileV2_DrawCardBannerImage.length > 0) {
      //     toast.add({
      //       severity: "info",
      //       summary: "Handling Images",
      //       detail: "Please Wait ...",
      //       life: 3000,
      //     })
      //   }

      //   for (let prop in form.UploadFileV2_DrawCardBannerImage) {
      //     form_data.append(
      //       "file",
      //       form.UploadFileV2_DrawCardBannerImage[prop],
      //       form.UploadFileV2_DrawCardBannerImage[prop].name
      //     )
      //   }

      //   if (form.UploadFileV2_DrawCardBannerImage.length > 0) {
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

      // if (images_links.length > 0) {
      //   images_link = images_links[0]
      // }

      // images_list = images_list.concat(images_links)
      // console.log("images_list concat:", images_links)

      try {
        // if normal Create

        let res = await EditDraw(
          {
            // draw_name: form.inp_DrawName,
            // description: form.txt_Description,
            winner_percentage: form.inp_WinnerPercentage,
            // prize_1: form.inp_1stPrizeAmount,
            // prize_2: form.inp_2stPrizeAmount,
            // prize_3: form.inp_3stPrizeAmount,
            prize_array: [form.inp_PrizeAmount, ...form.list_PrizeAmount],
            threshold: form.inp_Threshold,
            // status: status.value,
            // draw_date: form.dd_Date,
            // image_url: images_link,
            // product_id: dd_Product_id.value,
          },
          route.query?._id
        )

        // if login
        // await handleSignIn()

        // make add disable
        allow_submit.value = false

        toast.add({
          severity: "success",
          summary: success_msg
            ? success_msg
            : `${current_Head} Successfully ${current_btn_text}`,
          detail: "",
          life: 3000,
        })
        setTimeout(() => {
          router.replace("/draw-manager/draw-listing")
        }, 3000)
      } catch (error) {
        console.log(error.response?._data)
        if (error.response?._data?.code == 400) {
          toast.add({
            severity: "error",
            summary: error.response._data.message,
            detail: "",
            life: 3000,
          })

          allow_submit.value = true
        } else {
          toast.add({
            severity: "error",
            summary: error,
            detail: "Look at the red fields",
            life: 3000,
          })
        }
      }
    } else {
      if (disable_api) {
        return
      }
      // Add mode
      console.log(current_btn_text)
      if (current_btn_text == "Draft") {
        status.value = "Draft"
      } else {
        status.value = "Live"
      }

      // Upload Images

      let images_links = []
      let images_link = ""
      let files_list = []
      const form_data = new FormData()

      try {
        if (form.UploadFileV2_DrawCardBannerImage.length > 0) {
          toast.add({
            severity: "info",
            summary: "Handling Images",
            detail: "Please Wait ...",
            life: 3000,
          })
        }

        for (let prop in form.UploadFileV2_DrawCardBannerImage) {
          form_data.append(
            "file",
            form.UploadFileV2_DrawCardBannerImage[prop],
            form.UploadFileV2_DrawCardBannerImage[prop].name
          )
        }

        if (form.UploadFileV2_DrawCardBannerImage.length > 0) {
          let res_images = await getImagesURL(form_data)
          images_links = res_images?.data.map((item) => item?.url)
        }
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

      if (images_links.length > 0) {
        images_link = images_links[0]
      }

      console.log("images_links:", images_links)
      console.log("images_link:", images_link)

      try {
        // if normal Create

        let res = await CreateDraw({
          // draw_name: form.inp_DrawName,
          // description: form.txt_Description,
          winner_percentage: form.inp_WinnerPercentage,
          // prize_1: form.inp_1stPrizeAmount,
          // prize_2: form.inp_2stPrizeAmount,
          // prize_3: form.inp_3stPrizeAmount,
          prize_array: [form.inp_PrizeAmount, ...form.list_PrizeAmount],
          threshold: form.inp_Threshold,
          status: status.value,
          // draw_date: form.dd_Date,
          image_url: images_link,
          product_id: dd_Product_id.value,
        })

        // if login
        // await handleSignIn()

        // make add disable
        allow_submit.value = false

        toast.add({
          severity: "success",
          summary: success_msg
            ? success_msg
            : `${current_Head} Successfully ${current_btn_text}`,
          detail: "",
          life: 3000,
        })
        setTimeout(() => {
          router.replace("/draw-manager/draw-listing")
        }, 3000)
      } catch (error) {
        console.log(error.response?._data)
        if (error.response?._data?.code == 400) {
          toast.add({
            severity: "error",
            summary: error.response._data.message,
            detail: "",
            life: 3000,
          })

          allow_submit.value = true
        } else {
          toast.add({
            severity: "error",
            summary: error,
            detail: "Look at the red fields",
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

// if login

// const handleSignIn = async () => {
//   const credentials = {
//     email: form.inp_Email,
//     password: form.inp_Password,
//   }

//   await signIn(credentials, { callbackUrl: "/", redirect: false }).then((_) => {
//     return navigateTo("/", { external: true })
//   })
// }

// ## onMounted // when we call the api

const handleApi = () => {
  // handel data here from input controls before send it

  // return function from services as $fetch Promise
  // Example
  //  return get_data_from_api();

  GetProductsNames_list().then((res) => {
    dd_Product_items.value = res.map((item) => ({
      id: item._id,
      label: item.name,
    }))
  })

  if (route.query?._id) {
    return Promise.resolve()
  }

  return Promise.resolve()
}

// handleData for display data from api
const handleData = (data) => {
  // if (data){
  //   return undefined
  // }
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

  GetDraw({}, route.query?._id).then((res) => {
    form.inp_DrawName = res.draw_name
    form.txt_Description = res.description
    form.inp_WinnerPercentage = res.winner_percentage

    // form.inp_1stPrizeAmount = res.prize_1
    // form.inp_2stPrizeAmount = res.prize_2
    // form.inp_3stPrizeAmount = res.prize_3
    form.inp_PrizeAmount = res.prize_array[0]
    form.list_PrizeAmount = res.prize_array.slice(1)
    form.inp_Threshold = res.threshold
    form.dd_Product = res?.product_list.name
    dd_Product_items.value = [res?.product_list.name]
    // form.value.dd_Category = data?.category_id // to make it display
    // dd_Category_id.value = data?.category_id // to set a default value

    // form.dd_Date = moment(res.draw_date).format("DD/MM/YYYY")
    // form.dd_Date = new Date(res.draw_date)

    let _ = res.image_url
    // {
    //   name:"file_name.png",
    //   link:"https://valyou-staging.s3.eu-central-1.amazonaws.c…-6c5f-4831-966c-23246337f2d3%20-%20toothpast.webp"
    // }
    form.image_list = [
      {
        name: _.split("%20-%20")[1],
        link: _,
      },
    ]

    status.value = res.status
    solid.value = res.sold
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
</style>
