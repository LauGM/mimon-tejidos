<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['add-to-cart', 'view-product-detail'])

const addToCart = (product) => {
  emit('add-to-cart', product)
}

const viewProductDetail = (productId) => {
  emit('view-product-detail', productId)
}
</script>

<template>
  <div class="card">
    <img :src="product.imagen" :alt="product.nombre" />
    <h3>{{ product.nombre }}</h3>
    <p>$ {{ product.precio }}</p>
    <div class="card-buttons">
      <button class="btn btn-primary" @click="addToCart(product)">Agregar al carrito</button>
      <button class="btn btn-primary" @click="viewProductDetail(product.id)">Ver detalles</button>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  border: 1px solid #ccc;
  padding: 1rem;
  text-align: center;
}
</style>
