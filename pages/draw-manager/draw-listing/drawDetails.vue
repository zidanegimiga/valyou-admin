<template>
  <div class="card mt-0 draw-details">
    <div class="flex justify-content-between">
      <h4 class="flex align-items-center font-bold">
        <i
          class="pi pi-arrow-left mr-2 cursor-pointer"
          @click="backToDrawList"
        ></i>
        {{ draw_data.draw_name }}
      </h4>
      <Button v-if="type === 'edit'" @click="updateDraw">Save</Button>
    </div>
    <div>
      <h6 class="font-extraBold mt-4">DRAW DETAILS</h6>
      <div class="grid draw-details">
        <div class="col-12 md:col-6 p-0">
          <div class="flex">
            <span class="head">Draw ID</span>
            <InputText
              v-model="draw_data.code"
              class="form-control value"
              disabled
            />
          </div>
          <!-- <div class="flex">
            <span class="head">Draw Due Date</span>
            <DatePicker
              v-model="draw_date"
              dateFormat="dd M yy"
              name="date"
              placeholder="Select Date"
              class="custom__inner_date_picker form-control value"
              :disabled="type === 'view'"
            />
          </div> -->
          <div class="flex">
            <span class="head">Tickets Sold</span>
            <InputNumber
              v-model="draw_data.sold"
              class="form-control value"
              disabled
            />
          </div>
          <div class="flex">
            <span class="head">Second Prize Amount</span>
            <InputNumber
              v-model="draw_data.prize_2"
              class="form-control value"
              mode="currency"
              currency="AED"
              :disabled="type === 'view'"
            />
          </div>
        </div>
        <div class="col-12 md:col-6 p-0">
          <div class="flex">
            <span class="head">Product Name</span>
            <InputText
              v-model="draw_data.draw_name"
              class="form-control value"
              :disabled="type === 'view'"
            />
          </div>
          <div class="flex">
            <span class="head">Threshold</span>
            <InputNumber
              v-model="draw_data.threshold"
              class="form-control value"
              :disabled="type === 'view'"
            />
          </div>
          <div class="flex">
            <span class="head">First Prize Amount</span>
            <InputNumber
              v-model="draw_data.prize_1"
              class="form-control value"
              mode="currency"
              currency="AED"
              :disabled="type === 'view'"
            />
          </div>
          <div class="flex">
            <span class="head">Third Prize Amount</span>
            <InputNumber
              v-model="draw_data.prize_3"
              class="form-control value"
              mode="currency"
              currency="AED"
              :disabled="type === 'view'"
            />
          </div>
        </div>
      </div>
      <div
        class="p-3 mt-5"
        v-if="draw_data.product_list"
        style="border: 1px solid #ced6e3; border-radius: 15px"
      >
        <h4 class="font-bold mb-2">Product</h4>
        <DataTable
          class="DataTable"
          :value="[draw_data]"
          tableStyle="min-width: 30rem"
        >
          <Column header="Product Name" style="color: black">
            <template #body="slotProps">
              <div class="flex align-items-center">
                <img
                  class="mr-4"
                  :src="slotProps.data.product_list?.image_urls[0]"
                  style="width: 40px"
                  alt=""
                />
                <span>{{ slotProps.data.product_list?.name.en }}</span>
              </div>
            </template>
          </Column>
          <Column header="Threshold" style="color: black">
            <template #body="slotProps">
              <span>{{ slotProps.data.threshold }}</span>
            </template>
          </Column>

          <!-- <Column header="Expected Draw Date" style="color: black">
            <template #body="slotProps">
              <span>{{
                moment(slotProps.data.draw_date).format("DD/MM/YYYY")
              }}</span>
            </template>
          </Column> -->

          <Column header="Status">
            <template #body="slotProps">
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
                :style="getSeverity(draw_data)"
              />
            </template>
          </Column>
        </DataTable>
      </div>
      <!-- <div
        class="p-3 mt-3"
        style="border: 1px solid #ced6e3; border-radius: 15px"
      >
        <h4 class="font-bold mb-2">Participant List</h4>
        <div class="wrapper-row w-full gap-3">
          <div class="item" style="flex: 1.24">
            <DataTable
              class="DataTable"
              :value="participant_list_data"
              tableStyle="min-width: 30rem"
            >
              <Column
                header="Participant ID"
                field="code"
                style="color: black"
              ></Column>
              <Column
                header="Participant Name"
                field="name"
                style="color: black"
              ></Column>
              <Column
                header="No of Participated Draws"
                field="participated_draws"
                style="color: black"
              >
              </Column>
              <Column
                header="Tickets Hold"
                field="tickets_hold"
                style="color: black"
              >
              </Column> -->
      <!-- <Column header="Status">
                <template #body="slotProps">
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
              </Column> -->

      <!-- <Column header="Actions" class="text-center">
                <template #body="slotProps">
                  <div class="w-full text-center">
                    <Button
                      class="p-2 font-size-small"
                      link
                      style="
                        transform: translate(0px, 0px);
                        text-decoration: underline;
                      "
                      @click=""
                      >View Details</Button
                    >
                  </div>
                </template>
              </Column> -->
      <!-- </DataTable>
            <div class="wrapper-row">
              <div class="item expand ml-2">
                <Paginator
                  class="Paginator"
                  :rows="limit_DataTable"
                  :first="1"
                  :totalRecords="totalRecords_DataTable"
                  @page="changePage"
                  :pageLinkSize="4"
                  :alwaysShow="true"
                ></Paginator>
              </div>

              <div class="item flex align-items-center justify-content-end">
                <span class="gray_text mr-2">Rows per page:</span>
                <Dropdown
                  v-model="dd_RowsPerPage"
                  :options="dd_RowsPerPage_items"
                  class="w-full md:w-5rem"
                />
              </div>
            </div>
          </div>
          <div class="item" style="flex: 1">
            <div
              class="surface-ground h-full"
              style="border: 1px solid #efefef; border-radius: 10px"
            >
              <div class="grid">
                <div class="col-12" style=""></div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <Toast />
  </div>
</template>

<script setup>
import { useToast } from "primevue/usetoast"
import moment from "moment-timezone"
const props = defineProps({
  draw_data: Object,
  type: String,
})

const toast = useToast()
const emits = defineEmits(["close"])

const updateDrawData = ref({
  draw_name: props.draw_data.draw_name,
  prize_1: props.draw_data.prize_1,
  prize_2: props.draw_data.prize_2,
  prize_3: props.draw_data.prize_3,
  threshold: props.draw_data.threshold,
  draw_date: props.draw_data.draw_date,
  // sold: props.draw_data.sold,
})

watch(props.draw_data, (newVal) => {
  updateDrawData.value = {
    draw_name: newVal.draw_name,
    prize_1: newVal.prize_1,
    prize_2: newVal.prize_2,
    prize_3: newVal.prize_3,
    threshold: newVal.threshold,
    draw_date: newVal.draw_date,
    // sold: newVal.sold,
  }
})

function formatDate(dateString, format) {
  let date = new Date(dateString)
  let day = date.getDate().toString().padStart(2, "0")
  let month = (date.getMonth() + 1).toString().padStart(2, "0") // Months are zero based
  let year = date.getFullYear()

  // Define months array for converting numeric month to string
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  // Determine the delimiter based on the format string
  let delimiter = format.includes("/") ? "/" : format.includes("-") ? "-" : " "

  // Split the format string into components
  let formatComponents = format.split(delimiter)

  // Create a new date string based on the format
  let formattedDate = formatComponents
    .map((component) => {
      switch (component) {
        case "dd":
          return day
        case "mm":
          return month
        case "MM":
          return months[date.getMonth()]
        case "yyyy":
        case "YYYY":
          return year
        default:
          return component // Return the original component if it's not recognized
      }
    })
    .join(delimiter)

  return formattedDate
}

const draw_date = ref("im date")

// draw_date.value = moment(props.draw_data.draw_date).format("DD MMM YYYY")

const backToDrawList = () => {
  emits("close")
}
const updateDraw = async () => {
  try {
    const { data, error } = await useMyFetch(
      `/admin/draw/${props.draw_data._id}`,
      {
        method: "PUT",
        body: {
          draw_name: props.draw_data.draw_name,
          prize_1: props.draw_data.prize_1,
          prize_2: props.draw_data.prize_2,
          prize_3: props.draw_data.prize_3,
          threshold: props.draw_data.threshold,
          draw_date: props.draw_data.draw_date,
        },
      }
    )
    if (error.value == null) {
      toast.add({
        severity: "success",
        summary: "Draw Save successfully",
        detail: "",
        life: 2000,
      })
      setTimeout(() => {
        emits("close")
      }, 2000)
    } else {
      toast.add({
        severity: "error",
        summary: error.value.data.message,
        detail: error.value.data.details,
        life: 3000,
      })
    }
  } catch (err) {
    console.log("error Response:", err)
  }
}

const getSeverity = (data) => {
  switch (data?.status) {
    case "Live":
    case "Active":
      return {
        color: "#1AD598",
        backgroundColor: "#D1F7EA",
      }

    case "Draft":
    case "Inactive":
      return {
        color: "#FFB536",
        backgroundColor: "#FFF0D6",
      }
    default:
      return null
  }
}

const participant_list_data = ref([
  {
    code: "P-001",
    name: "Stephen Paul",
    participated_draws: 12,
    tickets_hold: 23,
    status: "Active",
  },
  {
    code: "P-002",
    name: "John Smith",
    participated_draws: 2,
    tickets_hold: 66,
    status: "Inactive",
  },
])

// ------------------------------------- AHMAD CODE PLACE -------------------------------------------

// Data Table
const data_TableData = ref([])
const limit_DataTable = ref(5)
const page_DataTable = ref(1)
const totalRecords_DataTable = ref(100)
const first = ref(1)

const dd_RowsPerPage = ref(limit_DataTable.value)
const dd_RowsPerPage_items = ref([dd_RowsPerPage.value, 10, 20, 30])

const changePage = (paramPage) => {
  page_DataTable.value = paramPage.page + 1
}

onMounted(async () => {
  setTimeout(() => {
    draw_date.value = formatDate(props.draw_data.draw_date, "dd MM yyyy")
    console.log("props.draw_data.draw_date:", draw_date.value)
  }, 100)
})
</script>

<style lang="scss">
.draw-details {
  & > div {
    & > div {
      padding-top: 0.7rem;
      border-bottom: 1px solid #ced6e3;
    }
  }
  .head {
    display: inline-block;
    min-width: 50%;
    padding: 0.5rem 0 1.2rem;
    color: #8d98a9;
  }
  .value {
    min-height: auto;
    border: none !important;
    font-weight: 900 !important;
    color: #000 !important;
    font-size: 0.8rem !important;
    background-color: #fff !important;
    opacity: 1 !important;
    .p-inputtext {
      border: none !important;
      color: #000 !important;
      opacity: 1 !important;
      font-weight: 900 !important;
      background: #fff !important;
    }
  }
}
.p-column-title {
  padding: 0 0.5rem !important;
  font-weight: 900 !important;
  font-size: 0.7rem !important;
}
</style>
