import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import CreateBot from "../views/CreateBot.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/createBot",
    name: "CreateBot",
    component: CreateBot,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
