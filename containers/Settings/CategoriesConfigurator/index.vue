<template lang="">
  <div class="wrapper-column" v-if="CategoriesConfigurator == 'main'">
    <!-- Header & button -->
    <div class="item">
      <div class="wrapper-row align-items-center">
        <div class="item expand">
          <h4 class="font-bold">Categories Configurator</h4>
        </div>
        <div class="item">
          <Button
            icon="pi pi-plus"
            label="Add New"
            @click="CategoriesConfigurator = 'new'"
          />
        </div>
      </div>
    </div>
    <!-- Content none-->
    <div
      v-if="categories_list.length == 0"
      class="mt-3 item expand overflow-y-auto"
    >
      <div
        class="flex h-full w-full flex-column align-items-center justify-content-center"
      >
        <div class="card p-4" style="background: #f4f6f8; border-radius: 5px">
          <div class="wrapper-column gap-2">
            <div class="item">
              <h5 class="font-bold">Categories Configurator not available</h5>
            </div>
            <div class="item">
              <h5 class="font-bold gray_text">
                There is no Categories Configurator yet.
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content data-->
    <div v-else class="mt-3 item expand overflow-y-auto">
      <div class="wrapper-column">
        <div class="item expand overflow-y-auto">
          <div class="mb-3 autocomplete-input">
            <h6 class="mb-2 font-bold">Category</h6>
            <div class="flex">
              <AutoComplete
                v-model="category"
                dropdown
                :suggestions="categories"
                :completeOnFocus="true"
                @complete="search_categories"
                @item-select="handleCategorySelect"
                placeholder="Select category"
              />
              <Button
                outlined
                icon="pi pi-pencil"
                class="mx-1 edit"
                @click="handleEdit('category')"
                :disabled="category && !categories.includes(category)"
              ></Button>
            </div>
            <!-- <small
              v-if="!selectedCategory"
              class="p-error p-min-error"
            >
              Please select from the suggestions.
            </small> -->
          </div>
          <div class="mb-3 autocomplete-input">
            <h6 class="mb-2 font-bold">Sub Category</h6>
            <div class="flex">
              <AutoComplete
                v-model="sub_category"
                dropdown
                :suggestions="sub_categories"
                @complete="sub_categories_search"
                :completeOnFocus="true"
                :disabled="!selectedCategory"
                @item-select="handleSubCategorySelect"
                placeholder="Select sub category"
              />
              <Button
                outlined
                icon="pi pi-pencil"
                class="mx-1 edit"
                :disabled="
                  sub_category && !sub_categories.includes(sub_category)
                "
                @click="handleEdit('sub_category')"
              ></Button>
            </div>
            <!-- <small
              v-if="sub_category && !sub_categories.includes(sub_category)"
              class="p-error p-min-error"
            >
              Please select from the suggestions.
            </small> -->
          </div>
          <div class="mb-3 autocomplete-input">
            <h6 class="mb-2 font-bold">Type</h6>
            <div class="flex">
              <AutoComplete
                v-model="type"
                dropdown
                :suggestions="types"
                @complete="types_search"
                :completeOnFocus="true"
                :disabled="selectedSubCategory.length == 0"
                @item-select="handleTypeSelect"
                placeholder="Select type"
              />
              <Button
                outlined
                icon="pi pi-pencil"
                class="mx-1 edit"
                :disabled="type && !types.includes(type)"
                @click="handleEdit('type')"
              ></Button>
            </div>
            <!-- <small
              v-if="type && !types.includes(type)"
              class="p-error p-min-error"
            >
              Please select from the suggestions.
            </small> -->
          </div>
          <div v-if="type && types.includes(type)">
            <!-- Put Datable Component -->
            <PrimeUpdateDataTable
              class="DataTable overflow-visible"
              wrapper_class="pr-2"
              stripedRows
              resizableColumns
              columnResizeMode="fit"
              showGridline
              :value="sub_types_list"
              :rows="limit_DataTable"
              tableStyle="min-width: 30rem"
            >
              <Column field="sub_type" header="Sub Type" class="text-center">
                <template #body="slotProps">
                  <p>{{ slotProps.data.subtype_name }}</p>
                </template>
              </Column>

              <Column field="variant" header="Variant" class="text-center">
                <template #body="slotProps">
                  <h6
                    class="inline-block pl-1"
                    v-for="(item, index) in slotProps.data.variant"
                    :key="index"
                  >
                    {{ item }}
                    {{ index != slotProps.data.variant.length - 1 ? "," : "" }}
                  </h6>
                </template>
              </Column>

              <Column field="" header="Actions" class="text-center">
                <template #body="slotProps">
                  <div class="w-full text-center">
                    <Button
                      class="p-2 font-size-small"
                      link
                      style="
                        transform: translate(0px, 0px);
                        text-decoration: underline;
                      "
                      @click="handleEditSubType(slotProps.data)"
                      >Edit</Button
                    >
                  </div>
                </template>
              </Column>
            </PrimeUpdateDataTable>
          </div>
        </div>
      </div>
    </div>
    <Dialog
      v-model:visible="visible"
      modal
      header="Enter New Name"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <CustomInputContainer label="" class="w-full">
        <template v-slot>
          <InputText v-if="Name == 'category'" v-model="category" type="text" />
          <InputText
            v-if="Name == 'sub_category'"
            v-model="sub_category"
            type="text"
          />
          <InputText v-if="Name == 'type'" v-model="type" type="text" />
        </template>
      </CustomInputContainer>
      <Button
        @click="updateName()"
        icon="pi pi-check"
        label="Update"
        :disabled="
          Name == 'category'
            ? !category
            : Name == 'sub_category'
            ? !sub_category
            : !type
        "
        class="mt-4"
      ></Button>
    </Dialog>
  </div>
  <Save
    v-else
    :editData="editData"
    :edit="CategoriesConfigurator == 'edit' ? true : false"
    @close="closeForm"
    :categories_list="categories_list"
  ></Save>
</template>
<script setup>
import { useToast } from "primevue/usetoast"
import Save from "./save.vue"

const toast = useToast()
const router = useRouter()
const route = useRoute()
const addToastMessage = (severity, summary, detail) => {
  toast.add({
    severity,
    summary,
    detail,
    life: 3000,
  })
}

const CategoriesConfigurator = ref("main")

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
const selectedSubType = ref({})
const variants = ref([])
const brands = ref([])
const manufacturer = ref([])

const emit = defineEmits(["update:data"])

const closeForm = async () => {
  CategoriesConfigurator.value = "main"
  category.value = ""
  sub_category.value = ""
  type.value = ""
  categoryList()
  // sub_types_list.value = await subTypeList(
  //   selectedSubCategory.value[0].sub_category_id,
  //   selectedType.value[0].type_id
  // )
}
//categories
const categories_list = ref([])
const category = ref("")
const categories = ref([])

const search_categories = (event) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      categories.value = categories_list.value.map((item) => item.name)
    } else {
      let data = categories_list.value.filter((item) => {
        return item.name.toLowerCase().startsWith(event.query.toLowerCase())
      })
      categories.value = data.map((item) => item.name)
    }
    if (categories.value.length == 0) {
      selectedSubCategory.value = []
      sub_categories_list.value = []
      sub_category.value = ""
      selectedType.value = []
      types_list.value = []
      type.value = ""
    }
  }, 250)
}
const categoryList = async () => {
  try {
    const response = await useMyFetch(
      `/admin/product_category/get_category_names`
    )
    categories_list.value = response.data.value
  } catch (err) {
    console.log("error Response:", err)
  }
}

//sub categories
const sub_categories_list = ref([])
const sub_category = ref("")
const sub_categories = ref([])

const sub_categories_search = (event) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      sub_categories.value = sub_categories_list.value.map(
        (item) => item.subcategory_name
      )
    } else {
      let data = sub_categories_list.value.filter((item) => {
        return item.subcategory_name
          .toLowerCase()
          .startsWith(event.query.toLowerCase())
      })
      sub_categories.value = data.map((item) => item.subcategory_name)
      if (sub_categories.value.length == 0) {
        selectedType.value = []
        types_list.value = []
        type.value = ""
      }
    }
  }, 250)
}
const subCategoryList = async (id) => {
  try {
    const response = await useMyFetch(
      `/admin/product_category/list_subcategory/${id}`
    )
    return response.data.value.data
  } catch (err) {
    console.log("error Response:", err)
  }
}

const selectedCategory = ref("")
const handleCategorySelect = async () => {
  selectedCategory.value = categories_list.value.filter(
    (item) => item.name == category.value
  )
  sub_categories_list.value = await subCategoryList(
    selectedCategory.value[0].id
  )
  selectedSubCategory.value = []
  selectedType.value = []
  sub_category.value = ""
  type.value = ""

  const brand_man = await getBrands()
  brands.value = brand_man.brand
  manufacturer.value = brand_man.manufacturer
}

const visible = ref(false)
const Name = ref("")

let payload = {}
const handleEdit = async (value) => {
  visible.value = true
  Name.value = value
}
const updateName = async () => {
  if (Name.value == "category") {
    payload = {
      category_id: selectedCategory.value[0].id,
      category_name: category.value,
    }
  } else if (Name.value == "sub_category") {
    payload = {
      category_id: selectedCategory.value[0].id,
      subcategory_id: selectedSubCategory.value[0].sub_category_id,
      subcategory_name: sub_category.value,
    }
  } else if (Name.value == "type") {
    payload = {
      category_id: selectedCategory.value[0].id,
      subcategory_id: selectedSubCategory.value[0].sub_category_id,
      type_id: selectedType.value[0].type_id,
      type_name: type.value,
    }
  }
  try {
    const { status, error } = await useMyFetch(
      `/admin/product_category/edit/category`,
      {
        method: "POST",
        body: payload,
      }
    )
    if (status.value == "success") {
      addToastMessage("success", "Category updated successfully!")
      visible.value = false
      categoryList()
      selectedCategory.value[0].name = category.value
      if (Name.value == "sub_category") {
        selectedSubCategory.value[0].subcategory_name = sub_category.value
      }
      if (Name.value == "type") {
        selectedType.value[0].type_name = type.value
      }
      console.log("selectedCategory", selectedCategory.value)
    } else {
      addToastMessage("error", error.value.data.message)
    }
  } catch (err) {
    console.log("error Response:", err)
  }
}

const selectedSubCategory = ref("")

const handleSubCategorySelect = async () => {
  selectedSubCategory.value = sub_categories_list.value.filter(
    (item) => item.subcategory_name == sub_category.value
  )
  types_list.value = await typeList(
    selectedSubCategory.value[0].sub_category_id
  )
  selectedType.value = []
  type.value = ""
}

const selectedType = ref("")

const handleTypeSelect = async () => {
  selectedType.value = types_list.value.filter(
    (item) => item.type_name == type.value
  )
  sub_types_list.value = await subTypeList(
    selectedSubCategory.value[0].sub_category_id,
    selectedType.value[0].type_id
  )
}

//types
const types_list = ref([])
const type = ref("")
const types = ref([])

const types_search = (event) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      types.value = types_list.value.map((item) => item.type_name)
    } else {
      let data = types_list.value.filter((item) => {
        return item.type_name
          .toLowerCase()
          .startsWith(event.query.toLowerCase())
      })
      types.value = data.map((item) => item.type_name)
    }
  }, 250)
}
const typeList = async (id) => {
  try {
    const response = await useMyFetch(
      `/admin/product_category/list_types/${id}`
    )
    return response.data.value.data
  } catch (err) {
    console.log("error Response:", err)
  }
}

const sub_types_list = ref([])

const subTypeList = async (subCategoryId, typeId) => {
  try {
    let payload = {
      subcategory_id: subCategoryId,
      type_id: typeId,
    }
    const response = await useMyFetch(
      `/admin/product_category/list_subtypes/fetch`,
      {
        method: "POST",
        body: payload,
      }
    )
    return response.data.value.data
  } catch (err) {
    console.log("error Response:", err)
  }
}

const handleEditSubType = async (data) => {
  CategoriesConfigurator.value = "edit"
  selectedSubType.value = {
    sub_type_id: data._id,
    subtype_name: data.subtype_name,
  }
  variants.value = data.variant
}

const getBrands = async () => {
  try {
    const response = await useMyFetch(
      `/admin/product_category/list_brands/${selectedCategory.value[0].id}`
    )
    brands.value = response.data.value.data.brand
    manufacturer.value = response.data.value.data.manufacturer
    return response.data.value.data
  } catch (err) {
    console.log("error Response:", err)
  }
}
const editData = ref({
  category: selectedCategory,
  subcategory: selectedSubCategory,
  type: selectedType,
  variant: variants,
  subtype: selectedSubType,
  brand: brands,
  manufacturer: manufacturer,
})
onMounted(() => {
  categoryList()
})
</script>

<style lang="scss">
.p-datatable .p-column-header-content {
  display: flex;
  align-items: center;
  // justify-content: center;
}
</style>
