<template>
  <div id="app" class="container my-5">
    
    <header>
    <!-- website title -->
      <div class="text-center">
        <h1 class="display-1">AK's Online Lessons</h1>
      </div>

    </header>

    <div class="text-right">
      <!-- cart button, when clicked takes you to the cart page -->
      <button class="btn btn-warning" @click="showCart"
      v-show="cartItems.length > 0">Cart ({{ cartItems.length }})</button>
    </div>

    <!-- space between cart and sort buttons -->
    <br>
    
    <!-- The below div tag holds the page that has lessons for sale -->
    <div v-if="showLessons">

      <div class="text-right">
        <!-- buttons to sort classes by price -->
        <button class="btn btn-primary btn-sm" @click="sortLow">Sort by lowest price</button>
        <button class="btn btn-primary btn-sm" @click="sortHigh">Sort by highest price</button>
      </div>

      <!-- space between buttons and classes -->
      <br>

      <!-- displaying classes using v-for -->
      <div class="row">
        <div class="col-md-3" v-for="(product, index) in classes" :key="index">

          <!-- adding css using bootstrap 4 to organise classes -->
          <div class="card">
            <img :src="product.image" class="card-img-top">
            <div class="card-body">
              <h4 class="card-title">{{ product.subject }}</h4>
              <div class="card-text">Location: {{ product.location }}</div>
              <div class="card-text">£{{ product.price }}</div>
              <div class="card-text">Spaces left: {{ product.spaces }}</div>
              <div class="row justify-content-end">
                <!-- the add to cart button becomes disabled once the spaces reach 0 -->
                <button class="btn btn-primary" v-on:click="addToCart(product)" :disabled="product.spaces == 0"
                  v-show="product.spaces > 0" @click="decrement(product)">Add to cart</button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <!-- end of display cards for lessons -->

    </div>
    <!-- end of lesson shop -->
    
    <!-- ----------------------------------------------------------------------------------------------------- -->

    <div>

      <div class="text-right">
        <button class="btn btn-success" @click="showCart">Back to Lessons</button>
      </div>
      <!-- takes the user back to the lessons page -->

      <div>
        <h1>Your Cart</h1>
        <div class="products">
          <div>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Lesson</th>
                  <th scope="col">Price</th>
                  <th scope="col">Remove</th>
                </tr>
              </thead>
              <tbody v-for="(product, index) in cartItems" :key="index">
                <!-- iterates through all lessons added to cart and displays them -->
                <tr>
                  <th scope="row"></th>
                  <td>{{product.subject}}</td>
                  <td>{{product.price}}</td>
                  <td><button class="btn btn-danger" v-on:click="removeFromCart(product)">X</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- views the users lessons in their cart -->

      <div>
        <form>
        </form>
      </div>
      
    </div>
    <!-- end of cart page -->
    
  </div>
  <!-- end of id: app container -->
</template>

<script>

export default ({
  name: 'app',

  data: () => {
    return {

      showLessons: true,

      cartItems: [],

      classes: [
        {
        id: 1001,
        subject: 'Maths',
        location: 'Zoom Link',
        spaces: 5,
        image: 'https://www.learnpad.com/wp-content/uploads/2018/10/maths-1.png' ,
        price: 10 
        },
        {
        id: 1002,
        subject: 'English',
        location: 'Zoom Link',
        spaces: 5,
        image: 'https://www.amysenglish.com/wp-content/uploads/2020/07/logo_piccolo.png',
        price: 15 
        },
        {
        id: 1003,
        subject: 'French',
        location: 'Zoom Link',
        spaces: 5,
        image: 'https://mylingotrip.com/wp-content/uploads/2018/12/france.png',
        price: 15 
        },
        {
        id: 1004,
        subject: 'ICT',
        location: 'Zoom Link',
        spaces: 5,
        image: 'https://digitalsignagesummit.org/europe/wp-content/uploads/2019/06/ICT-Logo-200x200-1.jpg',
        price: 20 
        },
        {
        id: 1005,
        subject: 'Economics',
        location: 'Zoom Link',
        spaces: 5,
        image: 'https://i.pinimg.com/originals/69/b8/5b/69b85b67df27c2f4f3abe81e06faf125.png',
        price: 20 
        },
        {
        id: 1006, 
        subject: 'Art',
        location: 'Zoom Link',
        spaces: 5,
        image: 'https://i.pinimg.com/236x/82/96/8e/82968e121cde49504b8afbe7dffb1aa8.jpg',
        price: 5 
        },
        {
        id: 1007,
        subject: 'Cooking',
        location: 'Zoom Link',
        spaces: 5,
        image: 'https://www.cookeryschool.co.uk/wp-content/uploads/2018/03/180308-Cookery-School-LR-18-e1522247425632.jpg',
        price: 25 
        },
        {
        id: 1008, 
        subject: 'Biology',
        location: 'Zoom Link',
        spaces: 5,
        image: 'https://static.vecteezy.com/system/resources/thumbnails/000/473/371/small/25._Biology_Conceptual_Design.jpg',
        price: 15 
        },
        {
        id: 1009, 
        subject: 'Chemistry',
        location: 'Zoom Link',
        spaces: 5,
        image: 'https://icon-library.com/images/chemistry-icon/chemistry-icon-16.jpg',
        price: 15 
        },
        {
        id: 1010, 
        subject: 'Physics',
        location: 'Zoom Link',
        spaces: 5,
        image: 'https://wp-media.petersons.com/testprep/wp-content/uploads/2018/10/08173528/physics.png',
        price: 15 
        },
      ], //end of classes

    }; //end of return

  }, //end of data()

  methods: {

    sortHigh() {
      this.classes.sort((a, b) => a.price < b.price ? 1 : -1);
    }, //end of sortHigh

    sortLow() {
      this.classes.sort((a, b) => a.price > b.price ? 1 : -1);
    }, //end of sortLow 

    decrement(n) {
      n.spaces -= 1;
    }, //end of decrement

    addItemToCart(product) {
      this.$emit("cartItems", product);   
    }, //end of addToCart

    removeItemFromCart(product) {
      this.$emit("cartItems", product);
    }, //end of removeFromCart

    addToCart(product) {
      this.cartItems.push(product);
    }, //end of addToCart
    
    removeFromCart(product) {
      this.cartItems.splice(this.cartItems.indexOf(product), 1);
    }, //end of removeFromCart

    showCart() {
      this.showLessons = this.showLessons ? false : true;
    }, //end of showCart

  }, //end of methods

  computed: {

  } //end of computed

}) //end of export default

</script>

<style>
  /* Nothing */
</style>
