import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import ChatView from "../views/ChatView.vue";
import WelcomeView from "../views/WelcomeView.vue";
import CalendarView from "../views/CalendarView.vue";
import CalendarViewFromAI from "../views/CalendarViewFromAI";

const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/welcome",
    name: "Welcome",
    component: WelcomeView,
  },
  {
    path: "/chat",
    name: "Chat",
    component: ChatView,
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: CalendarView,
  },
  {
    path: "/calendar-appointment",
    name: "appointment",
    component: CalendarViewFromAI,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
