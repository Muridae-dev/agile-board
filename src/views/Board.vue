<template>
  <div class="board-container">
    <ul v-for="column in columns.value" class="board-column">
      {{
        column.title
      }}
      <li v-for="item in column.items" class="board-task">
        <span class="board-task--title">{{ item.title }}</span>
        <span class="board-task--description">{{ item.description }}</span>
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

const { columns, fetchAndFormatTasks } = useBoardStore();

onMounted(async () => {
  if (!columns.value) columns.value = await fetchAndFormatTasks();
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

  &--description {
  }
}

.board-button--add-column {
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;

  background: transparent;
  border: 2px solid $primary-scroll-bar-color;
  border-radius: 10px;
  color: $primary-scroll-bar-color;
  text-decoration: none;
}
</style>
