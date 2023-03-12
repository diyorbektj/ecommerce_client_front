<template>
  <v-card class="pa-4">
    <div>
      <h2>Войти в систему</h2>
    </div>
    <v-text-field v-model="email" required label="Email:"></v-text-field>
    <v-text-field v-model="password" required label="Парол:"></v-text-field>
    <v-btn @click.prevent="Auth" block color="success">Войти</v-btn>
  </v-card>
</template>

<script>
import axios from "axios";
import {BASE_URL} from "../../../constants";

export default {
  name: "Login",
  data(){
    return{
      email: null,
      password: null
    }
  },
  methods: {
    async Auth(){
      await axios.post(BASE_URL+"/api/auth/login", {email: this.email, password: this.password}).then(response => {
        localStorage.setItem('token', response.data.token)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>