<template>
  <div class="container">
    <div class="row">
<!-- header -->
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
<!-- users -->
    <div class="row pt-5">
      <div class="col-md-4 users-list p-4">
        <div class="user-item"  v-bind:key="index" v-for="(item, index) in this.users">
          <div class="name">{{ item.name }}</div>
          <div class="email">{{ item.email }}</div>
        </div>
      </div>
<!-- messages -->
      <div class="col-md-8 general-container">
        <div class="single-message" v-bind:key="index" v-for="(item, index) in this.allMessages">
          <div class="writer m-1">{{ item.user.name }}</div>
          <div class="message m-1">{{ item.messages }}</div>
        </div>

        <form class="form">
          <input 
            name="message" 
            tupe="text" 
            class="form-control"
            v-model="message"
          />
          <button class="btn btn-primary" @click="sendMessage">send</button>
        </form>
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
      authUser: "",
      message: [],
      newMessage: [],
      allMessages: []
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
    },

    sendMessage (e) {
      e.preventDefault();
      this.axios
          .post('http://localhost:8000/api/sendMessage', {data: this.message}, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
          })
          .then((response) => {
              if(response.data !== "failure") {
                this.message = ""
                this.allMessages.push(response.data); 
              }
          })
          .catch((error) => {console.log(error)})
    },

    getMessages () {
      this.axios
          .get('http://localhost:8000/api/get-messages', { 
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
          })
          .then((response) => {
            if (response.data !== 'failure') {
               this.allMessages = response.data;
            }
            else {
              this.noUserMessage = "there is no users yet"
            }
          })
          .catch((error) => {console.log(error)})
    },
  },

  mounted () {
    this.getAuthUser(),
    this.getUsers(),
    this.getMessages()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .users-list {
     height: 70vh !important;
     display: flex;
     justify-content: center;
     flex-wrap: wrap;
     border: 1px solid;
     height: 400px;
     overflow: scroll;
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
  .general-container {
    flex-wrap: wrap;
    height: 70vh !important;
    overflow: scroll;
    display: flex;
    align-items: flex-start;
    padding: 10px;
    border: 1px solid;
  }
  .form {
    width: 100%;
    display: flex;
    align-self: flex-end;
  }
  .single-message {
    width: 100%;
    border: 1px solid;
    border-radius: 5px;
    margin: 5px 0;
  }
  .writer {
    text-align: left;
     font-size: 11px ;
  }
  .message {
    text-align: left;
     font-size: 16px;
  }
</style>
