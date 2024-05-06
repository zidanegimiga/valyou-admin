<template lang="">
  <div class="wrapper-column">
    <!-- Header & button -->
    <div class="item">
      <div class="wrapper-row align-items-center">
        <div class="item expand">
          <h4 class="font-bold">Categories Configurator</h4>
        </div>
        <div class="item">
          <div class="flex gap-3">
            <Button label="Discard" outlined @click="closeForm" />

            <Button label="Save" @click="Submit_Form" />
          </div>
        </div>
      </div>
    </div>

    <div class="item mt-3 expand overflow-y-auto">
      <div class="grid">
        <div class="col-12 md:col-4">
          <div class="mb-3">
            <h6 class="mb-2 font-bold">Category</h6>
            <div class="autoComplete-input" :class="{ disable: edit }">
              <div class="w-full">
                <AutoComplete
                  v-model="form.inp_Category"
                  :suggestions="categories"
                  @complete="(event) => handleAutoComplete(event, 'category')"
                  placeholder="select or add a value"
                  :completeOnFocus="true"
                  :class="{ 'p-invalid': validationErrors?.inp_Category }"
                  @item-select="handleCategorySelect"
                  emptySearchMessage="No Data Found!"
                />
                <!-- <small v-if="!categories.length" class="p-error p-min-error">
                  No categories found!
                </small> -->
                <small
                  class="p-error p-min-error"
                  v-if="validationErrors?.inp_Category"
                >
                  {{
                    useRegexUnderScore(validationErrors?.inp_Category) ||
                    "&nbsp;"
                  }}
                </small>
              </div>
              <div class="item expand my-2 mx-3 flex" v-if="add_new_category">
                <CustomInputContainer label="" class="w-full">
                  <template v-slot>
                    <InputText v-model="new_category" type="text" />
                  </template>
                </CustomInputContainer>
                <Button
                  @click="
                    () => {
                      form.inp_Category = addNewValue(
                        form.inp_Category,
                        new_category,
                        categories_list,
                        'category'
                      )
                      add_new_category = false
                    }
                  "
                  class="p-0 ml-2 add-btn"
                  icon="pi pi-plus"
                  severity="primary"
                ></Button>
              </div>
              <TextIconTitleV2
                v-if="!add_new_category"
                class="mt-2"
                style="font-size: x-small"
                icon="pi pi-plus"
                label="Add Category"
                icon_color="#0090FF"
                @click="() => (add_new_category = true)"
              />
            </div>
          </div>
        </div>
        <div class="col-12 md:col-4">
          <div class="mb-3">
            <h6 class="mb-2 font-bold">Sub Category</h6>
            <div
              class="autoComplete-input"
              :class="{ disable: !form.inp_Category || edit }"
            >
              <div class="w-full">
                <AutoComplete
                  v-model="form.inp_SubCategory"
                  :suggestions="sub_categories"
                  @complete="
                    (event) => handleAutoComplete(event, 'subCategory')
                  "
                  placeholder="select or add a value"
                  :completeOnFocus="true"
                  :class="{ 'p-invalid': validationErrors?.inp_SubCategory }"
                  @item-select="handleSubCategorySelect"
                  emptySearchMessage="No Data Found!"
                />
                <small
                  class="p-error p-min-error"
                  v-if="validationErrors?.inp_SubCategory"
                >
                  {{
                    useRegexUnderScore(validationErrors?.inp_SubCategory) ||
                    "&nbsp;"
                  }}
                </small>
              </div>
              <div
                class="item expand my-2 mx-3 flex"
                v-if="add_new_SubCategory"
              >
                <CustomInputContainer label="" class="w-full">
                  <template v-slot>
                    <InputText v-model="new_SubCategory" type="text" />
                  </template>
                </CustomInputContainer>
                <Button
                  @click="
                    () => {
                      form.inp_SubCategory = addNewValue(
                        form.inp_SubCategory,
                        new_SubCategory,
                        sub_categories_list,
                        'subCategory'
                      )
                      add_new_SubCategory = false
                    }
                  "
                  class="p-0 ml-2 add-btn"
                  icon="pi pi-plus"
                  severity="primary"
                ></Button>
              </div>
              <TextIconTitleV2
                v-if="!add_new_SubCategory"
                class="mt-2"
                style="font-size: x-small"
                icon="pi pi-plus"
                label="Add Sub Category"
                icon_color="#0090FF"
                @click="() => (add_new_SubCategory = true)"
              />
            </div>
          </div>
        </div>
        <div class="col-12 md:col-4">
          <div class="mb-3">
            <h6 class="mb-2 font-bold">Type</h6>
            <div
              class="autoComplete-input"
              :class="{ disable: !form.inp_SubCategory || edit }"
            >
              <div class="w-full">
                <AutoComplete
                  v-model="form.inp_Type"
                  :suggestions="types"
                  @complete="(event) => handleAutoComplete(event, 'type')"
                  placeholder="select or add a value"
                  :completeOnFocus="true"
                  :class="{ 'p-invalid': validationErrors?.inp_Type }"
                  @item-select="handleTypeSelect"
                  emptySearchMessage="No Data Found!"
                />
                <small
                  class="p-error p-min-error"
                  v-if="validationErrors?.inp_Type"
                >
                  {{
                    useRegexUnderScore(validationErrors?.inp_Type) || "&nbsp;"
                  }}
                </small>
              </div>
              <div class="item expand my-2 mx-3 flex" v-if="add_new_Type">
                <CustomInputContainer label="" class="w-full">
                  <template v-slot>
                    <InputText v-model="new_Type" type="text" />
                  </template>
                </CustomInputContainer>
                <Button
                  @click="
                    () => {
                      form.inp_Type = addNewValue(
                        form.inp_Type,
                        new_Type,
                        type_list,
                        'type'
                      )
                      add_new_Type = false
                    }
                  "
                  class="p-0 ml-2 add-btn"
                  icon="pi pi-plus"
                  severity="primary"
                ></Button>
              </div>
              <TextIconTitleV2
                v-if="!add_new_Type"
                class="mt-2"
                style="font-size: x-small"
                icon="pi pi-plus"
                label="Add Type"
                icon_color="#0090FF"
                @click="() => (add_new_Type = true)"
              />
            </div>
          </div>
        </div>
        <div class="col-12 md:col-4">
          <div class="mb-3">
            <h6 class="mb-2 font-bold">Sub Type</h6>
            <div
              class="autoComplete-input"
              :class="{ disable: !form.inp_Type }"
            >
              <div class="w-full">
                <CustomInputContainer label="" class="w-full">
                  <template v-slot>
                    <InputText
                      v-model="form.inp_SubType"
                      type="text"
                      placeholder="Enter Sub Type"
                    />
                  </template>
                </CustomInputContainer>
                <small
                  class="p-error p-min-error"
                  v-if="validationErrors?.inp_SubType"
                >
                  {{
                    useRegexUnderScore(validationErrors?.inp_SubType) ||
                    "&nbsp;"
                  }}
                </small>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 md:col-4">
          <div class="mb-3">
            <h6 class="mb-2 font-bold">Variant</h6>
            <div
              class="flex autoComplete-input"
              :class="{ disable: !form.inp_SubType }"
            >
              <div class="w-full">
                <MultiSelect
                  v-model="form.inp_Variant"
                  :options="variant_list"
                  filter
                  placeholder="Select Variant"
                />
                <small
                  class="p-error p-min-error"
                  v-if="validationErrors?.inp_Variant"
                >
                  {{
                    useRegexUnderScore(validationErrors?.inp_Variant) ||
                    "&nbsp;"
                  }}
                </small>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 md:col-4">
          <div class="mb-3">
            <h6 class="mb-2 font-bold">Brand</h6>
            <div class="flex autoComplete-input">
              <div class="w-full">
                <MultiSelect
                  v-model="form.inp_Brand"
                  :options="Brand_list"
                  filter
                  optionLabel="name"
                  placeholder="Select Brand"
                />
                <small
                  class="p-error p-min-error"
                  v-if="validationErrors?.inp_Brand"
                >
                  {{
                    useRegexUnderScore(validationErrors?.inp_Brand) || "&nbsp;"
                  }}
                </small>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 md:col-4">
          <div class="mb-3">
            <h6 class="mb-2 font-bold">Manufacturer</h6>
            <div class="flex autoComplete-input">
              <div class="w-full">
                <MultiSelect
                  v-model="form.inp_Manufacturer"
                  :options="manufacturer_list"
                  filter
                  optionLabel="name"
                  placeholder="Select Manufacturer"
                />
                <small
                  class="p-error p-min-error"
                  v-if="validationErrors?.inp_Manufacturer"
                >
                  {{
                    useRegexUnderScore(validationErrors?.inp_Manufacturer) ||
                    "&nbsp;"
                  }}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import * as yup from "yup"
import { refDebounced } from "@vueuse/core"
import { useRegexUnderScore } from "@/composables/regex"

import { useToast } from "primevue/usetoast"
const toast = useToast()
const router = useRouter()
const route = useRoute()
const props = defineProps({
  editData: {
    type: Object,
    default: {},
  },
  edit: {
    type: Boolean,
    default: false,
  },
  categories_list: {
    type: Array,
    default: [],
  },
})

const emit = defineEmits(["close"])

const closeForm = () => {
  emit("close")
}

const form = reactive({
  inp_Category: "",
  inp_SubCategory: "",
  inp_Type: "",
  inp_SubType: "",
  inp_Variant: [],
  inp_Brand: [],
  inp_Manufacturer: [],
})
if (props.edit) {
  form.inp_Category = props.editData.category[0]?.name
  form.inp_SubCategory = props.editData.subcategory[0]?.subcategory_name
  form.inp_Type = props.editData.type[0]?.type_name
  form.inp_SubType = props.editData.subtype?.subtype_name
  form.inp_Variant = props.editData?.variant
  form.inp_Brand = props.editData?.brand
  form.inp_Manufacturer = props.editData?.manufacturer
}

// form data

const schema = yup.object({
  inp_Category: yup.string().required(),
  inp_SubCategory: yup.string().required(),
  inp_Type: yup.string().required(),
  inp_SubType: yup.string().required(),
  inp_Variant: yup.array().required().min(1),
  inp_Brand: yup.array().required().min(1),
  inp_Manufacturer: yup.array().required().min(1),
})

const categories = ref([])
const new_category = ref("")
const add_new_category = ref(false)

const sub_categories_list = ref([])
const sub_categories = ref([])
const new_SubCategory = ref("")
const add_new_SubCategory = ref(false)

const type_list = ref([])
const types = ref([])
const new_Type = ref("")
const add_new_Type = ref(false)

const variant_list = ref(["color", "size", "fragrance"])

const handleAutoComplete = (event, field) => {
  switch (field) {
    case "category":
      search(
        event,
        categories,
        props.categories_list.map((item) => item.name),
        field
      )
    case "subCategory":
      search(
        event,
        sub_categories,
        sub_categories_list.value.map((item) => item.subcategory_name),
        field
      )
    case "type":
      search(
        event,
        types,
        type_list.value.map((item) => item.type_name),
        field
      )
    default:
      console.log("nothing")
  }
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
  selectedCategory.value = props.categories_list.filter(
    (item) => item.name == form.inp_Category
  )
  sub_categories_list.value = await subCategoryList(
    selectedCategory.value[0].id
  )
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

const selectedSubCategory = ref([])

const handleSubCategorySelect = async () => {
  selectedSubCategory.value = sub_categories_list.value.filter(
    (item) => item.subcategory_name == form.inp_SubCategory
  )
  type_list.value = await typeList(selectedSubCategory.value[0].sub_category_id)
}

const selectedType = ref("")

const handleTypeSelect = async () => {
  selectedType.value = type_list.value.filter(
    (item) => item.type_name == form.inp_Type
  )
}

const search = (event, suggestions, list, field) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      suggestions.value = list.map((item) => item)
    } else {
      let data = list.filter((item) => {
        return item.toLowerCase().startsWith(event.query.toLowerCase())
      })
      suggestions.value = data.map((item) => item)
      if (suggestions.value.length == 0) {
        if (field == "category") {
          selectedSubCategory.value = []
          sub_categories_list.value = []
          form.inp_SubCategory = ""
        }
        if (field == "subCategory" || field == "category") {
          selectedType.value = []
          type_list.value = []
          form.inp_Type = ""
        }
      }
    }
  }, 250)
}
const addNewValue = (value, newValue, list, field) => {
  if (newValue && !list.includes(newValue)) {
    list.push(newValue)
    value = null
  }
  if (field == "category") {
    selectedSubCategory.value = []
    sub_categories_list.value = []
    form.inp_SubCategory = ""
  }
  if (field == "subCategory" || field == "category") {
    selectedType.value = []
    type_list.value = []
    form.inp_Type = ""
  }
  return newValue
}

const Brand_list = ref([])
const getBrandList = async () => {
  try {
    const response = await useMyFetch(`/admin/brand/get_brand`)
    Brand_list.value = response.data.value.data
  } catch (err) {
    console.log("error Response:", err)
  }
}

const manufacturer_list = ref([])
const getManufacturerList = async () => {
  try {
    const response = await useMyFetch(`/admin/brand/get_manufacturer`)
    manufacturer_list.value = response.data.value.data
  } catch (err) {
    console.log("error Response:", err)
  }
}

let redirect_bool = true
let redirect_to = "/" // "" | url
let redirect_mode = "replace" // replace | push

let throw_error_type = "error" // error | log | null
let unknown_error_occurred_showDetails = true // true | false

let success_summary = "Welcome to Valyou ERP"
let success_detail = "login successfully done"
let life_msg = 3000
let life_redirect = 3000

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

// we need to support nested Validation
// it's support for list
const Check_Validation = async () => {
  try {
    await schema.validate(form, { abortEarly: false })
    validationErrors.value = {}
  } catch (err) {
    // need ti handling Validation test errors from this side
    validationErrors.value = err.inner.reduce((errors, error) => {
      let error_message = error.message
      form_keys.forEach((item) => {
        error_message = error_message.replace(item + " ", "")
      })
      error_message = error_message.replace(error.path + " ", "")
      let path = error.path
      if (path.includes("[") && path.includes("]")) {
        let pathParts = path.split("[")
        let index = pathParts[1].replace("]", "")
        path = pathParts[0]
        if (!errors[path]) {
          errors[path] = []
        }
        errors[path][index] = error_message
      } else {
        errors[path] = error_message
      }
      return errors
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
    if (Array.isArray(form[key])) {
      form[key].forEach((subItem, index) => {
        const computedKey = ref(computed(() => subItem))
        const debouncedKey = refDebounced(
          computedKey,
          validation_Debounced_num.value
        )

        const { startWatcher, stopWatcher } = createWatcher(
          () => debouncedKey.value,
          () => Check_Validation_One(`${key}[${index}]`)
        )

        context_list_OneByOne.push({
          [`${key}[${index}]`]: {
            startWatcher,
            stopWatcher,
            computed: computedKey,
            debounced: debouncedKey,
          },
        })
      })
    } else {
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
}

watch(
  validation_mode,
  (newVal) => {
    // for "Check All" MODE
    if (newVal == "Check All") {
      context_list_CheckAll.forEach((item) => {
        const key = Object.keys(item)[0]
        item[key].startWatcher()
      })
    } else {
      context_list_CheckAll.forEach((item) => {
        const key = Object.keys(item)[0]
        item[key].stopWatcher()
      })
      Clear_Validation()
    }

    // for "One by One" MODE
    if (newVal == "One by One") {
      context_list_OneByOne.forEach((item) => {
        const key = Object.keys(item)[0]
        item[key].startWatcher()
      })
    } else {
      context_list_OneByOne.forEach((item) => {
        const key = Object.keys(item)[0]
        item[key].stopWatcher()
      })
      Clear_Validation()
    }
  },
  { immediate: true }
)

// ## Submit Form
const blocked_submit = ref(false)
const addToastMessage = (severity, summary, detail) => {
  toast.add({
    severity,
    summary,
    detail,
    life: life_msg,
  })
}

const allow_submit = ref(true)

const Submit_Form = async (event) => {
  await Check_Validation()
  if (
    Object.keys(validationErrors.value).length === 0 &&
    allow_submit.value &&
    !blocked_submit.value
  ) {
    // make add disable
    allow_submit.value = false

    if (props.edit) {
      // Edit mode
      let payload = {
        category_id: props.editData.category[0].id,
        subcategory_id: props.editData.subcategory[0].sub_category_id,
        type_id: props.editData.type[0].type_id,
        variant: form.inp_Variant,
        subtype_id: props.editData.subtype.sub_type_id,
        brand: form.inp_Brand,
        manufacturer: form.inp_Manufacturer,
      }
      if (props.editData.subtype.subtype_name != form.inp_SubType) {
        payload = {
          ...payload,
          subtype_name: form.inp_SubType,
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
          setTimeout(() => {
            router.replace({
              query: { _type: "Categories Configurator" },
            })
          }, life_redirect)
          emit("close")
        } else {
          addToastMessage("error", error.value.data.message)
        }
      } catch (err) {
        console.log("error Response:", err)
      }
    } else {
      // Add mode
      let payload = {
        name: form.inp_Category,
        description: "No description",
        sub_category: {
          subcategory_name: form.inp_SubCategory,
          subcategory_id: selectedSubCategory.value[0]?.sub_category_id,
          type_id: selectedType.value[0]?.type_id,
          type: {
            type_name: form.inp_Type,
            sub_type: {
              subtype_name: form.inp_SubType,
              variant: form.inp_Variant,
            },
          },
        },
        manufacturer: form.inp_Manufacturer,
        brand: form.inp_Brand,
      }
      try {
        const { status, error } = await useMyFetch(
          `/admin/product_category/create_category`,
          {
            method: "POST",
            body: payload,
          }
        )
        if (status.value == "success") {
          addToastMessage("success", "Category added successfully!")
          setTimeout(() => {
            router.replace({
              query: { _type: "Categories Configurator" },
            })
          }, life_redirect)
          emit("close")
        } else {
          addToastMessage("error", error.value.data.message)
        }
      } catch (err) {
        console.log("error Response:", err)
      }
    }

    // make add available
    allow_submit.value = true
  } else if (Object.keys(validationErrors.value).length > 0) {
    toast.add({
      severity: "error",
      summary: "Please Validate inputs",
      detail: "Look at the red fields",
      life: life_msg,
    })
  } else {
    toast.add({
      severity: "error",
      summary: "DO NOT TRY TO SEND DATA MANY TIMES",
      detail: "wait please until redirect you",
      life: life_msg,
    })
  }
}

onMounted(() => {
  getBrandList()
  getManufacturerList()
  console.log("props.editData", props.editData)
})
</script>
<style lang="scss">
.autocomplete-subcategory {
  height: 34px;
  gap: 8px;
}

.autocomplete-subcategory .p-button {
  background-color: white;
  color: #3494ff;

  &:hover {
    background-color: #3494ff;
    color: white;
    transition: all 0.2s ease-in;
    border: none;
  }
}
</style>
