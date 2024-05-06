<template lang="">
  <div class="">
    <!-- customer list && details -->

    <div class="grid h-full">
      <!-- Customer List -->
      <!-- v-if="!all_customer" -->
      <div class="col-12 md:col-4">
        <div class="col-12 card custom_card">
          <div
            class="col-12 p-0 grid flex align-items-center justify-content-between"
          >
            <h5 class="font-bold">Products</h5>

            <div class="flex gap-3">
              <Dropdown
                v-model="dd_View"
                :options="dd_View_items"
                optionLabel="val"
                class="w-full md:w-10rem"
              >
                <template #value="slotProps">
                  <div v-if="slotProps.value" class="flex align-items-center">
                    <img
                      :src="slotProps.value.image_src"
                      class="mr-2"
                      style="width: 18px"
                    />
                    <div>{{ slotProps.value.val }}</div>
                  </div>
                  <span v-else>
                    {{ slotProps.placeholder }}
                  </span>
                </template>
                <template #option="slotProps">
                  <div class="flex align-items-center">
                    <img
                      :src="slotProps.option.image_src"
                      class="mr-2"
                      style="width: 18px"
                    />
                    <div>{{ slotProps.option.val }}</div>
                  </div>
                </template>
              </Dropdown>

              <NuxtLink to="/products/SaveProduct">
                <Button label="New" />
              </NuxtLink>
            </div>
          </div>
          <div class="flex align-items-center action_wrap mt-4">
            <span id="inp_Search" style="" class="p-input-icon-left w-full">
              <i class="pi pi-search" />
              <InputText
                v-model="inp_Search"
                placeholder="Search by product name"
              />
            </span>
          </div>
          <div class="col-12 px-0 custom_list mt-3">
            <ListInfo
              :is_circle="false"
              v-for="(item, index) in data_products_list"
              @click="Get_Current_list_data(item)"
              :subtitle="item.product.code"
              :name="item.product.name"
              :image="item.product.image"
              :is_active="item._id == route.query?._id"
              :showActive="true"
            />

            <div ref="target">
              <p>.</p>
              <!--OBSERVER-->
            </div>

            <!-- spinner -->
            <div
              v-if="isLoading"
              class="flex justify-content-center align-items-center"
            >
              <ProgressSpinner
                style="width: 50px; height: 50px"
                strokeWidth="6"
                fill="transparent"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Active Customer Details Tabs -->
      <div class="col-12 md:col-8">
        <div class="col-12 card custom_card">
          <TabView>
            <!-- Details Tab -->

            <TabPanel header="Details">
              <div class="col" :key="key_rerender_ProductDetail">
                <ProductDetail
                  :images_src="data_current_product.images_src"
                  :product_name="data_current_product.product_name"
                  :product_description="
                    data_current_product.product_description
                  "
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
              </div>
            </TabPanel>
            <TabPanel header="Sales History">
              <div class="col">Sales History</div>
            </TabPanel>
            <TabPanel header="Purchase History">
              <div class="col">Purchase History</div>
            </TabPanel>
            <TabPanel header="Logs">
              <div class="col">Logs</div>
            </TabPanel>
          </TabView>
        </div>
      </div>
    </div>
    <Toast position="top-right" />
  </div>
</template>
<script setup>
import {
  data_current_product as d_cp,
  data_products_list as d_pl,
} from "@/dummyData/products/products_detail"

import {
  get_Products_list,
  GetProduct,
} from "@/services/products/view_with_details"

import { useToast } from "primevue/usetoast"

const toast = useToast()
const route = useRoute()
const router = useRouter()

import ProductDetail from "@/containers/Products/Product_Detail.vue"
// ---------------------------------------------------------------
// # Configuration Section
// DEV MODE ONLY

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
const dd_View = ref({
  val: "Detail View",
  image_src: "/icons/dropdown/DetailView.svg",
})

const data_products_list = ref(d_pl)
const data_current_product = ref(d_cp)
const data_page = ref(1)

const target = ref(null)
const targetIsVisible = ref(false)
const isLoading = ref(false)
// ---------------------------------------------------------------
// # Setup Components Data

// ## for controls
// list for option of component [use same name of v model]_items

// Example
// dd_SellPrice_items = ref([]);

const dd_View_items = ref([
  {
    val: "Table View",
    image_src: "/icons/dropdown/TableView.svg",
  },

  {
    val: "Detail View",
    image_src: "/icons/dropdown/DetailView.svg",
  },
])

// ## for displays
// ---------------------------------------------------------------
// Functions For design

// ---------------------------------------------------------------
// Watch's for For design

watch(dd_View, (newVal) => {
  switch (newVal.val) {
    case "Table View":
      router.push("/products")
      break

    case "Detail View":
      router.push("/products/view_with_details")
      break

    default:
      break
  }
})

// ---------------------------------------------------------------
// API Integration

// ## sets variables integrations
const key_rerender_ProductDetail = ref(0)

// ## resets Components Control for integrations
data_products_list.value = []

// ## Watch's for API Integration
const inp_SearchDebounced = refDebounced(inp_Search, 500)
watch(
  () => inp_SearchDebounced.value,
  (val) => {
    data_products_list.value = []
    targetIsVisible.value = false
    data_page.value = 1

    handleApi().then((res) => {
      handleData(res)
    })
  }
)

const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }], observerElement) => {
    targetIsVisible.value = isIntersecting
  }
)

watch(
  () => targetIsVisible.value,
  (newVal) => {
    if (newVal) {
      data_page.value = data_page.value + 1
      handleApi().then((res) => {
        handleData(res)
      })
    }
  }
)

// watch(data_page, (newVal) => {
//   if (newVal) {
//     handleApi().then((res) => {
//       handleData(res)
//     })
//   }
// })

// ## Functions For API Integration

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const Get_Current_list_data = (item) => {
  router.replace({ query: { _id: item._id } })

  GetProduct({}, item._id).then((res) => {
    data_current_product.value = [res].map((item) => ({
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

      sku: item.sku
    }))[0]

    key_rerender_ProductDetail.value++
  })

  
}

// ## onMounted // when we call the api

const handleApi = () => {
  isLoading.value = true

  // handel data here from input controls before send it

  // return function from services as $fetch Promise
  // Example
  //  return get_data_from_api();

  // Get_Current_list_data();

  return get_Products_list({
    searchText: inp_Search.value,
    page: data_page.value,
    limit: 20,
  })
}

// handleData for display data from api
const handleData = (res) => {
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

  let data = res.results.map((item) => {
    // Handel Image 
    
    let handled_image = item.image_urls.length == 0
            ? "https://placehold.co/500"
            : item.image_urls[0];
    
    if (typeof handled_image === 'object' ) {
      // console.log("handled_image:",handled_image);
      handled_image = handled_image.url
    }

    return {
      _id: item._id,

      product: {
        code: item.sku,
        name: item.name,
        image:handled_image
          
      },
    }
  })

  data_products_list.value = data_products_list.value.concat(data)

  // router.replace({ query: { _id: data[0]._id } })

  var data_current = res.results.find((item) => item._id == route.query?._id)

  if (route.query?._id) {
    console.log("data_current:", data_current)
    if (data_current) {
      data_current_product.value = [data_current].map((item) => ({
        _id: item?._id ? item?._id : "NO_ID",
        images_src: item?.image_urls ? item?.image_urls : [],

        product_name: item.name,
        product_description: item.description,

        // PRODUCT INFORMATION
        category: "static category", // NO_API
        unit: item.unit,
        upc: item.upc,
        weight: item.weight,
        manufacturer: item.manufacturer,

        length: item.length,
        width: item.width,
        height: item.height,

        // SALES INFORMATION
        selling_price: item.selling_price.toString(),
        sales_account: "-", // NO_API
        description_sales: item.selling_description,

        // PURCHASE INFORMATION
        cost_price: item.cost_price.toString(),
        purchase_account: "-", // NO_API
        description_purchase: item.cost_description,
        preferred_vendor: "Shawn Paul", // NO_API

        sku:item.sku
      }))[0]
    }
  }

  // console.log("data_current_product.value:",data_current_product.value);

  isLoading.value = false
}

onMounted(() => {
  handleApi().then(async (res) => {
    handleData(res)

    if (route.query?._id) {
      await sleep(100)
      GetProduct({}, route.query?._id).then((res) => {
    data_current_product.value = [res].map((item) => ({
      _id: item._id,
      images_src: item.image_urls,

      product_name: item.name,
      product_description: item.description,

      // PRODUCT INFORMATION
      category: item.category, 
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

      sku:item.sku
    }))[0]

    key_rerender_ProductDetail.value++
  })

      key_rerender_ProductDetail.value++
    } 
    else {
      await sleep(100)
      nextTick(()=>{
        let val = document.querySelector(
            ".main_body div.col-12.px-0.custom_list.mt-3 > div:nth-child(1)"
          );

        console.log("val:",val);
        
        val.click()
      })
        
      
      await sleep(100)

      key_rerender_ProductDetail.value++
    }
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

  // get_Products_list({}).then((res) => {
  //   // let val = res?.data.map((item) => ({
  //   //   label: item?.matter_name,
  //   //   id: item?.id,
  //   // }));
  // })

  // if (route.query?._id) {
  //   GetProduct({}, route.query?._id).then((res) => {
  //     data_current_product.value = res
  //   })
  // }
  // else{
  //   // set first one as selected
  //   // easy way click on first one

  //   // data_current_product.value = data_products_list.value[0];
  // }
})

// old code
import { ref, onMounted, provide } from "vue"
</script>
<style lang="scss">
.customer__card {
  min-height: 82vh !important;
  max-height: 82vh !important;
}
.card_ScrollWrapper {
  min-height: 72vh !important;
  max-height: 72vh !important;
  overflow: auto !important;
}
.card_ScrollWrapper::-webkit-scrollbar {
  display: none !important;
}

.custom_card {
  min-height: 80vh !important;
  max-height: 80vh !important;
  overflow: auto !important;
}
.custom_card::-webkit-scrollbar {
  display: none !important;
  /* for Chrome, Safari, and Opera */
}
.p-button-transparent {
  background-color: transparent !important;
  border: 1px solid #e2e7f1 !important;
}
.active {
  background-color: #3494ff !important;
  span {
    color: #ffff !important;
  }
}
.action_wrap {
  // width: 30% !important;
  .custom_search input {
    padding: 0.5rem !important;
    padding-left: 2rem !important;
  }
}
.customer_filter_btn {
  padding: 0.25rem 0.95rem !important;
}

.add_customer_btn {
  width: 11rem;
  height: 100%;
  justify-content: center;
}

.p-tabview-title {
  font-size: 16px !important;
}

.p-tabview .p-tabview-nav li .p-tabview-nav-link:not(.p-disabled):focus {
  box-shadow: none !important;
}
.p-tabview .p-tabview-panels {
  padding: 0 !important;
}
.customer_dropdown .p-dropdown {
  display: inline-flex;
  cursor: pointer;
  position: relative;
  user-select: none;
  border: none;
  width: 12rem !important;
}
.customer_dropdown .p-dropdown .p-dropdown-label {
  font-size: 1rem !important;
  font-weight: 600 !important;
  color: #000000 !important;
}
.customer_dropdown .p-dropdown:not(.p-disabled).p-focus {
  box-shadow: none !important;
}
.customer_dropdown
  .p-dropdown-panel
  .p-dropdown-items
  .p-dropdown-item.p-highlight {
  border-radius: 18px !important;
  padding: 18px !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  color: #ffff !important;
}

.customer_dropdown .p-dropdown-panel .p-dropdown-items .p-dropdown-item {
  border-radius: 18px !important;
  padding: 18px !important;
  font-size: 1rem !important;
  font-weight: 600 !important;
}
</style>
