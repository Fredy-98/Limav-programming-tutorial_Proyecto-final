<template>
  <div>
    <div class="user">
      <b-container class="mt-4">
        <b-row>
          <b-col md="12" >
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
            
            <!-- <form-editTutorial>-->
              <form @submit.prevent='updateTutorial(tutorialEdit)' v-if="editar">
                <h4 class="text-center">Tutorial Edit</h4>
                <input type="text" class="form-control my-2" placeholder="Name" v-model="tutorialEdit.name">
                <input type="text" class="form-control my-2" placeholder="Description" v-model='tutorialEdit.description'>
                <button type="submit" class="btn btn-warning ">Edit</button>
                <button type="submit" class="btn btn-info mx-2" @click="editar=false">Cancel</button>
              </form> 
            <!-- </form-editTutorial> -->
            <!-- <form-createTutorial>-->
              <form @submit.prevent='addTutorial()' v-if="!editar">
                <h4 class="text-center">Add new tutorial</h4>
                <input type="text" class="form-control my-2" placeholder="Name" v-model="tutorial.name">
                <input type="text" class="form-control my-2" placeholder="Description" v-model='tutorial.description'>
                <button type="submit" class="btn btn-danger btn-block">add</button>
              </form> 
            <!-- </form-createTutorial> -->
            <!-- StartTable -->
            <!--<table class="table mt-4">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(tutorial,index) of tutorials" :key="index">
                  <td>{{tutorial.name}}</td>
                  <td>{{tutorial.description}}</td>
                  <td>
                    <button class="btn btn-danger" @click="deleteTutorial(tutorial._id)">Delete</button>
                    <button class="btn btn-success mx-2" @click="activateEdition(tutorial._id)">Update</button>
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
            <div class="card mb-3" v-for="tutorial of tutorials" :key="tutorial.id">
              <div class="row no-gutters">
                <!-- <div class="col-md-4">
                  <img src="#" class="card-img" alt="...">
                </div> -->
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title mx-3 text-center my-2" style="font-weight:bold">{{tutorial.name}}</h5>
                    <p class="card-text">{{tutorial.description}}</p>
                    <video width="100%" height="auto" controls class="mx-3">
                        <source :src="`${tutorial.resource}`" type="video/mp4">
                    </video> 
                    <button class="btn btn-danger" @click="deleteTutorial(tutorial._id)">Delete</button>
                    <button class="btn btn-success mx-2" @click="activateEdition(tutorial._id)">Update</button>
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
        tutorials:[],
        dismissSecs: 5,
        dismissCountDown: 0,
        mensaje: {color: 'success', texto: ''},
        tutorial: {name:'',description:''},
        editar: false,
        tutorialEdit: {}
      }
    },
    computed:{
      ...mapState(['token'])
    },
    created(){
      this.listTutorials();
    },
    methods:{
      addTutorial(){
        let config = {
          headers: {
            token: this.token 
          } 
        }
        this.axios.post('/tutorial',this.tutorial,config)
         .then(res=>{
           this.tutorials.push(res.data.user);
           this.tutorial.name = '';
           this.tutorial.description = '';
           this.mensaje.color = 'success';
           this.mensaje.texto = 'tutorial add!';
           this.showAlert();
         })
         .catch(err=>{
           console.log(err.response);
           this.mensaje.color = 'danger';
           this.mensaje.texto = 'Data is required';
           this.showAlert();
         })
      },
      listTutorials(){
        let config = {
          headers: {
            token: this.token 
          } 
        }
        this.axios.get('/tutorials',config)
         .then(res=>{
          this.tutorials = res.data.tutorials;
         })
         .catch(err=>{
           console.log(`Error ${err}`);
         })
      },
      deleteTutorial(id){
        let config = {
          headers: {
            token: this.token 
          } 
        }
        this.axios.delete(`tutorial/${id}`,config)
         .then(res=>{
           let index = this.tutorials.findIndex(item=>item._id === res.data._id)
           this.tutorials.splice(index,1);
           this.mensaje.color='danger';
           this.mensaje.texto = 'Tutorial delete';
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
        this.axios.get(`/tutorial/${id}`,config)
         .then(res=>{
           this.tutorialEdit = res.data;
         })
         .catch(err=>{
           console.log(err.res);
         })
      },
      updateTutorial(us){
        let config = {
          headers: {
            token: this.token 
          } 
        }
        this.axios.put(`/tutorial/${us._id}`,us,config)
         .then(res=>{
           const index = this.tutorials.findIndex(s => s._id === res.data._id)
           this.tutorials[index].name = res.data.name;
           this.tutorials[index].description = res.data.description;
           this.mensaje.color='success';
           this.mensaje.texto = 'Tutorial updated';
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