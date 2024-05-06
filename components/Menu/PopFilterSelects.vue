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
    <OverlayPanel ref="overlayMenu" id="overlay_menu">
      <div v-for="(item, index) in value" :key="index" class="mb-2">
        <div class="mt-2">
          <label class="pb-1 block font-bold">
            {{ item.label }}
          </label>
          <Dropdown
            v-model="item.selectedItems"
            :options="item.modelItems"
            :placeholder="`Select ${item.label}`"
            class="filter__multiselect"
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
        <Button label="Apply Filters" @click.prevent="applyFilter" />
      </div>
    </OverlayPanel>
  </div>
</template>

<script setup>
const overlayMenu = ref(null);
const props = defineProps({
  items: {
    type: Array,
    default() {
      return [
        {
          label: "Project Type",
          modelItems: ["Project 1", "Project 2", "Project 3"],
          selectedItems: [],
        },
        {
          label: "Construction Type",
          modelItems: ["Construction 1", "Construction 2", "Construction 3"],
          selectedItems: [],
        },
      ];
    },
  },

  icon:{
    type:String,
    default:"pi pi-filter pi-color"
  },

  icon_color:{
    type:String,
    default:"#878e99"
  },

  inherent_attrs:{
    type:Boolean,
    default:false
  },
});
const value = ref(props.items);
const emit = defineEmits(["clear", "submit"]);
const toggle = (event) => {
  overlayMenu.value.toggle(event);
};
const clearFilter = () => {
  value.value = value.value.map((item) => {
    return {
      ...item,
      selectedItems: [],
    };
  });
  emit("clear", value);
  overlayMenu.value.toggle(event);
};
const applyFilter = () => {
  emit("submit", value);
  overlayMenu.value.toggle(event);
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

.pi-color{
  color: v-bind("props.icon_color");
}
</style>
