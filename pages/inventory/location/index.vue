<template lang="">
  <div class="wrapper-column gap-2 card" style="min-height: 100% !important">
    <div class="item">
      <div class="wrapper-row align-items-center">
        <div class="item"><h1 class="font-bold">Locations</h1></div>
        <div class="item expand"></div>
        <div class="item">
          <Button
            label="Add Location"
            icon="pi pi-plus"
            @click="addLocation()"
          />
        </div>
      </div>
    </div>
    <div class="item expand">
      <ComponentsLibraryRpDataTable
        class="h-27rem"
        :api_URL="api_URL"
        :isPagination="true"
        :isSearch="true"
        header="All Inventory"
        :isFilterBy="true"
        datatable_key="_locations_key"
        :key="_key"
        :btns_click="{
          View: (data) => {
            router.push({
              path: '/inventory/location/View',
              query: {
                _id: data._id,
              },
            })
          },

          Edit: (data) => {
            editLocation(data)
          },
        }"
      >
        <template #datatable_header="slotsProps">
          <div class="wrapper-row mb-3 p-1">
            <div class="item">
              <div class="flex align-items-center">
                <span
                  id="inp_Search"
                  style="width: 240px"
                  class="p-input-icon-left"
                >
                  <i class="pi pi-search" />

                  <InputText
                    v-model="slotsProps.reactive_refs.search_model"
                    placeholder="Search By"
                  />
                </span>
              </div>
            </div>
            <div class="item expand">
              <div class="flex align-items-center gap-3 justify-content-end">
                <!-- <Button label="Add item" @click="SideBarVisible = true" />
                    <Button
                      label="Create PO"
                      severity="secondary"
                      outlined
                      style="border-color: #e2e7f1"
                    /> -->

                <!-- <MenuPopFilterSort
                      :inherent_attrs="true"
                      severity="secondary"
                      :items="slotsProps.reactive_refs.FilterSort_model"
                      @clear="slotsProps.FilterSort_options.btn_filter_clear"
                      @submit="slotsProps.FilterSort_options.btn_filter_submit"
                      :key="slotsProps.FilterSort_options.key_filter"
                    />

                    <MenuPopFilterDate
                      :inherent_attrs="true"
                      severity="secondary"
                      :items="slotsProps.reactive_refs.FilterDate_model"
                      @clear="slotsProps.FilterDate_options.btn_filter_clear"
                      @submit="slotsProps.FilterDate_options.btn_filter_submit"
                      :key="slotsProps.FilterBy_options.key_filter"
                    />

                    <MenuPopFilter
                      :inherent_attrs="true"
                      severity="secondary"
                      :items="slotsProps.reactive_refs.FilterBy_model"
                      @clear="slotsProps.FilterBy_options.btn_filter_clear"
                      @submit="slotsProps.FilterBy_options.btn_filter_submit"
                      :key="slotsProps.FilterBy_options.key_filter"
                    /> -->
              </div>
            </div>
          </div>
        </template>
        <template #Delete_warehouse_name></template>
        <template #Delete_stock_in_hand></template>
      </ComponentsLibraryRpDataTable>
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
          text="Add a New Location"
          text_class="font-bold text-lg"
          text_style="color:#000"
          icon_class="font-bold"
          icon_x="0px"
          @click="Sidebar_visible = !Sidebar_visible"
        />
      </template>
      <div class="wrapper-column">
        <div class="item grid">
          <div class="col-12">
            <CustomInputContainer label="Name">
              <template v-slot>
                <InputText
                  v-model="form.inp_Name"
                  type="text"
                  placeholder="Enter your location name here"
                  :class="{ 'p-invalid': validationErrors.inp_Name }"
                />
                <small
                  class="p-error p-min-error"
                  v-if="validationErrors.inp_Name"
                >
                  {{
                    useRegexUnderScore(validationErrors.inp_Name) || "&nbsp;"
                  }}
                </small>
              </template>
            </CustomInputContainer>
          </div>

          <div class="col-12">
            <CustomInputContainer label="Location Type">
              <Dropdown
                @change="(event) => selectLocationType(event)"
                v-model="form.inp_LocationType"
                :options="location_types"
                placeholder="Select location type"
                class="w-full"
                :class="{ 'p-invalid': validationErrors.inp_LocationType }"
              />
              <small
                class="p-error p-min-error"
                v-if="validationErrors.inp_LocationType"
              >
                {{
                  useRegexUnderScore(validationErrors.inp_LocationType) ||
                  "&nbsp;"
                }}
              </small>
            </CustomInputContainer>
          </div>

          <div class="col-6">
            <CustomInputContainer label="Area">
              <template v-slot>
                <InputText
                  v-model="form.inp_Area"
                  type="text"
                  :class="{ 'p-invalid': validationErrors.inp_Area }"
                />
                <small
                  class="p-error p-min-error"
                  v-if="validationErrors.inp_Area"
                >
                  {{
                    useRegexUnderScore(validationErrors.inp_Area) || "&nbsp;"
                  }}
                </small>
              </template>
            </CustomInputContainer>
          </div>

          <div class="col-6">
            <CustomInputContainer label="Emirate">
              <template v-slot>
                <InputText
                  v-model="form.inp_Emirate"
                  type="text"
                  :class="{ 'p-invalid': validationErrors.inp_Emirate }"
                />
                <small
                  class="p-error p-min-error"
                  v-if="validationErrors.inp_Emirate"
                >
                  {{
                    useRegexUnderScore(validationErrors.inp_Emirate) || "&nbsp;"
                  }}
                </small>
              </template>
            </CustomInputContainer>
          </div>
          <!-- <div class="col-6">
            <CustomInputContainer label="Country/Region">
              <template v-slot>
                <Dropdown
                class="w-full"
                  v-model="form.dd_CountryRegion"
                  :options="dd_CountryRegion_s"
                  type="text"
                  :class="{ 'p-invalid': validationErrors.inp_LocationType }"
                />
                <small
                  class="p-error p-min-error"
                  v-if="validationErrors.inp_LocationType"
                >
                  {{
                    useRegexUnderScore(validationErrors.inp_LocationType) ||
                    "&nbsp;"
                  }}
                </small>
              </template>
            </CustomInputContainer>
          </div> -->

          <div class="col-6">
            <CustomInputContainer label="Zip Code">
              <template v-slot>
                <InputText
                  v-model="form.inp_ZipCode"
                  type="text"
                  :class="{ 'p-invalid': validationErrors.inp_ZipCode }"
                />
                <small
                  class="p-error p-min-error"
                  v-if="validationErrors.inp_ZipCode"
                >
                  {{
                    useRegexUnderScore(validationErrors.inp_ZipCode) || "&nbsp;"
                  }}
                </small>
              </template>
            </CustomInputContainer>
          </div>

          <!-- for fix design -->
          <div class="col-6"></div>

          <div class="col-6">
            <CustomInputContainer label="Email Address">
              <template v-slot>
                <InputText
                  v-model="form.inp_EmailAddress"
                  type="text"
                  :class="{ 'p-invalid': validationErrors.inp_EmailAddress }"
                />
                <small
                  class="p-error p-min-error"
                  v-if="validationErrors.inp_EmailAddress"
                >
                  {{
                    useRegexUnderScore(validationErrors.inp_EmailAddress) ||
                    "&nbsp;"
                  }}
                </small>
              </template>
            </CustomInputContainer>
          </div>

          <div class="col-6">
            <CustomInputContainer label="Phone Number">
              <template v-slot>
                <InputPhone
                  v-model:dialCode="form.inp_country_code"
                  v-model="form.inp_PhoneNumber"
                  :input_class="{
                    'p-invalid': validationErrors.inp_PhoneNumber,
                  }"
                />
                <small
                  class="p-error p-min-error"
                  v-if="validationErrors.inp_PhoneNumber"
                >
                  {{
                    useRegexUnderScore(validationErrors.inp_PhoneNumber) ||
                    "&nbsp;"
                  }}
                </small>
              </template>
            </CustomInputContainer>
          </div>

          <!-- <div class="col-12">
            <h5 class="font-bold">Stocks Detail</h5>
          </div>

          <div class="col-12">
            <Card
              class="shadow-none border-0 p-4 pt-3 pb-3"
              style="background: #f7f7f7"
            >
              <template #content>
                <div class="formgrid grid">
                  <div class="field col">
                    <CustomInputContainer label="Area">
                      <template v-slot>
                        <Dropdown
                          class="bg-white"
                          v-model="form_Stocks.dd_area"
                          type="text"
                          :class="{
                            'p-invalid': validationErrors.dd_area,
                          }"
                        />
                        <small
                          class="p-error p-min-error"
                          v-if="validationErrors.dd_area"
                        >
                          {{
                            useRegexUnderScore(validationErrors.dd_area) ||
                            "&nbsp;"
                          }}
                        </small>
                      </template>
                    </CustomInputContainer>
                  </div>
                  <div class="field col">
                    <CustomInputContainer label="Inbound">
                      <template v-slot>
                        <InputText
                          class="bg-white"
                          v-model="form_Stocks.inp_inbound"
                          type="text"
                          :class="{
                            'p-invalid': validationErrors.inp_inbound,
                          }"
                        />
                        <small
                          class="p-error p-min-error"
                          v-if="validationErrors.inp_inbound"
                        >
                          {{
                            useRegexUnderScore(validationErrors.inp_inbound) ||
                            "&nbsp;"
                          }}
                        </small>
                      </template>
                    </CustomInputContainer>
                  </div>

                  <div class="field col">
                    <CustomInputContainer label="Outbound">
                      <template v-slot>
                        <InputText
                          class="bg-white"
                          v-model="form_Stocks.inp_outbound"
                          type="text"
                          :class="{
                            'p-invalid': validationErrors.inp_outbound,
                          }"
                        />
                        <small
                          class="p-error p-min-error"
                          v-if="validationErrors.inp_outbound"
                        >
                          {{
                            useRegexUnderScore(validationErrors.inp_outbound) ||
                            "&nbsp;"
                          }}
                        </small>
                      </template>
                    </CustomInputContainer>
                  </div>
                </div>
              </template>

              <template #footer>

                <TextIconTitle
                  text="Add More Areas"
                  text_class="font-bold text-xs"
                  text_style="color:#1593F9"
                  icon="pi pi-plus"
                  icon_class="font-bold text-xs"
                  icon_x="0px"
                  icon_y="0px"
                  icon_color="#1593F9"
                />
              </template>
            </Card>
          </div> -->
        </div>

        <div class="item expand grid col-12 flex flex-column-reverse">
          <div class="col-12">
            <!-- for fit alignment -->

            <div class="flex flex-row justify-content-end gap-3">
              <Button
                class="bg-white text-black-alpha-90 border-300 border-2 font-bold"
                label="Cancel"
                @click="Sidebar_visible = false"
              />
              <Button label="Save Location" @click="saveLocation()" />
            </div>
          </div>
        </div>
      </div>
    </SidebarPrime>
    <Toast position="top-right" />
  </div>
</template>
<script setup>
// ---------------------------------------------------------------
// # Configuration Section
import * as yup from "yup"
import { ref, watch, customRef, computed } from "vue"
import { refDebounced } from "@vueuse/core"
import { useRegexUnderScore } from "@/composables/regex"
// important don't delete any Import

import { useToast } from "primevue/usetoast"
// You should to make shore this Components added to your template
// <Toast position="top-right" />

// DEV MODE ONLY
import { data_Locations as d_l } from "@/dummyData/inventory/location"

import { getLocationsList } from "@/services/locations/index"

const toast = useToast()
const router = useRouter()
const route = useRoute()

const baseURL = useRuntimeConfig().public.baseURL
const api_URL = `${baseURL}admin/warehouse-location/list`
const _key = ref(0)
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

const data_Locations = ref(d_l)
const TextAutoFlagNumber_number = ref("+971-52 6813408")
const Sidebar_visible = ref(false)
const addToastMessage = (severity, summary, detail) => {
  toast.add({
    severity,
    summary,
    detail,
    life: 1000,
  })
}
// form data
const form = reactive({
  inp_Name: "",
  inp_LocationType: "",
  inp_Area: "",
  // dd_CountryRegion: "",
  inp_Emirate: "",
  inp_ZipCode: "",
  inp_EmailAddress: "",
  inp_PhoneNumber: null,
  inp_country_code: "+971",
})

const addLocation = () => {
  Sidebar_visible.value = !Sidebar_visible.value
  form.inp_Name = ""
  form.inp_LocationType = ""
  form.inp_Area = ""
  form.inp_Emirate = ""
  form.inp_ZipCode = ""
  form.inp_EmailAddress = ""
  form.inp_PhoneNumber = null
}
const editLocation = (data) => {
  Sidebar_visible.value = !Sidebar_visible.value

  form.inp_Name = data.address
  form.inp_LocationType = data.mode
  form.inp_Area = data.area
  form.inp_Emirate = data.city
  form.inp_ZipCode = data.zip_code
  form.inp_EmailAddress = data.email
  form.inp_PhoneNumber = data.contact_no
  form.inp_country_code = data.country_code
}
const saveLocation = async () => {
  await Check_Validation()
  if (Object.keys(validationErrors.value).length === 0) {
    let payload = {
      mode: form.inp_LocationType,
      email: form.inp_EmailAddress,
      city: form.inp_Emirate,
      contact_no: `${form.inp_PhoneNumber}`,
      country_code: form.inp_country_code,
      area: form.inp_Area,
      address: form.inp_Name,
      zip_code: form.inp_ZipCode,
    }
    try {
      const { status, error } = await useMyFetch(
        `/admin/warehouse-location/create`,
        {
          method: "POST",
          body: payload,
        }
      )
      if (status.value == "success") {
        addToastMessage("success", "Location added successfully!")
        setTimeout(() => {
          Sidebar_visible.value = !Sidebar_visible.value
          _key.value += 1
        }, 1000)
      } else {
        addToastMessage("error", error.value.data.message)
      }
    } catch (error) {
      console.log("error", error)
    }
  }
}

const form_Stocks = reactive({
  dd_area: "",
  inp_inbound: "",
  inp_outbound: "",
})

const list_Stocks = ref([
  {
    dd_area: "",
    inp_inbound: "",
    inp_outbound: "",
  },
])

// ---------------------------------------------------------------
// # Setup Components Data

// ## for controls
// list for option of component [use same name of v model]_items

// Example
// dd_SellPrice_items = ref([]);
const dd_CountryRegion_items = ref(["ar", "br", "en"])
// ## for displays

// ---------------------------------------------------------------
// # Setup Validation
const schema = yup.object({
  inp_Name: yup.string().min(2).required(),
  inp_LocationType: yup.string().min(2).required(),
  inp_Area: yup.string().min(2).required(),
  inp_Emirate: yup.string().min(2).required(),
  // dd_CountryRegion: yup.string().min(2).required(),
  inp_ZipCode: yup.string().min(2).required(),
  inp_EmailAddress: yup
    .string()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "must be a valid email")
    .required(),
  inp_PhoneNumber: yup.string().min(7).max(15).required(),
})

const location_types = ref(["Head Office", "Store", "POS", "Warehouse"])
const selectLocationType = (event) => {
  form.inp_LocationType = event.value
}
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

const getSeverity = (item) => {
  switch (item.status) {
    case "OVERDUE":
      return {
        color: "#F3654A",
        backgroundColor: "#F3654A33",
      }

    case "APPROVAL":
      return {
        color: "#FFB536",
        backgroundColor: "#FFB53633",
      }

    case "Discontinued":
      return {
        color: "#895BF1",
        backgroundColor: "#895bf187",
      }

    case "In Stock":
      return {
        color: "#1AD598",
        backgroundColor: "#D1F7EA",
      }

    default:
      return {
        color: "#1AD598",
        backgroundColor: "#D1F7EA",
      }
  }
}
// ---------------------------------------------------------------
// Watch's for For design

// ---------------------------------------------------------------
// API Integration

// ## sets variables integrations

// ## resets Components Control for integrations

// ## Watch's for API Integration

// ## Functions For API Integration

// ## Submit Form

// ## onMounted // when we call the api

const handleApi = () => {
  // handel data here from input controls before send it

  // return function from services as $fetch Promise
  // Example
  //  return get_data_from_api();

  return getLocationsList()
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
  // console.log("data:", data.data.value);
  data_Locations.value = data.data.value?.result?.map((item) => ({
    _id: item._id,
    area: item.area,
    name: item.mode,
    location_type: item.type,
    country_region: item.country,
    city: item.city,
    zip_code: item.zip_code,
    email_address: item.email,
    phone_number: `+${item.contact_no}`,
  }))
}

onMounted(() => {
  data_Locations.value = []
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
.p-datatable .p-column-header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.card {
  max-height: fit-content;
}
</style>
