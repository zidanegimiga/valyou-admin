<template lang="">
  <div class="wrapper-column card h-full">
    <div class="item">
      <div class="item wrapper-row">
        <div class="item expand flex align-items-center">
          <h3 class="font-bold">Create Shipments</h3>
        </div>
        <div class="item">
          <Button class="font-bold" label="Save" />
        </div>
      </div>
    </div>
    <div class="item pt-3">
      <div class="flex w-full gap-3">
        <h4 class="font-bold">SH-SV123</h4>
        <h4 class="font-bold">17-Nov-2023</h4>
      </div>
      <Divider style="margin: 0.78rem 0" />
    </div>
    <div class="item">
      <div class="grid">
        <div class="col-12 md:col-3">
          <CustomInputContainer label="Choose Shipment">
            <template v-slot>
              <InputText
                v-model="form.inp_FirstName"
                type="text"
                placeholder="eg: name"
                :class="{ 'p-invalid': validationErrors.inp_FirstName }"
              />
              <small
                class="p-error p-min-error"
                v-if="validationErrors.inp_FirstName"
              >
                {{
                  useRegexUnderScore(validationErrors.inp_FirstName) || "&nbsp;"
                }}
              </small>
            </template>
          </CustomInputContainer>
        </div>
        <div class="col-12 md:col-3">
          <CustomInputContainer label="Vehicle Type">
            <template v-slot>
              <InputText
                v-model="form.inp_FirstName"
                type="text"
                placeholder="eg: name"
                :class="{ 'p-invalid': validationErrors.inp_FirstName }"
              />
              <small
                class="p-error p-min-error"
                v-if="validationErrors.inp_FirstName"
              >
                {{
                  useRegexUnderScore(validationErrors.inp_FirstName) || "&nbsp;"
                }}
              </small>
            </template>
          </CustomInputContainer>
        </div>
        <div class="col-12 md:col-3">
          <CustomInputContainer label="Select Vehicle">
            <template v-slot>
              <InputText
                v-model="form.inp_FirstName"
                type="text"
                placeholder="eg: name"
                :class="{ 'p-invalid': validationErrors.inp_FirstName }"
              />
              <small
                class="p-error p-min-error"
                v-if="validationErrors.inp_FirstName"
              >
                {{
                  useRegexUnderScore(validationErrors.inp_FirstName) || "&nbsp;"
                }}
              </small>
            </template>
          </CustomInputContainer>
        </div>
        <div class="col-12 md:col-3">
          <CustomInputContainer label="Package Limit">
            <template v-slot>
              <InputText
                v-model="form.inp_FirstName"
                type="text"
                placeholder="eg: name"
                :class="{ 'p-invalid': validationErrors.inp_FirstName }"
              />
              <small
                class="p-error p-min-error"
                v-if="validationErrors.inp_FirstName"
              >
                {{
                  useRegexUnderScore(validationErrors.inp_FirstName) || "&nbsp;"
                }}
              </small>
            </template>
          </CustomInputContainer>
        </div>
        <div class="col-12 p-0"></div>

        <div class="col-12 md:col-3">
          <CustomInputContainer label="Assign Driver">
            <template v-slot>
              <InputText
                v-model="form.inp_FirstName"
                type="text"
                placeholder="eg: name"
                :class="{ 'p-invalid': validationErrors.inp_FirstName }"
              />
              <small
                class="p-error p-min-error"
                v-if="validationErrors.inp_FirstName"
              >
                {{
                  useRegexUnderScore(validationErrors.inp_FirstName) || "&nbsp;"
                }}
              </small>
            </template>
          </CustomInputContainer>
        </div>

        <div class="col-12 md:col-3">
          <CustomInputContainer label="Delivery Date">
            <template v-slot>
              <InputText
                v-model="form.inp_FirstName"
                type="text"
                placeholder="eg: name"
                :class="{ 'p-invalid': validationErrors.inp_FirstName }"
              />
              <small
                class="p-error p-min-error"
                v-if="validationErrors.inp_FirstName"
              >
                {{
                  useRegexUnderScore(validationErrors.inp_FirstName) || "&nbsp;"
                }}
              </small>
            </template>
          </CustomInputContainer>
        </div>

      </div>
    </div>
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
import * as yup from "yup";
import { ref, watch, customRef, computed } from "vue";
import { refDebounced } from "@vueuse/core";
import { useRegexUnderScore } from "@/composables/regex"
// important don't delete any Import

import { useToast } from "primevue/usetoast"
// You should to make shore this Components added to your template or layout
// <Toast position="top-right" />

// const { signIn } = useAuth()
const toast = useToast();
const router = useRouter();
const route = useRoute();

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
const form = reactive({
  inp_FirstName: "",
  inp_LastName: "",
  dd_Gender: "",
  dd_Nationality: "",
  dd_SalesRep: "",
  dd_Gender: "",
  dd_PreferredLanguages: "",
  inp_PhoneNumber: null,
  inp_Email2: "",
  inp_AutogenPassword: "",
})

// ---------------------------------------------------------------
// # Setup Components Data 

// ## for controls
// list for option of component [use same name of v model]_items

// Example
// dd_SellPrice_items = ref([]);


// ## for displays


// ---------------------------------------------------------------
// # Setup Validation


const schema = yup.object({
  inp_Email: yup.string().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "must be a valid email").required(),
   inp_Password: yup.string().min(8).required(),
inp_PhoneNumber: yup.string().min(7).max(15).required(),


    FileUpload: yup.array().max(15).min(1)
    .test('files Format', 'Unsupported Format', function(files){
      let valid = true;
      let fileName;
      if (files.length > 0) {
        files.forEach((file) => {
          if (!file.type.includes('image')) { // change this to the file types you want to accept
            valid = false;
            fileName = file.name;
          }
        });
      }
      
      return valid || this.createError({ message: `The file "${fileName}" has Unsupported Format` });
    })

    .test('files images aspect ratio', 'Incorrect image aspect ratio', async function(files){

      let valid = true;
      let fileName;

      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          
          if(file.objectURL == undefined){
            break;
          }
          
          const image = new Image();
          image.src = file.objectURL
          const promise = new Promise((resolve) => {
            image.onload = () => {
              resolve({ width: image.width, height: image.height });
            };
          });
          const dimensions = await promise;
          const aspectRatio = dimensions.width / dimensions.height;
          if (aspectRatio !== 1) { // change this to the aspect ratio you want
            valid = false;
            fileName = file.name;
            break;
          }
        }
        
      }
      return valid || this.createError({ message: `The file "${fileName}" has incorrect aspect ratio` });
    })


    .test('files images Dimensions', 'Incorrect image dimensions', async function(files){
      
      let valid = true;
      let fileName;

      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];

          if(file.objectURL == undefined){
            break;
          }
          
          const image = new Image();
          image.src = file.objectURL
          const promise = new Promise((resolve) => {
            image.onload = () => {
              resolve({ width: image.width, height: image.height });
            };
          });
          const dimensions = await promise;
          if (dimensions.width !== 500 || dimensions.height !== 500) {
            valid = false;
            fileName = file.name;
            break;
          }
        }
        
      }
      return valid || this.createError({ message: `The file "${fileName}" has Incorrect image dimensions` });
  })


    .test('files Size', 'file is too large', function(files) {
      
      let valid = true;
      let fileName;
      if (files.length > 0) {
        files.forEach((file) => {
          const size = file.size / 1024 / 1024; // size in MB
          if (size > 0.5) { // change this to the size limit you want
            valid = false;
            fileName = file.name;
            
          }
        });
      }
      return valid || this.createError({ message: `The file "${fileName}" is too large` });
    })
    .required()
	
  })


const validation_mode = ref("One by One") // default = null for stop validation
const validation_active_monitor = ref(true) // default = false
const validation_mode_list = ref([
  "Check All", // Check All on any Change on any fields
  // when one field have change we will Check_Validation on all other fields not only this field

  "One by One", // Check_Validation for One field
  // when one field have change we will Check_Validation only on this field
])
const validation_Debounced_num = ref(500);

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

let context_list_CheckAll = [];


for (const key in form) {
  // English comment: Check if the key is in the schema
  if (Object.hasOwnProperty.call(form, key)) {
    // English comment: Define computed and debounced variables
    const computedKey = ref(computed(() => form[key]));
    const debouncedKey = refDebounced(computedKey, validation_Debounced_num.value);

    // English comment: Create watcher
    const { startWatcher, stopWatcher } = createWatcher(() => debouncedKey.value, Check_Validation);

    // English comment: Push to the context list
    context_list_CheckAll.push({
      [key]: {
        startWatcher,
        stopWatcher,
        computed: computedKey,
        debounced: debouncedKey,
      },
    });
  }
}


// English comment: Initialize the context list
let context_list_OneByOne = [];

for (const key in form) {
  // English comment: Check if the key is in the schema
  if (Object.hasOwnProperty.call(form, key)) {
    // English comment: Define computed and debounced variables
    const computedKey = ref(computed(() => form[key]));
    const debouncedKey = refDebounced(computedKey, validation_Debounced_num.value);

    // English comment: Create watcher
    const { startWatcher, stopWatcher } = createWatcher(() => debouncedKey.value, () => Check_Validation_One(key));

    // English comment: Push to the context list
    context_list_OneByOne.push({
      [key]: {
        startWatcher,
        stopWatcher,
        computed: computedKey,
        debounced: debouncedKey,
      },
    });
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

// ## Submit Form settings
// ADD THE Faction "Submit_Form" to @click="Submit_Form" to your Button
// Do not Touch anything
// only add you code in /*Edit mode*/ /*add mode*/ Code space

const Head_Name = ref(null);
const allow_submit = ref(true)
const Submit_Form = async (event) => {
  await Check_Validation()
  if (Object.keys(validationErrors.value).length === 0 && allow_submit.value) {
	let current_btn_text =
      	event.srcElement.textContent.split(" ")[
        event.srcElement.textContent.split(" ").length - 1
      ];
    // let current_Head =  Head_Name.value.textContent.split(' ')[ Head_Name.value.textContent.split(' ').length -1];
    // let current_Head = "";

    let success_msg = "";
    let error_msg = "";
    // handel data


    // submitForm Here
    if (route.query?._id) {
      // Edit mode
    } else {
      // Add mode

      
      // Upload Images

      let images_links = []
      let files_list = []
      const form_data = new FormData()

      try {
        if (form.value.FileUpload.length > 0) {
          toast.add({
            severity: "info",
            summary: "Handling Images",
            detail: "Please Wait ...",
            life: 3000,
          })
        }

        for (let prop in form.value.FileUpload) {
          form_data.append(
            "file",
            form.value.FileUpload[prop],
            form.value.FileUpload[prop].name
          )
        }

        if (form.value.FileUpload.length > 0) {
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

      try {

        // if normal Create

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
	// await handleSignIn()

        // make add disable
        allow_submit.value = false

        toast.add({
          severity: "success",
          summary: success_msg ? success_msg: `${current_Head} Successfully ${current_btn_text}`,
          detail: "",
          life: 3000,
        })
        setTimeout(() => {
          router.replace("/customers")
        }, 3000)
      } catch (error) {
        // console.log(error.response._data)
        if (error.response._data.code == 400) {
          
          toast.add({
            severity: "error",
            summary: error.response._data.message,
            detail: "",
            life: 3000,
          })

          allow_submit.value = true;
        }
      }
    }
  }
  else {
    toast.add({
      severity: "error",
      summary: "Please Validate inputs",
      detail: "Look at the red fields",
      life: 3000,
    })
  }
};

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

.p-invalid {
    border-color: #f3654a !important;
  .p-inputnumber-input {
    border-color: #f3654a !important;
  }
  
}

.p-invalid.p-calendar.p-invalid.p-component > .p-inputtext{
    border-color: #f3654a !important;
  }
</style>
