<template>
  <v-container class="mb-16">
    <div style="font-size: 24px; font-weight: bold;">Избранное</div>
  </v-container>
  <div v-if="is_loading" v-for="item in 5">
    <NuxtLink to="test">
      <v-container>
        <div style="display: flex;">
          <div class="skeleton skeleton-img"></div>
          <div>
            <p class="skeleton skeleton-text" style="margin-left:20px;width: 250px"></p>
            <p class="skeleton skeleton-text" style="margin-left:20px;width: 200px"></p>

          </div>
        </div>
      </v-container>
    </NuxtLink>
    <v-divider></v-divider>
  </div>
  <div v-else v-for="item in favorites">
    <NuxtLink to="test">
      <v-container>
        <div style="display: flex;">
          <div class="pr-2">          <img style="border-radius: 5px;" width="100" height="100" :src="item.product_image" alt=""></div>
          <div style="margin-left: 25px">
            <p style="font-size: 14px;">{{ item.product_name }}</p>

          </div>
        </div>
      </v-container>
    </NuxtLink>
    <v-divider></v-divider>
  </div>
</template>

<script>
import axios from "axios";
import {BASE_URL} from "../constants";

const route = useRoute()

export default {
  name: "favorites",
  data(){
    return {
      favorites: [],
      is_loading: true
    }
  },
  mounted() {
    axios.get(BASE_URL+`/api/favorite/get`, {params: {guid: localStorage.getItem('guid')}}).then(response => {
      this.favorites = response.data
      this.is_loading = false
    }).catch(err => {
      console.log(err);
    });
  }
}
</script>

<style scoped>
a{
  color: #000000;
  text-decoration: none!important;
  -webkit-box-shadow: none!important;
  box-shadow: none!important;
}
</style>