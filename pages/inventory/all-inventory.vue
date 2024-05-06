<template lang="">
  <div class="wrapper-column h-full">
    <!-- card -->
    <div class="item expand card">
      <div class="wrapper-column">
        <!-- <div class="item">
          <div class="wrapper-row">
            <div class="item">
              <div class="flex align-items-center">
                <span
                  id="inp_Search"
                  style="width: 240px"
                  class="p-input-icon-left"
                >
                  <i class="pi pi-search" />
                  <InputText v-model="inp_Search" placeholder="Search By" />
                </span>
              </div>
            </div>
            <div class="item expand">
              <div class="flex align-items-center gap-3 justify-content-end">
                <Button label="Add item" @click="SideBarVisible = true" />
                <Button
                  label="Create PO"
                  severity="secondary"
                  outlined
                  style="border-color: #e2e7f1"
                />

                <MenuPopFilterSelects
                  :inherent_attrs="true"
                  severity="secondary"
                  :items="MenuPopFilterSelects_filter"
                  @clear="btn_filter_clear"
                  @submit="btn_filter_submit"
                />
              </div>
            </div>
          </div>
        </div> -->
        <!-- DataTable v-max-h-el-h  -->
        <div class="mt-3 item expand pr-1 overflow-y-auto">
          <ComponentsLibraryRpDataTable
            class="h-30rem"
            :api_URL="api_URL"
            :isPagination="true"
            :isSearch="true"
            header="All Inventory"
            :isFilterBy="true"
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
                  <div
                    class="flex align-items-center gap-3 justify-content-end"
                  >
                    <Button label="Add item" @click="SideBarVisible = true" />
                    <!-- <Button
                      label="Create PO"
                      severity="secondary"
                      outlined
                      style="border-color: #e2e7f1"
                    /> -->

                    <MenuPopFilterSort
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
                    />
                  </div>
                </div>
              </div>
            </template>
            <template #Delete_operation_mode></template>
            <template #Delete_warehouse_name></template>
            <template #Delete_quantity></template>
            <template #Delete_Expiry></template>
            <template #Delete_Location></template>

            <template #Production="slotsProps">
              {{ moment(slotsProps.data.Production_Date).format("YYYY-MM-DD") }}
            </template>

            <template #actions="slotsProps">
              <Button text @click="viewDetails(slotsProps.data._id)"
                >View</Button
              >
            </template>
          </ComponentsLibraryRpDataTable>

          <!-- <ComponentsLibraryToolsComponentHolderV2
          :load_component="()=>'ComponentsLibraryRpDataTable'"

            class="h-30rem"
            api_URL="https://valyouapi-dev.devnhr.com/admin/product_component/list_product"
            :isPagination="true"
            :isSearch="true"
            header="All Inventory"
            :isFilterBy="true"
          /> -->
        </div>
      </div>
    </div>
    <lazyComponent :super_lazy="false">
      <SidebarPrime
        v-model:visible="SideBarVisible"
        position="right"
        :showCloseIcon="false"
        class="proposalSidebar InvoicesSideBar overflow-x-hidden"
        style="width: 40%"
      >
        <template #header>
          <div class="wrapper-row">
            <div class="item">
              <div class="flex align-items-center h-full">
                <h3 class="font-bold">Add Inventory</h3>
              </div>
            </div>
            <div class="item expand">
              <div class="flex align-items-center justify-content-end gap-3">
                <Button
                  label="Cancel"
                  severity="secondary"
                  outlined
                  style="border-color: #ced6e3; color: #8d98a9"
                  @click="
                    () => {
                      form.locations = [
                        {
                          dd_Warehouse_id: '',
                          dd_Warehouse_items: [
                            {
                              label: 'IM a Warehouse',
                              id: ' random id',
                            },
                          ],

                          dd_Warehouse: null,
                          quantity: null, // num
                          Value: null, // num decimal
                        },
                      ]

                      form.dd_Product = ''
                      Clear_Validation()
                      SideBarVisible = false
                    }
                  "
                />
                <Button label="Add Inventory" @click="Submit_Form" />
              </div>
            </div>
          </div>
          <Divider style="transform: scale(1.5)" />
        </template>

        <div class="wrapper-column h-full overflow-y-auto">
          <div class="item">
            <div class="card">
              <div class="grid grid-nogutter gap-3">
                <div class="col-12 md:col-6 p-0">
                  <h6 class="font-bold mb-2">Select Product</h6>
                  <CustomInputContainer label="">
                    <template v-slot>
                      <Dropdown
                        @change="(event) => (dd_Product_id = event.value)"
                        v-model="form.dd_Product"
                        optionLabel="name"
                        optionValue="id"
                        placeholder="Please Select Product"
                        :options="dd_Product_items"
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
                <div class="col-12 p-0 mt-3">
                  <h6 class="font-bold">Select Location</h6>
                </div>
                <template
                  v-for="(item, index) in form.locations"
                  :key="index"
                  v-if="true"
                >
                  <div class="grid w-full">
                    <!-- <div class="col-12 md:col-4">
                      <CustomInputContainer label="Warehouse">
                        <template v-slot>
                          <Dropdown
                            @change="
                              (event) =>
                                (form.locations[index].dd_Warehouse_id =
                                  event.value)
                            "
                            v-model="form.locations[index].dd_Warehouse"
                            optionLabel="label"
                            optionValue="id"
                            placeholder="Select a Warehouse"
                            :options="form.locations[index].dd_Warehouse_items"
                            class="w-full"
                            :class="{
                              'p-invalid':
                                validationErrors[
                                  `locations[${index}].dd_Warehouse`
                                ],
                            }"
                          />
                          <small
                            class="p-error p-min-error"
                            v-if="
                              validationErrors[
                                `locations[${index}].dd_Warehouse`
                              ]
                            "
                          >
                            {{
                              useRegexUnderScore(
                                validationErrors[
                                  `locations[${index}].dd_Warehouse`
                                ]
                              ) || "&nbsp;"
                            }}
                          </small>
                        </template>
                      </CustomInputContainer>
                    </div> -->
                    <div class="col-12 md:col-4">
                      <CustomInputContainer label="Quantity">
                        <template v-slot>
                          <InputNumber
                            v-model="form.locations[index].quantity"
                            :min="1"
                            :minFractionDigits="0"
                            placeholder="Type Quantity"
                            :class="{
                              'p-invalid':
                                validationErrors[
                                  `locations[${index}].quantity`
                                ],
                            }"
                          />
                          <small
                            class="p-error p-min-error"
                            v-if="
                              validationErrors[`locations[${index}].quantity`]
                            "
                          >
                            {{
                              useRegexUnderScore(
                                validationErrors[`locations[${index}].quantity`]
                              ) || "&nbsp;"
                            }}
                          </small>
                        </template>
                      </CustomInputContainer>
                    </div>
                    <div class="col-12 md:col-4">
                      <CustomInputContainer label="Value">
                        <template v-slot>
                          <InputNumber
                            v-model="form.locations[index].Value"
                            placeholder="Type Value"
                            :class="{
                              'p-invalid':
                                validationErrors[`locations[${index}].Value`],
                            }"
                          />
                          <small
                            class="p-error p-min-error"
                            v-if="validationErrors[`locations[${index}].Value`]"
                          >
                            {{
                              useRegexUnderScore(
                                validationErrors[`locations[${index}].Value`]
                              ) || "&nbsp;"
                            }}
                          </small>
                        </template>
                      </CustomInputContainer>
                    </div>
                  </div>
                  <!-- <div class="col-12 p-0"></div> -->
                </template>
                <!-- <div class="col-3 p-0">
                  <Button
                    class="p-2 font-size-small"
                    link
                    style="
                      transform: translate(0px, 0px);
                      text-decoration: underline;
                    " 
                    @click="add_more_location_click"
                    >Add more location</Button
                  >
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </SidebarPrime>
    </lazyComponent>

    <lazyComponent :super_lazy="false">
      <SidebarPrime
        v-model:visible="SideBarDetailsVisible"
        position="right"
        :showCloseIcon="false"
        class="proposalSidebar InvoicesSideBar overflow-x-hidden"
        style="width: 40%"
      >
        <template #header>
          <div class="wrapper-row">
            <h3 class="font-bold">Product Info</h3>
          </div>
        </template>

        <div class="wrapper-column h-full overflow-y-auto">
          <TabView>
            <!-- Details Tab -->

            <TabPanel header="Details" v-if="data_current_product.images_src">
              <ProductDetail
                from="inventory"
                :images_src="data_current_product.images_src"
                :product_name="data_current_product.product_name"
                :product_description="data_current_product.product_description"
                :category="data_current_product.category"
                :unit="data_current_product.unit"
                :upc="data_current_product.upc"
                :weight="data_current_product.weight"
                :manufacturer="data_current_product.manufacturer"
                :length="data_current_product.length"
                :width="data_current_product.width"
                :height="data_current_product.height"
                :selling_price="data_current_product.selling_price"
                :sales_account="data_current_product.sales_account"
                :description_sales="data_current_product.description_sales"
                :cost_price="data_current_product.cost_price"
                :purchase_account="data_current_product.purchase_account"
                :description_purchase="
                  data_current_product.description_purchase
                "
                :preferred_vendor="data_current_product.preferred_vendor"
                :sku="data_current_product?.suk"
              />
            </TabPanel>
            <TabPanel header="Transactions">
              <div class="col">
                <ComponentsLibraryRpDataTable
                  class="h-30rem"
                  :api_URL="api_URL_Transactions"
                  :isPagination="true"
                  :isSearch="true"
                  header="All Inventory"
                  :isFilterBy="true"
                >
                  <template #datatable_header="slotsProps"> </template>
                  <template #operation_mode="slotsProps">
                    {{
                      slotsProps.data.operation_mode == "updateProductInventory"
                        ? "stock added to order"
                        : "stock increased"
                    }}
                  </template>
                  <template #warehouse_name="slotsProps"
                    >{{ slotsProps.data.warehouseDetails[0].area }},
                    {{ slotsProps.data.warehouseDetails[0].city }}</template
                  >
                  <template #quantity="slotsProps">{{
                    -slotsProps.data.quantity
                  }}</template>
                  <template #Delete_sku></template>
                  <template #Delete_product_name></template>
                  <template #Delete_Location></template>
                  <template #Delete_Cost_Price></template>
                  <template #Delete_Production></template>
                  <template #Delete_Selling_Price></template>
                  <template #Delete_Total_Stock></template>
                  <template #Delete_Expiry></template>
                  <template #Delete_status></template>
                  <template #Delete_actions></template>
                </ComponentsLibraryRpDataTable>
              </div>
            </TabPanel>
            <TabPanel header="Location">
              <div class="col">
                <ComponentsLibraryRpDataTable
                  class="h-27rem"
                  :api_URL="api_URL_Location"
                  :isPagination="true"
                  :isSearch="true"
                  header="All Inventory"
                  :isFilterBy="true"
                  datatable_key="_locations_key"
                >
                  <template #datatable_header="slotsProps"></template>
                  <template #Delete_area></template>
                  <template #Delete_city></template>
                  <template #Delete_country></template>
                  <template #Delete_zip_code></template>
                  <template #Delete_email></template>
                  <template #Delete_Location></template>
                  <template #Delete_contact_no></template>
                  <template #Delete_actions></template>
                </ComponentsLibraryRpDataTable>
              </div>
            </TabPanel>
          </TabView>
        </div>
      </SidebarPrime>
    </lazyComponent>
  </div>
</template>

<script setup>
// ---------------------------------------------------------------
// # Imports Section

// ## <- services imports ->

// import {
//   get_Customers_list,
//   GetCustomer,
// } from "@/services/customers/view_with_details"

// ## <- dummyData imports ->

import { data_table as d_t } from "@/dummyData/inventory/inventory_db"
import moment from "moment-timezone"
import ProductDetail from "@/containers/Products/Product_Detail.vue"
import { GetProduct } from "@/services/products/view_with_details"
import { CreateInventory } from "@/services/inventory/createInventory"
// import { data_order_list as d_ol } from "@/dummyData/orders/containers/order_history"

// ## <- containers & pages imports ->

//  import CustomerDetail from "@/containers/customers/CustomerDetail"
//  const Orders_View = defineAsyncComponent(()=> import("@/pages/orders/view_with_details.vue"))

// const Orders_View = defineAsyncComponent(() =>
//   import("@/pages/orders/view_with_details.vue")
// )

// ---------------------------------------------------------------
// # Configuration Section
// DEV MODE ONLY
import * as yup from "yup"
import { ref, watch, customRef, computed } from "vue"
import { refDebounced } from "@vueuse/core"
import { useRegexUnderScore } from "@/composables/regex"
// important don't delete any Import

import { defineEmits } from "vue"
import { useToast } from "primevue/usetoast"
import { Get_Products_list } from "@/services/products/shared"
// You should to make shore this Components added to your template or layout
// <Toast position="top-right" />

const toast = useToast()
const router = useRouter()
const route = useRoute()

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

const inp_Search = ref("")
const selected_product = ref([])
const dd_Product_id = ref("")

const dd_Product_items = ref([])

// <- Data Table settings ->
const data_TableData = ref(d_t) // or  [1, 2, 3, 4]
const limit_DataTable = ref(5)
const page_DataTable = ref(1)
const totalRecords_DataTable = ref(100)
const first_DataTable = ref(1)
const dd_RowsPerPage = ref(limit_DataTable.value)

const dd_RowsPerPage_items = ref([dd_RowsPerPage.value, 10, 20, 30])

const Menu_table = ref(null)

const changePage = (paramPage) => {
  page_DataTable.value = paramPage.page + 1
}

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

    case "PAYMENT":
      return {
        color: "#FFB536",
        backgroundColor: "#FFB53633",
      }

    case "PAID":
      return {
        color: "#1AD598",
        backgroundColor: "#D1F7EA",
      }

    default:
      return {
        color: "#fff",
        backgroundColor: "#1AD598",
      }
  }
}

watch(page_DataTable, () => {
  onAPI_call()
})

watch(dd_RowsPerPage, () => {
  onAPI_call()
})

const MenuPopFilterSelects_filter = ref([
  {
    label: "Status",
    modelItems: [
      "All",
      "DISCONTINUED",
      "REORDER POINT",
      "IN STOCK",
      "OUT OF STOCK",
    ],
    selectedItems: "All",
  },
])

const Actions_click = async (event) => {
  let _id = Menu_table.value._id

  if (event.item.label == "View Detail") {
    // router.push(`/products/view_with_details?_id=${_id}`)
    toast.add({
      severity: "info",
      summary: "Sorry",
      detail: "We are working on this future please wait it until finish",
      life: 3000,
    })
  } else {
    toast.add({
      severity: "info",
      summary: "Sorry",
      detail: "We are working on this future please wait it until finish",
      life: 3000,
    })
  }

  // $router.push(`/customers/view_with_details?_id=${slotProps.data._id}`)
}

const btn_filter_submit = (value) => {
  onAPI_call()
}

const btn_filter_clear = (value) => {
  MenuPopFilterSelects_filter.value[0].selectedItems = ""

  onAPI_call()
}

// ## for displays
const SideBarVisible = ref(false)
const SideBarDetailsVisible = ref(false)
const data_current_product = ref({})

const api_URL_Transactions = ref("")
const api_URL_Location = ref("")
const viewDetails = async (id) => {
  api_URL_Transactions.value = `${baseURL}admin/inventory/transactions/${id}`
  api_URL_Location.value = `${baseURL}admin/inventory/warehouse/${id}`
  SideBarDetailsVisible.value = true
  data_current_product.value = {}
  const data = await GetProduct({}, id)
  data_current_product.value = [data].map((item) => ({
    _id: item._id,
    images_src: item.image_urls,

    product_name: item.name,
    product_description: item.description,

    // PRODUCT INFORMATION
    category: item.category, // NO_API
    unit: item.unit,
    upc: item.upc,
    weight: item.weight,
    manufacturer: item.manufacturer,

    length: item.length,
    width: item.width,
    height: item.height,

    // SALES INFORMATION
    selling_price: item.selling_price,
    sales_account: "-", // NO_API
    description_sales: item.selling_description,

    // PURCHASE INFORMATION
    cost_price: item.cost_price,
    purchase_account: "-", // NO_API
    description_purchase: item.cost_description,
    preferred_vendor: "Shawn Paul", // NO_API

    sku: item.sku,
  }))[0]
}
// ---------------------------------------------------------------

// # Submit Form settings
// form data
const form = reactive({
  dd_Product: "",

  locations: [
    {
      dd_Warehouse_id: "",
      dd_Warehouse_items: [
        {
          label: "IM a Warehouse",
          id: " random id",
        },
      ],

      // dd_Warehouse: null,
      quantity: null, // num
      Value: null, // num decimal
    },
  ],
})

const schema = yup.object({
  dd_Product: yup.string().required(),
  locations: yup.array().of(
    yup.object().shape({
      // dd_Warehouse: yup.string().required(),
      quantity: yup.number().required(),
      Value: yup.number().required(),
    })
  ),
})

// ADD THE Faction "Submit_Form" to @click="Submit_Form" to your Button
// Do not Touch anything
// only add your code in /*shared code*/ /*Edit mode*/ /*add mode*/ Code space

let redirect_bool = false
let redirect_to = "/" // "" | url
let redirect_mode = "replace" // replace | push

let throw_error_type = "error" // error | log | null
let unknown_error_occurred_showDetails = true // true | false

let success_summary = "Welcome to Valyou ERP"
let success_detail = "login successfully done"
let life_msg = 3000
let life_redirect = 3000

const baseURL = useRuntimeConfig().public.baseURL
const api_URL = `${baseURL}admin/inventory/list/product_inventory`

const request_func = async () => {
  // console.log("test");
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
  //  await handleSignIn()
}

const request_func_addMode = async () => {
  /*add mode*/
}

const request_func_editMode = async () => {
  /*Edit mode*/
}

// ---------------------------------------------------------------

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
const add_more_location_click = () => {
  form.locations.push({
    dd_Warehouse_id: "",
    dd_Warehouse_items: [
      {
        label: "IM a Warehouse",
        id: " random id",
      },
    ],

    dd_Warehouse: null,
    quantity: null, // num
    Value: null, // num decimal
  })
}
// ---------------------------------------------------------------§
// Watch's for For design

// ---------------------------------------------------------------
// API Integration

// ## sets variables integrations

// ## resets Components Control for integrations

// ## Watch's for API Integration

// ## Functions For API Integration

// ## Submit Form
const Submit_Form = async () => {
  await Check_Validation()

  if (Object.keys(validationErrors.value).length === 0) {
    try {
      let res = await CreateInventory({
        product_id: dd_Product_id.value,
        quantity: form.locations[0].quantity,
        cost_price: form.locations[0].Value,
      })

      toast.add({
        severity: "success",
        summary: "Inventory added successfully",
        detail: "",
        life: 3000,
      })
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
          summary: "An error occured, please try again",
          detail: "",
          life: 3000,
        })
      }
    }

    // submitForm Here
    // if (route.query?._id) {
    //   // Edit mode
    //   console.log("Inventory details  11: ", form)
    // } else {
    //   // Add mode
    //   console.log("Inventory details 22: ", form)
    // }
  }
}

// ## onMounted // when we call the api

onMounted(async function getAlProducts() {
  try {
    const res = await Get_Products_list({
      page: 1,
      limit: 5,
      searchText: "",
      match_values: {},
    })

    dd_Product_items.value = res?.results

  } catch (e) {
    console.log(e);
  }
})

const handleApi = () => {
  // handel data here from input controls before send it

  // return function from services as $fetch Promise
  // Example
  //  return get_data_from_api();

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

// <- call api ->

const onAPI_call = () => {
  // !props.disableApi && Object.keys(container_Data.value).length === 0
  // we can add try catch for this
  if (!props.disableApi) {
    // handleApi().then((res) => {
    //     handleData(res?.data);
    //   });
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
</script>

<script>
export default {
  directives: {
    "max-h-el-h": {
      beforeMount(el) {
        // Store the children in a variable
        el._children = Array.from(el.childNodes)
        // Clear the children before they are rendered
        while (el.firstChild) {
          el.firstChild.remove()
        }
      },
      mounted(el) {
        const clear_content = (el) => {
          el.style.maxHeight = `unset`

          // Store the children in a variable
          el._children = Array.from(el.childNodes)
          // Clear the children before they are rendered
          while (el.firstChild) {
            el.firstChild.remove()
          }
        }

        const updateMaxHeight = (el) => {
          //
          if (el._children.length > 0 || el.offsetHeight > 0) {
            const currentHeight = el.offsetHeight
            el.style.maxHeight = `${currentHeight}px`
          }

          // Restore the children
          el._children.forEach((child) => {
            el.appendChild(child)
          })
        }

        updateMaxHeight(el)

        window.addEventListener("resize", () => {
          console.log("resize is done")
          clear_content(el)
          updateMaxHeight(el)
        })
      },
    },
  },
}
</script>
<style lang="scss">
#inp_Search {
  i.pi.pi-search {
    color: #8d98a9;
    transform: scale(0.72);
  }

  input.p-inputtext.p-component::placeholder {
    color: #8d98a9;
  }
}

button.p-button.p-component.p-button-icon-only.p-button-secondary.p-button-outlined.custom__icon_btn.shady-btn {
  color: #ced6e3;
}

span.p-button-icon.pi.pi-filter {
  color: #878e99;
}

span.p-button-icon.pi.pi-calendar {
  color: #878e99;
}

span.p-button-icon.pi.pi-sort-alt {
  color: #878e99;
}

span.p-tag.p-component.p-0.font-size-small.font-bold {
  padding: 5px !important;
  border-radius: 5px;
}

.Paginator {
  .p-paginator-rpp-options {
    width: min-content;
  }
  .p-dropdown.p-inputwrapper-filled .p-dropdown-label {
    display: flex;
    align-items: center;
  }

  .p-paginator {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .p-paginator.p-component {
    transform: scale(0.9) translate(-49px, 0px);
  }

  button {
    font-weight: bolder;
    border-radius: 4px !important;
    color: #4e4e4e !important;
    // border: 1px solid !important;

    box-shadow: 0px 1px 3px #00000029;
  }

  button.p-highlight {
    color: #fff !important;
    background: #0090ff !important;
  }
}

.p-datatable .p-column-header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.p-sidebar-header-content {
  width: 100%;
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
