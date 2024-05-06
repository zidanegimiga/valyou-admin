<template>
  <div class="w-full relative h-full">
    <div class="item sticky top-0 pb-2 !h-[48px] bg-white" style="z-index: 40;">
      <div class="wrapper-row align-items-center">
        <div class="item expand flex justify-start gap-4 align-center">
          <Dropdown v-model="bannerSource" :options="bannerSourceOptions" @change="handleBannerSourceChange"
            placeholder="Website" class="" />
        </div>
        <div class="item">
          <Button icon="pi pi-plus" label="Add New" @click="handleAddNew" />
        </div>
      </div>
    </div>

    <div class="w-full h-full mt-4">
      <div v-if="banners.length ===  0" class="h-full">
        <div class="flex h-full w-full flex-column align-items-center justify-content-center">
          <div class="card p-4" style="background: #f4f6f8; border-radius: 5px">
            <div class="wrapper-column gap-2">
              <div class="item">
                <h5 class="font-bold text-center">Banners not available</h5>
              </div>
              <div class="item">
                <h5 class="font-bold gray_text text-center">
                  There are no banners added yet.
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <draggable v-else  v-model="banners" handle=".handle" group="people" @start="dragging = true"
        @end="dragging = false" @update="handleBannerQueueChange" item-key="_id">
        <template #item="slotProp">
          <div class="mt-4">
            <div v-if="loadingBanners === false" class="flex items-start justify-between bg-white">
              <div class="flex justify-center gap-0 items-center w-[16px] h-[16px] p-2 handle dragHandle"
                :style="{ cursor: dragging ? 'grabbing' : 'grab' }">
                <i class="pi pi-ellipsis-v" style="color: #c4c4c4; margin-right: -4px"></i>
                <i class="pi pi-ellipsis-v" style="color: #c4c4c4; margin-left: -4px"></i>
              </div>

              <div class="bannerDataContainer">
                <div class="bannerHeader">
                  <div class="font-bold text-sm">
                    {{ slotProp.element.banner_name }}
                  </div>
                  <div class="font-medium text-xs flex items-center justify-between align-items-center">
                    <InputSwitch v-model="slotProp.element.is_active" @change="
                      handleBannerActivityStatusChange(
                        event,
                        slotProp.element
                      )
                      " />
                    <p class="text-sm">Enable/Disable</p>
                  </div>
                </div>
                <div class="w-full px-3 py-2">
                  <div class="flex items-start justify-content-end w-full mt-3">
                    <p class="text-right text-gray-500 text-xs font-medium">
                      Date of Publish
                    </p>
                    <span class="font-bold text-black ml-2 text-xs">
                      {{ dateFormatter(slotProp.element?.createdAt) }}
                    </span>
                  </div>
                  <div class="bannerContainer">
                    <div class="banner" :style="{
                      backgroundImage: `url(${slotProp.element?.image_url})`,
                    }">
                      <div class="bannerLeft">
                        <h2 className="text-white text-4xl font-bold text-wrap banner-title">
                          {{ slotProp.element?.banner_name }}
                        </h2>
                        <p class="text-white font-bold">
                          {{ slotProp.element?.sub_text }}
                        </p>
                        <div class="rect"></div>
                        <div class="bannerButton">
                          {{ slotProp.element?.button_text }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-content-end mt-4 gap-1">
                    <div class="item">
                      <Button @click.prevent="handleEditBanner(event, slotProp.element)">
                        <div class="flex items-center align-center gap-2 justify-center editButton">
                          <img src="/icons/editBanner.svg" class="h-[16px]" />
                          <div class="font-bold h-full flex items-center mt-1">
                            Edit Banner
                          </div>
                        </div>
                      </Button>
                    </div>
                    <div class="item">
                      <Button outlined severity="danger" @click.prevent="deleteBanner(slotProp.element._id)"
                        icon="pi-delete-left"
                        class="font-extraBold w-7rem align-items-center text-center flex justify-content-center">Delete
                        Banner</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else="loadingBanners === true" v-for="(skeleton, idx) in [...Array(10)]" :key="idx" class="mb-4">
              <Skeleton width="100%" height="10rem"></Skeleton>
            </div>
          </div>
        </template>
      </draggable>
      <div ref="trigger" class=""></div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue"
import draggable from "vuedraggable"
import { useToast } from "primevue/usetoast"

const loadingBanners = ref(false)

const toast = useToast()

const emit = defineEmits(["addNew", "editBanner"])

const dragging = ref(false)
const banners = ref([
  {
    banner_name: "",
    banner_source: "",
    createdAt: "",
    createdBy: "",
    image_url: "",
    is_active: false,
    queue_number: 1,
    updatedAt: "",
    _id: "",
  },
])
const oldBanners = ref()
const bannerSource = ref("website")
const bannerSourceOptions = ref(["Website", "Mobile"])
const bannerPagination = ref({
  loading: false,
  currentPage: 2,
  totalBanners: 0,
  limit: 5,
})
const trigger = ref(null)
const triggerOptions = ref({
  root: null,
  threshhold: "0",
})
const triggerObserver = ref(null)

const dateFormatter = (datestring) => {
  const date = new Date(datestring)
  const formattedDate = date.toLocaleDateString()
  return formattedDate
}

async function deleteBanner(id) {
  try {
    const payload = {
      is_deleted: true,
    }

    const response = await useMyFetch(`admin/content/update_content/${id}`, {
      method: "PATCH",
      body: payload,
    })

    if (response.status.value === "success") {
      toast.add({
        severity: "success",
        summary: "Banner deleted successfully",
        detail: "",
        life: 3000,
      })
      getBanners(bannerSource.value.toLowerCase())
    } else {
      toast.add({
        severity: "error",
        summary: "Failed to delete banner",
        detail: "",
        life: 3000,
      })
    }
  } catch (error) {
    console.log(error)
  }
}

const handleBannerSourceChange = async (e) => {
  bannerSource.value = e.value
  bannerPagination.value.currentPage = 2
  bannerPagination.value.totalBanners = 0
  getBanners(e.value?.toLowerCase())
}

const handleBannerActivityStatusChange = async (event, banner) => {
  try {
    const response = await useMyFetch(
      `admin/content/update_content/${banner._id}`,
      {
        method: "PATCH",
        body: {
          is_active: banner.is_active,
        },
      }
    )

    if (response.status.value === "success") {
      toast.add({
        severity: "success",
        summary: "Banner Activity Updated Successfully",
        detail: "",
        life: 2000,
      })
    } else {
      toast.add({
        severity: "error",
        summary: "Failed to update banner status",
        detail: "",
        life: 2000,
      })
    }
  } catch (e) { }
}

const handleBannerQueueChange = async (event) => {
  const body = {
    banner_source: banners.value[event.newIndex].banner_source.toLowerCase(),
    contentId: banners.value[event.newIndex]._id,
    newQueue: oldBanners.value[event.newIndex].queue_number,
    oldQueue: banners.value[event.newIndex].queue_number,
  }

  try {
    const response = await useMyFetch("admin/content/update_queue", {
      method: "POST",
      body,
    })

    if (response.status.value === "success") {
      toast.add({
        severity: "success",
        summary: "Banner queue position updated successfully",
        detail: "",
        life: 3000,
      })
      getBanners(bannerSource.value.toLowerCase())
    } else {
      toast.add({
        severity: "error",
        summary: "Something wrong happened. Please try again",
        detail: "",
        life: 3000,
      })
    }
  } catch (e) {
    console.log(e)
  }
}

const handleAddNew = () => {
  emit("addNew")
}

const handleEditBanner = (event, banner) => {
  emit("editBanner", banner._id)
}

async function getBanners(source) {
  const body = {
    match_values: {
      is_deleted: false,
    },
    match_dates: {},
    sort_object: {},
    datatable_key: "",
    page: 1,
    limit: 5,
    searchText: "",
  }

  if (source === "website" || source === "mobile") {
    body.match_values.banner_source = source
  }
  try {
    loadingBanners.value = true
    const response = await useMyFetch("admin/content/get_content", {
      method: "POST",
      body,
    })
    banners.value = response.data.value.result
    oldBanners.value = response.data.value.result
    bannerPagination.value.totalBanners = response.data.value.total
    loadingBanners.value = false
  } catch (error) {
    console.log(error)
  }
}

async function loadMoreBanners(source) {
  const body = {
    match_values: {
      is_deleted: false,
    },
    match_dates: {},
    sort_object: {},
    datatable_key: "",
    page: bannerPagination.value.currentPage,
    limit: 5,
    searchText: "",
  }

  if (source === "website" || source === "mobile") {
    body.match_values.banner_source = source
  }
  try {
    bannerPagination.value.loading = true

    const response = await useMyFetch("admin/content/get_content", {
      method: "POST",
      body,
    })

    if (response.status.value === "success") {
      oldBanners.value = [...oldBanners.value, ...response.data.value.result]
      banners.value = [...oldBanners.value, ...response.data.value.result]
      bannerPagination.value.totalBanners = response.data.value.total
      bannerPagination.value.currentPage++

      bannerPagination.value.loading = false
    } else {
      console.error("API Error:", response.status.value)
    }
  } catch (e) {
    console.error(e)
  } finally {
    bannerPagination.value.loading = false
  }
}

onMounted(() => {
  getBanners(bannerSource.value)
  triggerObserver.value = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      if (banners.value.length < bannerPagination.value.totalBanners) {
        loadMoreBanners()
      } else {
      }
    }
  }, triggerOptions.value)

  triggerObserver.value?.observe(trigger.value)
})

onBeforeUnmount(() => {
  triggerObserver.value.disconnect()
})
</script>

<style lang="scss">
.bannerDataContainer {
  border: solid 1px #c4c4c4;
  border-radius: 8px;
  width: 100%;
}

.bannerHeader {
  width: 100%;
  border-bottom: #c4c4c4 1px solid;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
}

.banner {
  min-height: 234px;
  background-repeat: no-repeat;
  background-position: right;
  background-size: contain;
  margin-top: 24px;
  width: 100%;
}

.bannerContainer {
  background: url("/images/banner.png");
  background-position: center;
  background-size: cover;
  background-color: #634193;
  width: 100%;
  border-radius: 8px;
  background-repeat: no-repeat;
}

.bannerLeft {
  width: 50%;
  height: 100%;
  padding: 32px;
}

.rect {
  width: 22%;
  background-color: #f59c1e;
  height: 4px;
  border-radius: 4px;
  margin-top: 8px;
}

.bannerButton {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f59c1e;
  width: 40%;
  margin-top: 24px;
  height: 40px;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 500;
}

.editButton {
  z-index: 1;
}

.banner-title {
  font-family: "Lexend Deca", sans-serif;
}
</style>
