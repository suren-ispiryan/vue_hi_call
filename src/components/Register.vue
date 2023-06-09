<template>
  <div class="container pt-5">

    <form>
      <h3>Register</h3>
        
      <p class="error-message">{{ failMessage }}</p>
      
      <input 
        class="form-control" 
        name="name" 
        v-model="registerData.name"
        placeholder="name"
      >

      <input 
        class="form-control" 
        name="email" 
        v-model="registerData.email"
        placeholder="email"
      >

      <input 
        class="form-control" 
        name="password" 
        v-model="registerData.password"
        placeholder="password"
      >

      <input 
        class="form-control" 
        name="confirmPassword" 
        v-model="registerData.confirmPassword"
        placeholder="password"
      >

      <button 
        class="btn btn-success"
        @click="register"
      >
        Register
      </button>

      <p class="redirection-message">
        Already registered?
        <router-link to="/">Login</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import router from './../routes'
export default {
  name: 'RegisterUser',
  data () {
    return {
      registerData: {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      failMessage: ""
    }
  },
  methods: {
    register (e) {
      console.log(this.registerData)
      e.preventDefault()
      this.axios
            .post('http://localhost:8000/api/register', {data: this.registerData},)
            .then((response) => {
                if(response.data ===  "success") {
                  router.push('/')
                  this.failMessage = "";  
                } else {
                  this.failMessage = response.data;
                }
            })
            .catch((error) => {console.log(error)})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error-message {
  color: red;
}
form {
    width: 400px;
    border: 1px black solid;
    border-radius: 10px;
    padding: 15px 30px;
  }
  input {
    margin: 15px 0;
    border-radius: 10px;
  }
  .redirection-message {
    margin-top: 10px;
    font-size: 14px;
  }
</style>
