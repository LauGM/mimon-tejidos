<template>
  <footer class="footer">
    <div class="flex flex-col">
      <a href="#" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
        <i class="fab fa-instagram pr-4"></i>
        <span class="sr-only pl-4">Instagram</span>
      </a>
      <a href="#" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
        <i class="fab fa-facebook pr-4"></i>
        <span class="sr-only pl-4">Facebook</span>
      </a>
      <a href="#" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
        <i class="fab fa-whatsapp pr-4"></i>
        <span class="sr-only pl-4">WhatsApp</span>
      </a>
    </div>
    <div class="flex flex-col items-center space-x-6 mb-4 md:mb-0">
      <span class="text-gray-500 dark:text-gray-400 text-sm">
        &copy; {{ new Date().getFullYear() }} Tejidos Artesanales.
      </span>
      <span class="text-gray-500 dark:text-gray-400 text-sm"> Todos los derechos reservados. </span>
    </div>
  </footer>
</template>

<script setup>
// No se necesitan props ni lógica adicional para este componente básico
</script>

<style scoped>
footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: var(--color-bg);
  color: var(--color-text);
  padding: 1rem;
  width: 100%;
  transition:
    background-color 0.3s,
    border-color 0.3s;
}

a {
  transition: color 0.2s ease-in-out;
}

svg {
  transition: transform 0.2s ease-in-out;
}

a:hover svg {
  transform: translateY(-2px);
}
</style>
