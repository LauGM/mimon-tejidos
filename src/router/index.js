import { createRouter, createWebHistory } from 'vue-router'
import ProductsView from '@/views/Products/ProductsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProductsView,
    },
    {
      path: '/products/:id',
      name: 'product-detail',
      component: () => import('@/views/ProductDetail/ProductDetailView.vue'),
      props: true,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About/AboutView.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/Cart/CartView.vue'),
    },
    // Redirección para rutas no encontradas a la página de inicio
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
  // Desplazamiento suave al cambiar de ruta
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  },
})

export default router
