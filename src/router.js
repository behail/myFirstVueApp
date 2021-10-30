import { createRouter, createWebHashHistory } from "vue-router";
import { trackRouter } from "vue-gtag-next";

import Calculator from "../src/pages/Calculator";
import Calendar from "../src/pages/Calendar";
import Budget from "../src/pages/Budget";
// import Home from "../src/pages/Home";

const routes = [
  // { path: "/", component: Home },
  { path: "/calculator", component: Calculator },
  { path: "/calander", component: Calendar },
  { path: "/budget", component: Budget },
];
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

trackRouter(router);

export default router;
