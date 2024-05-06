<template lang="">
  <div class="wrapper-column h-full">
    <div class="item h-full">
      <div class="card pl-4 pr-4 h-full w-full">
        <div class="wrapper-column">
          <!-- Heading & add new btn -->
          <div class="item">
            <div class="wrapper-row pt-3">
              <div class="item expand">
                <h3 class="font-bold">Free Draw Dashboard</h3>
              </div>
              <div class="item">
                <Button
                  label="New Free Draw"
                  icon="pi pi-plus"
                  @click="
                    () => {
                      $router.push('/draw-manager/free-draw/Save')
                    }
                  "
                />
              </div>
            </div>
          </div>

          <!-- card space -->
          <div class="item">
            <div class="flex align-items-center flex-wrap gap-3">
              <div v-for="(key, index) in Object.keys(cards_list)" :key="index" class="card border-1 border-300 w-max w-10rem min-w-max">
                <div class="wrapper-column">
                  <div class="item">
                    <span class="gray_text font-bold">{{key}}</span>
                  </div>
                  <div class="item">
                    <span class="font-bold">{{cards_list[key]}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- DataTable -->
          <div class="mt-3 item expand overflow-y-auto">
            <DataTable
              class="DataTable"
              stripedRows
              resizableColumns
              columnResizeMode="fit"
              showGridline
              :value="data_TableData"
              :rows="limit_DataTable"
              tableStyle="min-width: 30rem"
              @update:rows="(d_rows) => (limit_DataTable = d_rows)"
              @update:first="
                (d_first) => {
                  page_DataTable = d_first / limit_DataTable + 1
                  first_DataTable = d_first
                }
              "
            >
              <Column field="draw_id" header="Draw ID" class="text-center">
              </Column>
              <Column field="draw_name" header="Draw Name" class="text-center">
              </Column>
              <Column
                field="draw_due_date"
                header="Draw Due Date"
                class="text-center"
              >
              </Column>
              <Column
                field="ticket_sold"
                header="Ticket Sold"
                class="text-center"
              >
              </Column>

              <Column field="status" header="Status" class="text-center">
                <template #body="slotProps">
                  <div class="w-full text-center">
                    <Tag
                      class="p-0 font-size-small font-bold"
                      :value="slotProps.data?.status"
                      style="
                        font-size: 12px !important;
                        min-width: 3.5rem;
                        padding: 3px !important;
                        padding-left: 6px !important;
                        padding-right: 6px !important;
                      "
                      :style="getSeverity(slotProps.data?.status)"
                    />
                  </div>
                </template>
              </Column>
              <Column field="quantity" header="Actions" class="text-center">
                <template #body="slotProps">
                  <div class="w-full text-center">
                    <Button
                      :disabled="(slotProps.data.status == 'Completed') || slotProps.data.status == 'Announced'"
                      class="p-2 font-size-small"
                      link
                      style="
                        transform: translate(0px, 0px);
                        text-decoration: underline;
                      "
                      @click="
                        $router.push(
                          `/draw-manager/free-draw/Save?_id=${slotProps.data._id}`
                        )
                      "
                      >Edit</Button
                    >

                    <Button
                      class="p-2 font-size-small"
                      link
                      style="
                        transform: translate(0px, 0px);
                        text-decoration: underline;
                      "
                      @click="
                        $router.push(
                          `/draw-manager/free-draw/view_with_details?_id=${slotProps.data._id}`
                        )
                      "
                      >View</Button
                    >
                  </div>
                </template>
              </Column>
            </DataTable>
          </div>

          <div class="item">
            <div class="grid">
              <div class="col-8 p-0">
                <Paginator
                  class="Paginator"
                  :rows="limit_DataTable"
                  :first="1"
                  :totalRecords="totalRecords_DataTable"
                  @page="changePage"
                ></Paginator>
              </div>

              <div class="col-4 flex align-items-center justify-content-end">
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
      </div>
    </div>
  </div>
</template>
<script setup>
// ---------------------------------------------------------------
// # Imports Section
import { reactive, provide, inject } from "vue" // for set connection with parents & children's

// ## <- services imports ->

import { GetFreeDrawList } from "@/services/draw_manager/free_draw/index.js"

// ## <- dummyData imports ->

import { data_TableData as d_td } from "@/dummyData/DrawManger/FreeDraw/free_draw_tb.js"

// ## <- containers & pages imports ->

//  import CustomerDetail from "@/containers/customers/CustomerDetail"
//  const Orders_View = defineAsyncComponent(()=> import("@/pages/orders/view_with_details.vue"))

// ---------------------------------------------------------------
// # Configuration Section
// DEV MODE ONLY

import { useToast } from "primevue/usetoast"
// You should to make shore this Components added to your template or layout
// <Toast position="top-right" />

import moment from "moment-timezone"

// ## <- containers Async imports ->
// const CustomerOrder = defineAsyncComponent(()=>import("@/containers/customers/CustomerOrder.vue"));

const toast = useToast()
const router = useRouter()
const route = useRoute()

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

// ---------------------------------------------------------------
// # Setup Components Data

// ## for controls
// list for option of component [use same name of v model]_items

// Example
// dd_SellPrice_items = ref([]);

// ## for displays

// <- Data Table settings ->
const data_TableData = ref(d_td) // or  [1, 2, 3, 4]
const limit_DataTable = ref(10)
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
  switch (item) {
    case "":
      return {
        color: "#F3654A",
        backgroundColor: "#F3654A33",
      }

    case "Completed":
      return {
        color: "#FFB536",
        backgroundColor: "#FFB53633",
      }

    case "PAYMENT":
      return {
        color: "#FFB536",
        backgroundColor: "#FFB53633",
      }

    case "Live":
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

// ## for displays
// const SideBarVisible = ref(false)

// ---------------------------------------------------------------
// # Setup Validation

// ---------------------------------------------------------------
// Functions For design

// ---------------------------------------------------------------
// Watch's for For design

// ---------------------------------------------------------------
// API Integration

// ## sets variables integrations
const cards_list = ref([]);

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

  return GetFreeDrawList({
    match_values: {
      type: ["Free Draw"],
    },
    // sortBy: "createdAt",
    limit: dd_RowsPerPage.value,
    page: page_DataTable.value,
  })
}

// handleData for display data from api
const handleData = (data) => {
  if (data == undefined){
    return undefined
  }

  // Example
  totalRecords_DataTable.value = data?.totalResults;
  data_TableData.value = data?.results?.map((item)=>(
    {   
        _id:item.id,
        draw_id:item.code,
        draw_name: item.draw_name,
        draw_due_date: moment(item.draw_date).format("DD MMM YYYY"),
        ticket_sold: item.sold,
        status: item.status
    }
  ))

  // handling cards
  cards_list.value = data?.headerCount

}

// <- call api ->

const onAPI_call = () => {
  // !props.disableApi && Object.keys(container_Data.value).length === 0
  // we can add try catch for this
  if (!props.disableApi) {
    handleApi().then((res) => {
        handleData(res);
      });
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
})
</script>

<style lang="scss">
// my styling
</style>

<style lang="scss">
.p-datatable .p-column-header-content {
  display: flex;
  align-items: center;
  justify-content: center;
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
</style>
