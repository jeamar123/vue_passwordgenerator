import { createRouter, createWebHistory } from 'vue-router'

import Main from '../views/Main.vue'


const routes = [
  {
    path: '/',
    name: 'Main',
    // redirect: '/wallets',
    component: Main,
    // children: [
      // { path: '/home', component: Wallet, name: 'Home' },
    // ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
