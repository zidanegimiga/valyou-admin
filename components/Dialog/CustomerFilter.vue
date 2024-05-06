<template lang="">
  <div class="customer_filter_wrap">
    <Button outlined class="shady-border" severity="secondary" @click.prevent="dialog = true">
      <i class="pi pi-filter"></i>&nbsp;{{ btn_text }}
    </Button>
    <Dialog v-model:visible="dialog" modal header="Filter by" :style="{ 'min-width': '30vw' }">
      <div>
        <div class="flex align-items-center gap-2">
          <Checkbox v-model="isStatus" :binary="true" name="status" inputId="status"></Checkbox>
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
        <div class="flex align-items-center mt-3 mb-3 gap-2">
          <Checkbox
            v-model="isDate"
            inputId="customer_added_date"
            name="customer_added_date"
            :binary="true"
          ></Checkbox>
          <label for="customer_added_date">Customer added date</label>
        </div>
        <div>
          <DatePicker
            dateFormat="dd/mm/yy"
            name="date_range"
            v-model="date_range"
            selectionMode="range"
            :manualInput="false"
            :showIcon="true"
            placeholder="Select Date Range"
            :disabled="!isDate"
            :maxDate="maxDate"
            class="custom-date-picker w-full"
          />
        </div>
        <div class="flex align-items-center mt-3 mb-2 gap-2">
          <Checkbox
            hide-details
            v-model="isTypes"
            inputId="types_check"
            name="types_check"
            :binary="true"
          ></Checkbox>
          <label for="types_check">Type</label>
        </div>
        <div class="filter__status_chip_wrap">
          <span
            class="filter__chip"
            @click.prevent="isTypes && changeType(index)"
            :class="{ active: item.is_checked, disabled: !isTypes }"
            v-for="(item, index) in types"
            >{{ item.text }}</span
          >
        </div>
        <div class="cf__actions mt-3 mb-2 gap-2">
          <Button outlined class="shady-border" severity="secondary" @click.prevent="resetFilter">Clear Filters</Button>
          <Button @click.prevent="submitFilter">Done</Button>
        </div>
      </div>
    </Dialog>
  </div>
</template>
<script>
export default {
  name: "CustomerFilterDialog",
  emits: {
    submit: null,
  },
  props: {
    btn_text: {
      type: String,
      default: "Filter",
    },
  },
  data() {
    return {
      dialog: false,
      isStatus: false,
      status: [
        {
          text: "active",
          is_checked: false,
        },
        {
          text: "in active",
          is_checked: false,
        },
        {
          text: "on hold",
          is_checked: false,
        },
      ],
      isDate: false,
      date_range: new Date().toISOString().substr(0, 10),
      maxDate:new Date(),
      isTypes: false,
      types: [
        {
          text: "individual",
          is_checked: false,
        },
        {
          text: "corporate",
          is_checked: false,
        },
      ],
    };
  },
  methods: {
    changeStatus(index) {
      this.status[index].is_checked = !this.status[index].is_checked;
    },
    changeType(index) {
      this.types[index].is_checked = !this.types[index].is_checked;
    },
    resetFilter() {
      this.date_range = null;
      this.isDate = false;
      this.isStatus = false;
      this.status = this.status.map((item) => ({
        ...item,
        is_checked: false,
      }));
      this.isTypes = false;
      this.types = this.types.map((item) => ({
        ...item,
        is_checked: false,
      }));
    },
    submitFilter() {
      let payload = {
        date_range: this.isDate ? this.date_range : null,
        status: this.isStatus
          ? this.status.filter((item) => item.is_checked).map((item) => item.text)
          : [],
        types: this.isTypes
          ? this.types.filter((item) => item.is_checked).map((item) => item.text)
          : [],
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
  margin-top: 1rem;
}
.customer_filter_wrap{
  label{
    font-size: 0.9rem;
  }
}
</style>
