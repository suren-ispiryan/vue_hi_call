<template>
  <div class="container pt-5">

    <form>
      <h3>Login</h3>

      <input 
        class="form-control" 
        name="email" 
        v-model="email"
        placeholder="email"
      >

      <input 
        class="form-control" 
        name="password" 
        v-model="password"
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
export default {
  name: 'LoginUser',
  data () {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    login (e) {
      e.preventDefault()
      console.log(this.email)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
