<template>
  <div id="app" class="container my-5">
    
    <header>
    <!-- website title -->
      <div class="text-center">
        <h1 class="display-1">AK's Online Lessons</h1>
      </div>
      <!-- button for home page -->
    </header>

    <div class="text-right">
      <button class="btn btn-success" v-on:click="navigateTo('shop')">Home</button>
      <!-- navigates back to lesson page -->
      <br>
      <br>
      <button class="btn btn-warning" v-on:click="navigateTo('cart')"
      v-show="cartItems.length > 0">Cart ({{ cartItems.length }})</button>
      <!-- navigates to cart page -->
    </div>

    <div v-if="page === 'cart'">
      <Cart v-on:removeFromCart="removeFromCart" :cartItems="cartItems" />
    </div>
    <!-- calling Cart.vue from components folder -->

    <div v-if="page === 'shop'">
      <Shop v-on:addToCart="addToCart" />
    </div>
    <!-- calling Shop.vue from components folder -->
    
  </div>
  <!-- end of id: app container -->
</template>

<script>
import Shop from "./components/Shop.vue";
import Cart from "./components/Cart.vue";

export default {

  name: 'app',

  data: () => {
  return {

    page: "shop",

    cartItems: []

    };
  },

  methods: {
 
    addToCart(product) {
      this.cartItems.push(product);
    }, //end of addToCart

    removeFromCart(product) {
      this.cartItems.splice(this.cartItems.indexOf(product), 1);
    }, //end of removeFromCart

    navigateTo(page) {
      this.page = page;
    }, //end of navigateTo

  }, //end of methods

  components: { Shop, Cart }

}; //end of export default

</script>

<style>
  /* Nothing */
</style>
