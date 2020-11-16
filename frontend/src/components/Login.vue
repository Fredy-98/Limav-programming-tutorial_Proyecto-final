<template>
  <div class="container">
     <div class="row mt-4">
        <div class="col-lg-4 offset-lg-4 styleLogin">
            <h5 class="text-center accessSystem">Access to system</h5>
            <form role="form">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="text" class="form-control" required placeholder="Add her email">
                </div>
                <div class="form-group">
                    <label for="password" placeholder="Add her password">Password</label>
                    <input type="password" class="form-control" required placeholder="Add her email">
                </div>
                <button type='button' class="btn btn-success">Log In</button>
            </form>
        </div> 
     </div>
  </div>
</template>
<script>
export default {
    
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