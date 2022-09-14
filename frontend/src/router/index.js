import { createRouter,createWebHistory } from 'vue-router'
import InterventionView from  '../views/InterventionView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import HomepageView from '../views/HomepageView.vue'
import ToolView from '../views/ToolView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name: 'HomepageView',
      component: HomepageView
    },
    {
      path: '/intervention',
      name: 'InterventionView',
      component: InterventionView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/tool',
      name: 'tool',
      component: ToolView
    }
  ]
})

export default router
