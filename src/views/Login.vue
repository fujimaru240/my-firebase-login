<template>
  <div>
    <h1>login</h1>
    <form @submit.prevent="pressed">
      <input type="text" placeholder="email@email.." v-model="email" />
      <input type="password" placeholder="password" v-model="password" />
      <button>Login</button>
      <div class="error" v-if="error">{{error.message}}</div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import firebase from '../plugins/firebase';

@Component
export default class Login extends Vue {
  email = '';
  password = '';
  error = '';

  private pressed(): void {
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(data => {
      console.log('*** logined. ***');
      this.$router.push('/Secret');
    })
    .catch(error => (this.error = error))
  }
}
</script>

<style>
.error {
  color: red;
}
</style>