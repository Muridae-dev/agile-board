<template>
  <div class="board-edit-container">
    <label for="title">Title</label><input id="title" ref="titleRef" />
    <label for="description">Description</label
    ><input id="description" ref="descriptionRef" />
    <label for="column">Column</label><input id="column" ref="columnRef" />
    <button @click="formatAndAddTask">SUBMIT</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import router from "@/router";
import { useBoardStore } from "@/stores/BoardStore";

const { addTask, editTask, getTaskById } = useBoardStore();
const _id: any = router.currentRoute.value.query.id;

// Define refs
const titleRef = ref<HTMLInputElement | null>(null);
const descriptionRef = ref<HTMLInputElement | null>(null);
const columnRef = ref<HTMLInputElement | null>(null);

onMounted(async () => {
  if (_id) {
    const item = await getTaskById(_id);
    if (titleRef.value) titleRef.value.value = item.title;
    if (descriptionRef.value) descriptionRef.value.value = item.description;
    if (columnRef.value) columnRef.value.value = item.column;
  }
});

const formatAndAddTask = async () => {
  const bodyText = JSON.stringify({
    title: titleRef.value?.value,
    description: descriptionRef.value?.value,
    column: columnRef.value?.value,
  });

  if (!_id) await addTask(bodyText);
  else await editTask(_id, bodyText);

  router.push("/board");
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
