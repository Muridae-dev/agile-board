<template>
  <div class="board-container">
    <ul v-for="column in columns.value" class="board-column">
      <span class="board-column--title"> {{ column.title }}</span>
      <li
        v-for="item in column.items"
        class="board-task"
        @click="() => editTask(item._id)"
      >
        <span class="board-task--title">{{ item.title }}</span>
        <span class="board-task--description">{{ item.description }}</span>
        <button
          class="board-task--remove"
          @click="
            (e) => {
              e.stopPropagation();
              removeTaskAndFormatColumns(item._id);
            }
          "
        >
          X
        </button>
      </li>
    </ul>
    <router-link to="/board/edit" class="board-button--add-column"
      >+</router-link
    >
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import { useBoardStore } from "@/stores/BoardStore";
import router from "@/router";

const { columns, fetchAndFormatTasks, removeTask } = useBoardStore();

const editTask = (_id: string) => {
  router.push(`/board/edit?id=${_id}`);
};

const removeTaskAndFormatColumns = async (_id: string) => {
  await removeTask(_id);
  for (let i = 0; i < columns.value.length; i++) {
    const itemIndex = columns.value[i].items.findIndex(
      (item) => item._id === _id
    );

    if (itemIndex !== -1) {
      columns.value[i].items.splice(itemIndex, 1);
      if (columns.value[i].items.length === 0) {
        columns.value.splice(i, 1);
      }
      break;
    }
  }
};

onMounted(async () => {
  columns.value = await fetchAndFormatTasks();
});
</script>

<style lang="scss">
.board-container {
  height: calc(100dvh - $header-height - 50px);
  width: 200%;
  padding: 10px;
  padding-top: $header-height;
  padding-bottom: 0px;

  position: relative;
  display: flex;
  z-index: 0;

  color: $primary-text-color;
  font-family: $primary-font;
}

.board-column {
  min-height: 100%;
  padding: 10px;
  padding-top: 0px;
  padding-bottom: 0px;
  width: 400px;
  overflow: auto;

  border-right: 2px solid $primary-scroll-bar-color;

  &--title {
    display: block;
    height: 1.5rem;
  }

  &:last-of-type {
    border-right: none;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar {
    width: 7px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: $primary-scroll-bar-color;
    // border: 2px solid $primary-scroll-bar-color;
  }
}

.board-task {
  position: relative;
  list-style-type: none;
  height: 100px;
  width: calc(100% - 20px);
  background: white;
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;

  background: $secondary-background-color;

  span {
    display: block;
  }
  &--title {
    font-weight: bold;
  }

  &--remove {
    position: absolute;
    top: 5px;
    right: 5px;

    color: rgb(0, 255, 179);
    mix-blend-mode: difference;
    font-family: $primary-font;
    font-size: 1.2rem;
    background: transparent;
    border: none;
    cursor: pointer;
  }
}

.board-button--add-column {
  width: 150px;
  height: calc(100% - (1.5rem + 14px));
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;

  background: transparent;
  border: 2px solid $primary-scroll-bar-color;
  border-radius: 10px;
  color: $primary-scroll-bar-color;
  text-decoration: none;
}
</style>
