import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Board from "../views/Board.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/board",
      name: "Board",
      component: Board,
    },
  ],
});

export default router;
