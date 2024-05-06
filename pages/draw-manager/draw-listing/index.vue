<template>
  <div v-if="newDraw" class="card mt-0 new-draw">
    <div class="flex justify-content-between">
      <h4
        class="flex align-items-center font-bold cursor-pointer"
        @click="newDraw = false"
      >
        <i class="pi pi-arrow-left mr-2"></i>
        Create New Order Draw
      </h4>
      <div>
        <Button
          outlined
          severity="warning"
          @click="
            () => {
              newDraw = false
              let keys = Object.keys(newDrawData)

              keys.forEach((key) => {
                newDrawData[key] = null
              })
            }
          "
          >Cancel</Button
        >
        <Button
          outlined
          @click="saveDrawDetails('Draft')"
          :class="`ml-2 ${
            newDrawData.draw_name == '' ||
            newDrawData.prize_1 == '' ||
            newDrawData.prize_2 == '' ||
            newDrawData.prize_3 == '' ||
            selectedProduct == '' ||
            new_draw_date == '' ||
            files.length == 0
              ? 'disabled-btn'
              : ''
          }`"
          >Save as Draft</Button
        >
        <Button
          @click="saveDrawDetails('Live')"
          :class="`ml-2 ${
            newDrawData.draw_name == '' ||
            newDrawData.prize_1 == '' ||
            newDrawData.prize_2 == '' ||
            newDrawData.prize_3 == '' ||
            selectedProduct == '' ||
            new_draw_date == '' ||
            files.length == 0
              ? 'disabled-btn'
              : ''
          }`"
          >Save & Publish</Button
        >
      </div>
    </div>
    <h6 class="font-Bolder mt-5 ml-3">CUSTOMER DETAILS</h6>
    <div class="grid">
      <div class="col-9">
        <div class="grid">
          <div class="col-12 md:col-6 mb-2">
            <div class="grid">
              <div class="col-12 md:col-6 mb-2">
                <div class="flex flex-column">
                  <label for="drawName" class="label">Draw Name</label>
                  <InputText
                    id="drawName"
                    v-model="newDrawData.draw_name"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="col-12 mb-2">
                <div class="flex flex-column">
                  <label class="label">Description</label>
                  <Textarea
                    v-model="newDrawData.description"
                    rows="6"
                    cols="30"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 md:col-6 mb-2">
            <div class="flex flex-column h-full">
              <label for="drawName" class="label">Draw Card Banner Image</label>
              <UploadFile
                v-model="files"
                :multiple="false"
                v-on:update:modelValue="uploadFile"
              />
            </div>
          </div>
          <div class="col-12 md:col-3 mb-2">
            <div class="flex flex-column">
              <label for="winnerPercentage" class="label"
                >Enter Winner Percentage</label
              >
              <InputNumber
                id="winnerPercentage"
                v-model="newDrawData.winner_percentage"
                class="form-control"
                :min="0"
                :max="99"
                suffix=" %"
              />
            </div>
          </div>
          <div class="col-12 md:col-3 mb-2">
            <div class="flex flex-column">
              <label for="firstPrize" class="label">1st Prize Amount</label>
              <InputNumber
                id="firstPrize"
                v-model="newDrawData.prize_1"
                class="form-control"
                mode="currency"
                currency="AED"
                locale="de-DE"
              />
            </div>
          </div>
          <div class="col-12 md:col-3 mb-2">
            <div class="flex flex-column">
              <label for="secondePrize" class="label">2nd Prize Amount</label>
              <InputNumber
                id="secondePrize"
                v-model="newDrawData.prize_2"
                class="form-control"
                mode="currency"
                currency="AED"
                locale="de-DE"
              />
            </div>
          </div>
          <div class="col-12 md:col-3 mb-2">
            <div class="flex flex-column">
              <label for="thirdPrize" class="label">3rd Prize Amount</label>
              <InputNumber
                id="thirdPrize"
                v-model="newDrawData.prize_3"
                class="form-control"
                mode="currency"
                currency="AED"
                locale="de-DE"
              />
            </div>
          </div>
          <div class="col-12 md:col-5 mb-2">
            <div class="flex flex-column">
              <label for="customerName" class="label font-Bolder"
                >SELECT PRODUCT</label
              >
              <Dropdown
                v-model="selectedProduct"
                :options="products"
                optionLabel="name"
                placeholder="Select a Product"
                class="w-full form-control"
              >
              </Dropdown>
            </div>
          </div>
          <div class="col-12 mb-2">
            <div class="grid">
              <div class="col-12 md:col-3 mb-2">
                <div class="flex flex-column">
                  <label for="threshold" class="label">Threshold</label>
                  <InputNumber
                    id="threshold"
                    v-model="newDrawData.threshold"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="col-12 md:col-3 mb-2">
                <div class="flex flex-column">
                  <label for="date" class="label">Draw Date</label>
                  <DatePicker
                    v-model="new_draw_date"
                    dateFormat="dd/mm/yy"
                    name="date"
                    showIcon
                    placeholder="Select Date"
                    class="custom__inner_date_picker form-control"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <drawDetails
    v-if="editDraw"
    :draw_data="draw_id_data"
    type="edit"
    @close="
      () => {
        editDraw = false
        refetchDrawList()
      }
    "
  />
  <drawDetails
    v-if="viewDraw"
    :draw_data="draw_id_data"
    type="view"
    @close="
      () => {
        viewDraw = false
        refetchDrawList()
      }
    "
  />
  <div v-if="!editDraw & !newDraw & !viewDraw" class="card mt-0">
    <div class="draw-list">
      <div class="flex justify-content-between mb-5">
        <div>
          <Button
            class="mr-2"
            :class="{ active: activeFilter === 'all' }"
            outlined
            @click="filterDrawList('all')"
            >All Draws</Button
          >
          <Button
            class="mr-2"
            :class="{ active: activeFilter === 'Draft' }"
            outlined
            @click="filterDrawList('Draft')"
            >Draft Draw</Button
          >
          <Button
            class="mr-2"
            :class="{ active: activeFilter === 'Live' }"
            outlined
            @click="filterDrawList('Live')"
            >Live Draw</Button
          >
        </div>
        <!-- <Button
          label="New Draw"
          icon="pi pi-plus"
          @click="newDraw = true"
        ></Button> -->

        <nuxt-link to="/draw-manager/draw-listing/SaveDraw">
          <Button label="New Draw" icon="pi pi-plus"></Button>
        </nuxt-link>
      </div>
      <DataTable
        class="DataTable"
        stripedRows
        :value="draw_data?.results"
        tableStyle="min-width: 30rem"
      >
        <Column header="Draw ID" field="code" style="color: black"></Column>
        <Column header="Product Name" style="color: black">
          <template #body="slotProps">
            <span>
              {{ slotProps.data.draw_name }}
            </span>
          </template>
        </Column>

        <!-- <Column header="Draw Due Date" style="color: black">
          <template #body="slotProps">
            <span>
              {{ formatDate(slotProps.data.draw_date, "dd MM yyyy") }}
            </span>
          </template>
        </Column> -->
        <!-- <Column header="Ticket Sold" field="sold" style="color: black">
        </Column> -->
        <Column header="Threshold" style="color: black; width: 20%">
          <template #body="slotProps">
            <div class="progress flex align-items-end gap-1 flex-column">
              <p>{{ slotProps.data.sold }} / {{ slotProps.data.threshold }}</p>
              <div class="progress_bar flex">
                <span
                  :style="{
                    width:
                      (slotProps.data.sold * 100) / slotProps.data.threshold +
                      '%',
                    backgroundColor: '#1593F9',
                  }"
                ></span>
              </div>
            </div>
          </template>
        </Column>
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
              :style="getSeverity(slotProps.data)"
            />
          </template>
        </Column>

        <Column header="Action" field="actions" style="color: black">
          <template #body="slotProps">
            <Button
              v-if="slotProps.data.status == 'Draft'"
              class="p-2 font-size-small"
              link
              @click="makeItLive(slotProps.data._id)"
              style="
                transform: translate(-13px, 0px);
                text-decoration: underline;
              "
              >Make it Live</Button
            >
            <Button
              class="p-2 font-size-small"
              link
              @click="
                $router.push(
                  `/draw-manager/draw-listing/SaveDraw?_id=${slotProps.data.id}`
                )
              "
              style="
                transform: translate(-13px, 0px);
                text-decoration: underline;
              "
              >Edit</Button
            >

            <Button
              class="p-2 font-size-small"
              link
              @click="
                slotProps.data.status == 'Draft'
                  ? showDrawDetails('view', slotProps.data.id)
                  : $router.push(
                      `/draw-manager/draw-listing/view_with_details?_id=${slotProps.data.id}`
                    )
              "
              style="
                transform: translate(-13px, 0px);
                text-decoration: underline;
              "
              >View</Button
            >
          </template>
        </Column>
      </DataTable>

      <div class="grid">
        <div class="col">
          <!-- totalPages{{ totalPages }} -->
          <Paginator
            class="Paginator"
            :rows="limit"
            :totalRecords="totalPages"
            @page="changePage"
          >
          </Paginator>
        </div>

        <div class="col flex align-items-center justify-content-end">
          <span class="gray_text mr-2">Rows per page:</span>
          <Dropdown
            v-model="dd_RowsPerPage"
            :options="dd_RowsPerPage_items"
            class="w-full md:w-5rem"
            @change="selectLimit"
          />
        </div>
      </div>
    </div>
    <Toast />
  </div>
</template>

<script setup>
import { useQuery } from "@tanstack/vue-query"
import { getDrawList } from "@/services/draw-manager.ts"
import drawDetails from "./drawDetails"
import moment from "moment-timezone"
import { useToast } from "primevue/usetoast"
// definePageMeta({
//   layout: "draw-manager",
// })

const toast = useToast()
const activeFilter = ref("all")
//pagination draw list
const page = ref(1)
const totalPages = ref(1)
const limit = ref(10)

const drawListPayload = ref({
  page: page.value,
  limit: limit.value,
  match_values: {
    type: "Order Draw",
  },
})
const filterDrawList = (val) => {
  activeFilter.value = val
  if (val != "all") {
    drawListPayload.value = {
      ...drawListPayload.value,
      match_values: {
        type: "Order Draw",
        status: val,
      },
    }
  } else {
    drawListPayload.value = {
      ...drawListPayload.value,
      match_values: { type: "Order Draw" },
    }
  }
  refetchDrawList()
}
const {
  // suspense,
  isPreviousData,
  refetch: refetchDrawList,
  data: draw_data,
  isLoading: activities_loading,
  failureReason,
} = useQuery({
  queryKey: ["draw_list", page],
  queryFn: () => getDrawList(drawListPayload.value),
  keepPreviousData: true,
  suspense: true,
})

watch(draw_data, (newVal) => {
  totalPages.value = newVal?.totalResults
})
const changePage = (paramPage) => {
  page.value = paramPage.page + 1
}
watch(page, (newVal) => {
  drawListPayload.value = {
    ...drawListPayload.value,
    page: newVal,
  }
})
watch(limit, (newVal) => {
  drawListPayload.value = {
    ...drawListPayload.value,
    limit: newVal,
  }
  refetchDrawList()
})

const getSeverity = (data) => {
  switch (data?.status) {
    case "Live":
      return {
        color: "#1AD598",
        backgroundColor: "#D1F7EA",
      }

    case "Draft":
      return {
        color: "#FFB536",
        backgroundColor: "#FFF0D6",
      }
    default:
      return null
  }
}

const dd_RowsPerPage = ref(limit)
const dd_RowsPerPage_items = ref([dd_RowsPerPage.value, 20, 30])
const selectLimit = () => {
  limit.value = dd_RowsPerPage.value
}
const newDraw = ref(false)
const editDraw = ref(false)
const viewDraw = ref(false)

const selectedProduct = ref("")
const products = ref("")

const getProductsList = async () => {
  const { data } = await useMyFetch(`/admin/product/list_product`, {
    method: "POST",
  })
  products.value = data.value.results
}
const newDrawData = ref({
  draw_name: "",
  description: "",
  winner_percentage: 0,
  prize_1: 0,
  prize_2: 0,
  prize_3: 0,
  threshold: 0,
  status: "",
  draw_date: "",
  image_url: "",
  product_id: "",
})

let clampedWinnerPercentage = computed({
  get: () => newDrawData.value.winner_percentage,
  set: (value) => {
    if (value > 99) {
      newDrawData.value.winner_percentage = 99
    } else {
      newDrawData.value.winner_percentage = value
    }
  },
})

const new_draw_date = ref("")
const saveDrawDetails = async (val) => {
  const payload = {
    ...newDrawData.value,
    product_id: selectedProduct.value.id,
    draw_date: moment(new_draw_date.value).format("YYYY-MM-DD"),
    status: val,
    image_url: imageUrl.value,
  }
  const { response, error } = await useMyFetch(`/admin/draw/create_draw`, {
    method: "POST",
    body: payload,
  })

  if (error.value == null) {
    toast.add({
      severity: "success",
      summary: "Draw Save successfully",
      detail: "",
      life: 2000,
    })
    setTimeout(() => {
      newDraw.value = false
      refetchDrawList()
    }, 2000)
    newDrawData.value = {
      draw_name: "",
      description: "",
      winner_percentage: 0,
      prize_1: 0,
      prize_2: 0,
      prize_3: 0,
      threshold: 0,
      status: "",
      draw_date: "",
      image_url: "",
      product_id: "",
    }
    new_draw_date.value = ""
  } else {
    toast.add({
      severity: "error",
      summary: error.value.data.message,
      detail: error.value.data.details,
      life: 3000,
    })
  }
}
onMounted(() => {
  getProductsList()
  totalPages.value = draw_data.value?.totalPages
})
const imageUrl = ref("")
const files = ref([])
const uploadFile = async () => {
  const formData = new FormData()
  formData.append("file", files.value[0], files.value[0].name)
  try {
    const { data } = await useMyFetch(`/admin/user/upload_file`, {
      method: "POST",
      body: formData,
    })
    imageUrl.value = data.value.data[0].url
  } catch (err) {
    console.log("error Response:", err)
  }
}

const draw_id_data = ref([])

const getDrawDetails = async (id) => {
  try {
    const { data } = await useMyFetch(`/admin/draw/${id}`)
    draw_id_data.value = data.value
  } catch (err) {
    console.log("error Response:", err)
  }
}
const makeItLive = async (id) => {
  let payload = {
    status: "Live",
  }
  try {
    const { response, error } = await useMyFetch(`/admin/draw/${id}`, {
      method: "PUT",
      body: payload,
    })
    if (error.value == null) {
      draw_id_data.value = data.value
      toast.add({
        severity: "success",
        summary: "Draw is Live",
        detail: "",
        life: 2000,
      })
      setTimeout(() => {
        refetchDrawList()
      }, 1000)
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
const showDrawDetails = async (val, id) => {
  if (val === "edit") {
    editDraw.value = true
  } else {
    viewDraw.value = true
  }
  await getDrawDetails(id)
}

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
</script>
<style lang="scss">
.progress {
  width: 80%;
  p {
    color: #4d4d4dc3;
  }
}
.progress_bar {
  position: relative;
  height: 9px;
  width: 100%;
  border-radius: 8px;
  border: 0.1px solid #1593f9;
  span {
    position: absolute;
    left: 0;
    height: 100%;
    border-radius: 8px;
  }
}
.active {
  background-color: #0a94ff !important;
  color: #fff !important;
}
.Paginator {
  .p-paginator {
    justify-content: start;
  }
}
.new-draw {
  .upload_file__custom .p-fileupload {
    height: 13rem;
  }
}
.draw-list,
.draw-details {
  .p-datatable .p-column-header-content {
    justify-content: flex-start;
  }
}
</style>
