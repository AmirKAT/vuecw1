<template>
  <div id="app" class="container my-5">
    <h1>AK's Online Classes</h1>  

    <div class="text-right">
      <!-- cart button -->
      <button class="btn btn-warning" data-toggle="modal" data-target="#cartModal">Cart ({{ cartItems.length }})</button>
    </div>

    <!-- space between cart and sort buttons -->
    <br>
    
    <div class="text-right">
      <!-- buttons to sort classes by price -->
      <button class="btn btn-primary btn-sm" @click="sortLow">Sort by lowest price</button>
      <button class="btn btn-primary btn-sm" @click="sortHigh">Sort by highest price</button>
    </div>

    <!-- space between buttons and classes -->
    <br>

    <!-- displaying classes using v-for -->
    <div class="row">
      <div class="col-md-3" v-for="item in classes" :key="item.subject">

        <!-- adding css using bootstrap 4 to organise classes -->
        <div class="card">
          <img :src="item.image" class="card-img-top">
          <div class="card-body">
            <h4 class="card-title">{{ item.subject }}</h4>
            <div class="card-text">Location: {{ item.location }}</div>
            <div class="card-text">£{{ item.price }}</div>
            <div class="card-text">Spaces left: {{ item.spaces }}</div>
            <div class="row justify-content-end">
              <button class="btn btn-primary">Add to cart</button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    
  </div>
</template>

<script>
export default ({
  name: 'app',
  data() {
    return {
      cartItems: [],
      classes: [
        { subject: 'Maths',
        location: 'Zoom Link',
        spaces: 5,
        image: 'https://www.learnpad.com/wp-content/uploads/2018/10/maths-1.png' ,
        price: 10 },
        { subject: 'English',
        location: 'Zoom Link',
        spaces: 5,
        image: 'https://www.amysenglish.com/wp-content/uploads/2020/07/logo_piccolo.png',
        price: 15 },
        { subject: 'French',
        location: 'Zoom Link',
        spaces: 5,
        image: 'https://mylingotrip.com/wp-content/uploads/2018/12/france.png',
        price: 15 },
        { subject: 'ICT',
        location: 'Zoom Link',
        spaces: 5,
        image: 'https://digitalsignagesummit.org/europe/wp-content/uploads/2019/06/ICT-Logo-200x200-1.jpg',
        price: 20 },
        { subject: 'Economics',
        location: 'Zoom Link',
        spaces: 5,
        image: 'https://i.pinimg.com/originals/69/b8/5b/69b85b67df27c2f4f3abe81e06faf125.png',
        price: 20 },
        { subject: 'Art',
        location: 'Zoom Link',
        spaces: 5,
        image: 'https://i.pinimg.com/236x/82/96/8e/82968e121cde49504b8afbe7dffb1aa8.jpg',
        price: 5 },
        { subject: 'Cooking',
        location: 'Zoom Link',
        spaces: 5,
        image: 'https://www.cookeryschool.co.uk/wp-content/uploads/2018/03/180308-Cookery-School-LR-18-e1522247425632.jpg',
        price: 25 },
        { subject: 'Biology',
        location: 'Zoom Link',
        spaces: 5,
        image: 'https://static.vecteezy.com/system/resources/thumbnails/000/473/371/small/25._Biology_Conceptual_Design.jpg',
        price: 15 },
        { subject: 'Chemistry',
        location: 'Zoom Link',
        spaces: 5,
        image: 'https://icon-library.com/images/chemistry-icon/chemistry-icon-16.jpg',
        price: 15 },
        { subject: 'Physics',
        location: 'Zoom Link',
        spaces: 5,
        image: 'https://wp-media.petersons.com/testprep/wp-content/uploads/2018/10/08173528/physics.png',
        price: 15 },
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
  }, //end of methods
  computed: {
    sortClasses() {
      let filter = new RegExp(this.filterText, 'i') //returns result for user input in search bar
      return this.price.filter(name => name.title.match(filter)) //returns filter input by user
    }, //end of sortClasses
  }, //end of computed
}) //end of export default
</script>

<style>
  /* Nothing for now */
</style>
