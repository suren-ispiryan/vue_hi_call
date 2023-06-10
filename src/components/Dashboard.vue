<template>
  <div class="container pt-5">
    <button class="btn btn-danger" @click="logout">logout</button>
  </div>
</template>

<script>
import router from './../routes'
export default {
  name: 'DashboardUser',
  methods: {
    logout (e) {
      e.preventDefault()
      this.axios
          .get('http://localhost:8000/api/logout', { 
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
          })
          .then((response) => {
            if (response.data === 'loggedOut') {
              localStorage.removeItem('token')
              router.push('/')
            }
          })
          .catch((error) => {console.log(error)})
    }

    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
