<script setup>
// Aquí podrías importar datos de la emprendedora si los tienes
const artisanInfo = {
  name: 'Nicole',
  bio: 'apasionada por los tejidos artesanales desde hace más de 3 años, he dedicado el último tiempo a crear piezas únicas y de alta calidad. Cada prenda es tejida con hilos/lanas cuidadosamente seleccionados y mucho amor.',
  image: './niki.png',
  experience: '3+ años',
  specialty: 'Tejidos artesanales',
  philosophy:
    'Cada puntada cuenta una historia, y cada prenda es una pieza de arte que lleva consigo la tradición y el amor por el trabajo bien hecho.',
}
</script>

<template>
  <main class="main">
    <!-- Artisan Profile -->
    <section class="py-16 bg-white dark:bg-gray-800">
      <!-- Hero Section -->
      <h1 class="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4">
        Sobre Nosotros
      </h1>
      <section
        class="flex items-center bg-gradient-to-r from-primary-100 to-light-100 dark:from-gray-800 dark:to-gray-900 py-16"
      >
        <div class="md:w-1/3 mb-8 md:mb-0 md:pr-8">
          <div class="rounded-lg overflow-hidden shadow-xl">
            <img
              :src="artisanInfo.image"
              :alt="artisanInfo.name"
              class="w-full h-auto rounded-full"
            />
          </div>
        </div>
        <div class="container mx-auto px-4">
          <h4 class="text-lg text-center text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Conoce la historia y la pasión que hay detrás de cada uno de nuestros tejidos
            artesanales:
          </h4>
          <p class="text-gray-700 dark:text-gray-300 mb-8 text-lg">
            Hola, soy {{ artisanInfo.name }}, {{ artisanInfo.bio }}
          </p>
        </div>
      </section>
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row">
          <div class="md:w-2/3">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-4">
                <h4 class="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-2">
                  Experiencia
                </h4>
                <p class="text-gray-700 dark:text-gray-300">
                  {{ artisanInfo.experience }} de experiencia en tejidos artesanales
                </p>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-4">
                <h4 class="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-2">
                  Especialidad
                </h4>
                <p class="text-gray-700 dark:text-gray-300">
                  {{ artisanInfo.specialty }}
                </p>
              </div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-4">
              <h4 class="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-2">
                Mi Filosofía
              </h4>
              <p class="text-gray-700 dark:text-gray-300 italic">"{{ artisanInfo.philosophy }}"</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 bg-white dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-6">¿Listo para llevar un pedacito de arte a tu hogar?</h2>
        <p class="text-xl mb-8 max-w-3xl mx-auto">
          Explora nuestra colección de tejidos artesanales hechos con amor y dedicación.
        </p>
        <router-link
          to="/products"
          class="inline-block bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300"
        >
          Ver Productos
        </router-link>
      </div>
    </section>
  </main>
</template>

<style scoped>
.main {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 100px 1rem;
  display: flex;
  flex-direction: column;
  justify-content: top;
  height: 100vh;
}
.rounded-full {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 2rem;
}
</style>
