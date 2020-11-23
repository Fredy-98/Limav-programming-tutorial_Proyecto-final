<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-container>
        <b-navbar-brand href="#">
          <img src="@/assets/logo.png" alt="programmerTutorial" class="imgTitle" />
          programmerTutorial
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="navBarStyle">
            <b-nav-item :to="{ name: 'Home' }" exact-active v-if="estaActivo">
              <span class="material-icons"> home </span>
              Home
            </b-nav-item>
            <b-nav-item :to="{ name: 'User' }" class="mx-3" v-if="estaActivo">
              <span class="material-icons"> description </span>
              User
            </b-nav-item>
            <b-nav-item :to="{ name: 'List' }" class="mx-3" v-if="estaActivo">
              <span class="material-icons"> face </span>
              List
            </b-nav-item>
            <b-nav-item :to="{ name: 'tutorialVideo' }" exact-active v-if="estaActivo">
              <span class="material-icons"> library_add_check </span>
              TutorialVideo
            </b-nav-item>
            <!-- Ruta temporal login -->
            <b-nav-item :to="{ name: 'Login' }" exact-active v-if="!estaActivo">
              <span class="material-icons"> library_add_check </span>
              Login
            </b-nav-item>
             <!-- Ruta temporal login -->
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <!-- <Search> -->

            <!--<b-nav-form>
              <b-form-input
                size="sm"
                class="mr-sm-2"
                placeholder="Search"
              ></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit"
                >Search</b-button
              >
            </b-nav-form> -->

            <!-- </Search> -->

            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em class="navBarStyle">User</em>
              </template>
              <!-- <b-dropdown-item href="#">Profile</b-dropdown-item> -->
              <!-- <b-dropdown-item href="#">Sign Out</b-dropdown-item> -->
              <b-dropdown-item @click="logOut()">LogOut</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
    <!-- container -->
    <!-- <b-container> -->
    <router-view />
    <!-- </b-container> -->
    <!-- container -->
  </div>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'
export default {
  methods:{
    ...mapActions(['logOut','readToken'])  
  },
  computed:{
    ...mapGetters(['estaActivo'])
  },
  created(){
    this.readToken();
  }
}
</script>

<style scoped>
.imgTitle {
  width: 60px;
  height: 60px;
}
.navBarStyle{
  font-family: 'Anton', sans-serif;
}
</style>

