import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import JobView from '@/views/Job/JobView.vue'

import { ROUTE_NAME } from '@/constant'
import JobDetailView from '@/views/Job/JobDetailView.vue'
import NotFoundView from '@/views/ExtraView/NotFoundView.vue'

const routes = [
  {
    path: '/',
    name: ROUTE_NAME.HOME,
    component: HomeView,
  },
  {
    path: '/job-list',
    name: ROUTE_NAME.JOB_LIST,
    component: JobView,
  },
  {
    path: '/job-list/:id',
    name: ROUTE_NAME.JOB_DETAIL,
    component: JobDetailView,
  },
  {
    path: '/about',
    name: 'about',
  },
  { path: '/:pathMatch(.*)*', name: ROUTE_NAME.NOT_FOUND, component: NotFoundView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
