<template lang="">
  <div>
    <Toast />
    <DynamicDialog />
    <!-- -->
    <div class="card New__Save">
      <!-- Header -->
      <div class="grid flex justify-content-between">
        <div class="col-12 md:col-4 flex align-items-center">
          <span
            ref="Head_Name"
            v-if="route.query?._id"
            class="heading_newCus Head_Name"
            >Edit Product</span
          >
          <span ref="Head_Name" v-else class="heading_newCus Head_Name"
            >Create New Product</span
          >
        </div>
        <div
          class="flex align-items-center justify-content-end gap-3 col-12 md:col-3"
        >
          <Button
            label="Discard"
            severity="danger"
            outlined
            style="border-color: #ced6e3"
            @click="router.back()"
          />
          <Button @click="submit" class="font-bold px-5">Save</Button>
        </div>
      </div>
      <!-- Body -->
      <div class="grid addNew_wrapper">
        <div class="col-12 md:col-7">
          <!-- customer details -->
          <div class="grid col-12">
            <div class="col-12 md:col-12">
              <span class="small__text font-bold">PRODUCT INFORMATION</span>
            </div>

            <div class="col-12 md:col-6">
              <CustomInputContainer label="Product Name">
                <template v-slot>
                  <InputText
                    v-model="form.inp_ProductName"
                    type="text"
                    placeholder="Enter Product Name"
                    :class="{
                      'p-invalid': validationErrors.inp_ProductName,
                    }"
                  />
                  <small
                    class="p-error p-min-error"
                    v-if="validationErrors.inp_ProductName"
                    >{{
                      useRegexUnderScore(validationErrors.inp_ProductName) ||
                      "&nbsp;"
                    }}</small
                  >
                </template>
              </CustomInputContainer>
            </div>

            <div class="col-12 p-0"></div>
            <div class="col-12 md:col-">
              <CustomInputContainer label="Description">
                <template v-slot>
                  <!-- <Textarea
                    v-model="form.txt_Description"
                    placeholder="Enter Description"
                    :class="{ 'p-invalid': validationErrors.txt_Description }"
                    autoResize
                    rows="4"
                    cols="30"
                  /> -->
                  <Editor
                    v-model="form.txt_Description"
                    editorStyle="height: 220px"
                    class="dddd"
                    :class="{
                      'p-invalid': validationErrors.txt_Description,
                    }"
                  />

                  <small
                    class="p-error p-min-error"
                    v-if="validationErrors.txt_Description"
                    >{{
                      useRegexUnderScore(validationErrors.txt_Description) ||
                      "&nbsp;"
                    }}
                  </small>
                </template>
              </CustomInputContainer>
            </div>

            <div class="col-12 p-0"></div>
            <div class="col-12 md:col-3">
              <CustomInputContainer label="Category">
                <Dropdown
                  @change="(event) => selectCategory(event)"
                  optionLabel="label"
                  optionValue="id"
                  v-model="form.dd_Category"
                  :options="dd_Category_items"
                  placeholder="Select Category"
                  class="w-full"
                  :class="{
                    'p-invalid': validationErrors.dd_Category,
                    'disable': disable_form,
                  }"
                />
                <small
                  class="p-error p-min-error"
                  v-if="validationErrors.dd_Category"
                  >{{
                    useRegexUnderScore(validationErrors.dd_Category) || "&nbsp;"
                  }}</small
                >
              </CustomInputContainer>
            </div>
            <div class="col-12 md:col-3">
              <CustomInputContainer label="Sub Category">
                <Dropdown
                  @change="(event) => selectSubCategory(event)"
                  optionLabel="subcategory_name"
                  optionValue="sub_category_id"
                  v-model="form.dd_Sub_Category"
                  :options="dd_sub_categories_list"
                  placeholder="Select Sub Category"
                  class="w-full"
                  :class="{
                    'p-invalid': validationErrors.dd_Sub_Category,
                    'disable': disable_form,
                  }"
                />
                <small
                  class="p-error p-min-error"
                  v-if="validationErrors.dd_Sub_Category"
                  >{{
                    useRegexUnderScore(validationErrors.dd_Sub_Category) ||
                    "&nbsp;"
                  }}</small
                >
              </CustomInputContainer>
            </div>
            <div class="col-12 md:col-3">
              <CustomInputContainer label="Type">
                <Dropdown
                  @change="(event) => selectType(event)"
                  optionLabel="type_name"
                  optionValue="type_id"
                  v-model="form.dd_Type"
                  :options="dd_types_list"
                  placeholder="Select Type"
                  class="w-full"
                  :class="{
                    'p-invalid': validationErrors.dd_Type,
                    'disable': disable_form,
                  }"
                />
                <small
                  class="p-error p-min-error"
                  v-if="validationErrors.dd_Type"
                  >{{
                    useRegexUnderScore(validationErrors.dd_Type) || "&nbsp;"
                  }}</small
                >
              </CustomInputContainer>
            </div>
            <div class="col-12 md:col-3">
              <CustomInputContainer label="Sub Type">
                <Dropdown
                  @change="(event) => selectSubType(event)"
                  optionLabel="subtype_name"
                  optionValue="_id"
                  v-model="form.dd_Sub_Type"
                  :options="dd_sub_types_list"
                  placeholder="Select Sub Type"
                  class="w-full"
                  :class="{
                    'p-invalid': validationErrors.dd_Sub_Type,
                    'disable': disable_form,
                  }"
                />
                <small
                  class="p-error p-min-error"
                  v-if="validationErrors.dd_Sub_Type"
                  >{{
                    useRegexUnderScore(validationErrors.dd_Sub_Type) || "&nbsp;"
                  }}</small
                >
              </CustomInputContainer>
            </div>
            <div
              class="col-12 md:col-3"
              v-for="(item, index) in selectedVariant.variant"
              :key="index"
            >
              <CustomInputContainer :label="item">
                <template v-slot>
                  <InputText
                    v-model="form.inp_variant[index]"
                    placeholder="type Variant"
                    :class="{
                      'p-invalid': validationErrors[`inp_variant[&quot;${index}&quot;]`],
                    }"
                  />
                  <small
                    class="p-error p-min-error"
                    v-if="validationErrors[`inp_variant[&quot;${index}&quot;]`]"
                    >{{
                      validationErrors[`inp_variant["${index}"]`].substring(16)
                    }}</small
                  >
                </template>
              </CustomInputContainer>
            </div>
            <div class="col-12 p-0"></div>

            <!-- <div class="col-12 md:col-3">
              <CustomInputContainer label="SKU">
                <InputText
                  v-model="form.inp_SKU"
                  type="text"
                  placeholder="Enter SKU"
                  :class="{ 'p-invalid': validationErrors.inp_SKU }"
                />
                <small
                  class="p-error p-min-error"
                  v-if="validationErrors.inp_SKU"
                  >{{
                    useRegexUnderScore(validationErrors.inp_SKU) || "&nbsp;"
                  }}</small
                >
              </CustomInputContainer>
            </div> -->

            <div class="col-12 md:col-3">
              <CustomInputContainer label="Unit">
                <Dropdown
                  v-model="form.dd_Uint"
                  editable
                  placeholder="Select Unit"
                  :options="dd_Uint_items"
                  class="w-full"
                  :class="{
                    'p-invalid': validationErrors.dd_Uint,
                    'disable': disable_form,
                  }"
                />
                <small
                  class="p-error p-min-error"
                  v-if="validationErrors.dd_Uint"
                  id="last_name-error"
                  >{{
                    useRegexUnderScore(validationErrors.dd_Uint) || "&nbsp;"
                  }}</small
                >
              </CustomInputContainer>
            </div>

            <!-- <div class="col-12 md:col-3">
              <CustomInputContainer label="Case Size">
                <Dropdown
                  v-model="form.dd_Uint"
                  editable
                  placeholder="Select Unit"
                  :options="dd_Uint_items"
                  :class="{ 'p-invalid': validationErrors.dd_Uint }"
                />
                <small
                  class="p-error p-min-error"
                  v-if="validationErrors.dd_Uint"
                  id="last_name-error"
                  >{{
                    useRegexUnderScore(validationErrors.dd_Uint) || "&nbsp;"
                  }}</small
                >
              </CustomInputContainer>
            </div> -->

            <div class="col-12 p-0"></div>

            <div class="col-12 md:col-3">
              <CustomInputContainer label="Length">
                <InputNumberWithDropDown
                  v-model="form.inp_Length"
                  v-model:selectedUnitModel="form.inp_Length_unit"
                  :options="inp_Length_unit_items"
                  :class="{
                    'p-invalid': validationErrors.inp_Length,
                    'disable': disable_form,
                  }"
                  placeholder="0"
                />
              </CustomInputContainer>
              <small
                class="p-error p-min-error"
                v-if="validationErrors.inp_Length"
                >{{
                  useRegexUnderScore(validationErrors.inp_Length) || "&nbsp;"
                }}</small
              >
            </div>

            <div class="col-12 md:col-3">
              <CustomInputContainer label="Width">
                <InputNumberWithDropDown
                  v-model="form.inp_Width"
                  v-model:selectedUnitModel="form.inp_Width_unit"
                  :options="inp_Width_unit_items"
                  :class="{
                    'p-invalid': validationErrors.inp_Width,
                    'disable': disable_form,
                  }"
                  placeholder="0"
                />
              </CustomInputContainer>
              <small
                class="p-error p-min-error"
                v-if="validationErrors.inp_Width"
                >{{
                  useRegexUnderScore(validationErrors.inp_Width) || "&nbsp;"
                }}</small
              >
            </div>
            <div class="col-12 md:col-3">
              <CustomInputContainer label="Height">
                <InputNumberWithDropDown
                  v-model="form.inp_Height"
                  v-model:selectedUnitModel="form.inp_Height_unit"
                  :options="inp_Height_unit_items"
                  :class="{
                    'p-invalid': validationErrors.inp_Height,
                    'disable': disable_form,
                  }"
                  placeholder="0"
                />
              </CustomInputContainer>
              <small
                class="p-error p-min-error"
                v-if="validationErrors.inp_Height"
                >{{
                  useRegexUnderScore(validationErrors.inp_Height) || "&nbsp;"
                }}</small
              >
            </div>

            <div class="col-12 md:col-3">
              <CustomInputContainer label="Weight">
                <InputNumberWithDropDown
                  v-model="form.inp_Weight"
                  v-model:selectedUnitModel="form.inp_Weight_unit"
                  :options="inp_Weight_unit_items"
                  :class="{
                    'p-invalid': validationErrors.inp_Weight,
                    'disable': disable_form,
                  }"
                  placeholder="0"
                />
              </CustomInputContainer>
              <small
                class="p-error p-min-error"
                v-if="validationErrors.inp_Weight"
                >{{
                  useRegexUnderScore(validationErrors.inp_Weight) || "&nbsp;"
                }}</small
              >
            </div>

            <div class="col-12 md:col-12">
              <span class="small__text font-bold">DETAILS</span>
              <Divider class="p-0 mb-0 mt-2" />
            </div>

            <div class="col-12 md:col-4">
              <CustomInputContainer label="Manufacturer">
                <template v-slot>
                  <Dropdown
                    v-model="form.dd_Manufacturer"
                    :options="dd_Manufacturer_items"
                    placeholder="Select Manufacturer"
                    optionLabel="name"
                    class="w-full"
                    :class="{
                      'p-invalid': validationErrors.dd_Manufacturer,
                      'disable': disable_form,
                    }"
                  />

                  <small
                    class="p-error p-min-error"
                    v-if="validationErrors.dd_Manufacturer"
                    >{{
                      useRegexUnderScore(validationErrors.dd_Manufacturer) ||
                      "&nbsp;"
                    }}</small
                  >
                </template>
              </CustomInputContainer>
            </div>

            <div class="col-12 md:col-4">
              <CustomInputContainer label="Select Brand">
                <template v-slot>
                  <Dropdown
                    v-model="form.dd_Brand"
                    :options="dd_Brand_items"
                    optionLabel="name"
                    placeholder="Select Brand"
                    class="w-full"
                    :class="{
                      'p-invalid': validationErrors.dd_Brand,
                      'disable': disable_form,
                    }"
                  />

                  <small
                    class="p-error p-min-error"
                    v-if="validationErrors.dd_Brand"
                    >{{
                      useRegexUnderScore(validationErrors.dd_Brand) || "&nbsp;"
                    }}</small
                  >
                </template>
              </CustomInputContainer>
            </div>

            <div class="col-12 p-0"></div>

            <!-- <div class="col-12 md:col-4">
              <CustomInputContainer label="UPC">
                <template v-slot>
                  <InputText
                    v-model="form.inp_UPC"
                    placeholder="Enter UPC"
                    :class="{ 'p-invalid': validationErrors.inp_UPC }"
                  />

                  <small
                    class="p-error p-min-error"
                    v-if="validationErrors.inp_UPC"
                    >{{
                      useRegexUnderScore(validationErrors.inp_UPC) || "&nbsp;"
                    }}</small
                  >
                </template>
              </CustomInputContainer>
            </div>

            <div class="col-12 md:col-4">
              <CustomInputContainer label="MPN">
                <template v-slot>
                  <InputText
                    v-model="form.inp_MPN"
                    placeholder="Enter MPN"
                    :class="{ 'p-invalid': validationErrors.inp_MPN }"
                  />

                  <small
                    class="p-error p-min-error"
                    v-if="validationErrors.inp_MPN"
                    >{{
                      useRegexUnderScore(validationErrors.inp_MPN) || "&nbsp;"
                    }}</small
                  >
                </template>
              </CustomInputContainer>
            </div>

            <div class="col-12 p-0"></div>
            <div class="col-12 md:col-4">
              <CustomInputContainer label="ISBN">
                <template v-slot>
                  <InputText
                    v-model="form.inp_ISBN"
                    placeholder="Enter ISBN"
                    :class="{ 'p-invalid': validationErrors.inp_ISBN }"
                  />

                  <small
                    class="p-error p-min-error"
                    v-if="validationErrors.inp_ISBN"
                    >{{
                      useRegexUnderScore(validationErrors.inp_ISBN) || "&nbsp;"
                    }}</small
                  >
                </template>
              </CustomInputContainer>
            </div>

            <div class="col-12 md:col-4">
              <CustomInputContainer label="EAN">
                <template v-slot>
                  <InputText
                    v-model="form.inp_EAN"
                    placeholder="Enter EAN"
                    :class="{ 'p-invalid': validationErrors.inp_EAN }"
                  />

                  <small
                    class="p-error p-min-error"
                    v-if="validationErrors.inp_EAN"
                    >{{
                      useRegexUnderScore(validationErrors.inp_EAN) || "&nbsp;"
                    }}</small
                  >
                </template>
              </CustomInputContainer>
            </div> -->

            <!-- <div class="col-12 md:col-12">
              <span class="small__text font-bold">LOCATION INFORMATION</span>
            </div> -->

            <!-- <div class="col-12 md:col-3">
              <CustomInputContainer label="Warehouse Name">
                <template v-slot>
                  <Dropdown
                    v-model="form.dd_WarehouseName"
                    :options="dd_WarehouseName_items"
                    placeholder="Select Warehouse"
                    :class="{ 'p-invalid': validationErrors.dd_WarehouseName }"
                  />

                  <small
                    class="p-error p-min-error"
                    v-if="validationErrors.dd_WarehouseName"
                    >{{
                      useRegexUnderScore(validationErrors.dd_WarehouseName) ||
                      "&nbsp;"
                    }}</small
                  >
                </template>
              </CustomInputContainer>
            </div> -->

            <div class="col-12 md:col-3">
              <CustomInputContainer label="Opening Stock">
                <template v-slot>
                  <InputNumber
                    v-model="form.inp_OpeningStock"
                    placeholder="type Stock"
                    :class="{
                      'p-invalid': validationErrors.inp_OpeningStock,
                    }"
                  />

                  <small
                    class="p-error p-min-error"
                    v-if="validationErrors.inp_OpeningStock"
                    >{{
                      useRegexUnderScore(validationErrors.inp_OpeningStock) ||
                      "&nbsp;"
                    }}</small
                  >
                </template>
              </CustomInputContainer>
            </div>

            <div class="col-12 md:col-12">
              <span class="small__text font-bold">SALES INFORMATION</span>
            </div>

            <div class="col-12 md:col-6">
              <CustomInputContainer label="Selling Price">
                <template v-slot>
                  <InputNumber
                    v-model="form.inp_SellingPrice"
                    placeholder="Enter Price"
                    :class="{
                      'p-invalid': validationErrors.inp_SellingPrice,
                    }"
                    mode="decimal"
                    :minFractionDigits="2"
                  />

                  <small
                    class="p-error p-min-error"
                    v-if="validationErrors.inp_SellingPrice"
                    >{{
                      useRegexUnderScore(validationErrors.inp_SellingPrice) ||
                      "&nbsp;"
                    }}</small
                  >
                </template>
              </CustomInputContainer>
            </div>

            <div class="col-12 md:col-3">
              <!-- <CustomInputContainer label="Sales Account">
                <template v-slot>
                  <Dropdown
                    v-model="form.dd_SalesAccount"
                    :options="dd_SalesAccount_items"
                    placeholder="Select Account"
                    :class="{ 'p-invalid': validationErrors.dd_SalesAccount }"
                  />

                  <small
                    class="p-error p-min-error"
                    v-if="validationErrors.dd_SalesAccount"
                    >{{
                      useRegexUnderScore(validationErrors.dd_SalesAccount) ||
                      "&nbsp;"
                    }}</small
                  >
                </template>
              </CustomInputContainer> -->
            </div>

            <div class="col-12 p-0"></div>
            <div class="col-12 md:col-6">
              <CustomInputContainer label="Description">
                <template v-slot>
                  <Textarea
                    v-model="form.txt_Description_Sales"
                    placeholder="Enter Description"
                    :class="{
                      'p-invalid': validationErrors.txt_Description_Sales,
                    }"
                    autoResize
                    rows="4"
                    cols="30"
                  />
                  <small
                    class="p-error p-min-error"
                    v-if="validationErrors.txt_Description_Sales"
                    >{{
                      useRegexUnderScore(
                        validationErrors.txt_Description_Sales
                      ) || "&nbsp;"
                    }}
                  </small>
                </template>
              </CustomInputContainer>
            </div>

            <div class="col-12 md:col-12">
              <span class="small__text font-bold">PURCHASE INFORMATION</span>
            </div>

            <div class="col-12 md:col-6">
              <CustomInputContainer label="Cost Price">
                <template v-slot>
                  <InputNumber
                    v-model="form.inp_CostPrice"
                    placeholder="Enter Price"
                    :class="{
                      'p-invalid': validationErrors.inp_CostPrice,
                    }"
                    mode="decimal"
                    :minFractionDigits="2"
                  />

                  <small
                    class="p-error p-min-error"
                    v-if="validationErrors.inp_CostPrice"
                    >{{
                      useRegexUnderScore(validationErrors.inp_CostPrice) ||
                      "&nbsp;"
                    }}</small
                  >
                </template>
              </CustomInputContainer>
            </div>

            <div class="col-12 md:col-3">
              <!-- <CustomInputContainer label="Purchase Account">
                <template v-slot>
                  <Dropdown
                    v-model="form.dd_PurchaseAccount"
                    :options="dd_PurchaseAccount_items"
                    placeholder="Select Account"
                    :class="{
                      'p-invalid': validationErrors.dd_PurchaseAccount,
                    }"
                  />

                  <small
                    class="p-error p-min-error"
                    v-if="validationErrors.dd_PurchaseAccount"
                    >{{
                      useRegexUnderScore(validationErrors.dd_PurchaseAccount) ||
                      "&nbsp;"
                    }}</small
                  >
                </template>
              </CustomInputContainer> -->
            </div>

            <div class="col-12 p-0"></div>
            <div class="col-12 md:col-6">
              <CustomInputContainer label="Description">
                <template v-slot>
                  <Textarea
                    v-model="form.txt_Description_Purchase"
                    placeholder="Enter Description"
                    :class="{
                      'p-invalid': validationErrors.txt_Description_Purchase,
                    }"
                    autoResize
                    rows="4"
                    cols="30"
                  />
                  <small
                    class="p-error p-min-error"
                    v-if="validationErrors.txt_Description_Purchase"
                    >{{
                      useRegexUnderScore(
                        validationErrors.txt_Description_Purchase
                      ) || "&nbsp;"
                    }}
                  </small>
                </template>
              </CustomInputContainer>
            </div>

            <!-- <div class="col-12 p-0"></div>
            <div class="col-12 md:col-6">
              <CustomInputContainer label="Preferred Vendor">
                <template v-slot>
                  <Dropdown
                    v-model="form.dd_PreferredVendor"
                    :options="dd_PreferredVendor_items"
                    placeholder="Select Account"
                    :class="{
                      'p-invalid': validationErrors.dd_PreferredVendor,
                    }"
                  />
                  <small
                    class="p-error p-min-error"
                    v-if="validationErrors.dd_PreferredVendor"
                    >{{
                      useRegexUnderScore(validationErrors.dd_PreferredVendor) ||
                      "&nbsp;"
                    }}
                  </small>
                </template>
              </CustomInputContainer>
            </div> -->
          </div>
        </div>

        <div
          class="col-12 md:col-5"
          :style="route.query?._id && false ? 'display:none' : ''"
        >
          <!-- <input type="file" name="" v-model="" id=""> -->
          <!-- {{ form.FileUpload[0] }} -->
          <!-- {{ form.image_list }} -->

          <!-- <img :src="form.FileUpload[0]" alt=""> -->
          <CustomInputContainer
            label="Attach Images"
            :validationError="validationErrors.FileUpload"
          >
            <template v-slot>
              <UploadFileV2
                class="mb-2"
                v-model="form.FileUpload"
                accept="image/*"
                :image_list="form.image_list"
                @update:image_list="(value) => (form.image_list = value)"
                :multiple="true"
                :class="{ 'p-invalid': validationErrors.FileUpload }"
              />
              <span class="gray_text"
                >* Max file size 0.5MB (Dimensions: 500x500)</span
              >
              <br />
              <span class="gray_text">* Max 4 images</span>
            </template>
          </CustomInputContainer>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// ---------------------------------------------------------------
// # Configuration Section
// DEV MODE ONLY

import { useForm, useField } from "vee-validate"
import * as yup from "yup"
import { ref, watch } from "vue"

import { useRegexUnderScore } from "@/composables/regex"
import { useConfirm } from "primevue/useconfirm"
import { useToast } from "primevue/usetoast"
import Sidebar from "primevue/sidebar"
import formValidator from "@/containers/utils/formValidator"

import {
  CreateProduct,
  EditProduct,
  GetProduct,
  GetCategoryNames,
  GetBrands_list,
  subCategoryList,
  typeList,
  subTypeList,
} from "@/services/products/save_product"
import { getImagesURL } from "@/services/common/api_resource"
import { useDialog } from "primevue/usedialog"

import FileUpload from "primevue/fileupload"

const router = useRouter()
const route = useRoute()
const toast = useToast()
const dialog = useDialog()

const position = ref("center")
const visible = ref(false)
const sidebarErrorDetails = ref({
  hasError: false,
  message: "",
})

const visibleTop = ref(false)
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

// for use Image
const selectedImage = ref("")
const image_src = ref("")
const fileInput = ref("")

// const inp_phone_dial_code = ref({
//   name: "United Arab Emirates",
//   code: "AE",
//   emoji: "🇦🇪",
//   unicode: "U+1F1E6 U+1F1EA",
//   image:
//     "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AE.svg",
//   flag: "🇦🇪",
//   dial_code: "+971",
// })

const inp_phone_dial_code = ref("+971")

const dd_Uint_id = ref()
const form = ref({
  inp_ProductName: "",
  txt_Description: "",
  dd_Category: "",
  dd_Sub_Category: "",
  dd_Type: "",
  dd_Sub_Type: "",
  inp_variant: [],
  inp_SKU: "",
  dd_Uint: "",
  dd_Gender: "",
  inp_Length: null,
  inp_Length_unit: "",

  inp_Width: null,
  inp_Width_unit: "",

  inp_Height: null,
  inp_Height_unit: "",

  inp_Weight: null,
  inp_Weight_unit: "",

  dd_Manufacturer: "",
  dd_Brand: "",
  inp_UPC: "",
  inp_CaseSize: "",

  inp_MPN: "",
  inp_ISBN: "",
  inp_EAN: "",

  dd_WarehouseName: "",
  inp_OpeningStock: null,
  inp_SellingPrice: null,

  dd_SalesAccount: "",

  txt_Description_Sales: "",

  inp_CostPrice: null,
  dd_PurchaseAccount: "",

  txt_Description_Purchase: "",
  dd_PreferredVendor: "",

  FileUpload: [],

  image_list: [],
})
const dd_Category_id = ref(null)
const dd_Sub_Category_id = ref(null)
const dd_Type_id = ref(null)
const dd_Sub_Type_id = ref(null)
const File_Upload = ref("")

const Head_Name = ref(null)

// ---------------------------------------------------------------
// # Setup Components Data

// ## for controls
// list for option of component [use same name of v model]_items

// Example
// dd_SellPrice_items = ref([]);
const dd_Category_items = ref([
  {
    id: "{{_id}}",
    label: "Personal Care",
  },
])
const dd_Uint_items = ref([
  "KG",
  "GRAM",
  "LT",
  "ML",
  "LB",
  "COUNT",
  "PC",
  "UNIT",
])
const inp_Length_unit_items = ref(["cm", "mm"])
const inp_Width_unit_items = ref(["cm", "mm"])
const inp_Height_unit_items = ref(["cm", "mm"])
const inp_Weight_unit_items = ref(["kg", "g"])

const dd_Manufacturer_items = ref([])
const dd_Brand_items = ref([])

const dd_WarehouseName_items = ref(["Head Office"])
const dd_SalesAccount_items = ref(["account 1"])
const dd_PurchaseAccount_items = ref(["account 2"])
const dd_PreferredVendor_items = ref(["bla bla ltd"])

//  for displays

// ---------------------------------------------------------------
// Setup Validation

const schema = yup.object({
  inp_ProductName: yup.string().min(2).required(),
  txt_Description: yup.string().min(2).required(),
  dd_Category: yup.string().min(2).required(),
  dd_Sub_Category: yup.string().min(2).required(),
  dd_Type: yup.string().min(2).required(),
  dd_Sub_Type: yup.string().min(2).required(),
  inp_variant: yup.array().min(1).required().of(yup.string().min(1).required()),
  // inp_SKU: yup.string().min(2).required(),
  dd_Uint: yup
    .string()
    .min(2)
    .test(
      "is-uppercase",
      "The string is not in uppercase",
      (value) => value === value.toUpperCase()
    )
    .required(),
  inp_Length: yup.number().min(0.01).required(),
  inp_Width: yup.number().min(0.01).required(),
  inp_Height: yup.number().min(0.01).required(),
  inp_Weight: yup.number().min(0.01).required(),
  dd_Manufacturer: yup.object().required(),
  dd_Brand: yup.object().required(),
  // inp_UPC: yup.string().min(2).required(),
  // inp_MPN: yup.string().min(2).required(),
  // inp_ISBN: yup.string().min(2).required(),
  // inp_EAN: yup.string().min(2).required(),
  // dd_WarehouseName: yup.string().min(2).required(),
  inp_OpeningStock: yup.number().min(1).required(),
  inp_SellingPrice: yup.number().min(1).required(),
  // dd_SalesAccount: yup.string().min(2).required(),
  // txt_Description_Sales: yup.string().min(2).required(),
  inp_CostPrice: yup.number().min(1).required(),
  // dd_PurchaseAccount: yup.string().min(2).required(),
  // txt_Description_Purchase: yup.string().min(2).required(),
  // dd_PreferredVendor: yup.string().min(2).required(),
  // FileUpload: yup.array().max(15).min(1)
  // .test('files', 'The file is too large', value => {
  //     console.log("value:",value);
  //     return value && value.every(file => file.size <= FILE_SIZE);
  //   }).required(),

  FileUpload: yup
    .array()
    .max(4)
    .when(["lead_min"], (lead_type, schema) => {
      if (route.query?._id && route.query.action != "add_variant") {
        return schema
      } else {
        return schema.min(1)
      }
      return schema
    })

    .test("files Format", "Unsupported Format", function (files) {
      let valid = true
      let fileName
      if (files.length > 0) {
        files.forEach((file) => {
          if (file.type.includes) {
            if (!file.type.includes("image")) {
              // change this to the file types you want to accept
              valid = false
              fileName = file.name
            }
          }
        })
      }

      return (
        valid ||
        this.createError({
          message: `The file "${fileName}" has Unsupported Format`,
        })
      )
    })

    // .test('files images aspect ratio', 'Incorrect image aspect ratio', async function(files){

    //   let valid = true;
    //   let fileName;

    //   if (files.length > 0) {
    //     for (let i = 0; i < files.length; i++) {
    //       const file = files[i];

    //       if(file.objectURL == undefined){
    //         break;
    //       }

    //       const image = new Image();
    //       image.src = file.objectURL
    //       const promise = new Promise((resolve) => {
    //         image.onload = () => {
    //           resolve({ width: image.width, height: image.height });
    //         };
    //       });
    //       const dimensions = await promise;
    //       const aspectRatio = dimensions.width / dimensions.height;
    //       if (aspectRatio !== 1) { // change this to the aspect ratio you want
    //         valid = false;
    //         fileName = file.name;
    //         break;
    //       }
    //     }

    //   }
    //   return valid || this.createError({ message: `The file "${fileName}" has incorrect aspect ratio` });
    // })

    //   .test('files images Dimensions', 'Incorrect image dimensions', async function(files){

    //     let valid = true;
    //     let fileName;

    //     if (files.length > 0) {
    //       for (let i = 0; i < files.length; i++) {
    //         const file = files[i];

    //         if(file.objectURL == undefined){
    //           break;
    //         }

    //         const image = new Image();
    //         image.src = file.objectURL
    //         const promise = new Promise((resolve) => {
    //           image.onload = () => {
    //             resolve({ width: image.width, height: image.height });
    //           };
    //         });
    //         const dimensions = await promise;
    //         if (dimensions.width !== 500 || dimensions.height !== 500) {
    //           valid = false;
    //           fileName = file.name;
    //           break;
    //         }
    //       }

    //     }
    //     return valid || this.createError({ message: `The file "${fileName}" has Incorrect image dimensions` });
    // })

    .test("files Size", "file is too large", function (files) {
      let valid = true
      let fileName
      if (files.length > 0) {
        files.forEach((file) => {
          const size = file.size / 1024 / 1024 // size in MB
          if (size > 0.5) {
            // change this to the size limit you want
            valid = false
            fileName = file.name
          }
        })
      }
      return (
        valid ||
        this.createError({ message: `The file "${fileName}" is too large` })
      )
    })
    .when(["lead_type"], (lead_type, schema) => {
      if (route.query?._id) {
        return schema.notRequired()
      } else {
        return schema.required()
      }
      return schema
    }),

  // .required(),
})

const validationErrors = ref({})

const dd_sub_categories_list = ref([])
const selectCategory = async (event) => {
  console.log("event", event)
  dd_Category_id.value = event.value
  dd_sub_categories_list.value = await subCategoryList(dd_Category_id.value)
  getBrands()
}
const dd_types_list = ref([])
const selectSubCategory = async (event) => {
  dd_Sub_Category_id.value = event.value
  dd_types_list.value = await typeList(dd_Sub_Category_id.value)
}
const dd_sub_types_list = ref([])
const variantsSchema = ref({})
const selectType = async (event) => {
  dd_Type_id.value = event.value
  dd_sub_types_list.value = await subTypeList(
    dd_Sub_Category_id.value,
    dd_Type_id.value
  )
}

const selectedVariant = ref([])
const selectSubType = async (event) => {
  dd_Sub_Type_id.value = event.value
  selectedVariant.value = dd_sub_types_list.value.find(
    (item) => item._id === dd_Sub_Type_id.value
  )
  form.value.inp_variant = Array(selectedVariant.value.variant.length).fill("")
}

// for Improve the performance
// const form_Debounced = refDebounced(form, 6000)
// watch(() => form_Debounced.value, Check_Validation, { deep: true })

// ---------------------------------------------------------------
// Functions For design

// ---------------------------------------------------------------
// Watch's for For design

// fix phone validation
// const inp_PhoneNumber_Debounced = refDebounced(form.inp_PhoneNumber, 6000)
// watch(() => form.inp_PhoneNumber, Check_Validation);

// ---------------------------------------------------------------
// API Integration

// ## sets variables integrations

// ## resets Components Control for integrations

// ## Watch's for API Integration

// ## Functions For API Integration
const get_uint = (unit) => {
  let _unit = ""

  if (unit) {
    _unit =
      unit.slice(-2) == "cm" || unit.slice(-2) == "mm" || unit.slice(-2) == "kg"
        ? unit.slice(-2)
        : unit.slice(-2) != "kg" && unit.slice(-1) == "g"
        ? "g"
        : unit
  }

  return _unit
}

function separateLettersAndNumbers(text) {
  // This regex pattern matches any character that is not a letter
  var lettersRegex = /[^a-zA-Z]/g

  // This regex pattern matches any character that is not a number or a dot
  var numbersRegex = /[^0-9.]/g

  // The replace method replaces all non-letter characters with a space
  var letters = text.replace(lettersRegex, "")

  // The replace method replaces all non-number characters with a space
  var numbers = text.replace(numbersRegex, "")

  return [letters, numbers]
}

// ## Submit Form
const allow_submit = ref(true)

const variant_details = ref([])
const submit = async (event) => {
  visible.value = true
  const err = await formValidator(schema, validationErrors.value, form.value);
  validationErrors.value = err;

  if (Object.keys(validationErrors.value).length === 0 && allow_submit) {
    // handel data

    // submitForm Here
    if (route.query?._id && route.query?.action != "add_variant") {
      // Edit mode

      let images_list = form.value.image_list.map((item) => item.link)
      console.log("images_list:", images_list)

      // check & upload new image

      // Upload Images

      let images_links = []
      let files_list = []
      const form_data = new FormData()

      try {
        if (form.value.FileUpload.length > 0) {
          toast.add({
            severity: "info",
            summary: "Handling Images",
            detail: "Please Wait ...",
            life: 3000,
          })
        }

        for (let prop in form.value.FileUpload) {
          form_data.append(
            "file",
            form.value.FileUpload[prop],
            form.value.FileUpload[prop].name
          )
        }

        if (form.value.FileUpload.length > 0) {
          let res_images = await getImagesURL(form_data)
          images_links = res_images?.data.map((item) => item?.url)
        }
      } catch (error) {
        console.log(error.response?._data)
        if (error.response?._data != undefined) {
          if (error.response._data.code == 400) {
            toast.add({
              severity: "error",
              summary: error.response._data.message,
              detail: "",
              life: 3000,
            })
            validationErrors.FileUpload = `Error from API : ${error.response._data.message}`
          }
        } else {
          toast.add({
            severity: "error",
            summary: error,
            detail: "",
            life: 3000,
          })
        }
      }

      console.log("images_links:", images_links)

      images_list = images_list.concat(images_links)
      console.log("images_list concat:", images_links)

      try {
        let res = await EditProduct(
          {
            name: form.value.inp_ProductName,
            description: form.value.txt_Description,
            category_id: dd_Category_id.value, //form.value.dd_Category // NO_API
            // sku: // NO_API

            unit: form.value.dd_Uint,
            length: form.value.inp_Length + form.value.inp_Length_unit,
            width: form.value.inp_Width + form.value.inp_Width_unit,
            height: form.value.inp_Height + form.value.inp_Height_unit,
            weight: form.value.inp_Weight + form.value.inp_Weight_unit,

            manufacture: form.value.dd_Manufacturer, //"Milwaukee", // NO_API should to be id
            brand: form.value.dd_Brand, // NO_API should to be id

            // upc: form.value.inp_UPC,
            // mpn: form.value.inp_MPN,
            // isbn: form.value.inp_ISBN,
            // ean: form.value.inp_EAN,

            warehouse_id: "653bbbafcb6da1f6836e707f", // form.value.dd_WarehouseName  // NO_API
            opening_stock: form.value.inp_OpeningStock,

            selling_price: form.value.inp_SellingPrice,
            // sales_account: // NO_API
            selling_description: form.value.txt_Description_Sales,

            cost_price: form.value.inp_CostPrice,
            // Purchase Account // NO_API
            cost_description: form.value.txt_Description_Purchase,

            // Preferred Vendor // NO_API

            image_urls: images_list,
          },
          route.query?._id
        )
        console.log("after edit")
        // make add disable
        allow_submit.value = false
        let current_btn_text =
          event.srcElement.textContent.split(" ")[
            event.srcElement.textContent.split(" ").length - 1
          ]
        let current_Head =
          Head_Name.value.textContent.split(" ")[
            Head_Name.value.textContent.split(" ").length - 1
          ]

        toast.add({
          severity: "success",
          summary: `${current_Head} Successfully ${current_btn_text}`,
          detail: "",
          life: 3000,
        })

        setTimeout(() => {
          router.push("/products")
        }, 3500)
      } catch (error) {
        console.log(error.response?._data)
        if (error.response?._data != undefined) {
          if (error.response._data.code == 400) {
            toast.add({
              severity: "error",
              summary: error.response._data.message,
              detail: "",
              life: 3000,
            })
          }
        } else {
          toast.add({
            severity: "error",
            summary: error,
            detail: "",
            life: 3000,
          })
        }
      }
    } else {
      // Add mode

      // Upload Images

      let images_links = []
      let files_list = []
      const form_data = new FormData()

      try {
        if (form.value.FileUpload.length > 0) {
          toast.add({
            severity: "info",
            summary: "Handling Images",
            detail: "Please Wait ...",
            life: 3000,
          })
        }

        for (let prop in form.value.FileUpload) {
          form_data.append(
            "file",
            form.value.FileUpload[prop],
            form.value.FileUpload[prop].name
          )
        }

        if (form.value.FileUpload.length > 0) {
          let res_images = await getImagesURL(form_data)
          images_links = res_images?.data.map((item) => item?.url)
        }
      } catch (error) {
        console.log(error.response?._data)
        if (error.response?._data != undefined) {
          if (error.response._data.code == 400) {
            toast.add({
              severity: "error",
              summary: error.response._data.message,
              detail: "",
              life: 3000,
            })
            validationErrors.FileUpload = `Error from API : ${error.response._data.message}`
          }
        } else {
          toast.add({
            severity: "error",
            summary: error,
            detail: "",
            life: 3000,
          })
        }
      }

      console.log("images_links:", images_links)

      // add data
      variant_details.value = [
        selectedVariant.value.variant.reduce((acc, property, index) => {
          acc[property] = form.value.inp_variant[index]
          return acc
        }, {}),
      ]
      let payload = {
        name: form.value.inp_ProductName,
        description: form.value.txt_Description,
        category_id: dd_Category_id.value, //form.value.dd_Category // NO_API
        is_variant: false,
        subcategory_id: dd_Sub_Category_id.value,
        type_id: dd_Type_id.value,
        subtype_id: dd_Sub_Type_id.value,
        variant_details: variant_details.value,
        // sku: // NO_API

        unit: form.value.dd_Uint,
        length: form.value.inp_Length + form.value.inp_Length_unit,
        width: form.value.inp_Width + form.value.inp_Width_unit,
        height: form.value.inp_Height + form.value.inp_Height_unit,
        weight: form.value.inp_Weight + form.value.inp_Weight_unit,

        manufacture: form.value.dd_Manufacturer, //"Milwaukee", // NO_API should to be id
        brand: form.value.dd_Brand, // NO_API should to be id

        upc: form.value.inp_UPC,
        mpn: form.value.inp_MPN,
        isbn: form.value.inp_ISBN,
        ean: form.value.inp_EAN,

        warehouse_id: "653bbbafcb6da1f6836e707f", // form.value.dd_WarehouseName  // NO_API
        opening_stock: form.value.inp_OpeningStock,

        selling_price: form.value.inp_SellingPrice,
        // sales_account: // NO_API
        selling_description: form.value.txt_Description_Sales,

        cost_price: form.value.inp_CostPrice,
        // Purchase Account // NO_API
        cost_description: form.value.txt_Description_Purchase,

        // Preferred Vendor // NO_API

        image_urls: images_links,
      }
      if (route.query.action == "add_variant") {
        payload = {
          ...payload,
          is_variant: true,
          variant_of: route.query._id,
          subcategory_id: dd_Sub_Category_id.value,
          type_id: dd_Type_id.value,
          subtype_id: dd_Sub_Type_id.value,
          variant_details: variant_details.value,
        }
      }
      console.log("payload", payload)

      try {
        let res = await CreateProduct(payload)
        console.log("after add")
        // make add disable
        allow_submit.value = false
        let current_btn_text =
          event.srcElement.textContent.split(" ")[
            event.srcElement.textContent.split(" ").length - 1
          ]
        let current_Head =
          Head_Name.value.textContent.split(" ")[
            Head_Name.value.textContent.split(" ").length - 1
          ]
        toast.add({
          severity: "success",
          summary: `${current_Head} Successfully ${current_btn_text}`,
          detail: "",
          life: 3000,
        })
        setTimeout(() => {
          router.push("/products")
        }, 3500)
      } catch (error) {
        console.log(error.response?._data)
        if (error.response?._data != undefined) {
          if (error.response._data.code == 400) {
            toast.add({
              severity: "error",
              summary: error.response._data.message,
              detail: "",
              life: 3000,
            })
          }
        } else {
          toast.add({
            severity: "error",
            summary: error,
            detail: "",
            life: 3000,
          })
        }
      }
    }
  } else {
    toast.add({
      severity: "error",
      summary: "Please Validate inputs",
      detail: "Look at the red fields",
      life: 3000,
    })
  }
}

// ## onMounted // when we call the api

const handleApi = () => {
  // handel data here from input controls before send it

  // return function from services as $fetch Promise
  // Example
  //  return get_data_from_api();

  GetCategoryNames().then((res) => {
    dd_Category_items.value = res.map((item) => ({
      id: item.id,
      label: item.name,
    }))
  })

  if (route.query?._id) {
    return GetProduct({}, route.query?._id)
  }

  return Promise.resolve()
}

const disable_form = ref(false)
// handleData for display data from api

const handleData = async (data) => {
  console.log('data', data)
  console.log("data", data)
  if (data.is_variant == false && route.query.action == "add_variant") {
    disable_form.value = true
  }
  if (data) {
    form.value.inp_ProductName = data?.name
    form.value.txt_Description = data?.description

    form.value.dd_Category = data?.category_id
    dd_Category_id.value = data?.category_id

    form.value.dd_Sub_Category = data?.subcategory_id
    dd_Sub_Category_id.value = data?.subcategory_id

    form.value.dd_Type = data?.type_id
    dd_Type_id.value = data?.type_id

    form.value.dd_Sub_Type = data?.subtype_id
    dd_Sub_Type_id.value = data?.subtype_id

    if (route.query.action == "add_variant") {
      form.value.inp_variant = Array(data?.variant_details.length).fill("")
      form.value.image_list = []
    } else {
      form.value.inp_variant = data?.variant_details
        .map((obj) => Object.values(obj))
        .flat()
      form.value.image_list = data?.image_urls.map((item) => ({
        name: item.split("%20-%20")[1],
        link: item,
      }))
    }
    form.value.inp_SKU = data?.sku
    form.value.dd_Uint = data?.unit

    let res = separateLettersAndNumbers(data?.length)
    let letters = res[0]
    let numbers = res[1]
    let _unit = get_uint(data?.length)

    form.value.inp_Length = Number(numbers) // "343"
    form.value.inp_Length_unit = letters // "cm"
    console.log("numbers:", numbers)
    console.log("form.value.inp_Length_unit:", form.value.inp_Length_unit)

    res = separateLettersAndNumbers(data?.width)
    letters = res[0]
    numbers = res[1]

    form.value.inp_Width = Number(numbers) // "343"
    form.value.inp_Width_unit = letters // "cm"

    res = separateLettersAndNumbers(data?.height)
    letters = res[0]
    numbers = res[1]

    form.value.inp_Height = Number(numbers) // "343"
    form.value.inp_Height_unit = letters // "cm"

    res = separateLettersAndNumbers(data?.weight)
    letters = res[0]
    numbers = res[1]

    form.value.inp_Weight = Number(numbers) // "343"
    form.value.inp_Weight_unit = letters // "cm"

    form.value.dd_Manufacturer = data?.manufacture
    form.value.dd_Brand = data?.brand
    form.value.inp_UPC = data?.upc

    form.value.inp_MPN = data?.mpn
    form.value.inp_ISBN = data?.isbn
    form.value.inp_EAN = data?.ean

    form.value.dd_WarehouseName = data?.warehouse_id
    form.value.inp_OpeningStock = data?.opening_stock // opening Stock // NO_API
    form.value.inp_SellingPrice = data?.selling_price

    //form.value.dd_SalesAccount = data?.name // sales_account: // NO_API

    form.value.txt_Description_Sales = data?.selling_description

    form.value.inp_CostPrice = data?.cost_price
    // form.value.dd_PurchaseAccount = data?.name // Purchase Account // NO_API
    form.value.txt_Description_Purchase = data?.cost_description
    // form.value.dd_PreferredVendor = data?.name // Preferred Vendor // NO_API

    dd_sub_categories_list.value = await subCategoryList(dd_Category_id.value)
    getBrands()
    dd_types_list.value = await typeList(dd_Sub_Category_id.value)
    dd_sub_types_list.value = await subTypeList(
      dd_Sub_Category_id.value,
      dd_Type_id.value
    )
    selectedVariant.value = dd_sub_types_list.value.find(
      (item) => item._id === dd_Sub_Type_id.value
    )
  }

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

onMounted(() => {
  handleApi().then((res) => {
    handleData(res)
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
  // get_SalesRep_list().then((res) => {
  //   let val = res?.map((item) => ({
  //     label: `${item?.first_name} ${item?.last_name}`,
  //     id: item?.id,
  //   }))
  //   dd_SalesRep_items.value = val
  // })

  // get_Nationalities_languages_list().then((res) => {
  //   dd_Nationality_items.value = res?.nationalities
  //   dd_PreferredLanguages_items.value = res?.languages
  // })

  // GetBrands_list().then((res) => {
  //   dd_Brand_items.value = res.brand_list
  // })
})
const getBrands = async () => {
  try {
    const response = await useMyFetch(
      `/admin/product_category/list_brands/${dd_Category_id.value}`
    )
    dd_Brand_items.value = response.data.value.data.brand
    dd_Manufacturer_items.value = response.data.value.data.manufacturer
    return response.data.value.data
  } catch (err) {
    console.log("error Response:", err)
  }
}
// Add new customer
const submitForm = async (val) => {
  try {
    let payloadData = val
    const payload = {
      first_name: payloadData.first_name ?? "",
      last_name: payloadData.last_name ?? "",
      email: payloadData.email ?? "",
      phone_number: payloadData.phone_number ?? "",
      profile_image: "",
      customer_details: {
        handicap: payloadData.handicap ?? "",
        golf_club: payloadData.golf_club ?? "",
        website: "",
        city: "",
        address: "",
      },
      additional_details: {},
      notes: customer_note ?? "",
      password: payloadData.password ?? "",
    }

    const response = await useMyFetch(`/client/customer`, {
      method: "POST",
      body: payload,
    })

    const data = response
    if (data.status.value == "success") {
      toast.add({
        severity: "success",
        summary: "Added successfully",
        detail: "",
        life: 3000,
      })
      setTimeout(() => {
        router.replace("/customers")
      }, 3000)
    }
  } catch (err) {
    toast.add({
      severity: "error",
      summary: " Customer Creation failed ",
      detail: "",
      life: 3000,
    })
  } finally {
  }
}
</script>
<style lang="scss">
.New__Save {
  height: 100vh !important;

  .addNew_wrapper {
    min-height: 90vh !important;
    max-height: 90vh !important;
    overflow: auto !important;
  }

  .addNew_wrapper::-webkit-scrollbar {
    display: none !important;
  }

  .heading_newCus {
    font-size: 1rem !important;
    font-weight: 600 !important;
    color: #000000 !important;
  }
}

.logo_wrap {
  position: relative !important;

  .edt_btn {
    width: 1.8rem !important;
    height: 1.8rem !important;
    position: absolute !important;
    background-color: #fff !important;
    border-radius: 50% !important;
    box-shadow: 0.2px 0.2px 3px 0.2px;
    z-index: 11;
    bottom: -15px !important;
    // right: -10px !important;
    right: 0 !important;
    cursor: pointer !important;
    transform: translate(0px, -13px);
  }
}

.custom_avatar {
  span.p-avatar-text {
    font-size: xx-large !important;
  }
}

.p-disabled,
.p-component:disabled {
  opacity: 0.6;
  background: #f4f5f6 !important;
}

.p-invalid {
  border-color: #f3654a !important;

  .p-inputnumber-input {
    border-color: #f3654a !important;
  }
}

.p-invalid.p-calendar.p-invalid.p-component > .p-inputtext {
  border-color: #f3654a !important;
}

.p-invalid {
  .p-editor-toolbar {
    border-color: #f3654a !important;
    border-bottom: 1px solid #dee2e6 !important;
  }

  .p-editor-content {
    border-color: #f3654a !important;
  }
}

.form-submission-error-container,
.form-submission-error-container-hasError {
  height: 48px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.form-submission-error-container {
  background-color: #1ad598;
}

.form-submission-error-container-hasError {
  background-color: #f3654a;
}
</style>
