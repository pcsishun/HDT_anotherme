import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue';
import Dashboard from '../views/Dashboard.vue';
import jsonPage from '../views/jsonPage.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashborad',
      component: Dashboard
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/json',
      name: 'jsonPage',
      component:jsonPage
    }
  ]
})

export default router
