<template>
  <div id="app" class="container my-5">
    <h1>My online store</h1>    
    
    <!-- displaying classes using v-for -->
    <div class="row">
      <div class="col-md-3" v-for="item in classes" :key="item.subject">
        {{ item. subject }}
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      classes: [
        { subject: 'Maths', location: 'Zoom Link', spaces: 5, image: '//placehold.it/200', price: 10 },
        { subject: 'English', location: 'Zoom Link', spaces: 5, image: '//placehold.it/200', price: 10 },
        { subject: 'French', location: 'Zoom Link', spaces: 5, image: '//placehold.it/200', price: 10 },
        { subject: 'ICT', location: 'Zoom Link', spaces: 5, image: '//placehold.it/200', price: 10 },
        { subject: 'Economics', location: 'Zoom Link', spaces: 5, image: '//placehold.it/200', price: 10 },
        { subject: 'Art', location: 'Zoom Link', spaces: 5, image: '//placehold.it/200', price: 10 },
        { subject: 'Cooking', location: 'Zoom Link', spaces: 5, image: '//placehold.it/200', price: 10 },
        { subject: 'Biology', location: 'Zoom Link', spaces: 5, image: '//placehold.it/200', price: 10 },
        { subject: 'Chemistry', location: 'Zoom Link', spaces: 5, image: '//placehold.it/200', price: 10 },
        { subject: 'Physics', location: 'Zoom Link', spaces: 5, image: '//placehold.it/200', price: 10 },
      ],
    };
  },
}
</script>

<style>
  /* Nothing for now */
</style>
