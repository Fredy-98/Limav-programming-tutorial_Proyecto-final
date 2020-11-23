<template>
  <div class="container">
     <div class="row mt-4">
        <div class="col-lg-4 offset-lg-4 styleLogin">
            <h5 class="text-center accessSystem">Access to system</h5>
            <form role="form" @submit.prevent='login'>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email " class="form-control"  placeholder="Add her email" v-model='user.email'>
                </div>
                <div class="form-group">
                    <label for="password" placeholder="Add her password">Password</label>
                    <input type="password" class="form-control" placeholder="Add her password" v-model='user.password'>
                </div>
                <button type='submit' class="btn btn-success">Log In</button>
            </form><br>
            <!-- Mensaje de error password -->
             <div v-if="message !=''">
                <p style="font-weight:34px; color:yellow">{{message}}</p> 
             </div>
            <!-- Mensaje de error password -->
        </div> 
     </div>
  </div>
</template>
<script>
import { mapActions} from 'vuex'
export default {
  data(){
    return {
      user:{email:'',password:''},
      message: ''  
    }
  },
  methods:{
    ...mapActions(['keepUser']),
    login(){
    //   console.log(this.user); 
      this.axios.post('/login',this.user)
       .then(res => {
        // console.log(res.data);
        const token = res.data.tokenReturn;
        this.keepUser(token);
       }) 
       .catch(err =>{
         console.log(err.response);
         this.message = err.response.data.message 
       }) 
    }   
  }  
}
</script>
<style scoped>
 .accessSystem {
    font-weight: bold;
 }
 label{
     font-weight: bold;
 }
 .styleLogin{
    background: rgb(5, 122, 122);
    padding: 20px;  
 }
</style>