import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/DashboardPage.vue')
  },
  {
    path: '/habits/new',
    name: 'HabitCreate',
    component: () => import('../views/HabitFormPage.vue')
  },
  {
    path: '/habits/:id/edit',
    name: 'HabitEdit',
    component: () => import('../views/HabitFormPage.vue')
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/AuthPage.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})