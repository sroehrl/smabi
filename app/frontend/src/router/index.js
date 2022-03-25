import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import(/* webpackChunkName: "Calendar" */ '../views/Calendar.vue')
  },
  {
    path: '/clients',
    name: 'Clients',
    component: () => import(/* webpackChunkName: "Clients" */ '../views/Clients.vue')
  },
  {
    path: '/client/:id',
    name: 'Client',
    component: () => import(/* webpackChunkName: "Client" */ '../views/Client.vue')

  },
  {
    path: '/products',
    name: 'Products',
    component: () => import(/* webpackChunkName: "Products" */ '../views/Products.vue')

  },
  {
    path: '/product/:id*',
    name: 'Product',
    component: () => import(/* webpackChunkName: "Product" */ '../views/Product.vue')

  },
  {
    path: '/settings/:tab*',
    name: 'Settings',
    component: () => import(/* webpackChunkName: "Settings" */ '../views/Settings.vue')

  },
  {
    path: '/invoices',
    name: 'Invoicing',
    component: () => import(/* webpackChunkName: "Invoicing" */ '../views/Invoices.vue')

  },
  {
    path: '/invoice/:id',
    name: 'Invoice',
    component: () => import(/* webpackChunkName: "Invoicing" */ '../views/Invoice.vue')

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
