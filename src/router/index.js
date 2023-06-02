import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EditView from '../views/EditView.vue'
import NotFoundView from '../views/NotFoundView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView, alias: '/home' },
    { path: '/edit/:id', name: 'edit', component: EditView },
    { path: '/404', name: 'NotFound', component: NotFoundView },
    { path: '/:catchAll(.*)', redirect: { name: 'NotFound' } }
  ]
})