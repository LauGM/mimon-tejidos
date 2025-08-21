<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const cartStore = useCartStore()

// Obtener items del carrito desde el store
const cartItems = computed(() => cartStore.cartItems)

// Calcular totales
const subtotal = computed(() => cartStore.cartTotal)

const shipping = computed(() => 0) // Envío gratuito

const total = computed(() => subtotal.value + shipping.value)

// Actualizar cantidad de un producto
const updateQuantityItem = (productId, newQuantity) => {
  if (newQuantity < 1) newQuantity = 1
  cartStore.updateQuantity(productId, newQuantity)
}

// Incrementar cantidad
const incrementQuantity = (productId, currentQuantity, stock) => {
  if (currentQuantity < stock) {
    cartStore.updateQuantity(productId, currentQuantity + 1)
  }
}

// Decrementar cantidad
const decrementQuantity = (productId, currentQuantity) => {
  if (currentQuantity > 1) {
    cartStore.updateQuantity(productId, currentQuantity - 1)
  }
}

// Eliminar producto del carrito
const removeItem = (productId) => {
  if (confirm('¿Estás seguro de que deseas eliminar este producto del carrito?')) {
    cartStore.removeFromCart(productId)
  }
}

// Proceder al pago
const checkout = () => {
  const phoneNumber = '5491136370268'
  let message = '¡Hola! Me gustaría hacer el siguiente pedido:%0A%0A'

  cartStore.cartItems.forEach((item) => {
    message += `- ${item.name} (x${item.quantity}): $${(item.price * item.quantity).toLocaleString('es-AR')}%0A`
  })

  message += `%0A*Total: $${total.value.toLocaleString('es-AR')}*%0A%0AMis datos de envío son:%0ANombre: %0ADirección: %0ALocalidad: %0ACódigo Postal: %0ATeléfono de contacto: `

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
  window.open(whatsappUrl, '_blank')

  // Opcional: Limpiar el carrito después de enviar el pedido
  // cartStore.clearCart();
}

// Continuar comprando
const continueShopping = () => {
  router.push('/products')
}
</script>

<template>
  <div class="cart">
    <!-- Breadcrumb -->
    <nav class="bg-gray-50 dark:bg-gray-800 py-4">
      <div class="container mx-auto px-4">
        <ol class="flex items-center space-x-2 text-sm">
          <li>
            <router-link
              to="/"
              class="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Inicio
            </router-link>
          </li>
          <li class="text-gray-500 dark:text-gray-400">/</li>
          <li class="text-gray-600 dark:text-gray-300">Carrito de compras</li>
        </ol>
      </div>
    </nav>

    <div class="py-12 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Carrito de Compras</h1>

        <!-- Empty Cart -->
        <div v-if="cartItems.length === 0" class="text-center py-16">
          <svg
            class="mx-auto h-16 w-16 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h2 class="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            Tu carrito está vacío
          </h2>
          <p class="mt-2 text-gray-600 dark:text-gray-300">
            Parece que no has añadido ningún producto a tu carrito todavía.
          </p>
          <div class="mt-6">
            <button
              @click="continueShopping"
              class="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              Seguir comprando
            </button>
          </div>
        </div>

        <!-- Cart with Items -->
        <div v-else class="lg:flex lg:gap-8">
          <!-- Cart Items -->
          <div class="lg:w-2/3">
            <div class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
              <ul class="divide-y divide-gray-200 dark:divide-gray-700">
                <li v-for="item in cartItems" :key="item.id" class="p-4 sm:p-6">
                  <div class="flex flex-col sm:flex-row">
                    <div class="flex-shrink-0">
                      <img
                        :src="item.image"
                        :alt="item.name"
                        class="w-24 h-24 rounded-md object-cover"
                      />
                    </div>
                    <div class="mt-4 sm:mt-0 sm:ml-6 flex-1">
                      <div class="flex justify-between">
                        <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                          {{ item.name }}
                        </h3>
                        <p class="ml-4 text-lg font-medium text-gray-900 dark:text-white">
                          ${{ (item.price * item.quantity).toLocaleString() }}
                        </p>
                      </div>
                      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        ${{ item.price.toLocaleString() }} c/u
                      </p>
                      <div class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                        <div
                          class="flex justify-between text-base font-medium text-gray-900 dark:text-white"
                        >
                          <p>Subtotal</p>
                          <p>${{ subtotal.toLocaleString('es-AR') }}</p>
                        </div>
                        <div
                          class="flex justify-between text-sm text-gray-600 dark:text-gray-300 mt-2"
                        >
                          <p>Envío</p>
                          <p>
                            {{ shipping === 0 ? 'Gratis' : `$${shipping.toLocaleString('es-AR')}` }}
                          </p>
                        </div>
                        <div
                          class="mt-4 flex justify-between text-lg font-bold text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-700 pt-4"
                        >
                          <p>Total</p>
                          <p>${{ total.toLocaleString('es-AR') }}</p>
                        </div>
                      </div>
                      <div class="mt-4 flex items-center">
                        <div
                          class="flex items-center border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden"
                        >
                          <button
                            @click="decrementQuantity(item.id, item.quantity)"
                            class="px-3 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors"
                          >
                            <svg
                              class="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M20 12H4"
                              />
                            </svg>
                          </button>
                          <input
                            type="number"
                            min="1"
                            :max="item.stock || 10"
                            :value="item.quantity"
                            @change="updateQuantityItem(item.id, $event.target.value)"
                            class="w-16 text-center border-x border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                          <button
                            @click="incrementQuantity(item.id, item.quantity, item.stock)"
                            class="px-3 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors"
                          >
                            <svg
                              class="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          </button>
                        </div>
                        <button
                          @click="removeItem(item.id)"
                          class="ml-4 text-sm font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                        >
                          Eliminar
                        </button>
                      </div>
                      <p
                        v-if="item.stock !== undefined"
                        class="text-sm text-gray-500 dark:text-gray-400"
                      >
                        {{ item.stock }} disponibles
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="mt-8 lg:mt-0 lg:w-1/3">
            <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Resumen del pedido
              </h2>
              <div class="space-y-4">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-300">Subtotal</span>
                  <span class="text-gray-900 dark:text-white"
                    >${{ subtotal.toLocaleString('es-AR') }}</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-300">Envío</span>
                  <span class="text-green-600 dark:text-green-400">
                    {{ shipping === 0 ? 'Gratis' : `$${shipping.toLocaleString('es-AR')}` }}
                  </span>
                </div>
                <div
                  class="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between"
                >
                  <span class="text-lg font-medium text-gray-900 dark:text-white">Total</span>
                  <span class="text-lg font-bold text-primary-600 dark:text-primary-400">
                    ${{ total.toLocaleString('es-AR') }}
                  </span>
                </div>
              </div>

              <div class="mt-6">
                <button
                  @click="checkout"
                  class="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300"
                >
                  Finalizar compra
                </button>
              </div>

              <div class="mt-4 text-center">
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  O
                  <button
                    @click="continueShopping"
                    class="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                  >
                    continuar comprando
                  </button>
                </p>
              </div>
            </div>

            <!-- Secure Checkout -->
            <div class="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <div class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="text-sm text-gray-600 dark:text-gray-300">
                  Pago seguro y protegido
                </span>
              </div>
              <div class="mt-4 flex justify-center space-x-6">
                <img src="https://via.placeholder.com/40x25" alt="Visa" class="h-6" />
                <img src="https://via.placeholder.com/40x25/cccccc" alt="Mastercard" class="h-6" />
                <img
                  src="https://via.placeholder.com/40x25/999999"
                  alt="Mercado Pago"
                  class="h-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
