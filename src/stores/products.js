import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProductsStore = defineStore('products', () => {
  const products = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchProducts = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch('https://68a606bd2a3deed2960faaa1.mockapi.io/productos');
      if (!response.ok) {
        throw new Error('No se pudieron cargar los productos');
      }
      products.value = await response.json();
    } catch (err) {
      console.error('Error al cargar productos:', err);
      error.value = 'Error al cargar los productos. Por favor, intente nuevamente.';
      // Datos de ejemplo en caso de error (solo para desarrollo)
      products.value = [
        {
          id: '1',
          name: 'Producto de Ejemplo',
          price: 1000,
          image: 'https://via.placeholder.com/300',
          description: 'Descripción del producto de ejemplo',
          category: 'ejemplo'
        }
      ];
    } finally {
      loading.value = false;
    }
  };

  const getProductById = (id) => {
    return products.value.find(product => product.id === id);
  };

  // Cargar productos al inicializar el store
  fetchProducts();

  return {
    products,
    loading,
    error,
    fetchProducts,
    getProductById
  };
});
