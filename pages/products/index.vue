<template lang="">
  <div class="x">
    <div class="mt-0 card flex-grow-1">
      <div class="flex gap-2 justify-content-between">
        <div class="grid flex gap-2 align-items-center">
          <div class="col">
            <h1 class="font-bold">Products</h1>
          </div>
          <div class="col">
            <span
              id="inp_Search"
              style="width: 240px"
              class="p-input-icon-left"
            >
              <i class="pi pi-search" />
              <InputText
                v-model="inp_Search"
                placeholder="Search products here…"
              />
            </span>
          </div>
        </div>

        <div class="grid flex gap-2 align-items-center">
          <div class="col">
            <Dropdown
              v-model="dd_View"
              :options="dd_View_items"
              optionLabel="val"
              class="w-full md:w-14rem"
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
          </div>
          <div class="col">
            <NuxtLink to="/products/SaveProduct">
              <Button label="Add Product" />
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="deals__leads_details products-datatable">
        <!-- get change event -->
        <DataTable
          class="DataTable"
          columnResizeMode="fit"
          showGridlines
          :value="data_TableData"
          :rows="limit_DataTable"
          tableStyle="min-width: 100%;"
          @update:rows="(d_rows) => (limit_DataTable = d_rows)"
          @update:first="
            (d_first) => {
              page_DataTable = d_first / limit_DataTable + 1
              first = d_first
            }
          "
        >
          <Column style="color: black">
            <template #header>
              <div class="w-full pl-7">Product Name</div>
            </template>
            <template #body="slotProps">
              <div class="datatable-row product_name_column">
                <ListAvatar
                  :border_bottom_bool="false"
                  :text="slotProps.data.product.name"
                  :image="slotProps.data.product.image"
                  
                />
              </div>
            </template>
          </Column>

          <Column>
            <template #header>
              <div class="">Product Category</div>
            </template>
            <template #body="slotProps">
              <div class="text-left !min-w-[140px]" style="color: #4D4D4D">{{slotProps.data.product_category}}</div>            
            </template>
          </Column>
          <Column
            header="Cost Price"
            field="cost_price"
            class="text-center"
            style="color: black"
          >
          </Column>

          <Column
            header="Unit"
            field="unit"
            class="text-center"
            style="color: black"
          >
          </Column>

          <!-- <Column
            header="Inventory Value"
            field="inventory_value"
            class="text-center"
            style="color: black"
          >
          </Column> -->

          <Column
            header="Stock in Hand"
            field="stock_in_hand"
            class="text-center"
            style="color: black"
          >
          </Column>

          <Column header="Status" class="text-center">
            <template #body="slotProps">
              <!-- transform: translate(-22px, 0px); -->
              <Tag
                class="p-0 font-size-small font-bold"
                :value="slotProps.data.status"
                style="
                  font-size: 12px !important;
                  min-width: 3.5rem;
                  padding: 3px !important;
                  padding-left: 6px !important;
                  padding-right: 6px !important;
                "
                :style="getSeverity(slotProps.data)"
              />
            </template>
          </Column>

          <Column class="text-left" style="color: black">
            <template #header>
              <div class="pl-3" style="text-align: left; width: 100%">Actions</div>
            </template>
            <template #body="slotProps">
              <div class="flex align-items-center justify-content-start p-0" style="width: 140px">
                <Button
                  v-if="!slotProps.data.is_variant"
                  class="font-size-small p-0 ml-0 mr-3"
                  link
                  style="
                    text-decoration: underline;
                  "
                  @click="
                    $router.push(
                      `/products/SaveProduct?action=add_variant&_id=${slotProps.data._id}`
                    )
                  "
                >
                  Add Variant
                </Button>
                <Button
                  class="font-size-small p-0 ml-0"
                  link
                  style="
                    text-decoration: underline;
                  "
                  @click="
                    $router.push(
                      `/products/SaveProduct?_id=${slotProps.data._id}`
                    )
                  "
                  >Edit</Button
                >

                <!-- <Button></Button> -->
              </div>
            </template>
          </Column>
          <Column>
            <template #body="slotProps">
              <i
                  class="pi pi-ellipsis-v cursor-pointer"
                  aria-controls="overlay_menu"
                  style="transform: translate(0px, 7px)"
                  @click="
                    (event) => {
                      Menu_table._id = slotProps.data._id
                      Menu_table.toggle(event)
                    }
                  "
                ></i>
                <Menu
                  ref="Menu_table"
                  id="overlay_menu"
                  :model="[
                    {
                      label: 'View Detail',
                      command: Actions_click,
                    },

                    {
                      label: 'Discontinue',
                      command: Actions_click,
                    },
                  ]"
                  :popup="true"
                />
            </template>
          </Column>
        </DataTable>

        <div class="grid">
          <div class="col">
            <Paginator
              class="Paginator"
              :rows="limit_DataTable"
              :first="1"
              :totalRecords="totalRecords_DataTable"
              @page="changePage"
            ></Paginator>
          </div>

          <div class="col flex align-items-center justify-content-end">
            <span class="gray_text mr-2">Rows per page:</span>
            <Dropdown
              v-model="dd_RowsPerPage"
              :options="dd_RowsPerPage_items"
              class="w-full md:w-5rem"
            />
          </div>
        </div>
      </div>
    </div>
    <Toast />
  </div>
</template>

<script setup>
// ---------------------------------------------------------------
// # Configuration Section
// DEV MODE ONLY
import { data_TableData as i_tb } from "@/dummyData/products/products_tb"
import { getDataTable_list } from "@/services/products/index.js"
import { useToast } from "primevue/usetoast"
const toast = useToast()
const router = useRouter()

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
  val: "Table View",
  image_src: "/icons/dropdown/TableView.svg",
})

const Menu_table = ref(null)

// Data Table
const data_TableData = ref(i_tb)
const limit_DataTable = ref(10)
const page_DataTable = ref(1)
const totalRecords_DataTable = ref(100)
const first = ref(1)

const dd_RowsPerPage = ref(limit_DataTable.value)

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
const dd_RowsPerPage_items = ref([dd_RowsPerPage.value, 10, 20, 30])

// ## for displays

// ---------------------------------------------------------------
// Functions For design

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
        color: "#fff",
        backgroundColor: "#1AD598",
      }
  }
}

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

// ## resets Components Control for integrations

// ## Watch's for API Integration
const inp_SearchDebounced = refDebounced(inp_Search, 500)
watch(
  () => inp_SearchDebounced.value,
  (val) => {
    try {
      handleApi().then((res) => {
        handleData(res)
      })
    } catch (error) {
      alert(error)
    }
  }
)

watch(page_DataTable, () => {
  try {
    handleApi().then((res) => {
      handleData(res)
    })
  } catch (error) {
    alert(error)
  }
})

watch(dd_RowsPerPage, (newVal) => {
  limit_DataTable.value = newVal

  try {
    handleApi().then((res) => {
      handleData(res)
    })
  } catch (error) {
    alert(error)
  }
})

// ## Functions For API Integration
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const Actions_click = async (event) => {
  let _id = Menu_table.value._id

  if (event.item.label == "View Detail") {
    router.push(`/products/view_with_details?_id=${_id}`)
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
// ## onMounted // when we call the api

const handleApi = () => {
  // handel data here from input controls before send it
  // return function from services as $fetch Promise
  // Example
  //  return get_data_from_api();
  // return getDataTable_list({
  //   search:inp_Search.value,
  //   status:MenuPopFilterSelects_filter.value[0].selectedItems.toLocaleLowerCase(),
  //   page: page_DataTable.value,
  //   limit: limit_DataTable.value,
  // });
  return getDataTable_list({
    searchText: inp_Search.value,
    // match_values:{
    //   status:MenuPopFilterSelects_filter.value[0].selectedItems,
    // },
    page: page_DataTable.value,
    limit: limit_DataTable.value,
  })
}

// handleData for display data from api
const handleData = (data) => {
  // if (data){
  //   return undefined
  // }
  // Example
  // totalRecords_DataTable.value = data[0].totalCount[0].count;
  data_TableData.value = data?.results.map((item) => ({
    _id: item._id,
    product: {
      name: item.name,
      image: item?.image_urls[0],
    },
    product_category: item.category_name,
    cost_price: `AED ${item.cost_price}`,
    unit: item.unit,
    inventory_value: "200", // NO_API
    stock_in_hand: item.opening_stock,
    status: "In Stock", // NO_API
    is_variant: item.is_variant
  }))

  totalRecords_DataTable.value = data?.totalResults
}

onMounted(() => {
  try {
    handleApi().then((res) => {
      handleData(res)
    })
  } catch (error) {
    alert(error)
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
})
</script>

<style lang="scss">


.products-datatable .p-column-header-content{
  display: flex;
  justify-content: center !important;
  
  // padding-left: 80px;
  // background-color: red !important;
}

.products-datatable .p-datatable .p-datatable-tbody > tr > td{
  width: 140px;
}

.deals__leads_details {
  margin-top: 1rem;
}

.deals__section_wrap {
  display: flex;
  flex-direction: column;
}

.default_btn {
  border-color: #e2e7f1 !important;
  color: #000 !important;
}

.primary_btn {
  background: #3394ff !important;
  color: #fff !important;
  border-color: #3394ff !important;
}

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

span.p-tag.p-component.p-0.font-size-small.font-bold {
  padding: 5px !important;
  border-radius: 5px;
}

// .DataTable {

// }

.p-datatable .p-column-header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.datatable-row {
  width: 240px !important;
}

.p-row-even td,
.p-row-odd td {
  width: 120px;
  overflow: hidden;
}

/* Change the text color of the first item */
#overlay_menu_list > li:first-child .p-menuitem-text {
  color: #000;
  /* or any color you want */
}

/* Change the text color of the second item */
#overlay_menu_list > li:nth-child(2) .p-menuitem-text {
  color: #f3654a;
  /* or any color you want */
}
</style>
