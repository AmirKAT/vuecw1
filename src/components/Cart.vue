<template>
  <div>

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
              <!-- displaying cart table headers -->
            </thead>
            <tbody v-for="(product, index) in cartItems" :key="index">
              <!-- iterates through all lessons added to cartItems and displays them -->
              <tr>
                <th scope="row"></th>
                <td>{{product.title}}</td>
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

      <form @submit.prevent="checkoutButton">

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

        <button v-show="validPhone(phone) && this.validName(this.name)" 
        type="submit" value="submit" class="btn btn-block btn-lg btn-primary">Checkout</button>
        <!-- confirms checkout if users phone and name are valid -->
      </form>

    </div>
    
  </div>
  <!-- end of cart page -->
</template>

<script>
export default {
  data: () => {
    return {
      name: null,
      phone: null,

      errors: [],
    }
  
  }, //end of data()

  props: ["cartItems"],

  methods: {
    
    removeFromCart(product) {
      this.$emit("removeFromCart", product);
    }, //end of removeFromCart

    checkForm(e) {
      this.errors = [];
      // errors are pushed to empty error array

      if (!this.name) {
        this.errors.push("Name required.");
      } else if (!this.validName(this.name)) {
        this.errors.push('Valid name required.');
      } // alerts the user if name is either required or needs to be valid

      if (!this.phone) {
        this.errors.push('Phone number required.');
      } else if (!this.validPhone(this.phone)) {
        this.errors.push('Valid phone number required.');
      } // alerts the user if phone is either required or needs to be valid

      if (!this.errors.length) {
        return true;
      }

      e.preventDefault();
    },

    validName(name) {
      var re = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
      return re.test(name);
    }, // regex to validate name

    validPhone(phone) {
      var re = /((\+44(\s\(0\)\s|\s0\s|\s)?)|0)7\d{3}(\s)?\d{6}/;
      return re.test(phone);
    }, // regex to validate UK numbers

    checkoutButton() {
    

const purchaseItemsId = this.cartItems.map( item => item._id).join(",");

       const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: this.name , phonenumber:this.phone , lessonID: purchaseItemsId , noofspace: '1' })
  };
  fetch("https://cst3145cw2.herokuapp.com/api/order", requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log('added...')
      console.log(data)
       alert("Purchase completed!");
       window.history.go('/')
    });
}

  } //end of methods

};
</script>