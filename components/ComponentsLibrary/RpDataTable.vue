<template lang="">
  <template v-if="true">
    <ConfirmDialog></ConfirmDialog>
    <Dialog
      v-model:visible="visible"
      modal
      :header="dialogHeaderVal"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      v-if="dialogHead.type === 'dialog'"
    >
      <FormConfiguratorPreviewCode
        :emitType="emitType"
        :labelBtn="btnTextVal"
        :layoutGridProp="layout"
        :show="showData"
      />
    </Dialog>
    <Sidebar
      v-model:visible="visible"
      :header="dialogHeaderVal"
      class="w-full md:w-30rem"
      v-if="dialogHead.type === 'sidebar'"
    >
      <FormConfiguratorPreviewCode
        :labelBtn="btnTextVal"
        :emitType="emitType"
        :layoutGridProp="layout"
        :show="showData"
        :header="dialogHeaderVal"
      />
    </Sidebar>
    <!-- {{isLoading_data}} -->

    <template v-if="!api_include_builder" :loading="$attrs?.loading ? $attrs.loading : isLoading_data" >
      <DataTable :value="[{}]" :pt="{}">
        <Column
          header="Attention"
          :pt="{
            headercontent: 'text-center justify-content-center',
            bodycell: 'text-center',
          }"
        >
          <template #body="slotProps">
            <template v-if="!(resp_computed)">
              <div>
                Im get data Loading... 
              </div>
              <!-- DataTable is freeze -->
            </template>
            <template v-else>
              {{
                  resp_computed?.datatable
                    ? resp_computed.datatable?.key
                      ? "Response.datatable.key is not Valid (there is no DataTable with this key)"
                      : "There no Builder key name in Response (Response.datatable.key)"
                    : "There no Builder key name in Response (Response.datatable)"
                }}
            </template>
                
          
        </template>
        </Column>
      </DataTable>
    </template>
    <template v-if="columns?.length">
      {{
        (() => {
          console.log("outside DataTable")
          // var slots_list = $slots.default()
          // console.log("slots_list:",slots_list);
        })()
      }}
      <div v-show="false">
        {{ (var_render = false) }}
      </div>

      <!-- slots for customize header-->
      <template v-if="$slots?.datatable_header">
        <slot name="datatable_header" :header="header"  :search_placeholder="searchPlaceholder"
        :isSearch="isSearch"
        :columns="columns"
        :rows="rows"
        :settings="settings"
        :reactive_refs="reactive_refs"
        :FilterBy_options="reactive_FilterBy_options"
        :FilterDate_options="reactive_FilterDate_options"
        :FilterSort_options="reactive_FilterSort_options"

        ></slot>

      </template>

      <div v-else class="flex justify-content-between align-items-center mb-1">
        <h2 class="text-lg font-bold ml-1" style="color: black">
          {{ header }}
        </h2>
        <div class="flex gap-2 align-items-center">
          <!-- :items="MenuPopFilterSelects_filter" -->
          <!-- @clear="btn_filter_clear" -->
          <!-- @submit="btn_filter_submit" -->

          <MenuPopFilterSort
            v-if="isFilterBy"
            :inherent_attrs="true"
            severity="secondary"
            :items="MenuPopFilterSort_filter" 
            @clear="btn_filter_clear_sort" 
            @submit="btn_filter_submit_sort"
            :key="key_filter"
          />


          <MenuPopFilterDate
            v-if="isFilterBy"
            :inherent_attrs="true"
            severity="secondary"
            :items="MenuPopFilterDates_filter" 
            @clear="btn_filter_clear_date" 
            @submit="btn_filter_submit_date"
            :key="key_filter"
          />

          <MenuPopFilter
            v-if="isFilterBy"
            :inherent_attrs="true"
            severity="secondary"
            :items="MenuPopFilterSelects_filter" 
            @clear="btn_filter_clear" 
            @submit="btn_filter_submit"
            :key="key_filter"
          />
          <span class="p-input-icon-left custom_search" v-if="isSearch">
            <i class="pi pi-search" />
            <InputText v-model="search" :placeholder="searchPlaceholder" />
          </span>
        </div>
      </div>
      

      <!-- :key="key_data" PrimeUpdateDataTable -->
      <DataTable
        :wrapper_class="$attrs?.wrapper_class ? $attrs.wrapper_class : 'pr-2'"
        v-bind="$attrs"
        :value="$attrs?.value ? $attrs.value : rows"
        :pt="{
          ...$attrs?.pt,
 
          bodyrow: $attrs?.pt?.bodyrow ? $attrs.pt.bodyrow : 'responsive_width',
          wrapper: $attrs?.pt?.wrapper ? $attrs.pt.wrapper : 'h-full',
          thead: 'class_thead ' + $attrs?.pt?.thead,
          tbody: $attrs?.pt?.tbody
            ? $attrs.pt.tbody
            : props.isPagination == false
            ? 'last_row_hidden'
            : '',

          loadingOverlay: $attrs?.pt?.loadingOverlay
            ? $attrs.pt.loadingOverlay
            : 'component-overlay',
          root: $attrs?.pt?.root ? $attrs.pt.root : 'overflow-y-hidden',
        }"
        :loading="$attrs?.loading ? $attrs.loading : isLoading_data"
        :scrollable="
          Object.keys($attrs).includes('scrollable') ? $attrs.scrollable : true
        "
      >
        <!-- {{ Object.keys($attrs).includes('scrollable')  }} -->
        <!-- {{  $attrs.scrollable   }} -->
        <!-- 
        
       -->
        <!-- 

        v-for="(col, col_index) in columns"
        :key="col?.field ? col?.field : col_index"
        :field="col.field"
        :header="col.header"
 
       -->
 
        <!-- this for make the slots render only one time -->
        <template v-if="true">
          <template v-if="$slots?.default && !allAreSymbolVCMT">
            <slot />
          </template>
          <template v-else>
            <template v-if="$slots?.['First']">
              <slot :name="'First'" v-bind="{ ...slotProps, settings }"></slot>
            </template>
 
            <template
              v-if="true"
              v-for="(col, col_index) in columns"
              :key="col?.field ? col?.field : col_index"
            >
              <template v-if="$slots?.[`Before_${col.field}`]">
                <slot
                  :name="`Before_${col.field}`"
                  v-bind="{ ...slotProps, settings }"
                ></slot>
              </template>
 
              <template v-if="$slots?.[`${col.field}_Column`]">
                <slot
                  :name="`${col.field}_Column`"
                  v-bind="{ ...slotProps, settings }"
                ></slot>
              </template>
 
              <template v-else>
                <Column
                  :field="col.field"
                  :header="col.header"
                  v-if="!slots?.[`Delete_${col.field}`]"
                  :pt="{
                    ...props?.pt_columns,
 
                    headercontent: props?.pt_columns?.headercontent
                      ? props.pt_columns.headercontent
                      : 'text-center flex-column justify-content-center',
                    bodycell: props?.pt_columns?.bodycell
                      ? `${props.pt_columns.bodycell} ${
                          col?.type == 'component' && !slots?.[`${col.field}`]
                            ? 'component_type'
                            : ''
                        }`
                      : `text-center flex-column align-items-center justify-content-center flex-nowrap max-w-min w-min ${
                          col?.type == 'component' && !slots?.[`${col.field}`]
                            ? 'component_type'
                            : ''
                        }`,
                  }"
                >
                  <template
                    #body="slotProps"
                    v-if="
                      slotProps &&
                      slotProps.data &&
                      slotProps.data.type &&
                      slotProps.data.type === 'Last_OBSERVER'
                    "
                  >
                    {{ slotProps.data }}
                    <div ref="target" v-once></div>
                  </template>
                  <template v-else-if="$slots[col.field]" #body="slotProps">
                    <!-- to set 'OBSERVER' at last one -->
                    <template
                      v-if="
                        slotProps &&
                        slotProps.data &&
                        slotProps.data.type &&
                        slotProps.data.type === 'Last_OBSERVER'
                      "
                    >
                      {{ slotProps.data }}
                      <div ref="target" v-once></div>
                    </template>
                    <div
                      v-else
                      class="flex align-items-center justify-content-center flex-nowrap min-w-max"
                    >
                      <slot
                        :name="col.field"
                        v-bind="{ ...slotProps, settings }"
                      ></slot>
                    </div>
                  </template>
                  <template v-else-if="col?.type == 'text'" #body="slotProps">
                    <!-- to set 'OBSERVER' at last one -->
                    <template
                      v-if="
                        slotProps &&
                        slotProps.data &&
                        slotProps.data.type &&
                        slotProps.data.type === 'Last_OBSERVER'
                      "
                    >
                      {{ slotProps.data }}
                      <div ref="target" v-once></div>
                    </template>
                    <div
                      v-else
                      class="flex align-items-center justify-content-center flex-nowrap min-w-max"
                    >
                      <template
                        v-if="
                          col?.value &&
                          !$slots[col.field] &&
                          slotProps.data.type !== 'Last_OBSERVER'
                        "
                      >
                        {{
                          func_value_exec(
                            slotProps.data[col.field],
                            col.field,
                            col?.value
                          )
                        }}
                      </template>
                      <template
                        v-else-if="
                          !$slots[col.field] &&
                          slotProps.data.type !== 'Last_OBSERVER'
                        "
                      >
                        {{ slotProps.data[col.field] }}
                      </template>
                    </div>
                  </template>

                  <template v-else-if="col?.type == 'date'" #body="slotProps">
                    <!-- to set 'OBSERVER' at last one -->
                    <template
                      v-if="
                        slotProps &&
                        slotProps.data &&
                        slotProps.data.type &&
                        slotProps.data.type === 'Last_OBSERVER'
                      "
                    >
                      {{ slotProps.data }}
                      <div ref="target" v-once></div>
                    </template>
                    <div
                      v-else
                      class="flex align-items-center justify-content-center flex-nowrap min-w-max"
                    >
                      <!-- dayjs -->
                      <template v-if="slotProps.data?.[col.field]">
                        {{ dayjs(slotProps.data[col.field]) }}
                      </template>
                    </div>
                  </template>

                  <template
                    v-else-if="col?.type == 'component'"
                    #body="slotProps"
                  >
                    <div
                      class="flex align-items-center justify-content-center flex-nowrap min-w-max"
                      :class="{
                        'max-w-min w-max':
                          col_index == 0 && !AlsoCenterFirst_cell,
                      }"
                    >
                      <template v-if="api_URL">
                        <template v-if="true">
                          <!-- {{ slotProps.index }} -->
                          <div v-show="false">
                            {{ (val = {}) }}
                            {{
                              (val[slotProps.index] = handling_component_key(
                                col.field,
                                slotProps.data[col.field],
                                slotProps.index
                              ))
                            }}
                          </div>
 
                          <div v-show=""></div>
                          <!-- {{val[slotProps.index]?.component?.props}} -->
                          <!-- {{ val }} -->
                          <!-- {{ val?.[slotProps.index]?.res }} -->
 
                          <ComponentsLibraryToolsComponentHolderV2
                            v-if="val?.[slotProps.index].res"
                            :load_component="
                              () => val?.[slotProps.index]?.component?.type
                            "
                            v-bind="val?.[slotProps.index]?.component?.props"
                          />
                        </template>
                      </template>
 
                      <ComponentsLibraryToolsComponentHolderV2
                        v-else
                        :load_component="() => slotProps.data[col.field].type"
                        v-bind="slotProps.data?.[col.field]?.props"
                      />
                    </div>
                  </template>
                  <template v-else-if="col?.type == 'status'" #body="slotProps">
                    <!-- to set 'OBSERVER' at last one -->
                    <template
                      v-if="
                        slotProps &&
                        slotProps.data &&
                        slotProps.data.type &&
                        slotProps.data.type === 'Last_OBSERVER'
                      "
                    >
                      {{ slotProps.data }}
                      <div ref="target" v-once></div>
                    </template>
                    <div
                      v-else
                      class="flex align-items-center w-full justify-content-center flex-nowrap"
                    >
                      <Tag
                        class="wrapper-row align-items-center flex-nowrap w-min min-w-max"
                        :value="slotProps.data?.[col.field]"
                        :severity="
                          settings?.status_colors?.[slotProps.data?.[col.field]]
                        "
                      />
                    </div>
                  </template>
                  <template
                    v-else-if="col?.type == 'actions'"
                    #body="slotProps"
                  >
                    <!-- to set 'OBSERVER' at last one -->
                    <template
                      v-if="
                        slotProps &&
                        slotProps.data &&
                        slotProps.data.type &&
                        slotProps.data.type === 'Last_OBSERVER'
                      "
                    >
                      {{ slotProps.data }}
                      <div ref="target" v-once></div>
                    </template>

                    <div
                      v-else-if="!(slotProps.data?.type == 'Last_OBSERVER')"
                      class="wrapper-row align-items-center justify-content-center flex-nowrap"
                    >
                      <template v-if="props.FormConfigurator">
                        <div
                          v-if="
                            props.icons.length == 0 || props.layout.length == 0
                          "
                          style="color: red"
                        >
                          You Active FormConfigurator without pass
                          <a
                            href=""
                            v-tooltip.bottom="
                              'Click to know more about `icons prop` structure'
                            "
                            >icons</a
                          >
                          |
                          <a
                            href=""
                            v-tooltip.bottom="
                              'Click to know more about `layout prop` structure'
                            "
                            >layout</a
                          >
                        </div>
                        <div
                          v-else
                          class="flex align-items-center justify-content-center"
                        >
                          <span class="flex gap-2 align-items-center mr-1">
                            <span
                              v-for="(icon, index) in props.icons"
                              :key="icon.class"
                              @click="
                                handleData(
                                  icon.emit,
                                  icon?.type,
                                  icon?.url,
                                  icon?.dialogHeader,
                                  icon?.btnText,
                                  slotProps.data?._id
                                )
                              "
                            >
                              <i class="cursor-pointer" :class="icon.class"></i>
                            </span>
                          </span>

                          <Button
                            v-if="
                              slotProps.data?.actions_btns
                                ? slotProps.data?.actions_btns
                                : settings.actions_btns
                            "
                            v-for="(item, index) in slotProps.data?.actions_btns
                              ? slotProps.data?.actions_btns
                              : settings.actions_btns"
                            :key="item"
                            class="p-2 font-size-small"
                            link
                            style="
                              transform: translate(0px, 0px);
                              text-decoration: underline;
                            "
                            @click="() => btns_click?.[item]?.(slotProps.data)"
                            >{{ item }}</Button
                          >
                        </div>
                      </template>
                      <template v-else>
                        <Button
                          v-if="
                            slotProps.data?.actions_btns
                              ? slotProps.data?.actions_btns
                              : settings.actions_btns
                          "
                          v-for="(item, index) in slotProps.data?.actions_btns
                            ? slotProps.data?.actions_btns
                            : settings.actions_btns"
                          :key="item"
                          class="p-2 font-size-small"
                          link
                          style="
                            transform: translate(0px, 0px);
                            text-decoration: underline;
                          "
                          @click="() => btns_click?.[item]?.(slotProps.data)"
                          >{{ item }}</Button
                        >
                      </template>
                      <template
                        v-if="
                          slotProps.data?.actions_menu?.length ||
                          settings?.actions_menu?.length
                        "
                      >
                        <i
                          class="pi pi-ellipsis-v cursor-pointer"
                          aria-controls="overlay_menu"
                          style="transform: translate(0px, 0px)"
                          @click="
                            (event) => {
                              actions_menu = slotProps.data?.actions_menu
                                ? slotProps.data?.actions_menu
                                : settings?.actions_menu
                              actions_menu = actions_menu.map((item) => {
                                let ob_of_item = item
                                ob_of_item.items = item.items?.map((it) => {
                                  let items_of_menu = it
                                  items_of_menu.command = (event) =>
                                    Actions_click(slotProps?.data, event)
                                  return items_of_menu
                                })
                                return ob_of_item
                              })
                              menu[0].toggle(event)
                            }
                          "
                        ></i>
                        <Menu
                          ref="menu"
                          id="overlay_menu"
                          :model="actions_menu"
                          :popup="true"
                        />
                      </template>
                    </div>
                  </template>
                </Column>
              </template>
 
              <template v-if="$slots?.[`After_${col.field}`]">
                <slot
                  :name="`After_${col.field}`"
                  v-bind="{ ...slotProps, settings }"
                ></slot>
              </template>
            </template>
 
            <template v-if="$slots?.['Last']">
              <slot :name="'Last'" v-bind="{ ...slotProps, settings }"></slot>
            </template>
          </template>
        </template>

        <!-- <template #loading>
          <ProgressSpinner
              style="width: 50px; height: 50px"
              strokeWidth="6"
              fill="transparent"
            />
        </template> -->

        <!-- inherit slots -->
        <template
          v-for="(key, index) in slots_keys_computed"
          :key="key"
          v-slot:[key]
        >
          <slot :name="key"></slot>
        </template>
      </DataTable>

      <!-- Responsive -->
      <!-- template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" -->
      <!-- template:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" -->
      <!-- {{width}} -->
      <Paginator
        v-if="isPagination"
        :rows="limit_DataTable"
        :first="first_DataTable"
        :totalRecords="totalRecords_DataTable"
        @page="changePage"
        :rowsPerPageOptions="dd_RowsPerPage_items"
        @update:rows="row_update"
        :template="
          width < 582
            ? 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink'
            : 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
        "
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
      ></Paginator>

      <template v-else>
        <!-- jest exist outside Datatable make target inside Datatable works -->
        <div v-if="!slots?.default" ref="target" v-once></div>

        <!-- it's ignore for now -->
        <!-- <div
          v-if="isLoading_data"
          class="flex justify-content-center align-items-center"
        >
          <ProgressSpinner
            style="width: 50px; height: 50px"
            strokeWidth="6"
            fill="transparent"
          />
        </div> -->
      </template>
    </template>
    <template v-else-if="columns?.length && columns?.length == 0">
      <DataTable :value="[{}]" :loading="$attrs?.loading ? $attrs.loading : isLoading_data" >
        <Column
          header="Attention"
          :pt="{
            headercontent: 'text-center justify-content-center',
            bodycell: 'text-center',
          }"
        >
          <template #body="slotProps"> No Columns Found </template>
        </Column>
      </DataTable>
    </template>
    <template v-else>
      <DataTable :value="[{}]" :pt="{}" :loading="$attrs?.loading ? $attrs.loading : isLoading_data" >
        <Column
          header="Attention"
          :pt="{
            headercontent: 'text-center justify-content-center',
            bodycell: 'text-center',
          }"
        >
          <template v-if="api_fetch_error" #body="slotProps"
            ><span style="color: red"
              >API Fetch Error: {{ api_statusMessage }} :
              {{ api_statusCode }}</span
            ></template
          >
          <template v-else-if="api_no_result_in_response" #body="slotProps"
            >No (Response.result) key from API
          </template>
          <template v-else #body="slotProps">No Data Found</template>
        </Column>
      </DataTable>
    </template>
  </template>
</template>
<script setup>
import { ref, useSlots, computed, onMounted, onUnmounted, watch } from "vue"
import dayjs from "dayjs"
import { useInfiniteQuery } from "@tanstack/vue-query"
import { useIntersectionObserver } from "@vueuse/core"
import { useRoute } from "vue-router"

// temp solution is to Import the keys all of it at one time for POC
 
// we should to make it dynamic to import only the specific key
// we should to store this result in cash
import { data_keys as datatable_keys } from "@/config/datatable_keys"
import { data_keys as components_keys } from "@/config/components_keys"
import { useConfirm } from "primevue/useconfirm";
import { elements } from "chart.js"

defineOptions({ inheritAttrs: false })

// main structure
const settings = ref({})
const rows = ref([{}])
const columns = ref([])

// for auto Handling menu dropdown
const menu = ref(null)
const actions_menu = ref()

// define props
const props = defineProps({
  api_URL: {
    type: String,
    required: false,
    default: null,
  },
  resp: {
    type: Object,
    required: false,
    default: null,
  },
  btns_click: {
    type: Object,
    required: false,
    default: null,
  },
  menu_click: {
    type: Object,
    required: false,
    default: null,
  },
 
  AlsoCenterFirst_cell: false,
 
  pt_columns: {
    type: Object,
    required: false,
    default: () => {},
  },

  // Ahmed Taher Futures
  FormConfigurator: {
    type: Boolean,
    require: false,
    default: false,
  },

  icons: {
    type: Array, // i need to make array of object
    require: false,
    default: [],
  },

  layout: {
    type: Array, // i need to make array of object
    require: false,
    default: [],
  },

  isPagination: {
    type: Boolean,
    require: false,
    default: true,
  },

  header: {
    type: String,
    require: false,
    default: "",
  },

  isSearch: {
    type: Boolean,
    default: false,
  },

  searchPlaceholder: {
    type: String,
    default: "Search",
  },

  isFilterBy:{
    type : Boolean ,
    default: false,
  },

  isFilterDate:{
    type : Boolean ,
    default: false,
  },

  datatable_key:{
    type: String ,
    default: "",
  }

})


const resp_computed = ref(null)

// for Pagination for single Table
const route = useRoute()
const router = useRouter()

// <- Data Table settings ->

const limit_DataTable = ref(
  route.query?._limit ? Number(route.query._limit) : 5
) // Rows per Pages


const page_DataTable = ref(route.query?._page ? route.query?._page : 1) // the of data table Page
const totalRecords_DataTable = ref(100) // total Records to set the page

const first_DataTable = computed(
  () => page_DataTable.value * limit_DataTable.value - limit_DataTable.value
)

const dd_RowsPerPage = ref(limit_DataTable.value)

watch(dd_RowsPerPage, (newVal) => {
  if (limit_DataTable.value != newVal) {
    limit_DataTable.value = newVal
  }
})

const row_update = (row) => {
  dd_RowsPerPage.value = row
}

const dd_RowsPerPage_items = ref([5, 10, 25, 50])

const changePage = (paramPage) => {
  page_DataTable.value = paramPage.page + 1
  if (props.isPagination && props.api_URL) {
    router.replace({
      path: route.path,
      query: { _page: page_DataTable.value, _limit: limit_DataTable.value },
    })
  }
}

watch(page_DataTable, () => {
  if (props.isPagination && props.api_URL) {
    handling_resp(true)
  }
})

watch(dd_RowsPerPage, () => {
  if (props.isPagination && props.api_URL){
    handling_resp(true)
    router.replace({
      path: route.path,
      query: { _page: page_DataTable.value, _limit: limit_DataTable.value },
    })
  }
})

// Search

const search = ref("")

const search_deb = refDebounced(search, 500)

watch(
  () => search_deb.value,
  () => {
    if (props.isPagination) {
      handling_resp(true)
    }
  }
)

const first_time_api_call = ref(false);
var previous_api_call = null
let flag2 = 0

var body_ =   {
  "match_values": {
            
        },

  "match_dates":{

  },

  "sort_object":{

  },


  "datatable_key":props.datatable_key
}

const fn = async () => {
  if (props?.resp) {
    resp_computed.value = props.resp
  } else if (props.isPagination && props?.api_URL && !(resp_computed.value)) {
    
    if (first_time_api_call.value == false) {
      first_time_api_call.value = true;
      // previous_api_call = await useMyFetch(props.api_URL, { params })
      let params = {
      page: page_DataTable.value,
      limit: limit_DataTable.value,
      search: search.value,
      }

      let body = body_
      resp_computed.value =  await useMyFetch(props.api_URL , { method: "POST" , params , body })
    }
    // else{
    //   resp_computed.value = previous_api_call
    // }
  }
}

watchEffect(async () => {
  fn()
})


const key_filter = ref(false);

// This function handles the filters
const handling_Filters = async (MenuPopFilterSelects_filter_data) => {

// Map through the filter data
let res_menu = await Promise.all(MenuPopFilterSelects_filter_data.map(async (item) => {
  // Check if the api_link exists
  if (item.modelItems?.api_link) {
    // console.log("api is call");
    let api_URL = item.modelItems.api_link;
    // Uncomment the below lines to make the API call
    let res = await useMyFetch(api_URL);
    item.modelItems = res.data;
  }
  // Return the item
  return item;
}));

// console.log("res_menu:", res_menu);

// Assign the result to MenuPopFilterSelects_filter
MenuPopFilterSelects_filter.value = res_menu;
key_filter.value = !key_filter.key_filter
}


const handling_Filters_ = async (MenuPopFilterSelects_filter_data) => {

let res_menu = MenuPopFilterSelects_filter_data.map(  (item)=>{
    if (item.modelItems?.api_link) {
      // console.log("api is call");
      let api_URL = item.modelItems.api_link
      // let res = await useMyFetch(props.api_URL)
      
      // item.modelItems = res
    }

    return  item
  })
  // console.log("res_menu:", res_menu);

  MenuPopFilterSelects_filter.value = res_menu
  key_filter.value = !key_filter.key_filter

}


let flag = 0
// on change page Im call my self 3 times 
// i should to call my self only two times 
// fist time for recall api 
// second time for set the data from api
const handling_resp = async (recall_api = false) => {
  
    // console.log(++flag)
  if (props.isPagination) {
    isLoading_data.value = true
    // first_time_api_call.value = false // this recall API 
    
    if (recall_api) {
      first_time_api_call.value = !recall_api    
      resp_computed.value = null
      return 
    }
  }

  var _resp_
  if (props?.resp) {
    _resp_ = resp_computed.value
    columns.value = _resp_?.headers ? _resp_.headers : []
    settings.value = _resp_?.settings ? _resp_.settings : []
    rows.value = _resp_?.rows ? _resp_?.rows : []

  } else if (props?.api_URL) {
    api_include_builder.value = true;
    api_fetch_error.value = false;
    api_no_result_in_response.value = null;
    api_statusCode.value = null;
    api_statusMessage.value = null;
    // FetchforNextPage.value = false; // maybe
    // Last_OBSERVER_isAdd.value = false;

    var structure

    let res = resp_computed.value

    
    if (res?.error?.statusMessage && res?.error?.statusCode) {
      api_statusCode.value = res.error?.statusCode
      api_statusMessage.value = res.error?.statusMessage

      api_fetch_error.value = true
      isLoading_data.value = false
      return
    } else {
      _resp_ = res?.data

    }

    // console.log("res:",res);

    if ((res == null && _resp_ == undefined ) || res.length == 0 && _resp_ == undefined  ) {
      return
    }

    


    var datatable_ob = _resp_?.datatable

    if (!datatable_ob) {
      api_include_builder.value = false
      return
    }

    if (!datatable_ob?.key) {
      api_include_builder.value = false
      return
    }

    // get the build structure from datatable_keys.js
    structure = datatable_keys?.[datatable_ob.key]
    if (!structure) {
      api_include_builder.value = false
      return
    }

    if (!_resp_?.result) {
      columns.value = undefined
      api_no_result_in_response.value = true
      return
    }

    if (_resp_?.total) {
      totalRecords_DataTable.value = _resp_.total
    }

    columns.value = structure?.headers ? structure.headers : []
    settings.value = structure?.settings ? structure.settings : []

    // set Validation for MenuPopFilterSelects_filter 
    
   
    
    var MenuPopFilterDates_filter_data = structure.settings?.MenuPopFilterDates_filter ? structure.settings?.MenuPopFilterDates_filter : MenuPopFilterDates_filter.value;
    
    if (MenuPopFilterDates_filter.value?.[0]?.isDefault) {
      
      MenuPopFilterDates_filter_data = MenuPopFilterDates_filter_data.map((item)=>{
          item.selectedItems= {
                from: "",
                to: "",
          }
          return item
        })
      

    }
    MenuPopFilterDates_filter.value = MenuPopFilterDates_filter_data;


    let MenuPopFilterSort_filter_data = structure.settings?.MenuPopFilterSort_filter ? structure.settings?.MenuPopFilterSort_filter : [];
    if (MenuPopFilterSort_filter.value?.[0]?.isDefault) {
      
      MenuPopFilterSort_filter_data = MenuPopFilterSort_filter_data.map((item)=>{
        item.selectedItems = "Default"
        return item
      })
    }
    
    MenuPopFilterSort_filter.value = MenuPopFilterSort_filter_data;

    let MenuPopFilterSelects_filter_data = structure.settings?.MenuPopFilterSelects_filter ? structure.settings?.MenuPopFilterSelects_filter : MenuPopFilterSelects_filter.value;

    // async cal api & set for improve the response
    handling_Filters(MenuPopFilterSelects_filter_data) 

    if (!props.isPagination && !FetchforNextPage.value) {
      
      rows.value = _resp_?.result ? _resp_.result : [] // if we delete it the observer will show
      
      if (rows.value.length) {
        if (!Last_OBSERVER_isAdd.value) {
          rows.value.push({ type: "Last_OBSERVER" })
          Last_OBSERVER_isAdd.value = true
        }
      }

      FetchforNextPage.value = true
    }
    else{
      rows.value = _resp_?.result ? _resp_.result : []
    }
  }

  if (props.isPagination) {
    isLoading_data.value = false
  }
    

  return _resp_
}

const handling_resp_scroll = async () => {
  if (props.isPagination) {
    isLoading_data.value = true
  }
 
  let _resp_ = resp_computed.value
  var structure
  if (props?.api_URL) {
    let params = {
      page: page_DataTable.value,
      limit: limit_DataTable.value,
      search: search.value,
    }
 
 
    let res = await useMyFetch(props?.api_URL, {method: "POST"  , params })
 
    if (res.error.value?.statusMessage && res.error.value?.statusCode) {
      api_statusCode.value = res.error.value?.statusCode
      api_statusMessage.value = res.error.value?.statusMessage
 
      api_fetch_error.value = true
      return
    } else {
      _resp_ = res.data.value
    }
 
    // console.log("_resp_:", _resp_)
 
    var datatable_ob = _resp_?.datatable
 
 
    if (!datatable_ob) {
      api_include_builder.value = false
      return
    }
 
 
    if (!datatable_ob?.key) {
      api_include_builder.value = false
      return
    }
 
 
    // get the build structure from datatable_keys.js
    structure = datatable_keys?.[datatable_ob.key]
    if (!structure) {
      api_include_builder.value = false
      return
    }
 
 
    if (!_resp_?.result) {
      columns.value = undefined
      api_no_result_in_response.value = true
      return
    }
 
    if (_resp_?.total) {
      totalRecords_DataTable.value = _resp_.total
    }
  }
 
 
  // set the values of API
  columns.value = structure?.headers ? structure.headers : _resp_?.headers
 
 
  if (props.isPagination == true) {
    rows.value = _resp_?.result
      ? _resp_.result
      : _resp_?.rows
      ? _resp_.rows
      : _resp_?.result
   
  } else if (!FetchforNextPage.value) {
    // console.log("rows is 0");
    rows.value = _resp_?.result ? _resp_.result : []// if we delete it the observer will show
    // page_DataTable.value = Number(page_DataTable.value) - 1
    if (rows.value.length) {
               
      if (!Last_OBSERVER_isAdd.value) {
        rows.value.push({ type: "Last_OBSERVER" })
        Last_OBSERVER_isAdd.value = true
      }
    }
 
    FetchforNextPage.value = true
  }
 
  settings.value = structure?.settings ? structure.settings : _resp_?.settings
 
  if (props.isPagination) {
    isLoading_data.value = false
  }
 
  return _resp_
}

let renderOneTime = 0
watch(resp_computed, ()=>{
  nextTick(()=>{
    if (props.isPagination) {
      handling_resp()
    }
  })
  
} )
const api_include_builder = ref(true)

const api_fetch_error = ref(false)
const api_statusCode = ref(null)
const api_statusMessage = ref(null)
const api_no_result_in_response = ref(null)

const FetchforNextPage = ref(false)



// bool for last is added
const Last_OBSERVER_isAdd = ref(false)

// Form Configurator
const emitType = ref("")
const confirm = useConfirm()
const showData = ref(false)
const oldId = ref("")
const processing = ref(false)

const layout = props.layout

const handleData = async (emit, type, url, dialogHeader, btnText, id) => {
  console.log("handleData")
  console.log(emit, type, url, dialogHeader, btnText, id)
  emitType.value = ""
  dialogHead.value.type = type ? type : ""
  if (emit === "delete") {
    if (type == "confirm") {
      confirm.require({
        message: "Do you want to delete this record?",
        header: "Delete Confirmation",
        icon: "pi pi-info-circle",
        rejectClass: "p-button-text p-button-text",
        acceptClass: "p-button-danger p-button-text",
        accept: async () => {
          processing.value = true
          isLoading_data.value = true
          await useMyFetch(url + `/${id}`, {
            method: "DELETE",
          })
            .then((res) => {
              console.log(id)
              rows.value = rows.value.filter((item)=>{
                console.log(item)
                return item._id !== id
              })
            })
            .finally(() => {
              processing.value = false
              isLoading_data.value = false

            })
        },
      })
    } else {
      processing.value = true

      await useMyFetch(url + `/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          console.log(res)
        })
        .finally(() => {
          processing.value = false
        })
    }
  } else if (emit === "update") {
    showData.value = false
    dialogHeaderVal.value = dialogHeader
    btnTextVal.value = btnText
    if (oldId.value === id) {
      visible.value = true
      return
    }

    //  await getRecordData(props.getRecordData + `/${id}`).then((res) => {
    //    layout.value = res.data.value
    //  })

    visible.value = true
    //  }
  } else if (emit === "show") {
    dialogHeaderVal.value = dialogHeader

    emitType.value = emit
    showData.value = true
    if (oldId.value === id) {
      visible.value = true
      return
    }
    visible.value = true
  }
  oldId.value = id
  console.log(visible.value)
}

const dialogHead = ref({
  type: "dialog",
})

//ifnormation for current emit
const dialogHeaderVal = ref("")
const btnTextVal = ref("")
const dialogType = ref("")

const visible = ref(false)

// infinity scroll

// // Initialize target to null
const target = ref(null)

// // Initialize target visibility to false
const targetIsVisible = ref(false)

// // Initialize loading state to false
const isLoading_data = ref(false)

if (props.isPagination == false) {
  const { suspense } = useInfiniteQuery({
    // we can use same api url as queryKey
    queryKey: [],
    queryFn: async () => {
      let res = []
      // if (FetchforNextPage.value) {
      //   res = await handling_resp()
      // }

      // let params = {
      // page: page_DataTable.value,
      // limit: limit_DataTable.value,
      // search: search.value,
      // }

      // let res_api = await useMyFetch(props.api_URL, { params })
      
      // resp_computed.value =  res_api
      res = await handling_resp_scroll()

      
      return res
    },
    getNextPageParam: (lastPage, pages) => {
      // console.log("lastPage:",lastPage); // value of last page
      // console.log("lastPage.nextCursor:",lastPage.nextCursor); // undefined
      // console.log("pages:",pages); // number page
      return lastPage.nextCursor
    },
  })

  onServerPrefetch(async () => {
    await suspense()
  })
  const { data, error, isError, isLoading, fetchNextPage, isFetching } =
    await suspense()

  // leads_list.value = data.pages[0].data.value.products
  // totalResults.value = data.pages[0].data.value.total
  // console.log(data.pages)

  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
      targetIsVisible.value = isIntersecting
    }
  )

  // Watch the target visibility
  watch(
    () => targetIsVisible.value,
    async (newVal) => {
      let data_list_length = null
      console.log("targetIsVisible:", newVal)
      console.log("target", target.value)

      // If the target is visible
      if (targetIsVisible.value) {
        const func = async () => {
          isLoading_data.value = true
          // While the target is visible
          while (targetIsVisible.value) {
            // If the target is not visible, break the loop
            if (!targetIsVisible.value) {
              isLoading_data.value = false
              break
            }

            // get before length
            data_list_length = rows.length

            // Call the API
            // await onAPI_call()

            // Increment the page number
            page_DataTable.value = Number(page_DataTable.value) + 1

            // await new Promise(resolve => setTimeout(resolve, 10));

            let res = await fetchNextPage({
              pageParam: Number(page_DataTable.value),
            })

            let result = res.data.pages[res.data.pages.length - 1].result

            //  console.log("result:",result);
            //  console.log("rows:",rows.value);

            if (result.length) {
              if (Last_OBSERVER_isAdd.value) {
                rows.value.pop()
                Last_OBSERVER_isAdd.value = false
              }

              rows.value.push(...result)
              // console.log("rows:",rows.value);

              if (props.isPagination == false) {
                if (rows.value.length) {
                  // console.log(Last_OBSERVER_isAdd.value)
                  if (!Last_OBSERVER_isAdd.value) {
                    rows.value.push({ type: "Last_OBSERVER" })
                    // console.log("rows.value.length:",rows.value );
                    Last_OBSERVER_isAdd.value = true
                  }
                }
              }
            } else {
              // result it empty
              isLoading_data.value = false
              page_DataTable.value = Number(page_DataTable.value) - 1
              break
            }
            // console.log("rows.value:", rows.value );

            // Wait for 10 milliseconds
            await new Promise((resolve) => setTimeout(resolve, 10))

            // Increment the page number
            // data_page.value = data_page.value + 1

            // If the users list is empty, break the loop
            if (rows.value.length === 0) {
              isLoading_data.value = false
              break
            }

            // If the target is not visible, break the loop
            if (!targetIsVisible.value) {
              isLoading_data.value = false
              break
            }

            // if before list length it's same break
            if (data_list_length == rows.value.length) {
              isLoading_data.value = false
              break
            }
          }
        }

        // Call the function
        await func()
      }
    }
  )
}
 
// if the type for the column it's component
// we pass column_field through this function
const handling_component_key = (column_field, field_data, index) => {
  // column_field just name of the component field
  // console.log("column_field:",column_field); // customer
 
  var _res = true
 
  let _resp_ = resp_computed.value
 
  let component_field = _resp_?.[column_field]
 
  if (!component_field) {
    return {
      res: false,
      msg: `There is No key Name in Response for this column_field (Response.${column_field})`,
    }
  }
 
  if (!component_field?.key) {
    return {
      res: false,
      msg: `There is No key in Response for this column_field (Response.${column_field}.key)`,
    }
  }
 
  var component_ob = components_keys?.[component_field.key]
  // console.log("component_ob:",component_ob);
 
  if (!component_ob) {
    return {
      res: false,
      msg: `Response.${column_field}.key is not Valid (there is no Component with this key)`,
    }
  }
 
  let keys_props = Object.keys(component_ob.props)
 
  for (let key of keys_props) {
    // val is the key name witch is in response
    let val = component_ob.props[key]
 
    // console.log("field_data?.[val]:",field_data?.[val]);
    if (field_data?.[val]) {
      component_ob.props[key] = field_data[val]
    } else if (!val) {
      let _msg = `The field_data dose not have a value for '${key}' key in response for (Response.result.[${index}].${column_field})`
      // _msg += `\nthis mean we add this key '${key}' to this field_data and use this value as default value for component`
      console.warn(_msg)
 
      // in ths case we assign the key as default value
      // return { res: false, msg: _msg }
    } else {
      let _msg = `There is No key (${key}) in response for (Response.result.[${index}].${column_field})`
      console.error(_msg)
      // return { res: false, msg: _msg }
      _res = false
    }
  }
  console.log({ res: _res, component: component_ob })
 
  return { res: _res, component: component_ob }
}

const Actions_click = async (data, event) => {
  props.menu_click?.[event?.item?.label]?.(data, event)
}
 
// slots handling
 
const slots = useSlots()
// console.log("slots:",slots);
const slots_list = computed(() => slots?.default())
// console.log("slots:",slots);
const allAreSymbolVCMT = computed(() =>
  slots_list.value.every((item) => item.type.toString() === "Symbol(v-cmt)")
)

// Function to execute value
const func_value_exec = (object_data, col_field, value) => {
  try {
    let func = new Function(col_field, "return " + value)
    return func(object_data)
  } catch (error) {
    console.warn("func_value_exec:", error)
    return undefined
  }
}

const slotProps = ref(null)

function removeItemFromArray(array, itemToRemove) {
  return array.filter((item) => item !== itemToRemove)
}

const slots_keys_computed = computed(() =>
  removeItemFromArray(Object.keys(slots), "default")
)

// width for responsive calc
const width = ref(0)
if (props.isPagination) {
    
  onMounted(() => {
    width.value = window.innerWidth
    window.addEventListener("resize", updateWidth)
  })

  onUnmounted(() => {
    window.removeEventListener("resize", updateWidth)
  })

  function updateWidth() {
    width.value = window.innerWidth
  }

}



const key_data = ref(1000)

const MenuPopFilterSelects_filter = ref([
  {
    label: "Default test",
    modelItems: ["Not From API", "DISCONTINUED", "REORDER POINT", "IN STOCK", "OUT OF STOCK"],
    selectedItems: "Not From API",
  },
])

const btn_filter_submit = (value) => {
  MenuPopFilterSelects_filter.value = value.value
  // console.log("value submit:", value.value);
  // body_

  MenuPopFilterSelects_filter.value.map(
    (item)=>{
      body_.match_values[item.field] = item.selectedItems
    }
  )

  nextTick(()=>{
    // cal_api
    handling_resp(true)
  })

}

const btn_filter_clear = (value) => {
  MenuPopFilterSelects_filter.value = value.value
  body_.match_values = {};


  nextTick(()=>{
    // cal_api
    handling_resp(true)
  })
}




const MenuPopFilterDates_filter = ref([
  {
    isDefault: true,
    label: "Default test",
    selectedItems: {
      from:"",
      to:""
    },
  },
])



const btn_filter_submit_date = (value) => {
  // MenuPopFilterDates_filter.value = value.value
  // console.log("value submit:", value.value);
  // // body_

  MenuPopFilterDates_filter.value.map(
    (item)=>{
      
      body_.match_dates[item.field] = {
        from: item.selectedItems.from,
        to: item.selectedItems.to
      }
    }
  )

  nextTick(()=>{
    // cal_api
    handling_resp(true)
  })

}

const btn_filter_clear_date = (value) => {
  MenuPopFilterDates_filter.value = value.value
  body_.match_dates = {};


  nextTick(()=>{
    // cal_api
    handling_resp(true)
  })
}


const MenuPopFilterSort_filter = ref([
  {
    isDefault: true,
    label: "Default test",
    selectedItems: "Default",
  },
])




const btn_filter_submit_sort = (value) => {
  MenuPopFilterSort_filter.value = value.value
  // console.log(value);
  // // console.log("value submit:", value.value);
  // // body_

  MenuPopFilterSort_filter.value.map(
    (item)=>{
      let select = item.selectedItems
      if (item.selectedItems == "Default") {
        select = null
      }
      if (item.selectedItems == "Ascending") {
        select = 1
      }

      if (item.selectedItems == "Descending") {
        select = -1
      }

      body_.sort_object[item.field] = select
    }
  )

  nextTick(()=>{
    // cal_api
    handling_resp(true)
  })

}

const btn_filter_clear_sort = (value) => {
  MenuPopFilterSort_filter.value = value.value
  body_.sort_object = {};


  nextTick(()=>{
    // cal_api
    handling_resp(true)
  })
}


// for slots props 
const reactive_refs = reactive({
  search_model:search,
  FilterBy_model : MenuPopFilterSelects_filter,
  FilterDate_model : MenuPopFilterDates_filter,
  FilterSort_model : MenuPopFilterSort_filter
});

const reactive_FilterBy_options = reactive({
  btn_filter_submit: btn_filter_submit,
  btn_filter_clear: btn_filter_clear,
  key_filter: key_filter

})


const reactive_FilterDate_options = reactive({
  btn_filter_submit: btn_filter_submit_date,
  btn_filter_clear: btn_filter_clear_date,
  key_filter: key_filter
})


const reactive_FilterSort_options = reactive({
  btn_filter_submit: btn_filter_submit_sort,
  btn_filter_clear: btn_filter_clear_sort,
  key_filter: key_filter
})
</script>
<style lang="scss">
// for first cell for give responsive for the cell also // Not for now
 
// this is specific for handling Component width
.responsive_width > td.component_type {
  width: 0rem !important; // this for make the first cell fit-content without wrap
  // min-width: 12rem;
  // max-width: max-content;
}

.class_thead {
  z-index: 1;
}

// make last row hidden when we props.isPagination == false
// because last row it will become for infinity Scroll observer
.last_row_hidden {
  tr:nth-last-child(1) {
    visibility: hidden;
    background-color: aquamarine;
    height: 0.01px !important;

    td {
      padding: 0px !important;
    }
  }
}
.component-overlay {
  background: none !important;
  z-index: 2;
  pointer-events: all;
}
</style>