<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import ProductCard from '@/components/ProductCard.vue'

const router = useRouter()
const productsStore = useProductsStore()
const cartStore = useCartStore()

// Agregar producto al carrito
const addToCart = (product) => {
  cartStore.addToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image || 'https://via.placeholder.com/150',
    quantity: 1,
  })
}

// Ver detalles del producto
const viewProductDetail = (productId) => {
  router.push(`/products/${productId}`)
}

// Cargar productos al montar el componente
onMounted(() => {
  productsStore.fetchProducts()
})
</script>

<template>
  <main class="bg-gray-50 dark:bg-gray-900 main">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Nuestros Productos</h1>

      <!-- Loading state -->
      <div
        v-if="productsStore.loading"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="i in 6"
          :key="i"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse"
        >
          <div class="h-48 bg-gray-200 dark:bg-gray-700"></div>
          <div class="p-4">
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
            <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          </div>
        </div>
      </div>

      <!-- Error state -->
      <div v-else-if="productsStore.error" class="text-center py-12">
        <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
          <p class="text-red-600 dark:text-red-400">{{ productsStore.error }}</p>
          <button
            @click="productsStore.fetchProducts()"
            class="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>

      <!-- Products container -->
      <div v-else class="flex flex-row flex-wrap">
        <div
          v-for="product in productsStore.products"
          :key="product.id"
          class="mb-4 mr-4 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
        >
          <ProductCard
            :product="product"
            @add-to-cart="addToCart"
            @view-product-detail="viewProductDetail"
          />
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="productsStore.loading || productsStore.error" class="text-center py-12">
        <i class="fas fa-spinner fa-spin"></i>
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">
          No hay productos disponibles
        </h3>
      </div>
    </div>
  </main>
</template>

<style scoped>
.products {
  scroll-behavior: smooth;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 2.8em;
}

.main {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 100px 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
