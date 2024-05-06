<template>
  <Button outlined class="shady-border" severity="secondary"  @click.prevent="dialog = true">
    <i class="pi pi-filter"></i>&nbsp;{{ btn_text }}
  </Button>
  <Dialog
    v-model:visible="dialog"
    modal
    header="Filter by"
    :style="{ 'min-width': '30vw', 'max-width': '550px' }"
  >
    <div class="flex align-items-center gap-2 mb-3" >
      <Checkbox v-model="isDate" :binary="true" name="date_range" inputId="date_range"></Checkbox>
      <label for="date_range">Date</label>
    </div>
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
    <div class="flex align-items-center gap-2 mt-3">
      <Checkbox v-model="isProgress" :binary="true" name="progress" inputId="progress"></Checkbox>
      <label for="progress">Progress</label>
    </div>
    <div class="filter__status_chip_wrap mt-3 mb-2">
      <span
        class="filter__chip"
        @click.prevent="isProgress && changeProgress(index)"
        :class="{ active: item.is_checked, disabled: !isProgress }"
        v-for="(item, index) in progress"
        >{{ item.text }}</span
      >
    </div>

    <div class="flex align-items-center gap-2 mt-3">
      <Checkbox
        v-model="isType"
        :binary="true"
        name="customer_type"
        inputId="customer_type"
      ></Checkbox>
      <label for="customer_type">Customer Type</label>
    </div>
    <div class="filter__status_chip_wrap mt-3 mb-2">
      <span
        class="filter__chip"
        @click.prevent="isType && changeCustomerType(index)"
        :class="{ active: item.is_checked, disabled: !isType }"
        v-for="(item, index) in customer_type"
        >{{ item.text }}</span
      >
    </div>
    <div class="flex align-items-center gap-2 mt-3">
      <Checkbox
        v-model="isPerson"
        :binary="true"
        name="assign_person"
        inputId="assign_person"
      ></Checkbox>
      <label for="assign_person">Assigned to person</label>
    </div>
    <Dropdown
      :options="select_items"
      placeholder="Select person"
      class="mt-3"
      show-clear
      v-model="assignedPerson"
      :disabled="!isPerson"
    >
    </Dropdown>
    <div class="flex align-items-center gap-2 mt-3">
      <Checkbox v-model="isStep" :binary="true" name="steps" inputId="steps"></Checkbox>
      <label for="steps">Step</label>
    </div>
    <div class="filter__status_chip_wrap_step mt-3">
      <span
        class="filter__chip"
        @click.prevent="isStep && changeSteps(index)"
        :class="{ active: item.is_checked, disabled: !isStep }"
        v-for="(item, index) in steps"
        >{{ item.text }}</span
      >
    </div>
    <div class="cf__actions mt-5 mb-2 gap-2">
      <Button class="shady-border" outlined severity="secondary" @click.prevent="resetFilter"
        >Clear Filters</Button
      ><Button @click.prevent="submitFilter">Submit</Button>
    </div>
  </Dialog>
</template>
<script>
export default {
  name: "LeadsFilter",
  emits: {
    submit: null,
  },
  props: {
    btn_text: {
      type: String,
      default: "Filter",
    },
    select_items: {
      type: Array,
      default() {
        return ["Sara Nukari", "Karishma Patel", "Nour Ibrahim", "Neha Verma"];
      },
    },
    checkbox:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      assignedPerson: null,
      dialog: false,
      maxDate: new Date(),
      date_range: null,
      progress: [
        {
          text: "New Leads",
          is_checked: false,
        },
        {
          text: "Not Contacted",
          is_checked: false,
        },
        {
          text: "Contacted",
          is_checked: false,
        },
      ],
      customer_type: [
        {
          text: "Corporate",
          is_checked: false,
        },
        {
          text: "Individual",
          is_checked: false,
        },
      ],
      steps: [
        {
          text: "Contact Client",
          is_checked: false,
        },
        {
          text: "Email Profile",
          is_checked: false,
        },
        {
          text: "Create Proposal",
          is_checked: false,
        },
        {
          text: "Proposal Approval",
          is_checked: false,
        },
        {
          text: "Talent's Profile",
          is_checked: false,
        },
        {
          text: "Collect Documents",
          is_checked: false,
        },
        {
          text: "Create Invoice",
          is_checked: false,
        },
      ],
      isDate: false,
      isProgress: false,
      isType: false,
      isPerson: false,
      isStep: false,
    };
  },
  methods: {
    resetFilter() {
      this.date_range = null;
      this.assignedPerson = null;
      this.isDate = false;
      this.isPerson = false;
      this.isProgress = false;
      this.isStep = false;
      this.isType = false;

      this.progress.map((item) => ({
        ...item,
        is_checked: false,
      }));
      this.customer_type.map((item) => ({
        ...item,
        is_checked: false,
      }));
      this.steps.map((item) => ({
        ...item,
        is_checked: false,
      }));
    },
    submitFilter() {
      let payload = {
        date_range: this.isDate ? this.date_range : null,
        progress: this.isProgress ? this.progress.filter((x) => x.is_checked == true) : null,
        customer_type: this.isType ? this.customer_type.filter((x) => x.is_checked == true) : null,
        assignedPerson: this.isPerson ? this.assignedPerson : null,
        step: this.isStep ? this.steps.filter((x) => x.is_checked == true) : null,
      };
      this.$emit("submit", payload);
      this.dialog = false;
    },
    changeProgress(index) {
      this.progress[index].is_checked = !this.progress[index].is_checked;
    },
    changeCustomerType(index) {
      this.customer_type[index].is_checked = !this.customer_type[index].is_checked;
    },
    changeSteps(index) {
      this.steps[index].is_checked = !this.steps[index].is_checked;
    },
  },
};
</script>
<style lang="scss">
.filter__status_chip_wrap {
  display: inline-flex;
  column-gap: 10px;
}
.filter__status_chip_wrap_step {
  display: flex !important;
  flex-wrap: wrap !important;
  max-width: 100% !important;
  column-gap: 10px !important;
  row-gap: 10px !important;
}
</style>
