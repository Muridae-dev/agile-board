import { defineStore } from "pinia";
import { ref } from "vue";

export const useBoardStore = defineStore("board", () => {
  const columns = ref<any>([]);

  const fetchAndFormatTasks = async () => {
    console.log("ran fetchAndFormatTasks");
    const data = await fetch("http://localhost:3000/api/taskList")
      .then((res) => res.json())
      .then((data) => groupByColumn(data));

    columns.value = data;
    return data;
  };

  const removeTask = (_id: string) => {
    fetch("http://localhost:3000/api/taskList/" + _id, {
      method: "DELETE",
    });
  };

  const addTask = async (body: string) => {
    await fetch("http://localhost:3000/api/taskList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
  };

  const editTask = (_id: string, body: any) => {
    fetch("http://localhost:3000/api/taskList/" + _id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
  };

  const getTaskById = async (_id: string) => {
    if (!columns.value[0]) {
      await fetchAndFormatTasks();
    }
    for (let group of columns.value) {
      const item = group.items.find((item: any) => item._id === _id);

      if (item) {
        return {
          ...item,
          column: group.title,
        };
      }
    }

    return null;
  };

  return {
    columns,
    fetchAndFormatTasks,
    removeTask,
    editTask,
    addTask,
    getTaskById,
  };
});

const groupByColumn = (data: any) => {
  console.log(data);
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
      _id: item._id,
    });
  });

  // Transform groups object into the desired array format
  return Object.keys(groups).map((columnName) => ({
    title: columnName,
    items: groups[columnName],
  }));
};
