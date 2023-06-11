<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <h3>Hi {{ this.authUser.name }}</h3>
      </div>
      
      <div class="col-md-6">
        <h3>Hi Call</h3>
      </div>

      <div class="col-md-3">
        <button class="btn btn-danger" @click="logout">logout</button>
      </div>
    </div>

    <div class="row pt-5">
      <div class="col-md-4 users-list p-4">
        <div class="user-item"  v-bind:key="index" v-for="(item, index) in this.users">
          <div class="name">{{ item.name }}</div>
          <div class="email">{{ item.email }}</div>
        </div>
      </div>

      <div class="col-md-8 general-container">
        here
      </div>
    </div>
  </div>
</template>

<script>
import router from './../routes'
export default {
  name: 'DashboardUser',
  
  data () {
    return {
      users: null,
      noUserMessage: "",
      authUser: ""
    }
  },

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
    },

    getUsers () {
      this.axios
          .get('http://localhost:8000/api/get-users', { 
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
          })
          .then((response) => {
            if (response.data !== 'failure') {
               this.users = response.data;
               this.noUserMessage = ""
            }
            else {
              this.noUserMessage = "there is no users yet"
            }
          })
          .catch((error) => {console.log(error)})
    },

    getAuthUser () {
      this.axios
          .get('http://localhost:8000/api/get-auth-user', { 
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
          })
          .then((response) => {
            if (response.data !== 'failure') {
               this.authUser = response.data;
            }
            else {
              this.noUserMessage = "there is no users yet"
            }
          })
          .catch((error) => {console.log(error)})
    }
  },

  mounted () {
    this.getAuthUser(),
    this.getUsers()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .users-list {
     display: flex;
     justify-content: center;
     flex-wrap: wrap;
     border: 1px solid;
     height: 400px;
     overflow: scroll;
  }
  .general-container {
     border: 1px solid;
  }
  .user-item {
    overflow-x: hidden;

    padding: 3px;
    margin: 3px;
    width: 90%;
    height: 60px;
    border: 1px red solid;
    border-radius: 5px;
  }
  .name {
    text-align: left;
  }
  .email {
    text-align: left;
    font-size: 14px;
  }
</style>
