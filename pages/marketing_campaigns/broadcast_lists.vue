<template>
  <div class="wrapper-column">
    <!-- Heading & add new btn -->
    <div class="item card">
      <div class="wrapper-row">
        <div class="item">
          <div class="flex align-items-center h-full">
            <h3 class="font-bold">Broadcast List</h3>
          </div>
        </div>
      </div>
    </div>

    <div class="item mt-3 expand card">
      <div class="wrapper-column">
        <div class="item expand">
          <ComponentsLibraryRpDataTable
            class="h-27rem"
            :api_URL="api_URL"
            :isPagination="true"
            :isSearch="true"
            header="All Campaigns"
            :isFilterBy="true"
            datatable_key="_campaigns_broadcast_key"
            :key="_key"
          >
            <template #datatable_header="slotsProps">
              <div class="flex justify-content-between my-4">
                <h3 class="text-gray font-light uppercase">
                  {{ campaign_type_list }}
                </h3>
                <MenuPopFilter
                  :inherent_attrs="true"
                  severity="secondary"
                  :items="slotsProps?.reactive_refs?.FilterBy_model"
                  @clear="slotsProps.FilterBy_options.btn_filter_clear"
                  @submit="slotsProps.FilterBy_options.btn_filter_submit"
                  :key="slotsProps.FilterBy_options.key_filter"
                  @selected="selected"
                />
              </div>
            </template>
            <template #campaign_message="slotsProps">
              <span v-html="slotsProps.data.campaign_message"></span>
            </template>
            <template #first_name="slotsProps">
              {{ slotsProps.data.first_name }} {{ slotsProps.data.last_name }}
            </template>
            <template #dnd_activated="slotsProps">
              <Tag
                class="wrapper-row align-items-center flex-nowrap w-min min-w-max"
                :value="
                  slotsProps.data.dnd_activated ? 'DND Enabled' : 'DND Disabled'
                "
                :severity="slotsProps.data.dnd_activated ? 'success' : 'danger'"
              />
            </template>
            <template #actions="slotsProps">
              <Button text @click="updateDnd(slotsProps.data._id, slotsProps.data.dnd_activated)">
                {{
                  slotsProps.data.dnd_activated ? "Disable DND" : "Enable DND"
                }}
              </Button>
            </template>
          </ComponentsLibraryRpDataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const baseURL = useRuntimeConfig().public.baseURL
const api_URL = `${baseURL}admin/campaigns/user_list`

const campaign_type_list = ref("mobile")
const selected = (e) => {
  campaign_type_list.value = e
}

const _key = ref(0);
const updateDnd = async (id, dnd) => {
  try {
    const { data } = await useMyFetch(`/admin/campaigns/customer/${id}`, {
      method: "PUT",
      body: {
        dnd_activated: !dnd,
      },
    })
    _key.value += 1;
  } catch (err) {
    console.log("error Response:", err)
  }
}
</script>

<style lang="scss">
.icon-container {
  border: 1px solid #e2e7f1;
  border-radius: 8px;
  padding: 0.2rem 0.4rem;
  cursor: pointer;
  &.active {
    border-color: #0a94ff !important;
    background-color: transparent !important;
    .pi {
      color: #0a94ff !important;
    }
  }
}
</style>
