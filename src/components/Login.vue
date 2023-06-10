<template>
  <div class="container pt-5">

    <form>
      <h3>Login</h3>

      <p class="error-message">{{ failMessage }}</p>

      <input 
        class="form-control" 
        name="email" 
        v-model="loginData.email"
        placeholder="email"
      >

      <input 
        class="form-control" 
        name="password" 
        v-model="loginData.password"
        placeholder="password"
      >

      <button 
        class="btn btn-success"
        @click="login"
      >
        Login
      </button>

      <p class="redirection-message">
        Not registered?
        <router-link to="/register">Reister</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import router from './../routes'
export default {
  name: 'LoginUser',
  data () {
    return {
      loginData: {
        email: "",
        password: "" 
      },
      failMessage: ""
    }
  },
  methods: {
    login (e) {
      e.preventDefault()
      this.axios
          .post('http://localhost:8000/api/login', {data: this.loginData},)
          .then((response) => {
              if(response.data !== "failure") {
                localStorage.setItem('token', response.data)
                router.push('/dashboard')
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
