<template>
  <div class="flex flex-nowrap overflow-x-auto kanban-board">
    <SlickList
      v-model:list="kanban.columns"
      :axis="axis"
      :lock-axis="axis"
      class="column-container"
      use-drag-handle
      useWindowAsScrollContainer
    >
      <SlickItem
        v-for="(col, i) in kanban.columns"
        :key="col.id"
        :index="i"
        class="kanban-column"
      >
        <header>
          <DragHandle />
          <div class="flex justify-content-between align-items-center w-full">
            <div>
              <h4>{{ col.name }}</h4>
              <p class="gray_text font-size-small">
                AED 200,000.00 | {{ col.items.length }} Deal
              </p>
            </div>
            <div class="kanban-number-chip">
              {{ col.items.length }}
            </div>
          </div>
        </header>
        <SlickList
          v-model:list="col.items"
          axis="xy"
          :group="col.group"
          class="kanban-list"
          helper-class="kanban-helper"
        >
          <SlickItem
            v-for="(item, j) in col.items"
            :key="item.id"
            :index="j"
            class="kanban-list-item"
          >
            <div class="kanban-list-item-inner">
              {{ item.value }}
            </div>
          </SlickItem>
        </SlickList>
      </SlickItem>
    </SlickList>
  </div>
</template>
<script>
import { computed, reactive } from "vue";
import { useWindowSize } from "@vueuse/core";
import { SlickList, SlickItem } from "vue-slicksort";
import DragHandle from "@/components/utils/DragHandle.vue";
export default {
  components: {
    SlickList,
    SlickItem,
    DragHandle,
  },
  props: {
    modelValue: {
      type: Array,
      required: true,
      default() {
        return;
      },
    },
  },
  emits:['update:modelValue'],
  setup(props) {
    const { width } = useWindowSize();
    const axis = computed(() => (width.value > 768 ? "x" : "y"));
    const kanban = reactive({
      name: "Kanban Custom",
      columns: props.modelValue,
    });
    watch(
      kanban,
      (newVal) => {
      }
    );
    return {
      kanban,
      axis,
    };
  },
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
}
.kanban-number-chip {
  padding: 0.25rem 0.5rem;
  border-radius: 7px;
  color: #3494ff;
  background: lighten($color: #3494ff, $amount: 30);
}
.kanban-column {
  width: 300px;
  margin: 10px;
  padding: 10px;
  background: #f4f5f6;
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
  max-height: 700px;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
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
</style>
<style lang="scss">
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
    background: #9b51e0;
    color: white;
  }
}
</style>
