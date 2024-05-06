<template>
  <div class="flex flex-nowrap overflow-x-auto kanban-board">
     <SlickList
      v-model:list="kanban.columns"
      :axis="axis"
      :lock-axis="axis"
      class="column-container"
      :useWindowAsScrollContainer="true"
      DragHandle 
    > 
      <SlickItem
        v-for="(col, i) in kanban.columns"
        :key="col._id"
        :index="i"
        class="kanban-column"
      >
        <header>
          <DragHandle />
          <div class="flex justify-content-between align-items-center w-full">
            <div>
              <h4 class="kanban-header" v-if=" col._id === 'canceled'">Closure (Unsuccessful)</h4>
              <h4 class="kanban-header" v-else-if=" col._id === 'completed'">Closure (successful)</h4>
              <h4 class="kanban-header" v-else-if=" col._id === 'requirementsCaptured'">Requirement Captured</h4>
              <!-- <h4 class="kanban-header" v-else-if=" col._id === 'Booking Recieved' || 'Contact Client'">Requirement Captured</h4> -->
              <h4 class="kanban-header" v-else>{{ col._id }}</h4>
              </div>
          </div>
        </header>
        <SlickList
          v-model="col.data"
          axis="xy"
          group="data"
          class="kanban-list overflow-x-scroll"
          helper-class="kanban-helper"
        >
          <SlickItem
            v-for="(item, j) in col.data"
            :key="item.id"
            :index="j"
            class="kanban-list-item"
          >
            <div class="kanban-list-item-inner">
              <KanbanItem
                :item="item"
              />
            </div>
          </SlickItem>
        </SlickList>
      </SlickItem>
    </SlickList> 
  </div>
</template>
<script setup>
import { computed, reactive } from "vue";
import { useWindowSize } from "@vueuse/core";
import { SlickList, SlickItem } from "vue-slicksort";
import DragHandle from "@/components/utils/DragHandle.vue";
import { useAmountAED } from "@/composables/amountFormatter";

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
    default() {
      return;
    },
  },
});

defineEmits(["update:modelValue"]);

const { width } = useWindowSize();
const axis = computed(() => (width.value > 768 ? "x" : "y"));
const kanban = reactive({
  name: "Kanban Custom",
  columns: props.modelValue,
});
watch(kanban, (newVal) => {});

const columnAmount = (item) => {
  const amount = item
    .map((data) => data.amount)
    .reduce((par, acc) => par + acc, 0);

  return useAmountAED(amount);
};
</script>

<style lang="scss" scoped>
.kanban-board {
  padding-top: var(--header-height);
  // max-width: 1400px;
  margin: auto;
  /* width */
  &::-webkit-scrollbar {
    width: 5px;
    border-radius: 10px;
    height: 0px;
  }
  *::-webkit-scrollbar {
    height: 0px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}

.column-container {
  display: flex;
  align-items: flex-start;
  min-height: 84vh;
}

.kanban-number-chip {
  padding: 0.25rem 0.5rem;
  border-radius: 7px;
  color: #3494ff;
  background: lighten($color: #3494ff, $amount: 30);
}

.kanban-column {
  min-width: 380px;
  margin: 10px;
  padding: 10px;
  border-radius: 20px;

  > header {
    display: flex;
    align-items: center;
    padding: 10px;
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }
}

.kanban-list {
  max-height: 600px;
  
overflow: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

@media screen and (max-width: 768px) {
  .column-container {
    flex-direction: column;
    align-items: stretch;
  }
  .kanban-column {
    width: auto;
  }
}
.kanban-list-item {
  // width: calc(90% - 10px);
  width: 100%;
  margin: 5px;

  .kanban-list-item-inner {
    min-height: 100px;
    padding: 10px 15px;
    border-radius: 10px;
    background: white;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.1);
    cursor: grab;
    transition: background 0.2s, transform 0.2s;
  }

  &.kanban-helper .kanban-list-item-inner {
    transform: rotate(10deg);
    background: #3494ff;
    color: white;
  }
}
.kanban-header {
  font-size: 16px;
  font-weight: bold;
  text-transform: capitalize;
}
</style>
