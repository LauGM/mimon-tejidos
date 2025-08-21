import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  
  getters: {
    totalItems: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },
    
    cartTotal: (state) => {
      return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    cartItems: (state) => state.items,
  },
  
  actions: {
    addToCart(product) {
      const existingItem = this.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
    },
    
    removeFromCart(productId) {
      const index = this.items.findIndex(item => item.id === productId);
      if (index > -1) {
        this.items.splice(index, 1);
      }
    },
    
    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.id === productId);
      if (item) {
        item.quantity = Math.max(1, quantity);
      }
    },
    
    clearCart() {
      this.items = [];
    },
    
    // Initialize cart from localStorage
    initCart() {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.items = JSON.parse(savedCart);
      }
    },
    
    // Save cart to localStorage
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.items));
    }
  },
  
  // Enable persistence
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'cart',
        storage: localStorage,
      },
    ],
  },
});
