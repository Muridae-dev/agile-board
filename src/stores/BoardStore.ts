import { defineStore } from "pinia";
import { ref } from "vue";

export const useBoardStore = defineStore("board", () => {
  const columns = ref<any>([]);

  const fetchAndFormatTasks = () => {
    console.log("ran");
    return fetch("http://localhost:3000/api/taskList")
      .then((res) => res.json())
      .then((data) => groupByColumn(data));
  };

  return { columns, fetchAndFormatTasks };
});

const groupByColumn = (data: any) => {
  // Create an object to hold groups
  const groups: any = {};

  // Iterate over each item
  data.forEach((item: any) => {
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
  return Object.keys(groups).map((columnName) => ({
    title: columnName,
    items: groups[columnName],
  }));
};
