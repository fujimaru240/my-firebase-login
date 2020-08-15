<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <a href="javascript:void(0)" v-if="isLogined" @click="logout">Logout</a>
      <router-link v-if="!isLogined" to="/login">Login</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link v-if="isLogined" to="/secret">Secret</router-link>
      <div>user: {{loginName}}</div>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import firebase from './plugins/firebase';

@Component
export default class App extends Vue {
  isLogined = false;
  loginName = 'none';

  private logout(): void {
    firebase.auth().signOut().then(() => {
      this.$router.push('/Login')
    })
  }

  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      this.isLogined = false;
      if (user) {
        this.isLogined = true;
        if (user.email) this.loginName = user.email
      }
    })
  }

  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(newVal: any) {
    console.log(newVal)
    firebase.auth().onAuthStateChanged(user => {
      this.isLogined = false;
      if (user) {
        this.isLogined = true;
        if (user.email) this.loginName = user.email
        console.log('*** authenticated. ***');
      }
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
