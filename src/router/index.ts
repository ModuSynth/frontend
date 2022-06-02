import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import StagesList from '../views/stages/List.vue'
import StageDetails from '../views/stages/Details.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Stages list',
    component: StagesList
  },
  {
    path: '/:id',
    name: 'Stage details',
    component: StageDetails
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
