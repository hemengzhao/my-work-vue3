import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const pages = import.meta.glob('../views/**/page.ts', {
  eager: true,
  import: 'default'
})

const comments = import.meta.glob('../views/**/index.vue')

const routes: RouteRecordRaw[] = Object.entries(pages).map(([path, meta]) => {
  const compsPath = path.replace('page.ts', 'index.vue')
  path = path.replace('../views', '').replace('/page.ts', '') || '/'
  const name = path.split('/').filter(Boolean).join('-') || 'index'
  console.log(path, name)
  return {
    path,
    name, 
    meta,
    redirect: meta.redirect,  
    component: comments[compsPath]
  }
})
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:  routes
})

export default router
