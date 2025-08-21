<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/cart'

defineProps({
  isDarkMode: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['toggle-theme'])
const cartStore = useCartStore()

const cartItemCount = computed(() => cartStore.itemCount)

const toggleTheme = () => {
  emit('toggle-theme')
}

const navLinks = [
  { name: 'Productos', path: '/' },
  { name: 'Sobre Nosotros', path: '/about' },
]
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 shadow-sm navbar">
    <div class="nav-container">
      <div class="flex items-center">
        <!-- Logo -->
        <RouterLink to="/" class="nav-logo"> Mimon Tejidos </RouterLink>

        <!-- Navigation Links -->
        <div class="nav-links">
          <RouterLink v-for="link in navLinks" :key="link.path" :to="link.path" class="nav-link">
            {{ link.name }}
          </RouterLink>
          <a
            @click="toggleTheme"
            class="nav-link transition-colors"
            :title="isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
          >
            <!-- Theme Toggle -->
            <i v-if="isDarkMode" class="far fa-sun"></i>
            <i v-else class="far fa-moon"></i>
          </a>
        </div>
      </div>

      <!-- Mobile Menu Button -->
      <button class="mobile-menu-button md:hidden" @click="toggleMobileMenu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <!-- Desktop Actions -->
      <div class="flex items-center space-x-4">
        <!-- Cart -->
        <div class="relative">
          <RouterLink
            to="/cart"
            class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center text-xl"
            title="Ver carrito"
          >
            <i class="fas fa-shopping-cart"></i>
            <span
              v-if="cartItemCount > 0"
              class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
            >
              {{ cartItemCount }}
            </span>
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  height: 64px;
  display: flex;
  align-items: center;
  width: 100%;
}

.dark .navbar {
  background-color: rgba(26, 32, 44, 0.8);
  box-shadow: none;
}

.nav-container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
  text-decoration: none;
  white-space: nowrap;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  margin: 0 2rem;
}

.nav-link {
  position: relative;
  color: var(--color-text);
  font-weight: 500;
  transition: all 0.3s ease;
  text-decoration: none;
  white-space: nowrap;
  padding: 0.5rem 0;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary);
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.router-link-active::after {
  width: 100%;
}

.router-link-active {
  color: var(--primary);
  font-weight: 600;
}

/* Estilos para el contenedor principal de la barra de navegación */
.nav-container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

/* Estilos para el logo */
.nav-logo {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
  text-decoration: none;
  white-space: nowrap;
  margin-right: 2rem;
}

/* Estilos para los enlaces de navegación */
.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  position: relative;
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary);
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.router-link-active::after {
  width: 100%;
}

.router-link-active {
  color: var(--primary);
  font-weight: 600;
}

/* Estilos para el botón de menú móvil */
.mobile-menu-button {
  display: none;
  background: none;
  border: none;
  color: var(--color-text);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  margin-left: 1rem;
}

/* Estilos para móviles */
@media (max-width: 768px) {
  .mobile-menu-button {
    display: block;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    background-color: var(--color-card);
    padding: 1rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    flex-direction: column;
    gap: 0.5rem;
    z-index: 40;
  }

  .nav-links.active {
    display: flex;
  }

  .nav-link {
    padding: 0.75rem 1rem;
    border-radius: 0.375rem;
  }

  .nav-link:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .dark .nav-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
}

/* Mobile menu styles */
.mobile-menu-button {
  display: none;
  background: none;
  border: none;
  color: var(--color-text);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
}

@media (max-width: 768px) {
  .mobile-menu-button {
    display: block;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--color-card);
    padding: 1rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    flex-direction: column;
    gap: 0.5rem;
  }

  .nav-links.active {
    display: flex;
  }

  .nav-link {
    display: block;
    padding: 0.75rem 1rem;
    border-radius: 0.375rem;
  }

  .nav-link:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .dark .nav-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
}
</style>
