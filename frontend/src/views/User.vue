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
            <table class="table mt-4">
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
                    <button class="btn btn-success my-2" @click="activateEdition(user._id)">Update</button>
                  </td>
                </tr>
              </tbody>
            </table> 
          </b-col>
        </b-row>
      </b-container>
    </div> <br><br> 
    <Footer/>
  </div>
</template> 

<script>
 import Footer from '@/components/Footer.vue'
 export default {
    name:'User',
    components:{
      Footer
    },
    data(){
      return{
        users:[],
        dismissSecs: 5,
        dismissCountDown: 0,
        mensaje: {color: 'success', texto: ''},
        user: {name:'',userName:''},
        editar: false,
        userEdit: {}
      }
    },
    created(){
      this.listUsers();
    },
    methods:{
      addUser(){
        this.axios.post('/user',this.user)
         .then(res=>{
           this.users.push(res.data.user);
           this.user.name = '';
           this.user.userName = '';
           this.mensaje.color = 'success';
           this.mensaje.texto = 'User add!';
           this.showAlert();
         })
         .catch(err=>{
           console.log(err.res);
           this.mensaje.color = 'danger';
           this.mensaje.texto = 'Data is required';
           this.showAlert();
         })
      },
      listUsers(){
        this.axios.get('/users')
         .then(res=>{
          this.users = res.data.users;
         })
         .catch(err=>{
           console.log(`Error ${err}`);
         })
      },
      deleteUser(id){
        this.axios.delete(`user/${id}`)
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
        this.editar = true;
        console.log(id);
        this.axios.get(`/user/${id}`)
         .then(res=>{
           this.userEdit = res.data;
         })
         .catch(err=>{
           console.log(err.res);
         })
      },
      updateUser(us){
        this.axios.put(`/user/${us._id}`,us)
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