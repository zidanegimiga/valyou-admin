<template>
  <Button outlined class="shady-border" severity="secondary" @click.prevent="dialog = true">
    <i class="pi pi-filter"></i>&nbsp; {{ btn_text }}
  </Button>
  <Dialog
    class="card_container pa-6"
    v-model:visible="dialog"
    modal
    header="Filter by"
    :style="{ 'min-width': '30vw' }"
  >
    <div class="flex align-items-center gap-2">
      <Checkbox
        v-model="isStatus"
        class="custom_checkbox"
        :binary="true"
        name="status"
        input-id="status"
      ></Checkbox>
      <label for="status">Status</label>
    </div>
    <div class="filter__status_chip_wrap">
      <span
        class="filter__chip"
        @click.prevent="isStatus && changeStatus(index)"
        :class="{ active: item.is_checked, disabled: !isStatus }"
        v-for="(item, index) in status"
        >{{ item.text }}</span
      >
    </div>
    <div class="flex align-items-center gap-2 mt-3 mb-2">
      <Checkbox :binary="true" input-id="inactive" name="inactive" v-model="isInactive"></Checkbox>
      <label for="inactive">Inactive</label>
    </div>
    <DatePicker
      dateFormat="dd/mm/yy"
      name="date_range"
      class="custom-date-picker w-full"
      selectionMode="range"
      :manualInput="false"
      :showIcon="true"
      v-model="date_range_inactive"
      :disabled="!isInactive"
      :maxDate="maxDate"
    ></DatePicker>
    <div class="flex align-items-center gap-2 mt-3 mb-2 gap-2">
      <Checkbox v-model="isActive" :binary="true" input-id="active" name="active"></Checkbox>
      <label for="active">Active</label>
    </div>
    <DatePicker
      dateFormat="dd/mm/yy"
      name="date_range"
      class="custom-date-picker w-full"
      selectionMode="range"
      :manualInput="false"
      :showIcon="true"
      v-model="date_range_active"
      :disabled="!isActive"
      :maxDate="maxDate"
    ></DatePicker>

    <div class="cf__actions mt-4 mb-2 gap-2">
      <Button outlined class="shady-border" severity="secondary" @click.prevent="resetFilter"
        >Clear Filters</Button
      ><Button color="primary" @click.prevent="submitFilter">Done</Button>
    </div>
  </Dialog>
</template>
<script>
export default {
  name: "DatabaseFilterDialog",
  emits: {
    submit: null,
  },
  props: {
    btn_text: {
      default: "Filter",
      type: String,
    },
  },
  data() {
    return {
      dialog: false,
      isStatus: false,
      isInactive: false,
      isActive: false,
      status: [
        {
          text: "active",
          is_checked: false,
        },
        {
          text: "in active",
          is_checked: false,
        },
      ],
      date_range_active: null,
      date_range_inactive: null,
      maxDate: new Date(),
    };
  },
  methods: {
    changeStatus(index) {
      this.status[index].is_checked = !this.status[index].is_checked;
    },

    resetFilter() {
      this.date_range_active = null;
      this.date_range_inactive = null;

      this.isStatus = false;
      this.isActive = false;
      this.isInactive = false;
      this.status = this.status.map((item) => ({
        ...item,
        is_checked: false,
      }));
    },
    submitFilter() {
      let payload = {
        status: this.isStatus
          ? this.status.filter((item) => item.is_checked).map((item) => item.text)
          : [],
        date_range_active: this.isActive ? this.date_range_active : null,
        date_range_inactive: this.isInactive ? this.date_range_inactive : null,
      };
      this.$emit("submit", payload);
      this.dialog = false;
    },
  },
};
</script>
<style lang="scss">
.filter__status_chip_wrap {
  display: inline-flex;
  column-gap: 10px;
}
</style>
