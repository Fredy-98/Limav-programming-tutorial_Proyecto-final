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
                <input type="text" class="form-control my-2" placeholder="tutorialVideo" v-model='listEdit.tutorialVideo'>
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
            <table class="table mt-4">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>TutorialVideo</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(list,index) of lists" :key="index">
                  <td>{{list.title}}</td>
                  <td>{{list.listtutorialVideo}}</td>
                  <td>
                    <button class="btn btn-danger" @click="deleteList(list._id)">Delete</button>
                    <button class="btn btn-success my-2" @click="activateEdition(list._id)">Update</button>
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
    name:'List',
    components:{
      Footer
    },
    data(){
      return{
        users:[],
        dismissSecs: 5,
        dismissCountDown: 0,
        mensaje: {color: 'success', texto: ''},
        list: {title:'',tutorialVideo:''},
        editar: false,
        listEdit: {}
      }
    },
    created(){
      this.listLists();
    },
    methods:{
      addList(){
        this.axios.post('/list',this.list)
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
        this.axios.get('/lists')
         .then(res=>{
          this.lists = res.data.lists;
         })
         .catch(err=>{
           console.log(`Error ${err}`);
         })
      },
      deleteList(id){
        this.axios.delete(`list/${id}`)
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
        this.editar = true;
        console.log(id);
        this.axios.get(`/list/${id}`)
         .then(res=>{
           this.listEdit = res.data;
         })
         .catch(err=>{
           console.log(err.res);
         })
      },
      updateList(li){
        this.axios.put(`/list/${li._id}`,li)
         .then(res=>{
           const index = this.lists.findIndex(s => s._id === res.data._id)
           this.lists[index].title = res.data.title;
           this.lists[index].tutorialVideo = res.data.tutorialVideo;
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