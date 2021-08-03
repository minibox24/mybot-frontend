import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import CreateBot from "../views/CreateBot.vue";
import CreateCommand from "../views/CreateCommand.vue";
import Done from "../views/Done.vue";
import Draw from "../views/Draw.vue";

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
  {
    path: "/createCommand",
    name: "CreateCommand",
    component: CreateCommand,
  },
  {
    path: "/done",
    name: "Done",
    component: Done,
  },
  {
    path: "/draw",
    name: "Draw",
    component: Draw,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
