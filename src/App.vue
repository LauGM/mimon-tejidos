<script setup>
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import AppNavbar from './components/AppNavbar.vue'
import AppFooter from './components/AppFooter.vue'

const isDarkMode = ref(true)

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  updateTheme()
}

const updateTheme = () => {
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
    localStorage.theme = 'dark'
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.theme = 'light'
  }
}

onMounted(() => {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    isDarkMode.value = true
  } else {
    isDarkMode.value = false
  }
  updateTheme()
})
</script>

<template>
  <div :class="{ dark: isDarkMode }">
    <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <AppNavbar :isDarkMode="isDarkMode" @toggle-theme="toggleTheme" class="fixedHeader" />
      <RouterView />
      <AppFooter :isDarkMode="isDarkMode" class="fixedFooter" />
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

:root {
  --primary: #b7d6c4;
  --secondary: #fed9a4;
  --accent: #ffd1d3;
  --light: #a8c8d5;
  --light-accent: #e3c4ed;
  --light-secondary: #fbd5c2;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.dark {
  --color-bg: #1a202c;
  --color-text: #f7fafc;
  --color-card: #2d3748;
}

:root {
  --color-bg: #f7fafc;
  --color-text: #2d3748;
  --color-card: #ffffff;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  transition:
    background-color 0.3s,
    color 0.3s;
}

.fixedFooter {
  position: fixed;
  bottom: 0;
  height: 100px;
}

.fixedHeader {
  position: fixed;
  top: 0;
  height: 100px;
}
</style>
