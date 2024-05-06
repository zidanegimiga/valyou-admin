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
          </div>
          <div class="mt-1">
            
            <label for="date_range" class="font-extraBold">  {{ item.label }}</label>
          <div class="flex flex-column gap-2 mt-2"> 
            <!-- <Calendar
              showIcon
              class="custom__inner_date_picker w-full"
              placeholder="From Date"
              v-model="item.selectedItems.from"
              dateFormat="yy-mm-dd"
            /> -->
            <!-- <ButtonsNRadio v-model="item.selectedItems" label="Ascending" /> -->
            <!-- <ButtonsNRadio v-model="item.selectedItems" label="Default" /> -->
            <!-- <ButtonsNRadio v-model="item.selectedItems" label="Descending" /> -->
            <div class="flex flex-wrap gap-3">

                <div class="flex align-items-center">
                    <RadioButton v-model="item.selectedItems" :inputId="`ingredient-${index}-1`"  value="Ascending" />
                    <label :for="`ingredient-${index}-1`" class="ml-2 cursor-pointer">Ascending</label>
                </div>

                <div class="flex align-items-center">
                    <RadioButton v-model="item.selectedItems" :inputId="`ingredient-${index}-2`"  value="Default" />
                    <label :for="`ingredient-${index}-2`" class="ml-2 cursor-pointer">Default</label>
                </div>

                <div class="flex align-items-center">
                    <RadioButton v-model="item.selectedItems" :inputId="`ingredient-${index}-3`"  value="Descending" />
                    <label :for="`ingredient-${index}-3`" class="ml-2 cursor-pointer">Descending</label>
                </div>

            </div>

          </div>
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
    name: "MenuPopFilterSort",
    emits: ["clear", "submit"],
    props: {
  
      icon:{
      type:String,
      default:"pi pi-sort-alt pi-color"
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
            selectedItems: "Default",
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
  