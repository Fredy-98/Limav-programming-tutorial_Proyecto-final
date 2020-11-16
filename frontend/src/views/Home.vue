<template>
 <div>
   <div class="home">
     <b-container class="mt-4 text-center">
       <b-row>
         <b-col cols='6'>
          <img src='@/assets/programmer.png' fluid alt="Responsive image" class="mt-2 imgWelcome"/>
         </b-col>
         <b-col cols='6' class="text-center">
           <h4 class="mt-5 messageWelcome">Welcome to programmerTutorial</h4>
         </b-col>
       </b-row>
     </b-container>
      <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
   </div>
   <Footer/>
 </div>
</template>

<script>
/*@ is an alias to /src*/
/*import HelloWorld from '@/components/HelloWorld.vue'*/
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld
    Footer
  }
}
</script>

<style scoped>
  .imgWelcome{
    width:80%;
    height:90%;
  }
  .messageWelcome{
    font-size: 40px;
    font-family: 'Anton', sans-serif;
    font-family: 'Pathway Gothic One', sans-serif;
  }
</style>
