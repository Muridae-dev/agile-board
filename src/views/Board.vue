<template>
  <div class="board-container">
    <ul v-for="column in columns" class="board-column">
      {{
        column.title
      }}
      <li v-for="item in column.items" class="board-task">
        <span class="board-task--title">{{ item.title }}</span>
        <span class="board-task--description">{{ item.description }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
const columns = [
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
];
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

  border-right: 1px solid black;

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
</style>
