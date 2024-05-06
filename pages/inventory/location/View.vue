<template lang="">
  <div class="wrapper-column h-full">
    <!-- card -->
    <div class="item expand card">
      <div class="wrapper-column">
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

            <template #sku="slotsProps">
              {{ slotsProps.data.res.sku }}
            </template>
            <template #product_name="slotsProps">
              {{ slotsProps.data.res.name }}
            </template>
            <template #Cost_Price="slotsProps">
              {{ slotsProps.data.res.cost_price }}
            </template>
            <template #Selling_Price="slotsProps">
              {{ slotsProps.data.res.selling_price }}
            </template>
            <template #Total_Stock="slotsProps">
              {{ slotsProps.data.totalStock }}
            </template>
            <template #Delete_warehouse_name></template>
            <template #Delete_quantity></template>
            <template #Delete_operation_mode></template>
            <template #Delete_Expiry></template>
            <template #Delete_Location></template>
            <template #Delete_status></template>
            <template #Delete_Production></template>

            <template #Delete_actions="slotsProps"></template>
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
  </div>
</template>
<script setup>
import { useRoute } from "vue-router"
import * as yup from "yup"
import { Get_Products_list } from "@/services/products/shared"
import { CreateInventory } from "@/services/inventory/createInventory"
import { useToast } from "primevue/usetoast"

const route = useRoute()
const baseURL = useRuntimeConfig().public.baseURL
const api_URL = `${baseURL}admin/warehouse-location/product/${route.query?._id}`


const toast = useToast()
const SideBarVisible = ref(false)

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

const Clear_Validation = () => {
  validationErrors.value = {}
}
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
    console.log(e)
  }
})
</script>
<style lang="scss"></style>
