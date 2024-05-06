<script setup>
import Calendar from 'primevue/calendar';
</script>


<template lang="">
  <div>
    <Button
      v-if="inherent_attrs" v-bind="$attrs" 
      :icon="icon"
      outlined
      class="custom__icon_btn shady-btn"
      @click.prevent="toggle"
    />
    <Button
      v-else
      :icon="icon"
      outlined
      class="custom__icon_btn shady-btn"
      @click.prevent="toggle"
    />
    <OverlayPanel ref="op" id="overlay_menu">
      <div v-for="(item, index) in value" :key="index" class="mb-3">
        <div class="flex align-items-center">
          <Checkbox
            v-model="item.checked"
            :inputId="item.label ?? 'inputId'"
            :binary="true"
            @change="changeValue(item, index)"
            class="filter__checkbox"
            v-if="checkbox"
          />
          <label :for="item.label ?? 'inputId'" class=" font-extraBold">
            {{ item.label }}
          </label>
        </div>
        <div class="mt-1" v-if="item.InputType === 'dropdown'">
          
          <Dropdown 
            v-if="item.InputType === 'dropdown'"

            v-model="item.selectedItems"
            :options="item.modelItems"
            class="filter__multiselect w-full"
            :placeholder="`Select ${item.label}`"
            @change="$emit( 'selected', item.selectedItems)"
            />
            <!-- :disabled="!item.checked" -->
        </div>
        <div class="m1-2" v-if="item.InputType === 'multiSelect'">
            <MultiSelect
          filter 
            v-model="item.selectedItems"
            :options="item.modelItems"
            :placeholder="`Select ${item.label}`"
            class="filter__multiselect w-full"
            />
            <!-- :disabled="!item.checked" -->
        </div>
      </div>
      <div v-if="date_range" class="mb-2">
        <label for="date_range" class="font-extraBold"> By Lead Date </label>
        <div class="flex flex-column gap-2 mt-2"> 
          <Calendar
            showIcon
            class="custom__inner_date_picker w-full"
            placeholder="From Date"
            v-model="from_date"
            dateFormat="dd MM yy"
          />
          <Calendar
            showIcon
            class="custom__inner_date_picker w-full"
            placeholder="To Date"
            v-model="to_date"
            dateFormat="dd MM yy"
          />
        </div>
      </div>
      <div class="filter__btn_wrap">
        <Button
          label="Clear Filters"
          outlined
          @click.prevent="clearFilter"
          class="shady-btn"
        />
        <Button
          label="Apply Filters"
          @click.prevent="applyFilter"
        />
      </div>
    </OverlayPanel>
  </div>
</template>
<script>
export default {
  name: "MenuPopFilter",
  emits: ["clear", "submit", "selected"],
  props: {

    icon:{
    type:String,
    default:"pi pi-filter pi-color"
  },
  
    inherent_attrs:{
    type:Boolean,
    default:false
    },

    date_range: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default() {
        return [
          {
            label: "Project Type",
            checked: false,
            modelItems: ["Project 1", "Project 2", "Project 3"],
            selectedItems: [],
          },
          {
            label: "Construction Type",
            checked: false,
            modelItems: ["Construction 1", "Construction 2", "Construction 3"],
            selectedItems: [],
          },
        ];
      },
    },
    checkbox:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      value: this.items,
      from_date: null,
      to_date: null,
      lead_type:'All'
    };
  },

  computed: {
    disableApply() {
      return !this.value.some((item) => item.selectedItems.length);
    },
  },
  methods: {
    toggle(event) {
      this.$refs.op.toggle(event);
    },
    changeValue(item, index) {
      if (item.checked === false) {
        this.value[index].selectedItems = [];
      }
    },
    clearFilter() {
      this.value = this.value.map((item) => {
        this.from_date = null
        this.to_date = null
        if(item.InputType === "dropdown"){
          return {
          ...item,
          checked: false,
          selectedItems: '',
        };
        }
        return {
          ...item,
          checked: false,
          selectedItems: [],
        };
      });
      this.$emit("clear", this.value);
      this.$refs.op.toggle(event);
    },
    applyFilter() {
      let payload = {
        value: this.value,
      };
      if (this.date_range) {
        payload.from_date = this.from_date;
        payload.to_date = this.to_date;
      }
      this.$emit("submit", payload);
      this.$refs.op.toggle(event);
    },
    selectLead($event){
      this.lead_type = $event.value
    }
  },
};
</script>
<style lang="scss">
.filter__multiselect {
  max-width: 300px;
}
.filter__btn_wrap {
  margin-top: 1rem;
  display: flex;
  column-gap: 10px;
  justify-content: flex-end;
}
.filter__checkbox {
  align-items: center;
  justify-content: center;
  .p-checkbox-box {
    border-radius: 4px;
    width: 17px;
    height: 17px;
    border: 1.5px solid #d9dbdd;
    svg {
      width: 12px;
      height: 12px;
    }
  }
}
</style>
