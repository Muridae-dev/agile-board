<template>
  <div class="board-container">
    <ul v-if="!addingTask" v-for="column in columns" class="board-column">
      {{
        column.title
      }}
      <li v-for="item in column.items" class="board-task">
        <span class="board-task--title">{{ item.title }}</span>
        <span class="board-task--description">{{ item.description }}</span>
      </li>
    </ul>
    <div class="board-edit-container" v-if="addingTask">
      <label for="title">Title</label><input id="title" />
      <label for="description">Description</label><input id="description" />
      <label for="column">Column</label><input id="column" />
      <button @click="addTask">SUBMIT</button>
    </div>
    <button class="board-button--add-column" @click="() => (addingTask = true)">
      +
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const columns = ref([]);
const addingTask = ref(false);

const groupByColumn = (data) => {
  // Create an object to hold groups
  const groups = {};

  // Iterate over each item
  data.forEach((item) => {
    // If the group doesn't exist, create it
    if (!groups[item.column]) {
      groups[item.column] = [];
    }

    // Push the current item, minus the column property, into the group
    groups[item.column].push({
      title: item.title,
      description: item.description,
    });
  });

  // Transform groups object into the desired array format
  columns.value = Object.keys(groups).map((columnName) => ({
    title: columnName,
    items: groups[columnName],
  }));
};

onMounted(() => {
  fetch("http://localhost:3000/api/taskList")
    .then((res) => res.json())
    .then((data) => console.log(groupByColumn(data)));
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

  addingTask.value = false;
};
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

  background: transparent;
  border: 2px solid $primary-scroll-bar-color;
  border-radius: 10px;
  color: $primary-scroll-bar-color;
}

.board-edit-container {
  display: flex;
  flex-direction: column;
  width: 400px;

  input {
    height: 20px;
    margin-bottom: 20px;
  }
}
</style>

<!-- const columns = [
  {
    title: "Column 1",
    items: [
      {
        title: "Task 1",
        description: "Set the time to 10:00",
      },
      {
        title: "Task 1",
        description: "Set the time to 10:00",
      },
      {
        title: "Task 1",
        description: "Set the time to 10:00",
      },
    ],
  },
  {
    title: "Column 2",
    items: [
      {
        title: "Task 1",
        description: "Set the time to 10:00",
      },
      {
        title: "Task 1",
        description: "Set the time to 10:00",
      },
    ],
  },
  {
    title: "Column 3",
    items: [
      {
        title: "Task 1",
        description: "Set the time to 10:00",
      },
    ],
  },
  {
    title: "Column 4",
    items: [
      {
        title: "Task 1",
        description: "Set the time to 10:00",
      },
      {
        title: "Task 1",
        description: "Set the time to 10:00",
      },
      {
        title: "Task 1",
        description: "Set the time to 10:00",
      },
      {
        title: "Task 1",
        description: "Set the time to 10:00",
      },
      {
        title: "Task 1",
        description: "Set the time to 10:00",
      },
      {
        title: "Task 1",
        description: "Set the time to 10:00",
      },
      {
        title: "Task 1",
        description: "Set the time to 10:00",
      },
      {
        title: "Task 1",
        description: "Set the time to 10:00",
      },
      {
        title: "Task 1",
        description: "Set the time to 10:00",
      },
      {
        title: "Task 1",
        description: "Set the time to 10:00",
      },
      {
        title: "Task 1",
        description: "Set the time to 10:00",
      },
      {
        title: "Task 1",
        description: "Set the time to 10:00",
      },
      {
        title: "Task 1",
        description: "Set the time to 10:00",
      },
    ],
  },
  {
    title: "Column 5",
    items: [
      {
        title: "Task 1",
        description: "Set the time to 10:00",
      },
      {
        title: "Task 1",
        description: "Set the time to 10:00",
      },
      {
        title: "Task 1",
        description: "Set the time to 10:00",
      },
    ],
  },
]; -->
