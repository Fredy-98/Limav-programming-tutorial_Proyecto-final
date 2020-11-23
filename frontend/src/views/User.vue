<template>
  <div>
    <div class="user">
      <b-container class="mt-4">
        <b-row>
          <b-col md="12" >
            <!-- <h4 class="text-center">All User</h4>  -->
            <!-- <alert-bootstrap -->
              <b-alert
              :show="dismissCountDown"
              dismissible
              :variant="mensaje.color"
              @dismissed="dismissCountDown=0"
              @dismiss-count-down="countDownChanged"
             >
             {{mensaje.texto}} 
             </b-alert>
            <!-- <alert-bootstrap -->
            
            <!-- <form-editUser>-->
              <form @submit.prevent='updateUser(userEdit)' v-if="editar">
                <h4 class="text-center">User Edit</h4>
                <input type="text" class="form-control my-2" placeholder="Name" v-model="userEdit.name">
                <input type="text" class="form-control my-2" placeholder="UserName" v-model='userEdit.userName'>
                <button type="submit" class="btn btn-warning ">Edit</button>
                <button type="submit" class="btn btn-info mx-2" @click="editar=false">Cancel</button>
              </form> 
            <!-- </form-editUser> -->
            <!-- <form-createUser>-->
              <form @submit.prevent='addUser()' v-if="!editar">
                <h4 class="text-center">Add new user</h4>
                <input type="text" class="form-control my-2" placeholder="Name" v-model="user.name">
                <input type="text" class="form-control my-2" placeholder="UserName" v-model='user.userName'>
                <button type="submit" class="btn btn-danger btn-block">add</button>
              </form> 
            <!-- </form-createUser> -->
            <!-- <startTable> -->
            <!--<table class="table mt-4">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>UserName</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(user,index) of users" :key="index">
                  <td>{{user.name}}</td>
                  <td>{{user.userName}}</td>
                  <td>
                    <button class="btn btn-danger" @click="deleteUser(user._id)">Delete</button>
                    <button class="btn btn-success mx-2" @click="activateEdition(user._id)">Update</button>
                  </td>
                </tr>
              </tbody>
            </table> -->
            <!-- EndTable -->
          </b-col>
        </b-row>

        <!-- Card-Bootstrap -->
        <b-row class="mt-4">
          <b-col md='12'>
            <div class="card mb-3" v-for="user of users" :key="user.id" >
              <div class="row no-gutters">
                <div class="col-md-4">
                  <img :src="`${user.image}`" class="mx-2 card-img imageUser" alt="..."><hr>
                  <h5 style="font-weight:bold" class="mx-3">{{user.userName}}</h5>
                  <h6 class="mx-3">{{user.role}}</h6>
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title text-center" style="font-weight:bold" v-for="{title} of user.list" :key="title.id"><span v-for="x of title" :key="x.id">{{x}}</span></h5>
                    <hr>
                    <!-- Nota -->
                     <!-- No he podido encontrar una forma de insertar el video de forma reactiva
                     para poder hacerlo hay que utilizar dos ciclos en la etiqueta source, vue.js no lo permite
                     ejemplo: Linea 84
                      -->
                    <!-- Nota -->
                    <video width="100%" height="auto" controls>
                      <source src="https://res.cloudinary.com/dqhme1rod/video/upload/v1605992787/programmerTutorial/nkp5m4eya649r6ja3tzz.mp4" type="video/mp4"> 
                    </video>
                    <div v-for='{tutorialVideo} of user.list' :key="tutorialVideo.id"><span v-for="{resource} of tutorialVideo" :key="resource.id">{{resource}}</span></div> 
                    
                    <button class="btn btn-danger" @click="deleteUser(user._id)">Delete</button>
                    <button class="btn btn-success mx-2" @click="activateEdition(user._id)">Update</button>
                    <!-- <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> -->
                  </div>
                </div>
              </div>
           </div>
          </b-col>
        </b-row>
        <!-- Card-Bootstrap -->
      </b-container>
    </div> <br><br> 
    <Footer/>
  </div>
</template> 

<script>
 import { mapState } from 'vuex'
 import Footer from '@/components/Footer.vue'
 export default {
    name:'User',
    components:{
      Footer
    },
    data(){
      return{
        users:[],
        resourceTutorial:[],
        dismissSecs: 5,
        dismissCountDown: 0,
        mensaje: {color: 'success', texto: ''},
        user: {name:'',userName:''},
        editar: false,
        userEdit: {}
      }
    },
    computed:{
      ...mapState(['token'])
    },
    created(){
      this.listUsers();
    },
    methods:{
      addUser(){
        let config = {
          headers: {
            token: this.token 
          } 
        }
        this.axios.post('/user',this.user,config)
         .then(res=>{
           this.users.push(res.data.user);
           this.user.name = '';
           this.user.userName = '';
           this.mensaje.color = 'success';
           this.mensaje.texto = 'User add!';
           this.showAlert();
         })
         .catch(err=>{
           console.log(err.response);
           this.mensaje.color = 'danger';
           this.mensaje.texto = 'Data is required';
           this.showAlert();
         })
      },
      listUsers(){
        let config = {
          headers: {
            token: this.token 
          } 
        }
        this.axios.get('/users',config)
         .then(res=>{
          this.users = res.data.users;
          /* <user.list.tutorialVideo.resource> */
          /* </user.list.tutorialVideo.resource> */
         })
         .catch(err=>{
           console.log(`Error ${err}`);
         })
      },
      deleteUser(id){
         let config = {
          headers: {
            token: this.token 
          } 
        }
        this.axios.delete(`user/${id}`,config)
         .then(res=>{
           let index = this.users.findIndex(item=>item._id === res.data._id)
           this.users.splice(index,1);
           this.mensaje.color='danger';
           this.mensaje.texto = 'User delete';
           this.showAlert();
         })
         .catch(err=>{
           console.log(`Error ${err}`);
         })
      },
      activateEdition(id){
         let config = {
          headers: {
            token: this.token 
          } 
        }
        this.editar = true;
        console.log(id);
        this.axios.get(`/user/${id}`,config)
         .then(res=>{
           this.userEdit = res.data;
         })
         .catch(err=>{
           console.log(err.res);
         })
      },
      updateUser(us){
         let config = {
          headers: {
            token: this.token 
          } 
        }
        this.axios.put(`/user/${us._id}`,us,config)
         .then(res=>{
           const index = this.users.findIndex(s => s._id === res.data._id)
           this.users[index].name = res.data.name;
           this.users[index].userName = res.data.userName;
           this.mensaje.color='success';
           this.mensaje.texto = 'User updated';
           this.showAlert();
           this.editar = false;
         })
         .catch(err=>{
           console.log(err.res);
         })
      },
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      }
    }
 }
</script>

<style scoped>
  .imgUser{
    width: 100%;
    height: auto;
  }
</style>