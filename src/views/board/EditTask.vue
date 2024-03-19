<template>
  <div class="board-edit-container">
    <label for="title">Title</label><input id="title" />
    <label for="description">Description</label><input id="description" />
    <label for="column">Column</label><input id="column" />
    <button @click="addTask">SUBMIT</button>
  </div>
</template>

<script setup lang="ts">
import { useBoardStore } from "@/stores/BoardStore";
import { onMounted } from "vue";

const { columns, fetchAndFormatTasks } = useBoardStore();

onMounted(() => {
  if (!columns.value) {
    fetchAndFormatTasks();
  }
});

const addTask = async (e) => {
  e.preventDefault();
  const bodyText = JSON.stringify({
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    column: document.getElementById("column").value,
  });
  await fetch("http://localhost:3000/api/taskList", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: bodyText,
  });
};
</script>

<style lang="scss">
.board-edit-container {
  display: flex;
  flex-direction: column;
  width: 400px;
  padding-top: $header-height;
  margin: auto;

  font-size: 1.2rem;
  font-family: $primary-font;
  color: $primary-text-color;

  input {
    height: 40px;
    margin-bottom: 20px;
    background: $secondary-background-color;

    font-size: 1.2rem;
    font-family: $primary-font;
    color: $primary-text-color;

    border-bottom: 2px solid #34e89e;
    border-right: 2px solid #34e89e;
    border-top: 2px solid #0f3443;
    border-left: 2px solid #0f3443;
  }

  button {
    border: 2px solid $primary-scroll-bar-color;
    border-radius: 10px;
    height: 40px;
    font-size: 1.2rem;
    font-family: $primary-font;
    color: $primary-scroll-bar-color;

    background: $secondary-background-color;
  }
}
</style>
