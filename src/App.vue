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

      <div class="float-left">
        <!-- buttons to sort classes by price -->
        <p>Price</p>
        <button class="btn btn-primary btn-sm" @click="sortLowPrice()">Ascending</button>
        <button class="btn btn-primary btn-sm" @click="sortHighPrice()">Descending</button>
        <br>
        <br>
        <!-- buttons to sort classes by location -->
        <p>Distance</p>
        <button class="btn btn-primary btn-sm" @click="sortLowLocation()">Ascending</button>
        <button class="btn btn-primary btn-sm" @click="sortHighLocation()">Descending</button>
        <br>
        <br>
        <!-- buttons to sort classes by spaces available -->
        <p>Spaces</p>
        <button class="btn btn-primary btn-sm" @click="sortLowSpace()">Ascending</button>
        <button class="btn btn-primary btn-sm" @click="sortHighSpace()">Descending</button>
        <br>
        <br>
        <!-- buttons to sort classes by Subject -->
        <p>Subject</p>
        <button class="btn btn-primary btn-sm" @click="sortLowSubject()">Ascending</button>
        <button class="btn btn-primary btn-sm" @click="sortHighSubject()">Descending</button>
      </div>

      <!-- space between buttons and classes -->
      <br>

      <!-- displaying classes using v-for -->
      <div class="row">
        <div class="col-md-4" v-for="(product, index) in classes" :key="index">

          <!-- adding css using bootstrap 4 to organise classes -->
          <div class="card">
            <img :src="product.image" class="card-img-top">
            <div class="card-body">
              <h4 class="card-title">{{ product.subject }}</h4>
              <div class="card-text">Distance in Km: {{ product.location }}</div>
              <div class="card-text">Price: £{{ product.price }}</div>
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
                  <td>£{{product.price}}</td>
                  <td><button class="btn btn-danger" v-on:click="removeFromCart(product)">X</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- displays the users lessons in their cart -->

      <div class="col-md-4">
        <h1>Checkout as Guest</h1>

        <form>

          <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
              <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
          </p>

          <div class="form-group" @keyup="checkForm">
            <input v-model="name" type="text" id="name" name="name" class="form-control" placeholder="Enter name">
            <p><small>e.g. James</small></p>
          </div>

          <div class="form-group" @keyup="checkForm">
            <input v-model="phone" type="tel" id="phone" name="phone" class="form-control" placeholder="Enter phone number">
            <p><small>e.g. 07912312312 (11 numbers)</small></p>
          </div>

          <button v-show="validPhone(phone) && this.validName(this.name)" v-on:click="checkoutButton" type="submit" value="submit" class="btn btn-block btn-lg btn-primary">Checkout</button>
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
      
      errors: [],

      name: null,
      phone: null,

      showLessons: true,

      cartItems: [],

      classes: [
        {
        id: 1001,
        subject: 'Maths',
        location: 3,
        spaces: 5,
        image: 'https://www.learnpad.com/wp-content/uploads/2018/10/maths-1.png' ,
        price: 10 
        },
        {
        id: 1002,
        subject: 'English',
        location: 8,
        spaces: 5,
        image: 'https://www.amysenglish.com/wp-content/uploads/2020/07/logo_piccolo.png',
        price: 15 
        },
        {
        id: 1003,
        subject: 'French',
        location: 10,
        spaces: 5,
        image: 'https://mylingotrip.com/wp-content/uploads/2018/12/france.png',
        price: 15 
        },
        {
        id: 1004,
        subject: 'ICT',
        location: 5,
        spaces: 5,
        image: 'https://digitalsignagesummit.org/europe/wp-content/uploads/2019/06/ICT-Logo-200x200-1.jpg',
        price: 20 
        },
        {
        id: 1005,
        subject: 'Economics',
        location: 6,
        spaces: 5,
        image: 'https://i.pinimg.com/originals/69/b8/5b/69b85b67df27c2f4f3abe81e06faf125.png',
        price: 20 
        },
        {
        id: 1006, 
        subject: 'Art',
        location: 4,
        spaces: 5,
        image: 'https://i.pinimg.com/236x/82/96/8e/82968e121cde49504b8afbe7dffb1aa8.jpg',
        price: 5 
        },
        {
        id: 1007,
        subject: 'Cooking',
        location: 14,
        spaces: 5,
        image: 'https://www.cookeryschool.co.uk/wp-content/uploads/2018/03/180308-Cookery-School-LR-18-e1522247425632.jpg',
        price: 25 
        },
        {
        id: 1008, 
        subject: 'Biology',
        location: 7,
        spaces: 5,
        image: 'https://static.vecteezy.com/system/resources/thumbnails/000/473/371/small/25._Biology_Conceptual_Design.jpg',
        price: 15 
        },
        {
        id: 1009, 
        subject: 'Chemistry',
        location: 12,
        spaces: 5,
        image: 'https://icon-library.com/images/chemistry-icon/chemistry-icon-16.jpg',
        price: 15 
        },
        {
        id: 1010, 
        subject: 'Physics',
        location: 10,
        spaces: 5,
        image: 'https://wp-media.petersons.com/testprep/wp-content/uploads/2018/10/08173528/physics.png',
        price: 15 
        },
      ], //end of classes

    }; //end of return

  }, //end of data()

  methods: {

    sortHighPrice() {
      this.classes.sort((a, b) => a.price < b.price ? 1 : -1);
    }, //end of sortHighPrice

    sortLowPrice() {
      this.classes.sort((a, b) => a.price > b.price ? 1 : -1);
    }, //end of sortLowPrice

    sortHighLocation() {
      this.classes.sort((a, b) => a.location < b.location ? 1 : -1);
    }, //end of sortHighPrice

    sortLowLocation() {
      this.classes.sort((a, b) => a.location > b.location ? 1 : -1);
    }, //end of sortLowPrice

    sortHighSpace() {
      this.classes.sort((a, b) => a.spaces < b.spaces ? 1 : -1);
    }, //end of sortHighSpace

    sortLowSpace() {
      this.classes.sort((a, b) => a.spaces > b.spaces ? 1 : -1);
    }, //end of sortLowSpace

    sortHighSubject() {
      this.classes.sort((a, b) => a.subject < b.subject ? 1 : -1);
    }, //end of sortHighSpace

    sortLowSubject() {
      this.classes.sort((a, b) => a.subject > b.subject ? 1 : -1);
    }, //end of sortLowSpace

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

    checkForm(e) {
      this.errors = [];

      if (!this.name) {
        this.errors.push("Name required.");
      } else if (!this.validName(this.name)) {
        this.errors.push('Valid name required.');
      }

      if (!this.phone) {
        this.errors.push('Phone number required.');
      } else if (!this.validPhone(this.phone)) {
        this.errors.push('Valid phone number required.');
      }

      if (!this.errors.length) {
        return true;
      }

      e.preventDefault();
    },

    validName(name) {
      var re = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
      return re.test(name);
    },

    validPhone(phone) {
      var re = /((\+44(\s\(0\)\s|\s0\s|\s)?)|0)7\d{3}(\s)?\d{6}/;
      return re.test(phone);
    },

    checkoutButton() {
      alert("Purchase completed!");
    }

  }, //end of methods

  computed: {

  } //end of computed

}) //end of export default

</script>

<style>
  /* Nothing */
</style>
