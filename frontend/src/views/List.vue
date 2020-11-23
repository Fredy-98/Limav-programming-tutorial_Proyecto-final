<template>
  <div>
    <div class="list">
      <b-container class="mt-4">
        <b-row>
          <b-col md="12" >
            <!-- <h4 class="text-center">All List</h4>  -->
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
            
            <!-- <form-editList>-->
              <form @submit.prevent='updateList(listEdit)' v-if="editar">
                <h4 class="text-center">List Edit</h4>
                <input type="text" class="form-control my-2" placeholder="Title" v-model="listEdit.title">
                <!-- <input type="text" class="form-control my-2" placeholder="tutorialVideo" v-model='listEdit.tutorialVideo'> -->
                <button type="submit" class="btn btn-warning ">Edit</button>
                <button type="submit" class="btn btn-info mx-2" @click="editar=false">Cancel</button>
              </form> 
            <!-- </form-editList> -->
            <!-- <form-createList>-->
              <form @submit.prevent='addList()' v-if="!editar">
                <h4 class="text-center">Add new list</h4>
                <input type="text" class="form-control my-2" placeholder="Title" v-model="list.title">
                <input type="text" class="form-control my-2" placeholder="tutorialVideo" v-model='list.tutorialVideo'>
                <button type="submit" class="btn btn-danger btn-block">add</button>
              </form> 
            <!-- </form-createList> -->
            <!-- StartTable -->
            <!--
            <table class="table mt-4">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>NameTutorial</th>
                  <th>TutorialVideo</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(list,index) of lists" :key="index">
                  <td v-for="x of list.title" :key="x.id">{{x}}</td>
                  <td v-for="{name} of list.tutorialVideo" :key="name.id">{{name}}</td>
                  <td v-for="{resource} of list.tutorialVideo" :key="resource.id">{{resource}}</td>
                  <td>
                    <button class="btn btn-danger" @click="deleteList(list._id)">Delete</button>
                    <button class="btn btn-success mx-2" @click="activateEdition(list._id)">Update</button>
                  </td>
                </tr>
              </tbody>
            </table> -->
            <!-- </EndTable> --> 
          </b-col>
        </b-row>
         
          <!-- Card-Bootstrap -->
        <b-row class="mt-4">
          <b-col md='12'>
            <div class="card mb-3" v-for="list of lists" :key="list.id">
              <div class="row no-gutters">
                <!-- <div class="col-md-4">
                  <img src="@/assets/js.png" class="card-img imgJs" alt="...">
                </div> -->
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title mx-3 text-center my-2" style="font-weight:bold" v-for="x of list.title" :key="x.id">{{x}}</h5>
                    <!-- <p class="card-text">{{tutorial.description}}</p> -->
                    <video width="100%" height="auto" controls class="mx-3">
                      <source v-for="{resource} of list.tutorialVideo" :key="resource.id" :src="`${resource}`" type="video/mp4"> 
                    </video>
                    <p v-for="{name} of list.tutorialVideo" :key="name.id" class="text-center nameList">{{name}}</p>
                    <button class="btn btn-danger" @click="deleteList(list._id)">Delete</button>
                    <button class="btn btn-success mx-2" @click="activateEdition(list._id)">Update</button>
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
    name:'List',
    components:{
      Footer
    },
    data(){
      return{
        lists:[],
        dismissSecs: 5,
        dismissCountDown: 0,
        mensaje: {color: 'success', texto: ''},
        list: {title:''/* ,tutorialVideo:'' */},
        editar: false,
        listEdit: {}
      }
    },
    computed:{
      ...mapState(['token'])
    },
    created(){
      this.listLists();
    },
    methods:{
      addList(){
        let config = {
          headers: {
            token: this.token 
          } 
        }
        this.axios.post('/list',this.list,config)
         .then(res=>{
           this.lists.push(res.data.list);
           this.list.title = '';
           this.list.tutorialVideo = '';
           this.mensaje.color = 'success';
           this.mensaje.texto = 'List add!';
           this.showAlert();
         })
         .catch(err=>{
           console.log(err.res);
           this.mensaje.color = 'danger';
           this.mensaje.texto = 'Data is required';
           this.showAlert();
         })
      },
      listLists(){
        let config = {
          headers: {
            token: this.token 
          } 
        }
        this.axios.get('/lists',config)
         .then(res=>{
          this.lists = res.data.lists;
          /* Name of list */
          // for(let x of this.lists){
          //   for(let dat of x.title){
          //     console.log(dat);
          //   }
          // }
          /* Name of list */
          /* Name of list */
          for(let { tutorialVideo } of this.lists){
            console.log(tutorialVideo);
            // for(let dat of x.title){
            //   console.log(dat);
            // }
          }
          /* Name of list */
         })
         .catch(err=>{
           console.log(`Error ${err}`);
         })
      },
      deleteList(id){
        let config = {
          headers: {
            token: this.token 
          } 
        }
        this.axios.delete(`list/${id}`,config)
         .then(res=>{
           let index = this.lists.findIndex(item=>item._id === res.data._id)
           this.lists.splice(index,1);
           this.mensaje.color='danger';
           this.mensaje.texto = 'List delete';
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
        this.axios.get(`/list/${id}`,config)
         .then(res=>{
           this.listEdit = res.data;
         })
         .catch(err=>{
           console.log(err.res);
         })
      },
      updateList(li){
        let config = {
          headers: {
            token: this.token 
          } 
        }
        this.axios.put(`/list/${li._id}`,li,config)
         .then(res=>{
           const index = this.lists.findIndex(s => s._id === res.data._id)
           this.lists[index].title = res.data.title;
          //  this.lists[index].tutorialVideo = res.data.tutorialVideo;
           this.mensaje.color='success';
           this.mensaje.texto = 'List updated';
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
  .nameList{
    font-weight:bold;
  }
  /* .imgJs{
    width: 100%;
    height: auto;
  } */
</style>