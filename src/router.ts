import { createRouter as viteCreateRouter, createWebHistory } from "vue-router";

export const router = viteCreateRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "Home",
      path: "/",
      component: () => import("../src/views/Home.vue"),
    },
  ],
});
