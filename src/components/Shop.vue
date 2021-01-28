<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div class="float-left">
        <!-- buttons to sort classes by price -->
        <p>Price</p>
        <button class="btn btn-primary btn-sm mr-2" @click="sortLowPrice()">Ascending</button>
        <button class="btn btn-primary btn-sm" @click="sortHighPrice()">Descending</button>
        <br />
        <br />
        <!-- buttons to sort classes by location -->
        <p>Distance</p>
        <button class="btn btn-primary btn-sm mr-2" @click="sortLowLocation()">Ascending</button>
        <button class="btn btn-primary btn-sm" @click="sortHighLocation()">Descending</button>
        <br />
        <br />
        <!-- buttons to sort classes by spaces available -->
        <p>Spaces</p>
        <button class="btn btn-primary btn-sm mr-2" @click="sortLowSpace()">Ascending</button>
        <button class="btn btn-primary btn-sm" @click="sortHighSpace()">Descending</button>
        <br />
        <br />
        <!-- buttons to sort classes by Subject -->
        <p>Subject</p>
        <button class="btn btn-primary btn-sm mr-2" @click="sortLowSubject()">Ascending</button>
        <button class="btn btn-primary btn-sm" @click="sortHighSubject()">Descending</button>
      </div>

      <!-- space between buttons and classes -->
      <br />

      <!-- displaying classes using v-for -->
      <div class="row">
        <div class="col-md-4 mb-4" v-for="(product, index) in classes" :key="index">
          <!-- adding css using bootstrap 4 to organise classes -->
          <div class="card">
            <img :src="product.image" class="card-img-top" />
            <div class="card-body">
              <h4 class="card-title">{{ product.title }}</h4>
              <div class="card-text">Distance in Km: {{ product.location }}</div>
              <div class="card-text">Price: £{{ product.price }}</div>
              <div class="card-text">Spaces left: {{ product.spaces }}</div>
              <div class="row justify-content-end">
                <!-- the add to cart button becomes disabled once the spaces reach 0 -->
                <button
                  class="btn btn-primary mr-2"
                  v-on:click="addToCart(product)"
                  :disabled="product.spaces == 0"
                  v-show="product.spaces > 0"
                  @click="decrement(product)"
                >Add to cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end of display cards for lessons -->
    </div>
  </div>
  <!-- end of lesson shop -->
</template>

<script>
export default {
  data: () => {
    return {
      lessons: [],
      cartItems: [],
      loading: true,
      classes: [
        // {
        //   id: 1001,
        //   subject: "Maths",
        //   location: 3,
        //   spaces: 5,
        //   image:
        //     "https://www.learnpad.com/wp-content/uploads/2018/10/maths-1.png",
        //   price: 10,
        // },
        // {
        //   id: 1002,
        //   subject: "English",
        //   location: 8,
        //   spaces: 5,
        //   image:
        //     "https://www.amysenglish.com/wp-content/uploads/2020/07/logo_piccolo.png",
        //   price: 15,
        // },
        // {
        //   id: 1003,
        //   subject: "French",
        //   location: 10,
        //   spaces: 5,
        //   image:
        //     "https://mylingotrip.com/wp-content/uploads/2018/12/france.png",
        //   price: 15,
        // },
        // {
        //   id: 1004,
        //   subject: "ICT",
        //   location: 5,
        //   spaces: 5,
        //   image:
        //     "https://digitalsignagesummit.org/europe/wp-content/uploads/2019/06/ICT-Logo-200x200-1.jpg",
        //   price: 20,
        // },
        // {
        //   id: 1005,
        //   subject: "Economics",
        //   location: 6,
        //   spaces: 5,
        //   image:
        //     "https://i.pinimg.com/originals/69/b8/5b/69b85b67df27c2f4f3abe81e06faf125.png",
        //   price: 20,
        // },
        // {
        //   id: 1006,
        //   subject: "Art",
        //   location: 4,
        //   spaces: 5,
        //   image:
        //     "https://i.pinimg.com/236x/82/96/8e/82968e121cde49504b8afbe7dffb1aa8.jpg",
        //   price: 5,
        // },
        // {
        //   id: 1007,
        //   subject: "Cooking",
        //   location: 14,
        //   spaces: 5,
        //   image:
        //     "https://www.cookeryschool.co.uk/wp-content/uploads/2018/03/180308-Cookery-School-LR-18-e1522247425632.jpg",
        //   price: 25,
        // },
        // {
        //   id: 1008,
        //   subject: "Biology",
        //   location: 7,
        //   spaces: 5,
        //   image:
        //     "https://static.vecteezy.com/system/resources/thumbnails/000/473/371/small/25._Biology_Conceptual_Design.jpg",
        //   price: 15,
        // },
        // {
        //   id: 1009,
        //   subject: "Chemistry",
        //   location: 12,
        //   spaces: 5,
        //   image:
        //     "https://icon-library.com/images/chemistry-icon/chemistry-icon-16.jpg",
        //   price: 15,
        // },
        // {
        //   id: 1010,
        //   subject: "Physics",
        //   location: 10,
        //   spaces: 5,
        //   image:
        //     "https://wp-media.petersons.com/testprep/wp-content/uploads/2018/10/08173528/physics.png",
        //   price: 15,
        // },
      ], //end of classes
    }; //end of return
  }, //end of data()
  mounted() {
    fetch("https://cst3145cw2.herokuapp.com/api/lesson")
      .then((response) => response.json())
      .then((data) => {
        this.classes = data;
        this.loading = false;
      });
  },
  methods: {
    sortHighPrice() {
      this.classes.sort((a, b) => (a.price < b.price ? 1 : -1));
    }, //end of sortHighPrice

    sortLowPrice() {
      this.classes.sort((a, b) => (a.price > b.price ? 1 : -1));
    }, //end of sortLowPrice

    sortHighLocation() {
      this.classes.sort((a, b) => (a.location < b.location ? 1 : -1));
    }, //end of sortHighPrice

    sortLowLocation() {
      this.classes.sort((a, b) => (a.location > b.location ? 1 : -1));
    }, //end of sortLowPrice

    sortHighSpace() {
      this.classes.sort((a, b) => (a.spaces < b.spaces ? 1 : -1));
    }, //end of sortHighSpace

    sortLowSpace() {
      this.classes.sort((a, b) => (a.spaces > b.spaces ? 1 : -1));
    }, //end of sortLowSpace

    sortHighSubject() {
      this.classes.sort((a, b) => (a.subject < b.subject ? 1 : -1));
    }, //end of sortHighSpace

    sortLowSubject() {
      this.classes.sort((a, b) => (a.subject > b.subject ? 1 : -1));
    }, //end of sortLowSpace

    decrement(n) {
      n.spaces -= 1;
    }, //end of decrement

    addToCart(product) {
      this.$emit("addToCart", product);
    }, // sending addToCart input to parent addToCart in App.vue
  }, //end of methods
};
</script>