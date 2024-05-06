<template lang="">
  <div class="grid grid-nogutter h-screen login_wrapper flex">
    <!-- Image section -->
    <div
      class="Image_section col-12 md:col-7 login__background_section flex align-content-center justify-content-center"
    >
      <div
        class="flex flex-column align-items-center justify-content-center"
        style="height: 100%"
      >
        <div class="text-center">
          <!-- <img style="width: 83%" alt="" src="/login/sidebar_image_login.png" /> -->
          <img style="width: 450px" alt="" src="/login/display-image.svg" />
        </div>

        <div>
          <div
            class="flex flex-column align-items-center"
            style="color: #ffffff"
          >
            <span class="text-lg mt-8">Welcome to Valyou ERP</span>
            <!-- <p class="mt-1 w-9 text-center">
              Precise KPI tracking, predictive sales forecast, real-time
              progress monitoring & many more features.
            </p> -->
          </div>

          <!-- Feel slider -->
          <!-- <div class="flex justify-content-around mt-3">
            <div>
              <i class="pi pi-chevron-circle-left" style="color: white"></i>
            </div>
            <div class="flex gap-3">
              <i class="pi pi-circle-fill text-xs" style="color: white"></i>
              <i class="pi pi-circle text-xs" style="color: white"></i>
              <i class="pi pi-circle text-xs" style="color: white"></i>
            </div>
            <div>
              <i class="pi pi-chevron-circle-right" style="color: white"></i>
            </div>
          </div> -->
        </div>
      </div>
    </div>

    <!-- Login section -->
    <div
      class="col-12 md:col-5 flex flex-column justify-content-center align-items-center login__background_form_section"
    >
      <div class="p-grid grid-nogutter w-full" style="max-width: 360px">
        <div class="text-center">
          <img
            width="250"
            src="/Valyou_logo.png"
            class="mb-3"
            style="transform: scale(0.68) translate(-7.6px, 0px)"
          />
        </div>

        <CustomInputField
          :error_msg="validationErrors.inp_Email"
          label_text="Email Address*"
          type="email"
          placeholder="someone@example.com"
          icon="pi pi-check-circle"
          v-model="form.inp_Email"
          :class="{ 'p-invalid': validationErrors.inp_Email }"
        ></CustomInputField>

        <CustomInputField
          :error_msg="validationErrors.inp_Password"
          label_text="Password*"
          type="password"
          placeholder="Your password"
          v-model="form.inp_Password"
          :class="{ 'p-invalid': validationErrors.inp_Email }"
        ></CustomInputField>

        <!-- <div
          class="flex align-items-center justify-content-between login_field"
        >
          <div class="flex align-items-center login_checkbox">
            <ButtonsNCheckBox
              v-model="form.cb_Remember_me"
              label="Remember me"
              label_class="gray_text"
            />
          </div>

          <span
            class="small__text primary cursor-pointer"
            style="color: #3494ff"
            >Forgot password?</span
          >
        </div> -->

        <!-- user login submit button -->
        <!-- handleSignIn -->
        <!-- Submit_Form -->
        <div class="mt-4">
          <Button class="sign_in_btn" @click="Submit_Form">Sign in</Button>
        </div>

        <!-- <div
          class="text-center gray_text mt-2"
          style="font-size: 0.7rem !important"
        >
          <span style="font-size: 0.7rem !important"
            >Haven’t created your account yet?</span
          ><span
            class="cursor-pointer font-bold"
            style="color: #0a94ff; font-size: 0.7rem !important"
            >&nbsp; &nbsp; Sign up</span
          >
        </div> -->
      </div>
    </div>
    <!-- <ButtonsNCheckBox
              v-model="cb_Remember_me"
              label="Remember me"
              label_class="gray_text"
            /> -->
    <Toast position="top-right" />
  </div>
</template>
<script setup>
// ---------------------------------------------------------------
// # Imports Section

// ## <- services imports ->

// import {
//   CreateDraw,
//   EditDraw,
//   GetDraw,
//   GetProductsNames_list
// } from "@/services/draw_manager/draw_listing/save_draw"
// import { getImagesURL } from "@/services/common/api_resource"

// ## <- dummyData imports ->

// import {
//   data_current_user as d_cu,
//   data_user_list as d_ul,
// } from "@/dummyData/customers/customers_detail"

// ## <- containers or pages imports ->

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

const { signIn } = useAuth()
const toast = useToast()
const router = useRouter()
const route = useRoute()

definePageMeta({
  layout: "empty",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
  transition: {
    name: "fade",
    mode: "out-in",
  },
})

// ---------------------------------------------------------------

// # Submit Form settings
// form data
const form = reactive({
  inp_Email: "",
  inp_Password: "",
  cb_Remember_me: false,
})

const schema = yup.object({
  inp_Email: yup
    .string()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "must be a valid email")
    .required(),
  inp_Password: yup.string().min(8).required(),
})

// ADD THE Faction "Submit_Form" to @click="Submit_Form" to your Button
// Do not Touch anything
// only add your code in /*shared code*/ /*Edit mode*/ /*add mode*/ Code space

let redirect_bool = true
let redirect_to = "/" // "" | url
let redirect_mode = "replace" // replace | push 


let throw_error_type = "error" // error | log | null
let unknown_error_occurred_showDetails = true // true | false


let success_summary = "Welcome to Valyou ERP"
let success_detail = "login successfully done"
let life_msg = 3000;
let life_redirect = 1500;

// if login
const handleSignIn = async () => {
  const credentials = {
    email: form.inp_Email,
    password: form.inp_Password,
  }

  await signIn(credentials, { callbackUrl: "/", redirect: false })
    // .then((_) => {
    //   return navigateTo("/", { external: true })
    // })
    // .catch((err) => {
    //   console.log(err)
    //   alert("You have made a terrible mistake while entering your credentials")
    // })
}

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

  // if login
  await handleSignIn()
}

const request_func_addMode = async () => {
  /*add mode*/
}

const request_func_editMode = async () => {
  /*Edit mode*/
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

const cb_Remember_me = ref(false)

// ---------------------------------------------------------------
// # Setup Components Data

// ## for controls
// list for option of component [use same name of v model]_items

// Example
// dd_SellPrice_items = ref([]);

// ## for displays

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
    
    blocked_submit.value = true;

    addToastMessage("success", success_summary, success_detail)
    

    if (redirect_bool) {
      setTimeout(() => {
        if(redirect_mode == 'push'){
          router.push(redirect_to)
        }
        else{
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
      if (throw_error_type == 'error') {
        console.error(error)
      }
      else if(throw_error_type == 'log'){
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

          errorDetail += errorDetail ? "\n[ Please Try again ]" : "[ Please Try again ]"
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
  if (Object.keys(validationErrors.value).length === 0 && allow_submit.value && !(blocked_submit.value) ) {
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
  } 
  else if(Object.keys(validationErrors.value).length > 0) {
    toast.add({
      severity: "error",
      summary: "Please Validate inputs",
      detail: "Look at the red fields",
      life: life_msg,
    })
  }
  else{
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
.login__background_section {
  background: #182972;
}

.login__background_form_section {
  background: #fff;
}

.Image_section {
  background-image: url("/login/background.svg");
  background-repeat: no-repeat;
  background-size: cover;
}

.login_wrapper {
  width: 100% !important;
  height: 100vh !important;
  border-radius: 0 !important;
  background: url("/Login/bg_image.svg") !important;
  background-size: cover !important;

  .horizontal_line_login {
    margin-top: 20px !important;
    margin-bottom: 10px !important;
    height: 2px !important;
    width: 8% !important;
    background-color: #22ba46 !important;
  }

  .loginRight__side {
    background: #ffffff !important;
  }

  .sign_in_btn {
    display: inline-block !important;
    width: 100% !important;
  }

  .login_field {
    width: 100% !important;
  }

  .login_checkbox .p-checkbox .p-checkbox-box {
    border-radius: 5px !important;
    width: 20px !important;
    height: 20px !important;
  }
}

.insights__top_cards {
  .count__card_wrap {
    flex: 1;
  }
}
</style>

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
