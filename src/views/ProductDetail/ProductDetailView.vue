<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const product = ref(null);
const isLoading = ref(true);
const quantity = ref(1);
const selectedImage = ref('');

// Simular carga de producto desde la API
const fetchProduct = async (id) => {
  try {
    isLoading.value = true;
    // En una implementación real, esto sería una llamada a la API
    // const response = await fetch(`https://68a606bd2a3deed2960faaa1.mockapi.io/productos/${id}`);
    // product.value = await response.json();
    
    // Datos de ejemplo mientras implementamos la API real
    setTimeout(() => {
      const mockProducts = [
        { 
          id: 1, 
          name: 'Chaleco tejido', 
          price: 2500, 
          category: 'prendas',
          description: 'Hermoso chaleco tejido a mano con lana de la mejor calidad. Ideal para los días fríos de invierno, este chaleco es suave, cálido y muy cómodo de usar. Disponible en varios colores.',
          longDescription: 'Este chaleco artesanal está tejido a mano con lana 100% natural, lo que lo hace hipoalergénico y perfecto para todo tipo de pieles. El diseño clásico lo hace versátil para combinar con diferentes estilos. Incluye botones de madera tallados a mano que le dan un toque rústico y elegante.',
          details: [
            'Material: 100% lana natural',
            'Colores disponibles: beige, gris, azul marino',
            'Tallas: S, M, L, XL',
            'Lavado a mano recomendado',
            'Hecho a mano en Argentina'
          ],
          images: [
            'https://via.placeholder.com/800x1000',
            'https://via.placeholder.com/800x1000/cccccc',
            'https://via.placeholder.com/800x1000/999999'
          ],
          stock: 5,
          rating: 4.8,
          reviews: 24
        },
        // ... otros productos de ejemplo
      ];
      
      const foundProduct = mockProducts.find(p => p.id === parseInt(id)) || {
        id: id,
        name: 'Producto no encontrado',
        price: 0,
        description: 'Lo sentimos, el producto que buscas no está disponible en este momento.',
        stock: 0
      };
      
      product.value = foundProduct;
      if (foundProduct.images && foundProduct.images.length > 0) {
        selectedImage.value = foundProduct.images[0];
      }
      isLoading.value = false;
    }, 800);
  } catch (error) {
    console.error('Error al cargar el producto:', error);
    isLoading.value = false;
  }
};

const relatedProducts = computed(() => {
  if (!product.value) return [];
  // En una implementación real, estos serían productos relacionados de la API
  return [
    { id: 2, name: 'Bufanda de lana', price: 1800, image: 'https://via.placeholder.com/300x300', category: 'accesorios' },
    { id: 4, name: 'Guantes de lana', price: 1200, image: 'https://via.placeholder.com/300x300/cccccc', category: 'accesorios' },
    { id: 5, name: 'Sweater tejido', price: 3200, image: 'https://via.placeholder.com/300x300/999999', category: 'prendas' }
  ];
});

const addToCart = () => {
  // Implementación del carrito vendrá después
  console.log('Añadir al carrito:', { ...product.value, quantity: quantity.value });
  // Mostrar notificación de éxito
  alert(`¡${quantity.value} ${product.value.name} ha sido añadido al carrito!`);
};

const incrementQuantity = () => {
  if (quantity.value < (product.value?.stock || 1)) {
    quantity.value++;
  }
};

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

onMounted(() => {
  fetchProduct(route.params.id);
});
</script>

<template>
  <div class="product-detail">
    <!-- Loading State -->
    <div v-if="isLoading" class="py-16 flex justify-center items-center">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>

    <!-- Product Not Found -->
    <div v-else-if="!product" class="py-16 text-center">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Producto no encontrado</h1>
      <p class="text-gray-600 dark:text-gray-300 mb-6">
        Lo sentimos, no pudimos encontrar el producto que estás buscando.
      </p>
      <button
        @click="router.push('/products')"
        class="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
      >
        Volver a la tienda
      </button>
    </div>

    <!-- Product Detail -->
    <div v-else>
      <!-- Breadcrumb -->
      <nav class="bg-gray-50 dark:bg-gray-800 py-4">
        <div class="container mx-auto px-4">
          <ol class="flex items-center space-x-2 text-sm">
            <li>
              <router-link to="/" class="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300">
                Inicio
              </router-link>
            </li>
            <li class="text-gray-500 dark:text-gray-400">/</li>
            <li>
              <router-link :to="`/products?category=${product.category}`" class="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300">
                {{ product.category === 'prendas' ? 'Prendas' : product.category === 'accesorios' ? 'Accesorios' : 'Hogar' }}
              </router-link>
            </li>
            <li class="text-gray-500 dark:text-gray-400">/</li>
            <li class="text-gray-600 dark:text-gray-300">{{ product.name }}</li>
          </ol>
        </div>
      </nav>

      <!-- Product Main Section -->
      <div class="py-8 bg-white dark:bg-gray-900">
        <div class="container mx-auto px-4">
          <div class="flex flex-col lg:flex-row gap-8">
            <!-- Product Images -->
            <div class="lg:w-1/2">
              <div class="mb-4 rounded-lg overflow-hidden">
                <img 
                  :src="selectedImage || product.images?.[0] || 'https://via.placeholder.com/800x1000'" 
                  :alt="product.name"
                  class="w-full h-auto max-h-[600px] object-cover"
                />
              </div>
              <div class="grid grid-cols-4 gap-2">
                <button 
                  v-for="(image, index) in product.images || []" 
                  :key="index"
                  @click="selectedImage = image"
                  :class="[
                    'border-2 rounded-md overflow-hidden transition-all',
                    selectedImage === image ? 'border-primary-500' : 'border-transparent hover:border-gray-300'
                  ]"
                >
                  <img 
                    :src="image" 
                    :alt="`${product.name} - Imagen ${index + 1}`"
                    class="w-full h-20 object-cover"
                  />
                </button>
              </div>
            </div>

            <!-- Product Info -->
            <div class="lg:w-1/2">
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {{ product.name }}
              </h1>
              
              <div class="flex items-center mb-4">
                <div class="flex items-center text-yellow-400">
                  <svg v-for="i in 5" :key="i" 
                    class="w-5 h-5" 
                    :class="{ 'text-gray-300': i > Math.round(product.rating || 5) }"
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span class="text-gray-600 dark:text-gray-300 text-sm ml-2">
                  ({{ product.reviews || 0 }} reseñas)
                </span>
              </div>

              <p class="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-6">
                ${{ product.price }}
              </p>

              <div class="mb-6">
                <p class="text-gray-700 dark:text-gray-300 mb-4">
                  {{ product.longDescription || product.description }}
                </p>
                
                <ul class="space-y-2 mb-6">
                  <li v-for="(detail, index) in product.details" :key="index" class="flex items-start">
                    <svg class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-gray-700 dark:text-gray-300">{{ detail }}</span>
                  </li>
                </ul>

                <div v-if="product.stock > 0" class="flex items-center mb-6">
                  <span class="text-green-600 dark:text-green-400 font-medium">
                    <svg class="inline-block w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    En stock ({{ product.stock }} disponibles)
                  </span>
                </div>
                <div v-else class="text-red-600 dark:text-red-400 font-medium mb-6">
                  Agotado
                </div>
              </div>

              <!-- Add to Cart -->
              <div class="border-t border-b border-gray-200 dark:border-gray-700 py-6 mb-6">
                <div class="flex flex-col sm:flex-row gap-4">
                  <div class="flex items-center border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
                    <button 
                      @click="decrementQuantity" 
                      class="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                      :disabled="quantity <= 1"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                      </svg>
                    </button>
                    <span class="px-4 py-2 w-16 text-center border-x border-gray-300 dark:border-gray-600">
                      {{ quantity }}
                    </span>
                    <button 
                      @click="incrementQuantity" 
                      class="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                      :disabled="quantity >= (product.stock || 1)"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                  
                  <button
                    @click="addToCart"
                    class="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-md transition duration-300 flex items-center justify-center"
                    :disabled="product.stock <= 0"
                    :class="{ 'opacity-50 cursor-not-allowed': product.stock <= 0 }"
                  >
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Añadir al carrito
                  </button>
                </div>
              </div>

              <!-- Additional Info -->
              <div class="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <p class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  Envío gratuito a todo el país
                </p>
                <p class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Envío en 3-5 días hábiles
                </p>
                <p class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Garantía de satisfacción
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div v-if="relatedProducts.length > 0" class="py-12 bg-gray-50 dark:bg-gray-800">
        <div class="container mx-auto px-4">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Productos relacionados
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div 
              v-for="item in relatedProducts" 
              :key="item.id"
              class="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <router-link :to="`/products/${item.id}`">
                <img 
                  :src="item.image" 
                  :alt="item.name"
                  class="w-full h-48 object-cover"
                />
                <div class="p-4">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {{ item.name }}
                  </h3>
                  <p class="text-primary-500 font-bold">
                    ${{ item.price }}
                  </p>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-detail {
  scroll-behavior: smooth;
}
</style>
